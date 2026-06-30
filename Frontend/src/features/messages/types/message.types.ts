export type MessageUser = {
    id: string;
    fullName?: string;
    name?: string;
    username: string;
    email: string;
    profileImageUrl?: string;
    userRole?: {
        role: string;
    };
};

export type MessageAttachment = {
    id: string;
    messageId: string;
    publicUrl: string;
    publicId?: string | null;
    fileName?: string | null;
    mimeType?: string | null;
    size?: number | null;
    createdAt: string;
};

export type MessageReadReceipt = {
    id: string;
    messageId: string;
    userId: string;
    readAt: string;
};

export type ChatMessage = {
    id: string;
    conversationId: string;
    senderId: string | null;
    type: "TEXT" | "IMAGE" | "FILE" | "SYSTEM";
    body: string | null;
    replyToId?: string | null;
    createdAt: string;
    updatedAt: string;
    editedAt?: string | null;
    deletedAt?: string | null;
    sender?: MessageUser | null;
    attachments?: MessageAttachment[];
    readReceipts?: MessageReadReceipt[];
};

export type ConversationParticipant = {
    id: string;
    conversationId: string;
    userId: string;
    isMuted: boolean;
    joinedAt: string;
    leftAt?: string | null;
    lastReadAt?: string | null;
    user: MessageUser;
};

export type Conversation = {
    id: string;
    type: "DIRECT" | "GROUP";
    title?: string | null;
    directKey?: string | null;
    contextType?: string | null;
    contextId?: string | null;
    createdById?: string | null;
    lastMessageId?: string | null;
    createdAt: string;
    updatedAt: string;
    participants: ConversationParticipant[];
    lastMessage?: ChatMessage | null;
};

export type GetMessagesResponse = {
    messages: ChatMessage[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
};

export type ApiResponse<T> = {
    success: boolean;
    message?: string;
    data: T;
};

export type SocketSendMessagePayload = {
    conversationId: string;
    body: string;
    replyToId?: string | null;
};

export type NewMessageSocketPayload = {
    conversationId: string;
    message: ChatMessage;
};

export type TypingSocketPayload = {
    conversationId: string;
    userId: string;
};

export type PresenceUserPayload = {
    userId: string;
    online: boolean;
};

export type OnlineUsersPayload = {
    users: string[];
};