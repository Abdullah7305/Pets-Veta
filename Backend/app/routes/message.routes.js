const express = require("express");
const router = express.Router();

const {
    createOrGetDirectConversation,
    getMyConversations,
    getConversationMessages,
    sendTextMessage,
    markConversationAsRead,
} = require("../controllers/message.controller");

const { protect } = require("../middleware/auth.middleware");

router.post("/conversations/direct", protect, createOrGetDirectConversation);

router.get("/conversations", protect, getMyConversations);

router.get("/conversations/:conversationId/messages", protect, getConversationMessages);

router.post("/conversations/:conversationId/messages", protect, sendTextMessage);

router.patch("/conversations/:conversationId/read", protect, markConversationAsRead);

module.exports = router;