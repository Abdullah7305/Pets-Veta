import { useState } from "react";
import { FaPaperPlane, FaRobot, FaUser, FaPaw } from "react-icons/fa";

import Button from "../../../shared/components/Button";

type Message = {
    id: number;
    sender: "user" | "ai";
    text: string;
};

const AiChatBox = () => {
    const [message, setMessage] = useState("");

    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            sender: "ai",
            text: "Hello! I am your PetsVeta AI Assistant. Tell me your pet symptoms and I will guide you.",
        },
    ]);

    const handleSendMessage = () => {
        if (!message.trim()) return;

        const userMessage: Message = {
            id: Date.now(),
            sender: "user",
            text: message,
        };

        const aiReply: Message = {
            id: Date.now() + 1,
            sender: "ai",
            text: "Thanks for sharing. Based on the symptoms, please monitor your pet closely and consult a verified veterinary doctor if the issue continues.",
        };

        setMessages((prev) => [...prev, userMessage, aiReply]);
        setMessage("");
    };

    return (
        <section className="bg-white px-5 py-16 lg:px-16">
            <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_380px]">
                <div className="rounded-3xl bg-[#f5fbff] p-4 shadow-[0_10px_35px_rgba(15,23,42,0.08)] md:p-6">
                    <div className="mb-5 flex items-center justify-between rounded-3xl bg-white p-5 shadow-sm">
                        <div>
                            <h2 className="text-2xl font-extrabold text-[#07182c]">
                                Ask AI Assistant
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Describe your pet symptoms or care question.
                            </p>
                        </div>

                        <div className="hidden h-12 w-12 items-center justify-center rounded-2xl bg-[#eefafa] text-xl text-[#009f9d] sm:flex">
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
                                        ? "bg-[#07182c] text-white"
                                        : "bg-[#eefafa] text-[#07182c]"
                                        }`}
                                >
                                    <div
                                        className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${item.sender === "user"
                                            ? "bg-white/15"
                                            : "bg-white text-[#009f9d]"
                                            }`}
                                    >
                                        {item.sender === "user" ? <FaUser /> : <FaRobot />}
                                    </div>

                                    <p className="text-sm leading-6">{item.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-5 grid gap-3 rounded-3xl bg-white p-4 md:grid-cols-[1fr_auto]">
                        <textarea
                            rows={2}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Example: My dog is vomiting and not eating..."
                            className="resize-none rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#009f9d] focus:ring-2 focus:ring-[#009f9d]/20"
                        />

                        <Button
                            type="button"
                            onClick={handleSendMessage}
                            className="flex items-center justify-center gap-2"
                        >
                            <FaPaperPlane />
                            Send
                        </Button>
                    </div>
                </div>

                <aside className="space-y-5">
                    <div className="rounded-3xl bg-gradient-to-br from-[#bdf0ee] to-[#fff3ec] p-6 shadow-[0_18px_50px_rgba(15,23,42,0.10)]">
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl text-[#009f9d]">
                            <FaPaw />
                        </div>

                        <h3 className="text-2xl font-extrabold text-[#07182c]">
                            Quick Symptom Guide
                        </h3>

                        <p className="mt-3 text-sm leading-6 text-slate-600">
                            AI can guide you, but serious symptoms should always be checked by
                            a verified doctor.
                        </p>
                    </div>

                    <div className="rounded-3xl bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,0.08)]">
                        <h3 className="text-lg font-extrabold text-[#07182c]">
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
                                    className="w-full rounded-2xl bg-[#f5fbff] px-4 py-3 text-left text-sm font-semibold text-slate-600 transition hover:bg-[#eefafa] hover:text-[#009f9d]"
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-3xl bg-[#07182c] p-6 text-white">
                        <h3 className="text-lg font-extrabold">
                            Emergency Reminder
                        </h3>

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