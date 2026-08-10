import { api, handleAxiosError } from "../../api interface/axios.interface";

export const sendAiAssistantMessage = async (prompt: string) => {
  try {
    const response = await api.post("/ai/chat", { question: prompt });
    return response.data.data.answer as string;
  } catch (error) {
    handleAxiosError(error);
  }
};
