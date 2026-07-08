import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaCalendarAlt, FaStar, FaUserMd } from "react-icons/fa";

import {
    getApprovedDoctors,
    type Doctor,
} from "@/features/Doctorcart/apis/getDoctors.api";

const isValidDoctorImage = (image?: string) => {
    if (!image) return false;

    const cleanImage = image.trim();

    if (!cleanImage) return false;

    return !cleanImage.toLowerCase().includes("enter your image");
};

const TopRatedDoctors = () => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let isMounted = true;

        const loadDoctors = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await getApprovedDoctors(1, 4, "");
                const approvedDoctors = response.data.data || [];

                const sortedDoctors = [...approvedDoctors].sort(
                    (firstDoctor, secondDoctor) =>
                        Number(secondDoctor.experience || 0) -
                        Number(firstDoctor.experience || 0)
                );

                if (isMounted) {
                    setDoctors(sortedDoctors.slice(0, 4));
                }
            } catch (apiError) {
                console.error("Failed to load approved doctors:", apiError);

                if (isMounted) {
                    setError("Unable to load doctors right now.");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        void loadDoctors();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <section className="bg-[#f5fbff] px-5 py-10 lg:px-16">
            <div className="mx-auto max-w-7xl">
                <div className="mb-7 flex items-center justify-between gap-4">
                    <div>
                        <h2 className="text-[26px] font-black leading-tight tracking-[-0.04em] text-[#07182c] md:text-[30px]">
                            Top Rated <span className="text-[#009f9d]">Doctors</span>
                        </h2>
                    </div>

                    <Link
                        to="/doctors"
                        className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-black text-[#009f9d] shadow-sm ring-1 ring-[#009f9d]/10 transition hover:-translate-y-0.5 hover:bg-[#009f9d] hover:text-white"
                    >
                        View All Doctors
                        <FaArrowRight className="text-xs" />
                    </Link>
                </div>

                {loading && (
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div
                                key={index}
                                className="relative flex h-[150px] overflow-hidden rounded-[22px] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.07)]"
                            >
                                <div className="w-[112px] shrink-0 animate-pulse bg-slate-100" />

                                <div className="flex flex-1 flex-col justify-center px-4">
                                    <div className="h-4 w-3/4 animate-pulse rounded bg-slate-100" />
                                    <div className="mt-3 h-3 w-1/2 animate-pulse rounded bg-slate-100" />
                                    <div className="mt-4 h-3 w-2/3 animate-pulse rounded bg-slate-100" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && error && (
                    <div className="rounded-[22px] border border-red-100 bg-red-50 px-5 py-4 text-sm font-semibold text-red-600">
                        {error}
                    </div>
                )}

                {!loading && !error && doctors.length === 0 && (
                    <div className="flex items-center gap-3 rounded-[22px] border border-slate-100 bg-white px-5 py-5 text-sm font-semibold text-slate-500 shadow-[0_10px_35px_rgba(15,23,42,0.06)]">
                        <FaUserMd className="text-[#009f9d]" />
                        No approved doctors available yet.
                    </div>
                )}

                {!loading && !error && doctors.length > 0 && (
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
                        {doctors.map((doctor) => {
                            const hasImage = isValidDoctorImage(doctor.profileImage);

                            return (
                                <Link
                                    key={doctor.id}
                                    to={`/doctor-profile/${doctor.id}`}
                                    className="relative flex h-[150px] overflow-hidden rounded-[22px] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.07)] transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.12)]"
                                >
                                    <div className="relative flex w-[112px] shrink-0 items-center justify-center bg-gradient-to-br from-[#eefafa] to-white">
                                        {hasImage ? (
                                            <img
                                                src={doctor.profileImage}
                                                alt={doctor.name}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <FaUserMd className="text-5xl text-[#009f9d]/45" />
                                        )}

                                        <span
                                            className={`absolute bottom-4 left-4 h-3 w-3 rounded-full ring-2 ring-white ${doctor.status === "active"
                                                    ? "bg-[#22c55e]"
                                                    : "bg-slate-300"
                                                }`}
                                        />
                                    </div>

                                    <div className="flex min-w-0 flex-1 flex-col justify-center px-4">
                                        <h3 className="truncate text-[15px] font-black text-[#07182c]">
                                            {doctor.name}
                                        </h3>

                                        <p className="mt-1 line-clamp-1 text-[12px] font-semibold text-slate-500">
                                            {doctor.specialization || "Veterinary Doctor"}
                                        </p>

                                        <div className="mt-3 flex items-center gap-1">
                                            <FaStar className="text-[13px] text-[#ffb020]" />

                                            <span className="text-[13px] font-black text-[#07182c]">
                                                Verified
                                            </span>

                                            <span className="text-[12px] font-semibold text-slate-400">
                                                · {doctor.experience || 0} yrs
                                            </span>
                                        </div>

                                        <p className="mt-2 flex items-center gap-1 text-[12px] font-bold text-[#f7b731]">
                                            <FaCalendarAlt className="text-[11px]" />

                                            {doctor.nextAvailable
                                                ? `${doctor.nextAvailable.day}, ${doctor.nextAvailable.startTime}`
                                                : "No upcoming slot"}
                                        </p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};

export default TopRatedDoctors;