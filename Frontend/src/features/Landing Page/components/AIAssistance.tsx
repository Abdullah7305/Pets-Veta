import { FaArrowRight, FaPaperPlane } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import Button from "@/shared/components/Button/Button";
import Input from "@/shared/components/Input/Input";
import robotImg from "@/assets/shared/images/robot.png";

const AIAssistantBanner = () => {
    const navigate = useNavigate();

    const goToAiAssistant = () => {
        navigate("/ai-assistant");
    };

    return (
        <section className="relative bg-[#f5fbff] px-5 py-14 lg:px-16">
            <div className="relative mx-auto max-w-7xl">
                <div className="relative overflow-visible rounded-[34px] border border-[#c9f1ee] bg-gradient-to-r from-[#e7fbfa] via-[#f4ffff] to-[#fff6f1] px-6 py-8 shadow-[0_22px_65px_rgba(15,23,42,0.08)] lg:px-10 lg:py-10">
                    <div className="pointer-events-none absolute -left-8 -top-10 hidden h-44 w-44 rounded-full bg-[#178f95]/12 blur-3xl md:block" />
                    <div className="pointer-events-none absolute -right-10 bottom-0 h-52 w-52 rounded-full bg-[#f9c5a8]/25 blur-3xl" />

                    <div className="grid items-center gap-8 lg:grid-cols-[0.72fr_1fr_1.08fr]">
                        <div className="relative hidden min-h-[235px] md:block">
                            <div className="absolute -left-8 -top-16 h-[315px] w-[315px] rounded-full bg-white/55 shadow-[0_18px_55px_rgba(23,143,149,0.12)]" />

                            <img
                                src={robotImg}
                                alt="PetsVeta AI Assistant Robot"
                                className="absolute -left-10 -top-20 h-[355px] w-[355px] object-contain drop-shadow-[0_28px_35px_rgba(15,23,42,0.22)]"
                            />
                        </div>

                        <div className="relative z-10">

                            <h2 className="max-w-xl text-[30px] font-black leading-tight tracking-[-0.04em] text-[#07182c] md:text-[42px]">
                                Ask smart questions about your pet
                            </h2>

                            <p className="mt-4 max-w-lg text-base leading-7 text-slate-600">
                                Get quick guidance about symptoms, food, care, vaccination, and
                                daily pet health from PetsVeta AI.
                            </p>

                            <button
                                type="button"
                                onClick={goToAiAssistant}
                                className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#178f95] transition hover:text-[#12757a]"
                            >
                                Open AI Assistant
                                <FaArrowRight className="text-xs" />
                            </button>
                        </div>

                        <div className="relative z-10">
                            <div
                                onClick={goToAiAssistant}
                                className="group flex cursor-pointer items-center gap-3 rounded-full bg-white p-3 shadow-[0_18px_45px_rgba(15,23,42,0.12)] ring-1 ring-slate-100 transition hover:-translate-y-0.5 hover:shadow-[0_24px_55px_rgba(15,23,42,0.16)]"
                            >
                                <Input
                                    type="text"
                                    placeholder="Ask your question..."
                                    readOnly
                                    onFocus={goToAiAssistant}
                                    className="!cursor-pointer !border-0 !bg-transparent !px-5 !py-4 !text-base !shadow-none !outline-none !ring-0"
                                />

                                <Button
                                    type="button"
                                    variant="primary"
                                    size="md"
                                    onClick={goToAiAssistant}
                                    className="flex !h-14 !w-14 shrink-0 items-center justify-center !rounded-full !border-[#009f9d] !bg-[#009f9d] !p-0 !text-white shadow-[0_12px_28px_rgba(0,159,157,0.26)] transition group-hover:scale-105 hover:!bg-[#008f8d] hover:!text-white"
                                >
                                    <FaPaperPlane />
                                </Button>
                            </div>

                            <p className="mt-3 text-center text-xs font-semibold text-slate-500">
                                Click the input or send button to start chatting.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AIAssistantBanner;