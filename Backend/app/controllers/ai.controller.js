const catchAsync = require('../utils/CatchAsync');
const requireFields = require('../utils/validateRequest');
const sendResponse = require('../utils/SendResponse');
const aiServices = require('../services/ai.services');

const handlePetAssistantQuery = catchAsync(async (req, res) => {
    requireFields(['prompt'], req.body);
    const { prompt } = req.body;

    const aiResponse = await aiServices.generatePetAssistantResponse(prompt.trim());

    return sendResponse(res, 200, 'AI response generated successfully', {
        response: aiResponse
    });
});

module.exports = { handlePetAssistantQuery };