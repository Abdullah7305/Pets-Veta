const express = require("express");
const router = express.Router();

const {
    getMyNotifications,
    getUnreadNotificationCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification,
} = require("../controllers/notification.controller");

const { protect } = require("../middleware/auth.middleware");

router.get("/", protect, getMyNotifications);

router.get("/unread-count", protect, getUnreadNotificationCount);

router.patch("/read-all", protect, markAllNotificationsAsRead);

router.patch("/:notificationId/read", protect, markNotificationAsRead);

router.delete("/:notificationId", protect, deleteNotification);

module.exports = router;