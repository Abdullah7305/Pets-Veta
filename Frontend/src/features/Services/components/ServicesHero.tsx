import {
    FaPaw,
    FaShieldAlt,
    FaStethoscope,
} from "react-icons/fa";

const ServicesHero = () => {
    return (
        <section className="bg-gradient-to-br from-[#f5fbff] via-white to-[#d9f7f6] px-5 py-16 lg:px-16">
            <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
                <div>
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#009f9d] shadow-sm">
                        <FaPaw />
                        PetsVeta Services
                    </div>

                    <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-[#07182c] md:text-5xl">
                        Complete pet-care services for healthier and happier pets.
                    </h1>

                    <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                        Explore professional veterinary care, grooming, vaccinations,
                        emergency support and AI-powered pet assistance in one platform.
                    </p>

                    <div className="mt-7 flex flex-wrap gap-3">
                        <span className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-[#07182c] shadow-sm">
                            <FaShieldAlt className="text-[#009f9d]" />
                            Trusted Care
                        </span>

                        <span className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-[#07182c] shadow-sm">
                            <FaStethoscope className="text-[#009f9d]" />
                            Verified Doctors
                        </span>
                    </div>
                </div>

                <div className="rounded-[40px] bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.10)]">
                    <div className="grid gap-5 rounded-[32px] bg-gradient-to-br from-[#bdf0ee] to-[#fff3ec] p-6 sm:grid-cols-2">
                        <div className="rounded-3xl bg-white p-5 shadow-sm">
                            <h3 className="text-3xl font-extrabold text-[#009f9d]">
                                100+
                            </h3>

                            <p className="mt-1 text-sm font-semibold text-slate-600">
                                Veterinary Doctors
                            </p>
                        </div>

                        <div className="rounded-3xl bg-white p-5 shadow-sm">
                            <h3 className="text-3xl font-extrabold text-[#009f9d]">
                                24/7
                            </h3>

                            <p className="mt-1 text-sm font-semibold text-slate-600">
                                Emergency Support
                            </p>
                        </div>

                        <div className="rounded-3xl bg-white p-5 shadow-sm">
                            <h3 className="text-3xl font-extrabold text-[#009f9d]">
                                AI
                            </h3>

                            <p className="mt-1 text-sm font-semibold text-slate-600">
                                Smart Assistance
                            </p>
                        </div>

                        <div className="rounded-3xl bg-white p-5 shadow-sm">
                            <h3 className="text-3xl font-extrabold text-[#009f9d]">
                                10K+
                            </h3>

                            <p className="mt-1 text-sm font-semibold text-slate-600">
                                Happy Pet Owners
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServicesHero;