import { io, type Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getMessageSocket = () => {
    if (!socket) {
        socket = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:8000", {
            withCredentials: true,
            autoConnect: false,
            transports: ["websocket", "polling"],
        });

        socket.on("connect_error", (error) => {
            console.log("Socket connection failed:", error.message);
        });
    }

    return socket;
};

export const connectMessageSocket = () => {
    const socketInstance = getMessageSocket();

    if (!socketInstance.connected) {
        socketInstance.connect();
    }

    return socketInstance;
};

export const disconnectMessageSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};
