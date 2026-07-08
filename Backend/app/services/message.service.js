const prisma = require("../config/prisma");
const notificationService = require("./notification.service");

const userSelect = {
    id: true,
    fullName: true,
    username: true,
    email: true,
    profileImageUrl: true,
    userRole: {
        select: {
            role: true,
        },
    },
};

const conversationInclude = {
    participants: {
        include: {
            user: {
                select: userSelect,
            },
        },
    },
    lastMessage: {
        include: {
            sender: {
                select: userSelect,
            },
            attachments: true,
        },
    },
};

const messageInclude = {
    sender: {
        select: userSelect,
    },
    attachments: true,
    readReceipts: true,
};

const getDirectKey = (userOneId, userTwoId) => {
    return [userOneId, userTwoId].sort().join("__");
};

const getMessagePreview = (body) => {
    if (!body) return "You received a new message.";

    const cleanBody = body.trim();

    if (cleanBody.length <= 80) {
        return cleanBody;
    }

    return `${cleanBody.slice(0, 80)}...`;
};

const checkConversationParticipant = async (userId, conversationId) => {
    const participant = await prisma.conversationParticipant.findUnique({
        where: {
            conversationId_userId: {
                conversationId,
                userId,
            },
        },
    });

    if (!participant || participant.leftAt) {
        throw new Error("You are not a participant of this conversation");
    }

    return participant;
};

const createMessageNotifications = async ({
    conversationId,
    senderId,
    message,
    receivers,
}) => {
    if (!message || !Array.isArray(receivers) || receivers.length === 0) {
        return;
    }

    const senderName =
        message.sender?.fullName ||
        message.sender?.username ||
        message.sender?.email ||
        "Someone";

    try {
        await notificationService.createManyNotifications({
            notifications: receivers.map((receiver) => ({
                userId: receiver.userId,
                type: "MESSAGE",
                title: `New message from ${senderName}`,
                message: getMessagePreview(message.body),
                link: `/messages?conversationId=${conversationId}`,
                metadata: {
                    conversationId,
                    messageId: message.id,
                    senderId,
                    senderName,
                },
            })),
        });
    } catch (error) {
        console.log("[Message Notification Error]", error.message);
    }
};

const createOrGetDirectConversation = async ({
    currentUserId,
    receiverId,
    contextType,
    contextId,
}) => {
    if (!currentUserId) {
        throw new Error("Unauthorized user");
    }

    if (!receiverId) {
        throw new Error("receiverId is required");
    }

    if (currentUserId === receiverId) {
        throw new Error("You cannot create conversation with yourself");
    }

    const receiver = await prisma.user.findUnique({
        where: {
            id: receiverId,
        },
    });

    if (!receiver) {
        throw new Error("Receiver user not found");
    }

    const directKey = getDirectKey(currentUserId, receiverId);

    const existingConversation = await prisma.conversation.findUnique({
        where: {
            directKey,
        },
        include: conversationInclude,
    });

    if (existingConversation) {
        return existingConversation;
    }

    const conversation = await prisma.conversation.create({
        data: {
            type: "DIRECT",
            directKey,
            contextType: contextType || null,
            contextId: contextId || null,
            createdById: currentUserId,
            participants: {
                create: [
                    {
                        userId: currentUserId,
                    },
                    {
                        userId: receiverId,
                    },
                ],
            },
        },
        include: conversationInclude,
    });

    return conversation;
};

const getMyConversations = async (userId) => {
    if (!userId) {
        throw new Error("Unauthorized user");
    }

    const conversations = await prisma.conversation.findMany({
        where: {
            participants: {
                some: {
                    userId,
                    leftAt: null,
                },
            },
        },
        include: conversationInclude,
        orderBy: {
            updatedAt: "desc",
        },
    });

    return conversations;
};

const getConversationMessages = async ({ userId, conversationId, page, limit }) => {
    if (!userId) {
        throw new Error("Unauthorized user");
    }

    if (!conversationId) {
        throw new Error("conversationId is required");
    }

    await checkConversationParticipant(userId, conversationId);

    const currentPage = Number(page) || 1;
    const take = Number(limit) || 30;
    const skip = (currentPage - 1) * take;

    const [messages, total] = await Promise.all([
        prisma.message.findMany({
            where: {
                conversationId,
                deletedAt: null,
            },
            skip,
            take,
            include: messageInclude,
            orderBy: {
                createdAt: "asc",
            },
        }),
        prisma.message.count({
            where: {
                conversationId,
                deletedAt: null,
            },
        }),
    ]);

    return {
        messages,
        pagination: {
            page: currentPage,
            limit: take,
            total,
            totalPages: Math.ceil(total / take),
        },
    };
};

const sendTextMessage = async ({ senderId, conversationId, body, replyToId }) => {
    if (!senderId) {
        throw new Error("Unauthorized user");
    }

    if (!conversationId) {
        throw new Error("conversationId is required");
    }

    if (!body || !body.trim()) {
        throw new Error("Message body is required");
    }

    await checkConversationParticipant(senderId, conversationId);

    if (replyToId) {
        const replyMessage = await prisma.message.findFirst({
            where: {
                id: replyToId,
                conversationId,
                deletedAt: null,
            },
        });

        if (!replyMessage) {
            throw new Error("Reply message not found");
        }
    }

    const result = await prisma.$transaction(async (tx) => {
        const message = await tx.message.create({
            data: {
                conversationId,
                senderId,
                type: "TEXT",
                body: body.trim(),
                replyToId: replyToId || null,
            },
            include: messageInclude,
        });

        await tx.conversation.update({
            where: {
                id: conversationId,
            },
            data: {
                lastMessageId: message.id,
            },
        });

        await tx.conversationParticipant.update({
            where: {
                conversationId_userId: {
                    conversationId,
                    userId: senderId,
                },
            },
            data: {
                lastReadAt: new Date(),
            },
        });

        const receivers = await tx.conversationParticipant.findMany({
            where: {
                conversationId,
                userId: {
                    not: senderId,
                },
                leftAt: null,
            },
            select: {
                userId: true,
                user: {
                    select: userSelect,
                },
            },
        });

        return {
            message,
            receivers,
        };
    });

    await createMessageNotifications({
        conversationId,
        senderId,
        message: result.message,
        receivers: result.receivers,
    });

    return result.message;
};

const markConversationAsRead = async ({ userId, conversationId }) => {
    if (!userId) {
        throw new Error("Unauthorized user");
    }

    if (!conversationId) {
        throw new Error("conversationId is required");
    }

    await checkConversationParticipant(userId, conversationId);

    const now = new Date();

    await prisma.conversationParticipant.update({
        where: {
            conversationId_userId: {
                conversationId,
                userId,
            },
        },
        data: {
            lastReadAt: now,
        },
    });

    const unreadMessages = await prisma.message.findMany({
        where: {
            conversationId,
            senderId: {
                not: userId,
            },
            deletedAt: null,
            readReceipts: {
                none: {
                    userId,
                },
            },
        },
        select: {
            id: true,
        },
    });

    if (unreadMessages.length > 0) {
        await prisma.messageReadReceipt.createMany({
            data: unreadMessages.map((message) => ({
                messageId: message.id,
                userId,
                readAt: now,
            })),
            skipDuplicates: true,
        });
    }

    return {
        readAt: now,
        readMessagesCount: unreadMessages.length,
    };
};

module.exports = {
    createOrGetDirectConversation,
    getMyConversations,
    getConversationMessages,
    sendTextMessage,
    markConversationAsRead,
};