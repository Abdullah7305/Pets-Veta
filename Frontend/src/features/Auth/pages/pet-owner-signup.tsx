import type { ReactNode } from "react";
import PetOwnerForm from "../components/pets-owner";

const PawIcon = () => (
    <svg
        viewBox="0 0 64 64"
        className="h-8 w-8 fill-[#178f95]"
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle cx="18" cy="22" r="7" />
        <circle cx="32" cy="16" r="7" />
        <circle cx="46" cy="22" r="7" />
        <circle cx="24" cy="34" r="6" />
        <circle cx="40" cy="34" r="6" />
        <path d="M18 47c0-9 6-17 14-17s14 8 14 17c0 6-5 9-14 9s-14-3-14-9z" />
    </svg>
);

type StatCardProps = {
    icon: ReactNode;
    value: string;
    label: string;
};

const StatCard = ({ icon, value, label }: StatCardProps) => {
    return (
        <div className="flex h-[115px] flex-1 flex-col items-center justify-center rounded-[20px] border border-white/55 bg-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_18px_45px_rgba(18,40,60,0.08)] backdrop-blur-2xl">
            <div className="mb-2 text-[#178f95]">{icon}</div>

            <h3 className="text-[25px] font-extrabold leading-none text-[#178f95]">
                {value}
            </h3>

            <p className="mt-2 text-[13px] font-bold text-[#3c4b67]">{label}</p>
        </div>
    );
};

const PetOwnerSignup = () => {
    return (
        <main className="relative flex  w-full  bg-[#f8f2ed] text-[#101b3d]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(249,197,168,0.92)_0%,rgba(249,197,168,0.62)_28%,transparent_48%),radial-gradient(circle_at_85%_8%,rgba(236,250,249,0.95)_0%,rgba(236,250,249,0.62)_30%,transparent_52%),linear-gradient(180deg,#fff7f2_0%,#eefaf8_44%,#bfe5e1_100%)]" />
            <div className="absolute left-[4%] top-[21%] h-8 w-8 rounded-full bg-[#ffb073]/70 shadow-[inset_-8px_-8px_18px_rgba(255,255,255,0.5),0_10px_25px_rgba(249,197,168,0.5)]" />
            <div className="absolute left-[43%] top-[12%] hidden h-5 w-5 rounded-full bg-white/60 shadow-[inset_-6px_-6px_12px_rgba(255,255,255,0.8)] lg:block" />
            <div className="absolute left-[49%] top-[26%] hidden h-6 w-6 rounded-full bg-white/55 shadow-[inset_-6px_-6px_12px_rgba(255,255,255,0.8)] lg:block" />
            <div className="absolute bottom-[13%] left-[43%] hidden h-10 w-10 rounded-full bg-[#bdebe8]/75 shadow-[inset_-9px_-9px_15px_rgba(255,255,255,0.9),0_12px_28px_rgba(23,143,149,0.18)] lg:block" />
            <div className="absolute left-[43%] top-[50%] hidden h-7 w-7 rounded-full bg-[#ffb073]/70 shadow-[inset_-8px_-8px_16px_rgba(255,255,255,0.55)] lg:block" />

            <div className="absolute left-[4.2%] top-[5%] z-10 hidden h-16 w-16 items-center justify-center rounded-2xl bg-white/50 shadow-[0_14px_40px_rgba(31,50,70,0.08)] backdrop-blur-2xl lg:flex">
                <PawIcon />
            </div>

            <div className="absolute left-[43.5%] top-[8%] z-10 hidden rotate-[-10deg] opacity-50 lg:block">
                <PawIcon />
            </div>

            <section className="relative z-10 mx-auto grid min-h-screen w-full max-w-[1360px] grid-cols-1 items-center gap-8 px-5 py-5 lg:grid-cols-[0.95fr_0.9fr] lg:px-10 lg:py-6 xl:gap-10">
                <div className="hidden lg:flex">
                    <div className="relative flex min-h-[545px] w-full max-w-[560px] flex-col justify-center rounded-[30px] border border-white/55 bg-white/20 px-12 py-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.95),0_28px_70px_rgba(36,66,90,0.12)] backdrop-blur-[26px]">
                        <div className="absolute inset-0 rounded-[30px] bg-gradient-to-br from-white/20 via-white/10 to-transparent" />

                        <div className="relative z-10">
                            <h1 className="max-w-[460px] text-[44px] font-extrabold leading-[1.14] tracking-[-0.05em] text-[#101b3d] xl:text-[48px]">
                                Join{" "}
                                <span className="bg-gradient-to-r from-[#178f95] to-[#0c7b84] bg-clip-text text-transparent">
                                    PetsVeta
                                </span>
                            </h1>

                            <p className="mt-5 max-w-[420px] text-[16px] font-medium leading-[1.6] text-[#2f405f] xl:text-[17px]">
                                Create your account to book vet appointments, explore pet services, and shop trusted pet products.
                            </p>

                            <div className="mt-7 flex max-w-[420px] items-center gap-5 rounded-[26px] border border-white/60 bg-white/24 p-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_20px_50px_rgba(20,50,70,0.1)] backdrop-blur-3xl">
                                <div className="relative h-[78px] w-[78px] shrink-0 overflow-hidden rounded-3xl bg-[#fff3e8] shadow-[0_14px_28px_rgba(40,50,70,0.12)]">
                                    <img
                                        src="https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?auto=format&fit=crop&w=300&q=80"
                                        alt="Dog"
                                        className="h-full w-full object-cover"
                                    />

                                    <div className="absolute bottom-[-2px] right-[-2px] flex h-8 w-8 items-center justify-center rounded-full bg-white text-base shadow-lg">
                                        💗
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-[16px] font-extrabold text-[#101b3d]">
                                        Complete Pet Care
                                    </h3>

                                    <p className="mt-2 text-[14px] font-medium leading-6 text-[#4f5f78]">
                                        Everything for your pet in one place.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-7 flex max-w-[450px] gap-4">
                                <StatCard
                                    value="120+"
                                    label="Doctors"
                                    icon={
                                        <svg
                                            className="h-8 w-8"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 12a5 5 0 100-10 5 5 0 000 10zM3 22a9 9 0 0118 0H3z" />
                                        </svg>
                                    }
                                />

                                <StatCard
                                    value="5k+"
                                    label="Members"
                                    icon={
                                        <svg
                                            className="h-8 w-8"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 10a3 3 0 11-6 0 3 3 0 016 0zM16 20a3 3 0 00-6 0M9 20h6"
                                            />
                                        </svg>
                                    }
                                />

                                <StatCard
                                    value="24/7"
                                    label="Support"
                                    icon={
                                        <svg
                                            className="h-8 w-8"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path d="M4 13a8 8 0 0116 0" />
                                            <path d="M4 13v4a2 2 0 002 2h1v-6H6a2 2 0 00-2 2zM20 13v4a2 2 0 01-2 2h-1v-6h1a2 2 0 012 2z" />
                                            <path d="M16 21h-4" />
                                        </svg>
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex min-h-screen items-center justify-center lg:min-h-0">
                    <div className="w-full max-w-[650px] rounded-[30px] border border-white/70 bg-white/72 px-7 py-8 shadow-[0_30px_80px_rgba(30,60,80,0.16)] backdrop-blur-2xl sm:px-10 md:px-12 lg:px-12">
                        <div className="flex h-full items-center">
                            <PetOwnerForm />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default PetOwnerSignup;
