import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
    ArrowLeft,
    CheckCheck,
    Circle,
    MessageCircle,
    Search,
    Send,
} from "lucide-react";

import { useAuth } from "@/features/Auth/hooks/authhook";
import Logo from "@/shared/components/Logo/Logo";

import {
    getConversationMessagesApi,
    getMyConversationsApi,
    markConversationAsReadApi,
} from "../api/message.api";

import {
    connectMessageSocket,
    disconnectMessageSocket,
    getMessageSocket,
} from "../socket/message.socket";

import type {
    ChatMessage,
    Conversation,
    MessageUser,
    NewMessageSocketPayload,
    OnlineUsersPayload,
    PresenceUserPayload,
    TypingSocketPayload,
} from "../types/message.types";

const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
};

const getUserName = (user?: {
    fullName?: string;
    name?: string;
    username?: string;
    email?: string;
}) => {
    return user?.fullName || user?.name || user?.username || user?.email || "User";
};

const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
};

const getProfileImageUrl = (user?: MessageUser | null) => {
    const imageUrl = user?.profileImageUrl?.trim();

    if (!imageUrl) return "";
    if (imageUrl === "Enter your Image") return "";

    return imageUrl;
};

const UserAvatar = ({
    user,
    name,
    className,
    children,
}: {
    user?: MessageUser | null;
    name: string;
    className: string;
    children?: ReactNode;
}) => {
    const profileImageUrl = getProfileImageUrl(user);

    return (
        <div
            className={`relative flex shrink-0 items-center justify-center overflow-visible rounded-full bg-[#dff3f2] text-sm font-bold text-[#178f95] ${className}`}
        >
            <span>{getInitial(name)}</span>

            {profileImageUrl && (
                <img
                    src={profileImageUrl}
                    alt={name}
                    className="absolute inset-0 h-full w-full rounded-full object-cover"
                    onError={(event) => {
                        event.currentTarget.remove();
                    }}
                />
            )}

            {children}
        </div>
    );
};

const isConversationUnread = (
    conversation: Conversation,
    currentUserId?: string
) => {
    if (!currentUserId || !conversation.lastMessage) return false;

    const lastMessage = conversation.lastMessage;

    if (lastMessage.senderId === currentUserId) return false;

    const currentParticipant = conversation.participants.find(
        (participant) => participant.userId === currentUserId
    );

    if (!currentParticipant?.lastReadAt) return true;

    return (
        new Date(lastMessage.createdAt).getTime() >
        new Date(currentParticipant.lastReadAt).getTime()
    );
};

const isMessageSeenByReceiver = (
    message: ChatMessage,
    conversation: Conversation | null,
    currentUserId?: string
) => {
    if (!currentUserId || !conversation) return false;

    if (message.senderId !== currentUserId) return false;

    const receiverParticipant = conversation.participants.find(
        (participant) => participant.userId !== currentUserId
    );

    if (!receiverParticipant?.lastReadAt) return false;

    return (
        new Date(receiverParticipant.lastReadAt).getTime() >=
        new Date(message.createdAt).getTime()
    );
};

const MessagesPage = () => {
    const navigate = useNavigate();
    const { user, isLoading } = useAuth();
    const [searchParams, setSearchParams] = useSearchParams();

    const currentUserId = user?.data?.id;
    const requestedConversationId = searchParams.get("conversationId");

    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConversation, setSelectedConversation] =
        useState<Conversation | null>(null);

    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [messageText, setMessageText] = useState("");
    const [conversationSearch, setConversationSearch] = useState("");

    const [loadingConversations, setLoadingConversations] = useState(true);
    const [loadingMessages, setLoadingMessages] = useState(false);

    const [socketConnected, setSocketConnected] = useState(false);
    const [onlineUserIds, setOnlineUserIds] = useState<string[]>([]);
    const [typingUserId, setTypingUserId] = useState<string | null>(null);

    const selectedConversationIdRef = useRef<string | null>(null);
    const typingTimerRef = useRef<number | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const messageListRef = useRef<HTMLDivElement | null>(null);

    const selectedConversationId = selectedConversation?.id || null;

    const activeConversation = useMemo(() => {
        if (!selectedConversation) return null;

        return (
            conversations.find(
                (conversation) => conversation.id === selectedConversation.id
            ) || selectedConversation
        );
    }, [conversations, selectedConversation]);

    const handlePageBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
            return;
        }

        navigate("/");
    };

    const handleCloseConversation = () => {
        setSelectedConversation(null);
        setTypingUserId(null);
        setSearchParams({});
    };

    const scrollToBottom = (behavior: ScrollBehavior = "auto") => {
        window.requestAnimationFrame(() => {
            const messageList = messageListRef.current;

            if (messageList) {
                messageList.scrollTop = messageList.scrollHeight;
            }

            messagesEndRef.current?.scrollIntoView({
                behavior,
                block: "end",
            });
        });
    };

    useEffect(() => {
        selectedConversationIdRef.current = selectedConversationId;
    }, [selectedConversationId]);

    const unreadChatsCount = useMemo(() => {
        return conversations.filter((conversation) =>
            isConversationUnread(conversation, currentUserId)
        ).length;
    }, [conversations, currentUserId]);

    const selectedOtherUser = useMemo(() => {
        if (!activeConversation || !currentUserId) return null;

        return (
            activeConversation.participants.find(
                (participant) => participant.userId !== currentUserId
            )?.user || activeConversation.participants[0]?.user
        );
    }, [activeConversation, currentUserId]);

    const selectedUserName = getUserName(selectedOtherUser || undefined);

    const filteredConversations = useMemo(() => {
        const search = conversationSearch.trim().toLowerCase();

        if (!search) return conversations;

        return conversations.filter((conversation) => {
            const otherUser =
                conversation.participants.find(
                    (participant) => participant.userId !== currentUserId
                )?.user || conversation.participants[0]?.user;

            return getUserName(otherUser).toLowerCase().includes(search);
        });
    }, [conversations, conversationSearch, currentUserId]);

    const markConversationReadInState = (conversationId: string) => {
        const readAt = new Date().toISOString();

        setConversations((prev) =>
            prev.map((conversation) => {
                if (conversation.id !== conversationId) return conversation;

                return {
                    ...conversation,
                    participants: conversation.participants.map((participant) =>
                        participant.userId === currentUserId
                            ? { ...participant, lastReadAt: readAt }
                            : participant
                    ),
                };
            })
        );
    };

    const refreshConversationsSilently = async () => {
        try {
            const data = await getMyConversationsApi();
            setConversations(data);
        } catch (error) {
            console.error("Failed to refresh conversations:", error);
        }
    };

    const fetchConversations = async () => {
        try {
            setLoadingConversations(true);

            const data = await getMyConversationsApi();

            setConversations(data);

            const requestedConversation = requestedConversationId
                ? data.find((conversation) => conversation.id === requestedConversationId)
                : null;

            if (requestedConversation) {
                setSelectedConversation(requestedConversation);
                return;
            }

            if (!selectedConversation && data.length > 0) {
                setSelectedConversation(data[0]);
            }
        } catch (error) {
            console.error("Failed to fetch conversations:", error);
        } finally {
            setLoadingConversations(false);
        }
    };

    const fetchMessages = async (conversationId: string) => {
        try {
            setLoadingMessages(true);

            const data = await getConversationMessagesApi(conversationId);

            setMessages(data.messages);

            await markConversationAsReadApi(conversationId);
            markConversationReadInState(conversationId);

            scrollToBottom("auto");
        } catch (error) {
            console.error("Failed to fetch messages:", error);
        } finally {
            setLoadingMessages(false);
        }
    };

    useEffect(() => {
        if (!isLoading && currentUserId) {
            fetchConversations();
        }
    }, [isLoading, currentUserId, requestedConversationId]);

    useEffect(() => {
        if (!currentUserId) return;

        const intervalId = window.setInterval(() => {
            void refreshConversationsSilently();
        }, 10000);

        return () => {
            window.clearInterval(intervalId);
        };
    }, [currentUserId]);

    useEffect(() => {
        if (!currentUserId) return;

        const socket = connectMessageSocket();

        const handleConnect = () => {
            setSocketConnected(true);
        };

        const handleDisconnect = () => {
            setSocketConnected(false);
        };

        const handleOnlineUsers = (payload: OnlineUsersPayload) => {
            setOnlineUserIds(payload.users || []);
        };

        const handleUserOnline = (payload: PresenceUserPayload) => {
            setOnlineUserIds((prev) => {
                if (prev.includes(payload.userId)) return prev;
                return [...prev, payload.userId];
            });
        };

        const handleUserOffline = (payload: PresenceUserPayload) => {
            setOnlineUserIds((prev) => prev.filter((id) => id !== payload.userId));
        };

        const handleNewMessage = (payload: NewMessageSocketPayload) => {
            setConversations((prev) => {
                const conversationExists = prev.some(
                    (conversation) => conversation.id === payload.conversationId
                );

                if (!conversationExists) {
                    void fetchConversations();
                    return prev;
                }

                const updated = prev.map((conversation) =>
                    conversation.id === payload.conversationId
                        ? {
                            ...conversation,
                            lastMessage: payload.message,
                            lastMessageId: payload.message.id,
                            updatedAt: payload.message.createdAt,
                        }
                        : conversation
                );

                return updated.sort(
                    (a, b) =>
                        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
                );
            });

            if (payload.conversationId === selectedConversationIdRef.current) {
                setMessages((prev) => {
                    const exists = prev.some((message) => message.id === payload.message.id);

                    if (exists) return prev;

                    return [...prev, payload.message];
                });

                scrollToBottom("smooth");

                markConversationAsReadApi(payload.conversationId)
                    .then(() => {
                        markConversationReadInState(payload.conversationId);
                        void refreshConversationsSilently();
                    })
                    .catch((error) => {
                        console.error("Failed to mark read:", error);
                    });
            }
        };

        const handleTypingStart = (payload: TypingSocketPayload) => {
            if (
                payload.conversationId === selectedConversationIdRef.current &&
                payload.userId !== currentUserId
            ) {
                setTypingUserId(payload.userId);
                scrollToBottom("smooth");
            }
        };

        const handleTypingStop = (payload: TypingSocketPayload) => {
            if (
                payload.conversationId === selectedConversationIdRef.current &&
                payload.userId !== currentUserId
            ) {
                setTypingUserId(null);
            }
        };

        socket.on("connect", handleConnect);
        socket.on("disconnect", handleDisconnect);

        socket.on("presence:online-users", handleOnlineUsers);
        socket.on("presence:user-online", handleUserOnline);
        socket.on("presence:user-offline", handleUserOffline);

        socket.on("message:new", handleNewMessage);
        socket.on("typing:start", handleTypingStart);
        socket.on("typing:stop", handleTypingStop);

        if (socket.connected) {
            setSocketConnected(true);
        }

        return () => {
            socket.off("connect", handleConnect);
            socket.off("disconnect", handleDisconnect);

            socket.off("presence:online-users", handleOnlineUsers);
            socket.off("presence:user-online", handleUserOnline);
            socket.off("presence:user-offline", handleUserOffline);

            socket.off("message:new", handleNewMessage);
            socket.off("typing:start", handleTypingStart);
            socket.off("typing:stop", handleTypingStop);

            disconnectMessageSocket();
        };
    }, [currentUserId]);

    useEffect(() => {
        if (!selectedConversationId) return;

        fetchMessages(selectedConversationId);

        const socket = getMessageSocket();

        socket.emit(
            "conversation:join",
            {
                conversationId: selectedConversationId,
            },
            (response: { success: boolean; message?: string }) => {
                if (!response.success) {
                    console.error("Conversation join failed:", response.message);
                }
            }
        );

        return () => {
            socket.emit("conversation:leave", {
                conversationId: selectedConversationId,
            });
        };
    }, [selectedConversationId]);

    useEffect(() => {
        if (!selectedConversationId) return;

        scrollToBottom("auto");
    }, [selectedConversationId, messages.length]);

    useEffect(() => {
        if (!typingUserId) return;

        scrollToBottom("smooth");
    }, [typingUserId]);

    const handleSelectConversation = (conversation: Conversation) => {
        setSelectedConversation(conversation);
        setTypingUserId(null);
        setSearchParams({ conversationId: conversation.id });
    };

    const handleTypingChange = (value: string) => {
        setMessageText(value);

        if (!selectedConversationId) return;

        const socket = getMessageSocket();

        socket.emit("typing:start", {
            conversationId: selectedConversationId,
        });

        if (typingTimerRef.current) {
            window.clearTimeout(typingTimerRef.current);
        }

        typingTimerRef.current = window.setTimeout(() => {
            socket.emit("typing:stop", {
                conversationId: selectedConversationId,
            });
        }, 800);
    };

    const handleSendMessage = () => {
        const cleanMessage = messageText.trim();

        if (!selectedConversationId || !cleanMessage) return;

        const socket = getMessageSocket();

        socket.emit(
            "message:send",
            {
                conversationId: selectedConversationId,
                body: cleanMessage,
            },
            (response: { success: boolean; message?: string }) => {
                if (!response.success) {
                    console.error("Message send failed:", response.message);
                }
            }
        );

        socket.emit("typing:stop", {
            conversationId: selectedConversationId,
        });

        setMessageText("");
        setTypingUserId(null);
        scrollToBottom("smooth");
    };

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-[#FFF8F4] text-sm font-medium text-slate-500">
                Loading messages...
            </div>
        );
    }

    if (!currentUserId) {
        return (
            <div className="flex h-screen items-center justify-center bg-[#FFF8F4] px-4">
                <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl shadow-teal-100/40">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-[#178f95]">
                        <MessageCircle size={28} />
                    </div>

                    <h1 className="mt-5 text-2xl font-bold text-slate-950">
                        Login Required
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Please login first to use messages.
                    </p>

                    <a
                        href="/login"
                        className="mt-6 inline-flex rounded-xl bg-[#178f95] px-6 py-3 text-sm font-semibold text-white hover:bg-[#12757a]"
                    >
                        Go to Login
                    </a>
                </div>
            </div>
        );
    }

    return (
        <main className="h-screen overflow-hidden bg-[#FFF8F4] p-4">
            <div className="mx-auto flex h-full max-w-6xl overflow-hidden rounded-3xl border border-teal-100 bg-white shadow-xl shadow-teal-100/50">
                <aside
                    className={`flex h-full w-full shrink-0 flex-col border-r border-slate-100 bg-white lg:flex lg:w-[340px] ${selectedConversation ? "hidden" : "flex"
                        }`}
                >
                    <div className="shrink-0 border-b border-slate-100 px-5 py-4">
                        <button
                            type="button"
                            onClick={handlePageBack}
                            className="mb-4 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-200"
                        >
                            <ArrowLeft size={15} />
                            Back
                        </button>

                        <div className="min-w-0 [&_button]:max-w-full [&_h1]:text-lg [&_p]:text-xs [&_p]:text-slate-500">
                            <Logo />
                        </div>

                        <div className="mt-4 flex items-center gap-2">
                            <h1 className="text-2xl font-bold text-slate-950">Messages</h1>

                            {unreadChatsCount > 0 && (
                                <span className="inline-flex min-w-[24px] items-center justify-center rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white shadow-sm">
                                    {unreadChatsCount > 99 ? "99+" : unreadChatsCount}
                                </span>
                            )}
                        </div>

                        <div className="mt-4 flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3">
                            <Search size={17} className="shrink-0 text-slate-400" />

                            <input
                                value={conversationSearch}
                                onChange={(event) => setConversationSearch(event.target.value)}
                                placeholder="Search..."
                                className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                            />
                        </div>
                    </div>

                    <div className="min-h-0 flex-1 overflow-y-auto">
                        {loadingConversations ? (
                            <div className="p-5 text-sm text-slate-500">
                                Loading conversations...
                            </div>
                        ) : filteredConversations.length === 0 ? (
                            <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50 text-[#178f95]">
                                    <MessageCircle size={30} />
                                </div>

                                <h2 className="mt-4 text-lg font-bold text-slate-900">
                                    No conversation
                                </h2>

                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    Start chat from marketplace, seller, doctor, or Postman API.
                                </p>
                            </div>
                        ) : (
                            <div className="divide-y divide-slate-100">
                                {filteredConversations.map((conversation) => {
                                    const otherUser =
                                        conversation.participants.find(
                                            (participant) => participant.userId !== currentUserId
                                        )?.user || conversation.participants[0]?.user;

                                    const name = getUserName(otherUser);
                                    const online = otherUser
                                        ? onlineUserIds.includes(otherUser.id)
                                        : false;
                                    const active = selectedConversation?.id === conversation.id;
                                    const unread = isConversationUnread(conversation, currentUserId);

                                    return (
                                        <button
                                            key={conversation.id}
                                            type="button"
                                            onClick={() => handleSelectConversation(conversation)}
                                            className={`flex w-full gap-3 px-4 py-3 text-left transition ${active ? "bg-[#e8f7f6]" : "bg-white hover:bg-slate-50"
                                                }`}
                                        >
                                            <UserAvatar
                                                user={otherUser}
                                                name={name}
                                                className="h-12 w-12"
                                            >
                                                <span
                                                    className={`absolute bottom-0 right-0 z-10 h-3 w-3 rounded-full border-2 border-white ${online ? "bg-emerald-500" : "bg-slate-300"
                                                        }`}
                                                />

                                                {unread && (
                                                    <span className="absolute -right-1 -top-1 z-10 h-3.5 w-3.5 rounded-full bg-red-500 ring-2 ring-white" />
                                                )}
                                            </UserAvatar>

                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center justify-between gap-2">
                                                    <h3
                                                        className={`truncate text-sm ${unread
                                                                ? "font-extrabold text-slate-950"
                                                                : "font-bold text-slate-900"
                                                            }`}
                                                    >
                                                        {name}
                                                    </h3>

                                                    <div className="flex shrink-0 items-center gap-2">
                                                        {conversation.lastMessage?.createdAt && (
                                                            <span
                                                                className={`text-[11px] ${unread
                                                                        ? "font-bold text-red-500"
                                                                        : "text-slate-400"
                                                                    }`}
                                                            >
                                                                {formatTime(conversation.lastMessage.createdAt)}
                                                            </span>
                                                        )}

                                                        {unread && (
                                                            <span className="inline-flex min-w-[18px] items-center justify-center rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-bold leading-none text-white">
                                                                1
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                <p
                                                    className={`mt-1 truncate text-sm ${unread
                                                            ? "font-semibold text-slate-800"
                                                            : "text-slate-500"
                                                        }`}
                                                >
                                                    {conversation.lastMessage?.body || "No messages yet"}
                                                </p>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </aside>

                <section
                    className={`flex h-full min-w-0 flex-1 flex-col ${selectedConversation ? "flex" : "hidden lg:flex"
                        }`}
                >
                    {selectedConversation ? (
                        <>
                            <header className="flex h-[72px] shrink-0 items-center justify-between border-b border-slate-100 bg-white px-4">
                                <div className="flex min-w-0 items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={handleCloseConversation}
                                        className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-700 lg:hidden"
                                        aria-label="Back to conversations"
                                    >
                                        <ArrowLeft size={17} />
                                    </button>

                                    <UserAvatar
                                        user={selectedOtherUser}
                                        name={selectedUserName}
                                        className="h-11 w-11"
                                    />

                                    <div className="min-w-0">
                                        <h2 className="truncate text-base font-bold text-slate-950">
                                            {selectedUserName}
                                        </h2>

                                        <div className="mt-0.5 flex items-center gap-1.5 text-xs font-medium text-slate-500">
                                            <Circle
                                                size={8}
                                                className={
                                                    selectedOtherUser &&
                                                        onlineUserIds.includes(selectedOtherUser.id)
                                                        ? "fill-emerald-500 text-emerald-500"
                                                        : "fill-slate-300 text-slate-300"
                                                }
                                            />

                                            {selectedOtherUser &&
                                                onlineUserIds.includes(selectedOtherUser.id)
                                                ? "Online"
                                                : "Offline"}
                                        </div>
                                    </div>
                                </div>
                            </header>

                            <div
                                ref={messageListRef}
                                className="flex-1 overflow-y-auto bg-[#f8fbfb] px-4 py-5"
                            >
                                {loadingMessages ? (
                                    <div className="flex h-full items-center justify-center text-sm text-slate-500">
                                        Loading messages...
                                    </div>
                                ) : messages.length === 0 ? (
                                    <div className="flex h-full flex-col items-center justify-center text-center">
                                        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-[#178f95] shadow-sm">
                                            <MessageCircle size={38} />
                                        </div>

                                        <h2 className="mt-5 text-xl font-bold text-slate-950">
                                            No messages yet
                                        </h2>

                                        <p className="mt-2 text-sm text-slate-500">
                                            Send your first message to test real-time chat.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="mx-auto flex max-w-3xl flex-col gap-3">
                                        {messages.map((message) => {
                                            const isMine = message.senderId === currentUserId;
                                            const seen = isMessageSeenByReceiver(
                                                message,
                                                activeConversation,
                                                currentUserId
                                            );

                                            return (
                                                <div
                                                    key={message.id}
                                                    className={`flex ${isMine ? "justify-end" : "justify-start"
                                                        }`}
                                                >
                                                    <div
                                                        className={`max-w-[75%] rounded-2xl px-4 py-2 shadow-sm ${isMine
                                                                ? "rounded-br-sm bg-[#178f95] text-white"
                                                                : "rounded-bl-sm bg-white text-slate-800"
                                                            }`}
                                                    >
                                                        <p className="whitespace-pre-wrap text-sm leading-6">
                                                            {message.body}
                                                        </p>

                                                        <div
                                                            className={`mt-1 flex items-center justify-end gap-1 text-[11px] ${isMine ? "text-white/75" : "text-slate-400"
                                                                }`}
                                                        >
                                                            <span>{formatTime(message.createdAt)}</span>

                                                            {isMine && (
                                                                <CheckCheck
                                                                    size={14}
                                                                    strokeWidth={2.6}
                                                                    className={
                                                                        seen ? "text-sky-300" : "text-white/70"
                                                                    }
                                                                />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}

                                        {typingUserId && (
                                            <div className="flex justify-start">
                                                <div className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-500 shadow-sm">
                                                    Typing...
                                                </div>
                                            </div>
                                        )}

                                        <div ref={messagesEndRef} />
                                    </div>
                                )}
                            </div>

                            <footer className="h-[84px] shrink-0 border-t border-slate-100 bg-white px-4 py-4">
                                <div className="mx-auto flex max-w-3xl items-center gap-3">
                                    <input
                                        value={messageText}
                                        onChange={(event) => handleTypingChange(event.target.value)}
                                        onKeyDown={(event) => {
                                            if (event.key === "Enter") {
                                                event.preventDefault();
                                                handleSendMessage();
                                            }
                                        }}
                                        placeholder="Write a message..."
                                        className="h-12 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#178f95] focus:bg-white focus:ring-4 focus:ring-[#178f95]/10"
                                    />

                                    <button
                                        type="button"
                                        onClick={handleSendMessage}
                                        disabled={!messageText.trim() || !socketConnected}
                                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#178f95] text-white transition hover:bg-[#12757a] disabled:cursor-not-allowed disabled:bg-slate-300"
                                    >
                                        <Send size={18} />
                                    </button>
                                </div>
                            </footer>
                        </>
                    ) : (
                        <div className="flex h-full flex-col items-center justify-center bg-[#f8fbfb] text-center">
                            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-[#178f95] shadow-sm">
                                <MessageCircle size={40} />
                            </div>

                            <h2 className="mt-5 text-2xl font-bold text-slate-950">
                                Select conversation
                            </h2>

                            <p className="mt-2 text-sm text-slate-500">
                                Choose a chat from left side.
                            </p>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
};

export default MessagesPage;