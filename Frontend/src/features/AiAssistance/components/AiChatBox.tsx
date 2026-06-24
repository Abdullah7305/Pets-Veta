import { useState } from "react";
import { FaPaperPlane, FaRobot, FaUser, FaPaw } from "react-icons/fa";

import Button from "../../../shared/components/Button";
import type { AiMessage } from "../types/aiAssistance.types";
import { sendAiAssistantMessage } from "../api/aiAssistant.api";

const AiChatBox = () => {
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [messages, setMessages] = useState<AiMessage[]>([
        {
            id: 1,
            sender: "ai",
            text: "Hello! I am your PetsVeta AI Assistant. Tell me your pet symptoms and I will guide you.",
        },
    ]);

    const handleSendMessage = async () => {
        if (!message.trim() || isLoading) return;

        const currentMessage = message;

        const userMessage: AiMessage = {
            id: Date.now(),
            sender: "user",
            text: currentMessage,
        };

        setMessages((prev) => [...prev, userMessage]);
        setMessage("");
        setIsLoading(true);

        try {
            const aiText = await sendAiAssistantMessage(currentMessage);

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

    return (
        <section className="bg-white px-5 py-16 lg:px-16">
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

                        <div className="hidden h-12 w-12 items-center justify-center rounded-2xl bg-[#EEFAFA] text-xl text-[#009F9D] sm:flex">
                            <FaRobot />
                        </div>
                    </div>

                    <div className="h-[420px] space-y-4 overflow-y-auto rounded-3xl bg-white p-5">
                        {messages.map((item) => (
                            <div
                                key={item.id}
                                className={`flex ${item.sender === "user" ? "justify-end" : "justify-start"
                                    }`}
                            >
                                <div
                                    className={`flex max-w-[85%] gap-3 rounded-3xl p-4 ${item.sender === "user"
                                        ? "bg-[#07182C] text-white"
                                        : "bg-[#EEFAFA] text-[#07182C]"
                                        }`}
                                >
                                    <div
                                        className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${item.sender === "user"
                                            ? "bg-white/15"
                                            : "bg-white text-[#009F9D]"
                                            }`}
                                    >
                                        {item.sender === "user" ? <FaUser /> : <FaRobot />}
                                    </div>

                                    <p className="text-sm leading-6">{item.text}</p>
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="flex max-w-[85%] gap-3 rounded-3xl bg-[#EEFAFA] p-4 text-[#07182C]">
                                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-[#009F9D]">
                                        <FaRobot />
                                    </div>

                                    <p className="text-sm leading-6">AI is typing...</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-5 grid gap-3 rounded-3xl bg-white p-4 md:grid-cols-[1fr_auto]">
                        <textarea
                            rows={2}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Example: My dog is vomiting and not eating..."
                            disabled={isLoading}
                            className="resize-none rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#009F9D] focus:ring-2 focus:ring-[#009F9D]/20 disabled:cursor-not-allowed disabled:bg-slate-100"
                        />

                        <Button
                            type="button"
                            onClick={handleSendMessage}
                            disabled={isLoading}
                            className="flex items-center justify-center gap-2"
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
                                    className="w-full rounded-2xl bg-[#F5FBFF] px-4 py-3 text-left text-sm font-semibold text-slate-600 transition hover:bg-[#EEFAFA] hover:text-[#009F9D] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-3xl bg-[#07182C] p-6 text-white">
                        <h3 className="text-lg font-extrabold">Emergency Reminder</h3>

                        <p className="mt-3 text-sm leading-6 text-white/75">
                            If your pet has breathing problems, bleeding, seizures,
                            poisoning, or extreme weakness, contact a vet immediately.
                        </p>
                    </div>
                </aside>
            </div>
        </section>
    );
};

export default AiChatBox;