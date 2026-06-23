import {
    FaBrain,
    FaPaw,
    FaRobot,
    FaShieldAlt,
} from "react-icons/fa";

const AiHero = () => {
    return (
        <section className="mt-20 bg-gradient-to-br from-[#f5fbff] via-white to-[#d9f7f6] px-5 py-16 lg:px-16">
            <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
                <div>
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#009f9d] shadow-sm">
                        <FaRobot />
                        AI Pet Assistant
                    </div>

                    <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-[#07182c] md:text-5xl">
                        Smart AI assistance for your pet’s health and care.
                    </h1>

                    <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                        Describe symptoms, ask pet-care questions and get instant AI-powered
                        guidance for better pet wellness and faster decision making.
                    </p>

                    <div className="mt-7 flex flex-wrap gap-3">
                        <span className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-[#07182c] shadow-sm">
                            <FaBrain className="text-[#009f9d]" />
                            Smart Suggestions
                        </span>

                        <span className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-[#07182c] shadow-sm">
                            <FaShieldAlt className="text-[#009f9d]" />
                            Safe Guidance
                        </span>

                        <span className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-[#07182c] shadow-sm">
                            <FaPaw className="text-[#009f9d]" />
                            Pet Focused
                        </span>
                    </div>
                </div>

                <div className="rounded-[40px] bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.10)]">
                    <div className="rounded-[32px] bg-gradient-to-br from-[#bdf0ee] to-[#fff3ec] p-6">
                        <div className="rounded-3xl bg-white p-5 shadow-sm">
                            <div className="flex items-start gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eefafa] text-xl text-[#009f9d]">
                                    <FaRobot />
                                </div>

                                <div>
                                    <h3 className="text-lg font-extrabold text-[#07182c]">
                                        AI Assistant
                                    </h3>

                                    <p className="mt-1 text-sm leading-6 text-slate-600">
                                        Tell me your pet symptoms.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 rounded-3xl bg-[#07182c] p-5 text-white shadow-sm">
                            <p className="text-sm leading-7">
                                My cat is not eating and feels weak.
                            </p>
                        </div>

                        <div className="mt-4 rounded-3xl bg-white p-5 shadow-sm">
                            <p className="text-sm leading-7 text-slate-600">
                                Your pet may have digestion or infection-related issues. We
                                recommend consulting a verified veterinary physician.
                            </p>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-3">
                            <span className="rounded-full bg-white px-4 py-2 text-xs font-bold text-[#009f9d] shadow-sm">
                                Pet Symptoms
                            </span>

                            <span className="rounded-full bg-white px-4 py-2 text-xs font-bold text-[#009f9d] shadow-sm">
                                AI Suggestions
                            </span>

                            <span className="rounded-full bg-white px-4 py-2 text-xs font-bold text-[#009f9d] shadow-sm">
                                Smart Guidance
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AiHero;
