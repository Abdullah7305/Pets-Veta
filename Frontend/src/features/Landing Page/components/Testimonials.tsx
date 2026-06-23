import { FaPaw, FaQuoteRight, FaStar } from "react-icons/fa";
import img from "@/assets/shared/images/bannerImage.png"

const testimonials = [
    {
        name: "Aisha Malik",
        image: img,
        text: "Booked a vet consultation for my cat. The experience was amazing!",
    },
    {
        name: "Bilal Ahmed",
        image: img,
        text: "Great products and fast delivery. Highly recommended PetsVeta!",
    },
    {
        name: "Sana Farooq",
        image: img,
        text: "AI Assistant helped me a lot with my dog's health queries.",
    },
];

const Testimonials = () => {
    return (
        <section className="bg-[#f5fbff] px-6 py-10 lg:px-16">
            <div className="mx-auto max-w-7xl">
                <h2 className="mb-8 flex items-center justify-center gap-2 text-center text-[22px] font-extrabold text-[#07182c]">
                    What Our <span className="text-[#009f9d]">Pet Parents</span> Say
                    <FaPaw className="text-[#009f9d]" />
                </h2>

                <div className="grid gap-7 md:grid-cols-3">
                    {testimonials.map((item) => (
                        <div
                            key={item.name}
                            className="relative rounded-[18px] bg-white px-7 py-6 shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
                        >
                            <FaQuoteRight className="absolute right-6 top-5 text-2xl text-[#b8efeb]" />

                            <div className="mb-5 flex items-center gap-4">
                                <div className="relative">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="h-14 w-14 rounded-full object-cover"
                                    />
                                    <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-[#20c997] ring-2 ring-white" />
                                </div>

                                <div>
                                    <h3 className="text-sm font-extrabold text-[#07182c]">
                                        {item.name}
                                    </h3>

                                    <div className="mt-1 flex gap-1 text-[12px] text-[#ffb020]">
                                        {Array.from({ length: 5 }).map((_, index) => (
                                            <FaStar key={index} />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <p className="text-[15px] font-medium leading-7 text-[#07182c]">
                                {item.text}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-7 flex justify-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-[#009f9d]" />
                    <span className="h-3 w-3 rounded-full bg-slate-300" />
                    <span className="h-3 w-3 rounded-full bg-slate-300" />
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
