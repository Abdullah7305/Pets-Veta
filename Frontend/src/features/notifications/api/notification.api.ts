import { api } from "@/features/api interface/axios.interface";
import type {
    DeleteNotificationResponse,
    GetNotificationsResponse,
    GetUnreadCountResponse,
    MarkAllNotificationsReadResponse,
    MarkNotificationReadResponse,
} from "../types/notification.types";

export const getMyNotifications = async ({
    page = 1,
    limit = 10,
    unreadOnly = false,
}: {
    page?: number;
    limit?: number;
    unreadOnly?: boolean;
}) => {
    const response = await api.get<GetNotificationsResponse>("/notifications", {
        params: {
            page,
            limit,
            unreadOnly,
        },
    });

    return response.data.data;
};

export const getUnreadNotificationCount = async () => {
    const response =
        await api.get<GetUnreadCountResponse>("/notifications/unread-count");

    return response.data.data;
};

export const markNotificationAsRead = async (notificationId: string) => {
    const response = await api.patch<MarkNotificationReadResponse>(
        `/notifications/${notificationId}/read`,
    );

    return response.data.data;
};

export const markAllNotificationsAsRead = async () => {
    const response =
        await api.patch<MarkAllNotificationsReadResponse>(
            "/notifications/read-all",
        );

    return response.data.data;
};

export const deleteNotification = async (notificationId: string) => {
    const response = await api.delete<DeleteNotificationResponse>(
        `/notifications/${notificationId}`,
    );

    return response.data.data;
};