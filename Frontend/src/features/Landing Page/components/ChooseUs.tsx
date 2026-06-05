import {
    FaUserMd,
    FaLock,
    FaCalendarCheck,
    FaBoxOpen,
    FaHeadset,
    FaShieldAlt,
} from "react-icons/fa";
import img from "@/assets/shared/images/dog2.jpeg"

const features = [
    { icon: <FaUserMd />, title: "Experienced\n& Verified Vets" },
    { icon: <FaLock />, title: "Affordable\nPricing" },
    { icon: <FaCalendarCheck />, title: "Fast & Easy\nBookings" },
    { icon: <FaBoxOpen />, title: "Wide Range of\nQuality Products" },
    { icon: <FaHeadset />, title: "24/7 Customer\nSupport" },
    { icon: <FaShieldAlt />, title: "Secure & Safe\nPlatform" },
];

const WhyChoose = () => {
    return (
        <section className="bg-[#f5fbff] px-6 py-8 lg:px-16">
            <div className="mx-auto max-w-7xl">
                <h2 className="mb-7 text-center text-[20px] font-extrabold text-[#07182c]">
                    Why Pet Parents Choose{" "}
                    <span className="text-[#009f9d]">PetsVeta</span>
                </h2>

                <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
                    <div className="grid w-full grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
                        {features.map((item) => (
                            <div
                                key={item.title}
                                className="flex flex-col items-center border-slate-200 text-center lg:border-r last:border-r-0"
                            >
                                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#d9f7f6] text-2xl text-[#008f8d]">
                                    {item.icon}
                                </div>

                                <p className="whitespace-pre-line text-[13px] font-extrabold leading-5 text-[#07182c]">
                                    {item.title}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="relative hidden w-[320px] shrink-0 lg:block">
                        <div className="absolute -left-8 top-2 h-28 w-28 rounded-full border-[5px] border-[#9ee6e1]" />
                        <img
                            src={img}
                            alt="Pets"
                            className="relative z-10 w-full object-contain"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChoose;