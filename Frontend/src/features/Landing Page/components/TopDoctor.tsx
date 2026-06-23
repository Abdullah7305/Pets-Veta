import { FaArrowRight, FaStar } from "react-icons/fa";
import img from "@/assets/shared/images/bannerImage.png"


const doctors = [
    {
        name: "Dr. Sarah Khan",
        specialty: "Veterinary Surgeon",
        rating: "4.9",
        reviews: "120",
        image: img,
    },
    {
        name: "Dr. Ali Raza",
        specialty: "Pet Specialist",
        rating: "4.8",
        reviews: "98",
        image: img,
    },
    {
        name: "Dr. Mehwish Noor",
        specialty: "Dermatologist",
        rating: "4.9",
        reviews: "110",
        image: img,
    },
    {
        name: "Dr. Usman Ahmed",
        specialty: "Orthopedic Vet",
        rating: "4.7",
        reviews: "85",
        image: img,
    },
];

const TopRatedDoctors = () => {
    return (
        <section className="bg-[#f5fbff] px-6 py-8 lg:px-16">
            <div className="mx-auto max-w-7xl">
                <div className="mb-5 flex items-center justify-between">
                    <h2 className="text-[22px] font-extrabold text-[#07182c]">
                        Top Rated <span className="text-[#009f9d]">Doctors</span>
                    </h2>

                    <button className="flex items-center gap-2 text-sm font-extrabold text-[#009f9d]">
                        View All Doctors
                        <FaArrowRight className="text-xs" />
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
                    {doctors.map((doctor) => (
                        <div
                            key={doctor.name}
                            className="relative flex h-[140px] overflow-hidden rounded-[22px] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
                        >
                            <div className="relative w-[105px] shrink-0 bg-gradient-to-br from-[#eefafa] to-white">
                                <img
                                    src={doctor.image}
                                    alt={doctor.name}
                                    className="absolute bottom-0 left-0 h-[130px] w-full object-contain object-bottom"
                                />

                                <span className="absolute bottom-4 left-4 h-3 w-3 rounded-full bg-[#22c55e] ring-2 ring-white" />
                            </div>

                            <div className="flex flex-1 flex-col justify-center px-4">
                                <h3 className="text-[15px] font-extrabold text-[#07182c]">
                                    {doctor.name}
                                </h3>

                                <p className="mt-1 text-[12px] font-semibold text-slate-500">
                                    {doctor.specialty}
                                </p>

                                <div className="mt-3 flex items-center gap-1">
                                    <FaStar className="text-[13px] text-[#ffb020]" />
                                    <span className="text-[13px] font-extrabold text-[#07182c]">
                                        {doctor.rating}
                                    </span>
                                    <span className="text-[12px] font-semibold text-slate-400">
                                        ({doctor.reviews})
                                    </span>
                                </div>

                                <p className="mt-2 text-[12px] font-bold text-[#f7b731]">
                                    Online Available
                                </p>
                            </div>

                            <span className="absolute left-[98px] top-5 h-3 w-3 rounded-full bg-[#22c55e] ring-2 ring-white" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TopRatedDoctors;
