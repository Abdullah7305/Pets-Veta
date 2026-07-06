export type NotificationType =
    | "MESSAGE"
    | "ORDER"
    | "LOW_STOCK"
    | "APPOINTMENT"
    | "PAYMENT"
    | "SYSTEM";

export type NotificationItem = {
    id: string;
    userId: string;
    type: NotificationType;
    title: string;
    message: string;
    link?: string | null;
    isRead: boolean;
    metadata?: Record<string, unknown> | null;
    createdAt: string;
    updatedAt: string;
};

export type NotificationsPagination = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
};

export type GetNotificationsResponse = {
    success: boolean;
    data: {
        notifications: NotificationItem[];
        unreadCount: number;
        pagination: NotificationsPagination;
    };
};

export type GetUnreadCountResponse = {
    success: boolean;
    data: {
        unreadCount: number;
    };
};

export type MarkNotificationReadResponse = {
    success: boolean;
    message: string;
    data: NotificationItem;
};

export type MarkAllNotificationsReadResponse = {
    success: boolean;
    message: string;
    data: {
        updatedCount: number;
    };
};

export type DeleteNotificationResponse = {
    success: boolean;
    message: string;
    data: {
        deleted: boolean;
    };
};