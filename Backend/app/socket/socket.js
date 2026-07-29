const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");

const prisma = require("../config/prisma");
const messageService = require("../services/message.service");

const onlineUsers = new Map();

const socketToUser = new Map();

let ioInstance = null;

const defaultClientUrls = [
    process.env.CLIENT_URL,
    process.env.FRONTEND_URL,
    "http://localhost:5173",
    "http://127.0.0.1:5173",
].filter(Boolean);

const isAllowedLocalOrigin = (origin) => {
    if (!origin) return true;
    if (defaultClientUrls.includes(origin)) return true;

    return /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin);
};

const parseCookie = (cookieHeader = "") => {
    return cookieHeader.split(";").reduce((cookies, cookie) => {
        const [key, ...valueParts] = cookie.trim().split("=");

        if (!key) return cookies;

        cookies[key] = decodeURIComponent(valueParts.join("="));
        return cookies;
    }, {});
};

const getSocketToken = (socket) => {
    const authToken = socket.handshake.auth?.token;

    const bearerToken = socket.handshake.headers?.authorization?.startsWith("Bearer ")
        ? socket.handshake.headers.authorization.split(" ")[1]
        : null;

    const cookies = parseCookie(socket.handshake.headers?.cookie || "");
    const cookieToken = cookies.accessToken;

    return authToken || bearerToken || cookieToken;
};

const addOnlineUser = (userId, socketId) => {
    if (!onlineUsers.has(userId)) {
        onlineUsers.set(userId, new Set());
    }

    onlineUsers.get(userId).add(socketId);
    socketToUser.set(socketId, userId);
};

const removeOnlineUser = (socketId) => {
    const userId = socketToUser.get(socketId);

    if (!userId) {
        return {
            userId: null,
            isUserOffline: false,
        };
    }

    const userSockets = onlineUsers.get(userId);

    if (userSockets) {
        userSockets.delete(socketId);

        if (userSockets.size === 0) {
            onlineUsers.delete(userId);
            socketToUser.delete(socketId);

            return {
                userId,
                isUserOffline: true,
            };
        }
    }

    socketToUser.delete(socketId);

    return {
        userId,
        isUserOffline: false,
    };
};

const getOnlineUserIds = () => {
    return Array.from(onlineUsers.keys());
};

const isUserOnline = (userId) => {
    return onlineUsers.has(userId);
};

const isConversationParticipant = async ({ userId, conversationId }) => {
    if (!userId || !conversationId) return false;

    const participant = await prisma.conversationParticipant.findUnique({
        where: {
            conversationId_userId: {
                conversationId,
                userId,
            },
        },
    });

    return Boolean(participant && !participant.leftAt);
};

const initSocket = async (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin(origin, callback) {
                if (isAllowedLocalOrigin(origin)) {
                    return callback(null, true);
                }

                return callback(new Error("Not allowed by CORS"));
            },
            credentials: true,
            methods: ["GET", "POST", "PATCH"],
        },
    });

    ioInstance = io;

    io.use(async (socket, next) => {
        try {
            const token = getSocketToken(socket);

            if (!token) {
                return next(new Error("Socket auth token missing"));
            }

            const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

            if (!decoded?.id) {
                return next(new Error("Invalid socket token payload"));
            }

            socket.user = {
                id: decoded.id,
                username: decoded.username,
                email: decoded.email,
                role: decoded.role,
            };

            return next();
        } catch (error) {
            return next(new Error("Socket authentication failed"));
        }
    });

    io.on("connection", async (socket) => {
        const userId = socket.user.id;

        console.log(`[Socket.IO] connected userId=${userId}, socketId=${socket.id}`);

        addOnlineUser(userId, socket.id);

        socket.join(`user:${userId}`);

        socket.emit("presence:online-users", {
            users: getOnlineUserIds(),
        });

        socket.broadcast.emit("presence:user-online", {
            userId,
            online: true,
        });

        socket.on("conversation:join", async (payload, callback) => {
            try {
                const { conversationId } = payload || {};

                if (!conversationId) {
                    throw new Error("conversationId is required");
                }

                const allowed = await isConversationParticipant({
                    userId,
                    conversationId,
                });

                if (!allowed) {
                    throw new Error("You are not allowed to join this conversation");
                }

                socket.join(`conversation:${conversationId}`);

                if (typeof callback === "function") {
                    callback({
                        success: true,
                        message: "Conversation joined",
                        conversationId,
                    });
                }
            } catch (error) {
                if (typeof callback === "function") {
                    callback({
                        success: false,
                        message: error.message,
                    });
                }
            }
        });

        socket.on("conversation:leave", (payload) => {
            const { conversationId } = payload || {};

            if (!conversationId) return;

            socket.leave(`conversation:${conversationId}`);
        });

        socket.on("message:send", async (payload, callback) => {
            try {
                const { conversationId, body, replyToId } = payload || {};

                if (!conversationId) {
                    throw new Error("conversationId is required");
                }

                const allowed = await isConversationParticipant({
                    userId,
                    conversationId,
                });

                if (!allowed) {
                    throw new Error("You are not allowed to send message in this conversation");
                }

                const message = await messageService.sendTextMessage({
                    senderId: userId,
                    conversationId,
                    body,
                    replyToId,
                });

                io.to(`conversation:${conversationId}`).emit("message:new", {
                    conversationId,
                    message,
                });

                if (typeof callback === "function") {
                    callback({
                        success: true,
                        data: message,
                    });
                }
            } catch (error) {
                if (typeof callback === "function") {
                    callback({
                        success: false,
                        message: error.message,
                    });
                }
            }
        });

        socket.on("typing:start", async (payload) => {
            try {
                const { conversationId } = payload || {};

                if (!conversationId) return;

                const allowed = await isConversationParticipant({
                    userId,
                    conversationId,
                });

                if (!allowed) return;

                socket.to(`conversation:${conversationId}`).emit("typing:start", {
                    conversationId,
                    userId,
                });
            } catch (error) {
                console.log("[Socket.IO] typing:start error:", error.message);
            }
        });

        socket.on("typing:stop", async (payload) => {
            try {
                const { conversationId } = payload || {};

                if (!conversationId) return;

                const allowed = await isConversationParticipant({
                    userId,
                    conversationId,
                });

                if (!allowed) return;

                socket.to(`conversation:${conversationId}`).emit("typing:stop", {
                    conversationId,
                    userId,
                });
            } catch (error) {
                console.log("[Socket.IO] typing:stop error:", error.message);
            }
        });

        socket.on("message:read", async (payload, callback) => {
            try {
                const { conversationId } = payload || {};

                if (!conversationId) {
                    throw new Error("conversationId is required");
                }

                const allowed = await isConversationParticipant({
                    userId,
                    conversationId,
                });

                if (!allowed) {
                    throw new Error("You are not allowed to read this conversation");
                }

                const result = await messageService.markConversationAsRead({
                    userId,
                    conversationId,
                });

                socket.to(`conversation:${conversationId}`).emit("message:read", {
                    conversationId,
                    userId,
                    readAt: result.readAt,
                    readMessagesCount: result.readMessagesCount,
                });

                if (typeof callback === "function") {
                    callback({
                        success: true,
                        data: result,
                    });
                }
            } catch (error) {
                if (typeof callback === "function") {
                    callback({
                        success: false,
                        message: error.message,
                    });
                }
            }
        });

        socket.on("presence:check-user", (payload, callback) => {
            const { userId: targetUserId } = payload || {};

            const online = isUserOnline(targetUserId);

            if (typeof callback === "function") {
                callback({
                    success: true,
                    userId: targetUserId,
                    online,
                });
            }
        });

        socket.on("disconnect", () => {
            const result = removeOnlineUser(socket.id);

            console.log(`[Socket.IO] disconnected socketId=${socket.id}`);

            if (result.isUserOffline) {
                socket.broadcast.emit("presence:user-offline", {
                    userId: result.userId,
                    online: false,
                });
            }
        });
    });

    console.log("[Socket.IO] initialized without Redis");

    return io;
};

const getIO = () => {
    if (!ioInstance) {
        throw new Error("Socket.IO is not initialized");
    }

    return ioInstance;
};

module.exports = {
    initSocket,
    getIO,
};
