import { api } from "@/features/api interface/axios.interface";
import type {
    ApiResponse,
    ChatMessage,
    Conversation,
    GetMessagesResponse,
} from "../types/message.types";

export const getMyConversationsApi = async (): Promise<Conversation[]> => {
    const response = await api.get<ApiResponse<Conversation[]>>(
        "messages/conversations"
    );

    return response.data.data;
};

export const getConversationMessagesApi = async (
    conversationId: string,
    page = 1,
    limit = 30
): Promise<GetMessagesResponse> => {
    const response = await api.get<ApiResponse<GetMessagesResponse>>(
        `messages/conversations/${conversationId}/messages?page=${page}&limit=${limit}`
    );

    return response.data.data;
};

export const sendTextMessageApi = async (
    conversationId: string,
    body: string
): Promise<ChatMessage> => {
    const response = await api.post<ApiResponse<ChatMessage>>(
        `messages/conversations/${conversationId}/messages`,
        {
            body,
        }
    );

    return response.data.data;
};

export const markConversationAsReadApi = async (conversationId: string) => {
    const response = await api.patch(
        `messages/conversations/${conversationId}/read`
    );

    return response.data;
};

export const createOrGetDirectConversationApi = async (
    receiverId: string,
    contextType?: string,
    contextId?: string
): Promise<Conversation> => {
    const response = await api.post<ApiResponse<Conversation>>(
        "messages/conversations/direct",
        {
            receiverId,
            contextType,
            contextId,
        }
    );

    return response.data.data;
};