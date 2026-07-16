const notificationService = require("../services/notification.service");

const getUserId = (req) => {
    return req.user?.id || req.user?.userId;
};

exports.getMyNotifications = async (req, res) => {
    try {
        const userId = getUserId(req);
        const { page, limit, unreadOnly } = req.query;

        const result = await notificationService.getMyNotifications({
            userId,
            page,
            limit,
            unreadOnly: unreadOnly === "true",
        });

        return res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getUnreadNotificationCount = async (req, res) => {
    try {
        const userId = getUserId(req);

        const result = await notificationService.getUnreadNotificationCount(userId);

        return res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

exports.markNotificationAsRead = async (req, res) => {
    try {
        const userId = getUserId(req);
        const { notificationId } = req.params;

        const notification = await notificationService.markNotificationAsRead({
            userId,
            notificationId,
        });

        return res.status(200).json({
            success: true,
            message: "Notification marked as read",
            data: notification,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

exports.markAllNotificationsAsRead = async (req, res) => {
    try {
        const userId = getUserId(req);

        const result = await notificationService.markAllNotificationsAsRead(userId);

        return res.status(200).json({
            success: true,
            message: "All notifications marked as read",
            data: result,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

exports.deleteNotification = async (req, res) => {
    try {
        const userId = getUserId(req);
        const { notificationId } = req.params;

        const result = await notificationService.deleteNotification({
            userId,
            notificationId,
        });

        return res.status(200).json({
            success: true,
            message: "Notification deleted",
            data: result,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};