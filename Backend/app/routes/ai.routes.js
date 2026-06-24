const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const aiController = require('../controllers/ai.controller');
const { petOwnerLimiter } = require('../middleware/rateLimiter');

const Router = express.Router();

Router
    .route('/assistant-chat')
    .post(petOwnerLimiter, authMiddleware.protect, aiController.handlePetAssistantQuery);

module.exports = Router;