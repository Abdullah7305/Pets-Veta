import {
    FaBoxOpen,
    FaCalendarCheck,
    FaHeadset,
    FaLock,
    FaShieldAlt,
    FaUserMd,
} from "react-icons/fa";

import img from "@/assets/shared/images/dogi.jpg";

const features = [
    {
        icon: <FaUserMd />,
        title: "Verified Vets",
        desc: "Approved doctors for trusted pet care.",
    },
    {
        icon: <FaLock />,
        title: "Fair Pricing",
        desc: "Simple costs with clear information.",
    },
    {
        icon: <FaCalendarCheck />,
        title: "Easy Booking",
        desc: "Book vet appointments in fewer steps.",
    },
    {
        icon: <FaBoxOpen />,
        title: "Quality Products",
        desc: "Trusted food, medicine, and accessories.",
    },
    {
        icon: <FaHeadset />,
        title: "Quick Support",
        desc: "Help for care, shopping, and bookings.",
    },
    {
        icon: <FaShieldAlt />,
        title: "Safe Platform",
        desc: "Secure experience for pet owners.",
    },
];

const ChooseUs = () => {
    return (
        <section className="relative overflow-hidden bg-[#f5fbff] px-5 py-16 lg:px-16">
            <div className="pointer-events-none absolute left-[-120px] top-12 h-72 w-72 rounded-full bg-[#178f95]/10 blur-3xl" />
            <div className="pointer-events-none absolute right-[-120px] bottom-10 h-80 w-80 rounded-full bg-[#f9c5a8]/25 blur-3xl" />

            <div className="relative mx-auto max-w-7xl">
                <div className="mx-auto mb-11 max-w-3xl text-center">

                    <h2 className="text-[34px] font-black leading-[1.06] tracking-[-0.05em] text-[#07182c] md:text-[46px]">
                        Why pet parents choose{" "}
                        <span className="text-[#178f95]">PetsVeta</span>
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-500">
                        A trusted pet-care platform for shopping, vet appointments, AI
                        support, and daily pet management.
                    </p>
                </div>

                <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
                    <div className="grid gap-4 sm:grid-cols-2">
                        {features.map((feature) => (
                            <div
                                key={feature.title}
                                className="group flex gap-4 rounded-[24px] border border-slate-100 bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.055)] transition duration-300 hover:-translate-y-1 hover:border-[#178f95]/20 hover:shadow-[0_20px_55px_rgba(15,23,42,0.09)]"
                            >
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#e8f7f7] text-xl text-[#178f95] transition group-hover:bg-[#178f95] group-hover:text-white">
                                    {feature.icon}
                                </div>

                                <div>
                                    <h3 className="text-base font-black text-[#07182c]">
                                        {feature.title}
                                    </h3>

                                    <p className="mt-1.5 text-sm leading-6 text-slate-500">
                                        {feature.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="relative">
                        <div className="absolute -left-5 top-10 hidden h-24 w-24 rounded-full border-[6px] border-[#9ee6e1] lg:block" />
                        <div className="absolute -right-6 bottom-8 h-28 w-28 rounded-full bg-[#f9c5a8]/45 blur-2xl" />

                        <div className="relative min-h-[430px] overflow-hidden rounded-[34px] border border-white bg-white shadow-[0_18px_55px_rgba(15,23,42,0.1)]">
                            <img
                                src={img}
                                alt="Happy pets"
                                className="absolute inset-0 h-full w-full object-cover"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-[#07182c]/70 via-[#07182c]/20 to-white/10" />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#178f95]/10 via-transparent to-[#f9c5a8]/10" />

                            <div className="relative z-10 flex min-h-[430px] flex-col justify-between p-6">
                                <div>
                                    <span className="inline-flex rounded-full bg-white/90 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#178f95] shadow-sm backdrop-blur">
                                        Trusted by pet owners
                                    </span>
                                </div>

                                <div>
                                    <h3 className="max-w-sm text-3xl font-black leading-tight tracking-[-0.04em] text-white drop-shadow">
                                        Pet care made simpler, safer, and smarter
                                    </h3>

                                    <p className="mt-3 max-w-md text-sm leading-6 text-white/85">
                                        Manage pet shopping, appointments, support, and care from
                                        one connected experience.
                                    </p>

                                    <div className="mt-5 grid grid-cols-2 gap-3">
                                        <div className="rounded-2xl bg-white/90 p-4 text-center shadow-sm backdrop-blur">
                                            <p className="text-2xl font-black text-[#178f95]">
                                                24/7
                                            </p>

                                            <p className="mt-1 text-xs font-bold text-slate-500">
                                                Care Support
                                            </p>
                                        </div>

                                        <div className="rounded-2xl bg-white/90 p-4 text-center shadow-sm backdrop-blur">
                                            <p className="text-2xl font-black text-[#178f95]">
                                                Safe
                                            </p>

                                            <p className="mt-1 text-xs font-bold text-slate-500">
                                                Pet Platform
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ChooseUs;