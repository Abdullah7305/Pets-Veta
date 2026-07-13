const messageService = require("../services/message.service");

const getUserId = (req) => {
    return req.user?.id || req.user?.userId;
};

exports.createOrGetDirectConversation = async (req, res) => {
    try {
        const currentUserId = getUserId(req);
        const { receiverId, contextType, contextId } = req.body;

        const conversation = await messageService.createOrGetDirectConversation({
            currentUserId,
            receiverId,
            contextType,
            contextId,
        });

        return res.status(200).json({
            success: true,
            message: "Conversation ready",
            data: conversation,
        });
    } catch (error) {
        console.log("Error is ",error)
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getMyConversations = async (req, res) => {
    try {
        const userId = getUserId(req);

        const conversations = await messageService.getMyConversations(userId);

        return res.status(200).json({
            success: true,
            data: conversations,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getConversationMessages = async (req, res) => {
    try {
        const userId = getUserId(req);
        const { conversationId } = req.params;
        const { page, limit } = req.query;

        const result = await messageService.getConversationMessages({
            userId,
            conversationId,
            page,
            limit,
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

exports.sendTextMessage = async (req, res) => {
    try {
        const senderId = getUserId(req);
        const { conversationId } = req.params;
        const { body, replyToId } = req.body;

        const message = await messageService.sendTextMessage({
            senderId,
            conversationId,
            body,
            replyToId,
        });

        return res.status(201).json({
            success: true,
            message: "Message sent successfully",
            data: message,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

exports.markConversationAsRead = async (req, res) => {
    try {
        const userId = getUserId(req);
        const { conversationId } = req.params;

        const result = await messageService.markConversationAsRead({
            userId,
            conversationId,
        });

        return res.status(200).json({
            success: true,
            message: "Conversation marked as read",
            data: result,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};