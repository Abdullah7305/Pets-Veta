import {
    useEffect,
    useRef,
    useState,
    type KeyboardEvent,
    type ReactNode,
} from "react";
import { FaPaperPlane, FaPaw } from "react-icons/fa";

import Button from "../../../shared/components/Button";
import type { AiMessage } from "../types/aiAssistance.types";
import { sendAiAssistantMessage } from "../api/aiAssistant.api";

const getHeadingEmoji = (heading: string) => {
    const lowerHeading = heading.toLowerCase();

    if (
        lowerHeading.includes("symptom") ||
        lowerHeading.includes("condition") ||
        lowerHeading.includes("health")
    ) {
        return "🩺";
    }

    if (
        lowerHeading.includes("recommend") ||
        lowerHeading.includes("suggest") ||
        lowerHeading.includes("advice")
    ) {
        return "✅";
    }

    if (
        lowerHeading.includes("warning") ||
        lowerHeading.includes("emergency") ||
        lowerHeading.includes("urgent") ||
        lowerHeading.includes("danger") ||
        lowerHeading.includes("immediate")
    ) {
        return "⚠️";
    }

    if (
        lowerHeading.includes("food") ||
        lowerHeading.includes("nutrition") ||
        lowerHeading.includes("eat") ||
        lowerHeading.includes("diet")
    ) {
        return "🥣";
    }

    if (
        lowerHeading.includes("doctor") ||
        lowerHeading.includes("vet") ||
        lowerHeading.includes("appointment")
    ) {
        return "👨‍⚕️";
    }

    if (
        lowerHeading.includes("care") ||
        lowerHeading.includes("home") ||
        lowerHeading.includes("steps")
    ) {
        return "🐾";
    }

    return "✨";
};

const hasEmoji = (text: string) => {
    return /[\u{1F300}-\u{1FAFF}]/u.test(text);
};

const normalizeAiText = (text: string) => {
    return text
        .replace(/\\n/g, "\n")
        .replace(/\r\n/g, "\n")
        .replace(/\s*\*\*([^*]+)\*\*:?\s*/g, "\n\n**$1**\n")
        .replace(/\n{3,}/g, "\n\n")
        .trim();
};

const renderInlineMarkdown = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*|\*[^*\n]+\*)/g);

    return parts.map((part, index) => {
        const isDoubleStarBold = part.startsWith("**") && part.endsWith("**");
        const isSingleStarBold =
            part.startsWith("*") &&
            part.endsWith("*") &&
            !part.startsWith("**") &&
            !part.endsWith("**");

        if (isDoubleStarBold || isSingleStarBold) {
            const boldText = part.replace(/\*\*/g, "").replace(/\*/g, "");

            return (
                <strong key={`${part}-${index}`} className="font-black text-[#07182c]">
                    {boldText}
                </strong>
            );
        }

        return <span key={`${part}-${index}`}>{part}</span>;
    });
};

const renderAiMessage = (text: string): ReactNode => {
    const normalizedText = normalizeAiText(text);
    const lines = normalizedText.split("\n").filter((line) => line.trim());

    return (
        <div className="space-y-3">
            {lines.map((line, index) => {
                const trimmedLine = line.trim();
                const boldHeadingMatch = trimmedLine.match(/^\*\*([^*]+)\*\*$/);
                const bulletMatch = trimmedLine.match(/^[-*]\s+(.+)$/);
                const numberedMatch = trimmedLine.match(/^(\d+)\.\s+(.+)$/);

                if (boldHeadingMatch) {
                    const heading = boldHeadingMatch[1].trim();
                    const emoji = hasEmoji(heading) ? "" : `${getHeadingEmoji(heading)} `;

                    return (
                        <h4
                            key={`${trimmedLine}-${index}`}
                            className="pt-1 text-[15px] font-black leading-6 text-[#07182c]"
                        >
                            {emoji}
                            {heading}
                        </h4>
                    );
                }

                if (bulletMatch) {
                    return (
                        <div
                            key={`${trimmedLine}-${index}`}
                            className="flex gap-2 text-sm leading-7 text-slate-700"
                        >
                            <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#009f9d]" />
                            <p>{renderInlineMarkdown(bulletMatch[1])}</p>
                        </div>
                    );
                }

                if (numberedMatch) {
                    return (
                        <div
                            key={`${trimmedLine}-${index}`}
                            className="flex gap-2 text-sm leading-7 text-slate-700"
                        >
                            <span className="font-black text-[#009f9d]">
                                {numberedMatch[1]}.
                            </span>
                            <p>{renderInlineMarkdown(numberedMatch[2])}</p>
                        </div>
                    );
                }

                return (
                    <p
                        key={`${trimmedLine}-${index}`}
                        className="text-sm leading-7 text-slate-700"
                    >
                        {renderInlineMarkdown(trimmedLine)}
                    </p>
                );
            })}
        </div>
    );
};

const AiChatBox = () => {
    const chatEndRef = useRef<HTMLDivElement | null>(null);

    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [messages, setMessages] = useState<AiMessage[]>([
        {
            id: 1,
            sender: "ai",
            text: "Hello! I am your PetsVeta AI Assistant. Tell me your pet symptoms and I will guide you.",
        },
    ]);

    const canSendMessage = message.trim().length > 0 && !isLoading;

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });
    }, [messages, isLoading]);

    const handleSendMessage = async () => {
        const trimmedMessage = message.trim();

        if (!trimmedMessage || isLoading) return;

        const userMessage: AiMessage = {
            id: Date.now(),
            sender: "user",
            text: trimmedMessage,
        };

        setMessages((prev) => [...prev, userMessage]);
        setMessage("");
        setIsLoading(true);

        try {
            const aiText = await sendAiAssistantMessage(trimmedMessage);

            const aiReply: AiMessage = {
                id: Date.now() + 1,
                sender: "ai",
                text:
                    aiText ||
                    "Sorry, I could not generate a response. Please try again.",
            };

            setMessages((prev) => [...prev, aiReply]);
        } catch {
            const errorReply: AiMessage = {
                id: Date.now() + 1,
                sender: "ai",
                text: "Something went wrong. Please login first or try again later.",
            };

            setMessages((prev) => [...prev, errorReply]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleMessageKeyDown = (
        event: KeyboardEvent<HTMLTextAreaElement>,
    ) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();

            if (canSendMessage) {
                void handleSendMessage();
            }
        }
    };

    return (
        <section className="px-5 pb-16 lg:px-16">
            <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_380px]">
                <div className="rounded-3xl bg-[#F5FBFF] p-4 shadow-[0_10px_35px_rgba(15,23,42,0.08)] md:p-6">
                    <div className="mb-5 flex items-center justify-between rounded-3xl bg-white p-5 shadow-sm">
                        <div>
                            <h2 className="text-2xl font-extrabold text-[#07182C]">
                                Ask AI Assistant
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Describe your pet symptoms or care question.
                            </p>
                        </div>
                    </div>

                    <div
                        className="h-[420px] space-y-4 overflow-y-auto rounded-3xl bg-white p-5"
                        data-lenis-prevent
                    >
                        {messages.map((item) => (
                            <div
                                key={item.id}
                                className={`flex ${item.sender === "user" ? "justify-end" : "justify-start"
                                    }`}
                            >
                                <div
                                    className={`max-w-[85%] rounded-3xl px-5 py-4 shadow-sm ${item.sender === "user"
                                            ? "bg-[#eefafa] text-[#07182c]"
                                            : "bg-white text-[#07182c] ring-1 ring-slate-100"
                                        }`}
                                >
                                    {item.sender === "ai" ? (
                                        renderAiMessage(item.text)
                                    ) : (
                                        <p className="text-sm leading-7">{item.text}</p>
                                    )}
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="flex items-center gap-1 rounded-3xl bg-white px-5 py-4 shadow-sm ring-1 ring-slate-100">
                                    <span className="h-2 w-2 animate-bounce rounded-full bg-[#009f9d]" />
                                    <span className="h-2 w-2 animate-bounce rounded-full bg-[#009f9d] [animation-delay:120ms]" />
                                    <span className="h-2 w-2 animate-bounce rounded-full bg-[#009f9d] [animation-delay:240ms]" />
                                </div>
                            </div>
                        )}

                        <div ref={chatEndRef} />
                    </div>

                    <div className="mt-5 grid gap-3 rounded-3xl bg-white p-4 md:grid-cols-[1fr_auto] md:items-center">
                        <textarea
                            rows={1}
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                            onKeyDown={handleMessageKeyDown}
                            placeholder="Example: My dog is vomiting and not eating..."
                            disabled={isLoading}
                            className="min-h-[54px] resize-none rounded-2xl border border-slate-200 px-4 py-4 text-sm outline-none focus:border-[#009f9d] focus:ring-2 focus:ring-[#009f9d]/20 disabled:cursor-not-allowed disabled:bg-slate-100"
                        />

                        <Button
                            type="button"
                            onClick={() => void handleSendMessage()}
                            disabled={!canSendMessage}
                            className="flex !h-[54px] items-center justify-center gap-2 !rounded-2xl !px-6 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <FaPaperPlane />
                            {isLoading ? "Sending..." : "Send"}
                        </Button>
                    </div>
                </div>

                <aside className="space-y-5">
                    <div className="rounded-3xl bg-gradient-to-br from-[#BDF0EE] to-[#FFF3EC] p-6 shadow-[0_18px_50px_rgba(15,23,42,0.10)]">
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl text-[#009F9D]">
                            <FaPaw />
                        </div>

                        <h3 className="text-2xl font-extrabold text-[#07182C]">
                            Quick Symptom Guide
                        </h3>

                        <p className="mt-3 text-sm leading-6 text-slate-600">
                            AI can guide you, but serious symptoms should always be checked by
                            a verified doctor.
                        </p>
                    </div>

                    <div className="rounded-3xl bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,0.08)]">
                        <h3 className="text-lg font-extrabold text-[#07182C]">
                            Try asking:
                        </h3>

                        <div className="mt-4 space-y-3">
                            {[
                                "My cat is not eating",
                                "My dog is vomiting",
                                "My pet has skin allergy",
                                "Which doctor should I visit?",
                            ].map((item) => (
                                <button
                                    key={item}
                                    type="button"
                                    onClick={() => setMessage(item)}
                                    disabled={isLoading}
                                    className="w-full rounded-2xl bg-[#f5fbff] px-4 py-3 text-left text-sm font-semibold text-slate-600 transition hover:bg-[#eefafa] hover:text-[#009f9d] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-3xl bg-[#07182c] p-6 text-white">
                        <h3 className="text-lg font-extrabold">Emergency Reminder</h3>

                        <p className="mt-3 text-sm leading-6 text-white/75">
                            If your pet has breathing problems, bleeding, seizures, poisoning,
                            or extreme weakness, contact a vet immediately.
                        </p>
                    </div>
                </aside>
            </div>
        </section>
    );
};

export default AiChatBox;