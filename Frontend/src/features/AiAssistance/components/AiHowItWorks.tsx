import { FaCommentMedical, FaRobot, FaUserMd } from "react-icons/fa";

const steps = [
    {
        icon: <FaCommentMedical />,
        title: "Describe Symptoms",
        text: "Tell AI what problem your pet is facing, such as vomiting, weakness, allergy or appetite loss.",
    },
    {
        icon: <FaRobot />,
        title: "Get AI Guidance",
        text: "AI gives basic guidance, possible care direction and suggests what type of doctor may be suitable.",
    },
    {
        icon: <FaUserMd />,
        title: "Book a Doctor",
        text: "If needed, continue to verified veterinary doctors and book an appointment easily.",
    },
];

const AiHowItWorks = () => {
    return (
        <section className="bg-white px-5 py-16 lg:px-16">
            <div className="mx-auto max-w-7xl">
                <div className="mb-10 text-center">
                    <h2 className="text-3xl font-extrabold text-[#07182c] md:text-4xl">
                        How It <span className="text-[#009f9d]">Works</span>
                    </h2>

                    <p className="mx-auto mt-3 max-w-2xl leading-7 text-slate-600">
                        A simple pet-care flow from symptoms to trusted veterinary support.
                    </p>
                </div>

                <div className="grid gap-5 md:grid-cols-3">
                    {steps.map((step, index) => (
                        <div
                            key={step.title}
                            className="relative rounded-3xl bg-[#f5fbff] p-6 text-center"
                        >
                            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl text-[#009f9d] shadow-sm">
                                {step.icon}
                            </div>

                            <span className="mb-3 inline-flex rounded-full bg-white px-3 py-1 text-xs font-extrabold text-[#009f9d]">
                                Step {index + 1}
                            </span>

                            <h3 className="text-xl font-extrabold text-[#07182c]">
                                {step.title}
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-slate-600">
                                {step.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AiHowItWorks;                                