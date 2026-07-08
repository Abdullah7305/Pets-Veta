const prisma = require("../config/prisma");

const emitNotificationToUser = (notification) => {
    try {
        const { getIO } = require("../socket/socket");
        const io = getIO();

        io.to(`user:${notification.userId}`).emit("notification:new", {
            notification,
        });

        io.to(`user:${notification.userId}`).emit("notification:unread-changed", {
            userId: notification.userId,
        });
    } catch (error) {
        console.log("[Notification Socket Emit Skipped]", error.message);
    }
};

const createNotification = async ({
    userId,
    type = "SYSTEM",
    title,
    message,
    link,
    metadata,
    prismaClient,
    shouldEmit = true,
}) => {
    if (!userId) {
        throw new Error("userId is required for notification");
    }

    if (!title || !title.trim()) {
        throw new Error("Notification title is required");
    }

    if (!message || !message.trim()) {
        throw new Error("Notification message is required");
    }

    const db = prismaClient || prisma;

    const notification = await db.notification.create({
        data: {
            userId,
            type,
            title: title.trim(),
            message: message.trim(),
            link: link || null,
            metadata: metadata || undefined,
        },
    });

    if (shouldEmit) {
        emitNotificationToUser(notification);
    }

    return notification;
};

const createManyNotifications = async ({
    notifications,
    prismaClient,
    shouldEmit = true,
}) => {
    if (!Array.isArray(notifications) || notifications.length === 0) {
        return [];
    }

    const createdNotifications = [];

    for (const notificationData of notifications) {
        const notification = await createNotification({
            ...notificationData,
            prismaClient,
            shouldEmit,
        });

        createdNotifications.push(notification);
    }

    return createdNotifications;
};

const getMyNotifications = async ({
    userId,
    page = 1,
    limit = 20,
    unreadOnly = false,
}) => {
    if (!userId) {
        throw new Error("Unauthorized user");
    }

    const currentPage = Number(page) || 1;
    const take = Number(limit) || 20;
    const skip = (currentPage - 1) * take;

    const where = {
        userId,
        ...(unreadOnly ? { isRead: false } : {}),
    };

    const [notifications, total, unreadCount] = await Promise.all([
        prisma.notification.findMany({
            where,
            skip,
            take,
            orderBy: {
                createdAt: "desc",
            },
        }),
        prisma.notification.count({
            where,
        }),
        prisma.notification.count({
            where: {
                userId,
                isRead: false,
            },
        }),
    ]);

    return {
        notifications,
        unreadCount,
        pagination: {
            page: currentPage,
            limit: take,
            total,
            totalPages: Math.ceil(total / take),
        },
    };
};

const getUnreadNotificationCount = async (userId) => {
    if (!userId) {
        throw new Error("Unauthorized user");
    }

    const unreadCount = await prisma.notification.count({
        where: {
            userId,
            isRead: false,
        },
    });

    return {
        unreadCount,
    };
};

const markNotificationAsRead = async ({ userId, notificationId }) => {
    if (!userId) {
        throw new Error("Unauthorized user");
    }

    if (!notificationId) {
        throw new Error("notificationId is required");
    }

    const notification = await prisma.notification.findFirst({
        where: {
            id: notificationId,
            userId,
        },
    });

    if (!notification) {
        throw new Error("Notification not found");
    }

    const updatedNotification = await prisma.notification.update({
        where: {
            id: notificationId,
        },
        data: {
            isRead: true,
        },
    });

    return updatedNotification;
};

const markAllNotificationsAsRead = async (userId) => {
    if (!userId) {
        throw new Error("Unauthorized user");
    }

    const result = await prisma.notification.updateMany({
        where: {
            userId,
            isRead: false,
        },
        data: {
            isRead: true,
        },
    });

    return {
        updatedCount: result.count,
    };
};

const deleteNotification = async ({ userId, notificationId }) => {
    if (!userId) {
        throw new Error("Unauthorized user");
    }

    if (!notificationId) {
        throw new Error("notificationId is required");
    }

    const notification = await prisma.notification.findFirst({
        where: {
            id: notificationId,
            userId,
        },
    });

    if (!notification) {
        throw new Error("Notification not found");
    }

    await prisma.notification.delete({
        where: {
            id: notificationId,
        },
    });

    return {
        deleted: true,
    };
};

module.exports = {
    createNotification,
    createManyNotifications,
    getMyNotifications,
    getUnreadNotificationCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification,
    emitNotificationToUser,
};