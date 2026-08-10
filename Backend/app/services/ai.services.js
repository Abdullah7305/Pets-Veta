const { GoogleGenAI } = require('@google/genai');
const AppError = require('../utils/AppError');
const GEMINI_CONFIG = require('../config/gemini.config');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const generatePetAssistantResponse = async (prompt) => {
    try {
        const response = await ai.models.generateContent({
            model: GEMINI_CONFIG.model,
            contents: prompt,
            config: GEMINI_CONFIG.config,
        });

        return response.text;
    } catch (error) {
        console.error("Error in aiService:", error);
        if (error.status === 429 || error.status === 503) {
            throw new AppError("The AI assistant is currently busy. Please try again in a moment.", error.status);
        }
        throw new AppError("Failed to communicate with the AI assistant service.", 500);
    }
};

module.exports = { generatePetAssistantResponse };

