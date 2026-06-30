import { useEffect, useMemo, useRef, useState } from "react";
import {
    ArrowLeft,
    CheckCheck,
    Circle,
    MessageCircle,
    Search,
    Send,
    Wifi,
    WifiOff,
} from "lucide-react";

import { useAuth } from "@/features/Auth/hooks/authhook";

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

const MessagesPage = () => {
    const { user, isLoading } = useAuth();

    const currentUserId = user?.data?.id;

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

    const selectedConversationId = selectedConversation?.id || null;

    useEffect(() => {
        selectedConversationIdRef.current = selectedConversationId;
    }, [selectedConversationId]);

    const selectedOtherUser = useMemo(() => {
        if (!selectedConversation || !currentUserId) return null;

        return (
            selectedConversation.participants.find(
                (participant) => participant.userId !== currentUserId
            )?.user || selectedConversation.participants[0]?.user
        );
    }, [selectedConversation, currentUserId]);

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

    const fetchConversations = async () => {
        try {
            setLoadingConversations(true);

            const data = await getMyConversationsApi();

            setConversations(data);

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
    }, [isLoading, currentUserId]);

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

                markConversationAsReadApi(payload.conversationId).catch((error) => {
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
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, typingUserId]);

    const handleSelectConversation = (conversation: Conversation) => {
        setSelectedConversation(conversation);
        setTypingUserId(null);
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
                    className={`h-full w-full shrink-0 border-r border-slate-100 bg-white lg:block lg:w-[340px] ${selectedConversation ? "hidden" : "block"
                        }`}
                >
                    <div className="h-[130px] border-b border-slate-100 px-5 py-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#178f95]">
                                    Pets Veta
                                </p>
                                <h1 className="mt-1 text-2xl font-bold text-slate-950">
                                    Messages
                                </h1>
                            </div>

                            <div
                                className={`flex h-10 w-10 items-center justify-center rounded-full ${socketConnected
                                        ? "bg-emerald-50 text-emerald-600"
                                        : "bg-red-50 text-red-500"
                                    }`}
                            >
                                {socketConnected ? <Wifi size={18} /> : <WifiOff size={18} />}
                            </div>
                        </div>

                        <div className="mt-4 flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3">
                            <Search size={17} className="text-slate-400" />
                            <input
                                value={conversationSearch}
                                onChange={(event) => setConversationSearch(event.target.value)}
                                placeholder="Search..."
                                className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                            />
                        </div>
                    </div>

                    <div className="h-[calc(100%-130px)] overflow-y-auto">
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
                            filteredConversations.map((conversation) => {
                                const otherUser =
                                    conversation.participants.find(
                                        (participant) => participant.userId !== currentUserId
                                    )?.user || conversation.participants[0]?.user;

                                const name = getUserName(otherUser);
                                const online = otherUser
                                    ? onlineUserIds.includes(otherUser.id)
                                    : false;
                                const active = selectedConversation?.id === conversation.id;

                                return (
                                    <button
                                        key={conversation.id}
                                        type="button"
                                        onClick={() => handleSelectConversation(conversation)}
                                        className={`flex w-full gap-3 border-b border-slate-100 px-4 py-3 text-left transition ${active ? "bg-[#e8f7f6]" : "bg-white hover:bg-slate-50"
                                            }`}
                                    >
                                        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#dff3f2] text-sm font-bold text-[#178f95]">
                                            {getInitial(name)}
                                            <span
                                                className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${online ? "bg-emerald-500" : "bg-slate-300"
                                                    }`}
                                            />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center justify-between gap-2">
                                                <h3 className="truncate text-sm font-bold text-slate-900">
                                                    {name}
                                                </h3>

                                                {conversation.lastMessage?.createdAt && (
                                                    <span className="shrink-0 text-[11px] text-slate-400">
                                                        {formatTime(conversation.lastMessage.createdAt)}
                                                    </span>
                                                )}
                                            </div>

                                            <p className="mt-1 truncate text-sm text-slate-500">
                                                {conversation.lastMessage?.body || "No messages yet"}
                                            </p>
                                        </div>
                                    </button>
                                );
                            })
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
                                        onClick={() => setSelectedConversation(null)}
                                        className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-700 lg:hidden"
                                    >
                                        <ArrowLeft size={17} />
                                    </button>

                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#dff3f2] text-sm font-bold text-[#178f95]">
                                        {getInitial(selectedUserName)}
                                    </div>

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

                            <div className="flex-1 overflow-y-auto bg-[#f8fbfb] px-4 py-5">
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
                                                            {isMine && <CheckCheck size={13} />}
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