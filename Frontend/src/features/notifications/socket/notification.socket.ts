import { connectMessageSocket } from "@/features/messages/socket/message.socket";
import type { NotificationItem } from "../types/notification.types";

export type NotificationNewPayload = {
    notification: NotificationItem;
};

export type NotificationUnreadChangedPayload = {
    userId: string;
};

export const connectNotificationSocket = () => {
    return connectMessageSocket();
};