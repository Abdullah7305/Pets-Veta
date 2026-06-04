import {
    FaCalendarCheck,
    FaClipboardCheck,
    FaPaw,
    FaUserMd,
} from "react-icons/fa";

const processSteps = [
    {
        icon: <FaPaw />,
        title: "Choose Service",
        description:
            "Select the service your pet needs such as consultation, grooming or emergency care.",
    },

    {
        icon: <FaUserMd />,
        title: "Find Experts",
        description:
            "Browse verified veterinary doctors and professional pet-care providers.",
    },

    {
        icon: <FaCalendarCheck />,
        title: "Book Appointment",
        description:
            "Schedule appointments easily with flexible timings and secure booking.",
    },

    {
        icon: <FaClipboardCheck />,
        title: "Get Pet Care",
        description:
            "Receive trusted pet-care services and ongoing health support.",
    },
];

const ServicesProcess = () => {
    return (
        <section className="bg-[#f5fbff] px-5 py-16 lg:px-16">
            <div className="mx-auto max-w-7xl">
                <div className="mb-10 text-center">
                    <h2 className="text-3xl font-extrabold text-[#07182c] md:text-4xl">
                        How It <span className="text-[#009f9d]">Works</span>
                    </h2>

                    <p className="mx-auto mt-3 max-w-2xl leading-7 text-slate-600">
                        A simple process to help pet owners quickly access trusted services
                        and care.
                    </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                    {processSteps.map((step, index) => (
                        <div
                            key={step.title}
                            className="relative rounded-3xl bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,0.08)]"
                        >
                            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eefafa] text-2xl text-[#009f9d]">
                                {step.icon}
                            </div>

                            <span className="mb-3 inline-flex rounded-full bg-[#f5fbff] px-3 py-1 text-xs font-extrabold text-[#009f9d]">
                                Step {index + 1}
                            </span>

                            <h3 className="text-xl font-extrabold text-[#07182c]">
                                {step.title}
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-slate-600">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesProcess;