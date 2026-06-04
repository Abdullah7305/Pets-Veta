import {
    FaBrain,
    FaClock,
    FaNotesMedical,
    FaShieldAlt,
} from "react-icons/fa";

const features = [
    {
        icon: <FaBrain />,
        title: "Smart Symptom Guidance",
        text: "Describe your pet’s symptoms and get quick AI-powered guidance for the next best step.",
    },
    {
        icon: <FaNotesMedical />,
        title: "Care Suggestions",
        text: "Get basic care suggestions related to feeding, grooming, wellness and common pet issues.",
    },
    {
        icon: <FaShieldAlt />,
        title: "Safe Recommendations",
        text: "AI guidance is designed to support decisions, not replace professional veterinary care.",
    },
    {
        icon: <FaClock />,
        title: "Instant Support",
        text: "Ask pet-care questions anytime and get fast responses before booking a doctor.",
    },
];

const AiFeatures = () => {
    return (
        <section className="bg-[#f5fbff] px-5 py-16 lg:px-16">
            <div className="mx-auto max-w-7xl">
                <div className="mb-10 max-w-2xl">
                    <h2 className="text-3xl font-extrabold text-[#07182c] md:text-4xl">
                        What can{" "}
                        <span className="text-[#009f9d]">AI Assistant</span> help with?
                    </h2>

                    <p className="mt-3 leading-7 text-slate-600">
                        Use AI assistance for quick pet-care direction before choosing the
                        right doctor or service.
                    </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                    {features.map((item) => (
                        <div
                            key={item.title}
                            className="rounded-3xl bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,0.08)]"
                        >
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eefafa] text-xl text-[#009f9d]">
                                {item.icon}
                            </div>

                            <h3 className="text-lg font-extrabold text-[#07182c]">
                                {item.title}
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-slate-600">
                                {item.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AiFeatures;