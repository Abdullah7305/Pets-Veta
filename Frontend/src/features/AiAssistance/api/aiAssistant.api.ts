import { api, handleAxiosError } from "../../api interface/axios.interface";

export const sendAiAssistantMessage = async (prompt: string) => {
    try {
        const response = await api.post("/ai/assistant-chat", { prompt });
        return response.data.data.response as string;
    } catch (error) {
        handleAxiosError(error);
    }
};