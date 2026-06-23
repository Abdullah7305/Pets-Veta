import { data, Link, useNavigate, useParams } from "react-router-dom";
import {
    FaArrowLeft,
    FaCheckCircle,
    FaGraduationCap,
    FaUserMd,
} from "react-icons/fa";
import { User } from 'lucide-react'

import { getDoctorProfileData } from "../apis/doctorProfile.api";
import { useEffect, useState } from "react";
import BookingModal from "../components/BookSlotModal";
import { bookDoctorSlot } from "../apis/bookSlot";
type DoctorType = {
    id: string;
    name: string;
    image: string;
    status: string;
    specialty: string;
    experience: number;
    rating: number;
    reviews: number;
    location: string;
    fees: number;
    tags: string[];
    about: string;
    education: string;
    qualification: string;
    certification: string;
    nextSlot: string;
    specialization: string;
    availableSlots: BookableSlot[];
    todaySlots: BookableSlot[];
    nextAvailable: BookableSlot | null;
} | null;
import type { DoctorProfileViewData } from "../types/appointment.types";


const DoctorProfilePage = () => {
    const { id } = useParams();

    const [doctor, setDoctor] = useState<DoctorProfileViewData>(null);
    const [loading, setLoading] = useState(false);


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState<BookableSlot | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const doctorProfileData = async () => {
            setLoading(true);
            if (id) {
                const data = await getDoctorProfileData(id);
                setDoctor(data);
            }

            setLoading(false);
        };
        doctorProfileData();
    }, [id]);

    const handleConfirmBooking = async (scheduleId: string) => {
        console.log("Confirmed booking for Schedule ID:", scheduleId);

        if (!scheduleId || !doctor?.id) {
            console.log("IDs not found");
            return;
        }

        const schedule = {
            slotId: scheduleId,
            doctorId: doctor.id,
        };

        try {
            const response = await bookDoctorSlot(schedule);

            console.log("Slot lock response is:", response);

            if (!response?.success || !response?.data?.appointmentId) {
                console.log("Failed to lock slot");
                return;
            }

            // Pehle old booking data clear kar do taake stale data issue na aaye
            localStorage.removeItem("doctorId");
            localStorage.removeItem("scheduleId");
            localStorage.removeItem("appointmentId");
            localStorage.removeItem("petPatientId");

            // New booking data save karo
            localStorage.setItem("doctorId", doctor.id);
            localStorage.setItem("scheduleId", scheduleId);
            localStorage.setItem("appointmentId", response.data.appointmentId);

            setIsModalOpen(false);
            setSelectedSlot(null);

            navigate("/book-appointment");
        } catch (error) {
            console.log("Slot booking error:", error);
        }
    };

    if (!doctor) {
        return (
            <section className="min-h-screen bg-[#f5fbff] px-5 py-12 lg:px-16">
                <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 text-center shadow-[0_10px_35px_rgba(15,23,42,0.08)]">
                    <h1 className="text-3xl font-extrabold text-[#07182c]">
                        {loading ? "Loading..." : "Doctor Not Found"}
                    </h1>
                    <p className="mt-2 text-slate-500">
                        The doctor profile you are looking for does not exist.
                    </p>
                    <Link
                        to="/doctors"
                        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#009f9d] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#007f7d]"
                    >
                        <FaArrowLeft />
                        Back to Doctors
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className="min-h-screen bg-[#f5fbff] px-5 py-12 lg:px-16">
            <div className="mx-auto max-w-7xl">
                <Link
                    to="/doctors"
                    className="mb-6 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-bold text-[#009f9d] shadow-sm transition hover:bg-[#eefafa]"
                >
                    <FaArrowLeft />
                    Back to Doctors
                </Link>

                <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
                    <div className="space-y-6">
                        {/* Profile Card */}
                        <div className="rounded-3xl bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,0.08)]">
                            <div className="grid gap-6 md:grid-cols-[220px_1fr]">
                                <div className="relative h-60 overflow-hidden flex justify-center items-center rounded-3xl bg-[#eefafa]">
                                    {doctor.image.startsWith('/') ? (
                                        <img
                                            src={doctor.image}
                                            alt={doctor.name}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <User size={112} className="text-slate-300" />
                                    )}
                                </div>

                                <div>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h1 className="text-3xl font-extrabold text-[#07182c]">
                                            {doctor.name}
                                        </h1>
                                        <FaCheckCircle className="text-xl text-[#009f9d]" />
                                    </div>
                                    <p className="mt-2 text-lg font-bold text-slate-500">
                                        {doctor.specialization}
                                    </p>

                                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                                        <div className="rounded-2xl bg-[#f5fbff] p-4">
                                            <p className="text-sm font-semibold text-slate-500">
                                                Experience
                                            </p>
                                            <h3 className="mt-1 text-xl font-extrabold text-[#07182c]">
                                                {doctor.experience} Years
                                            </h3>
                                        </div>
                                        <div className="rounded-2xl bg-[#f5fbff] p-4">
                                            <p className="text-sm font-semibold text-slate-500">
                                                Consultation Fee
                                            </p>
                                            <h3 className="mt-1 text-xl font-extrabold text-[#07182c]">
                                                Rs. {doctor.fees}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Education Card */}
                        <div className="rounded-3xl bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,0.08)]">
                            <h2 className="mb-4 flex items-center gap-2 text-xl font-extrabold text-[#07182c]">
                                <FaGraduationCap className="text-[#009f9d]" />
                                Education & Qualification
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm font-bold text-slate-500">Education</p>
                                    <p className="mt-1 font-semibold text-[#07182c]">{doctor.education}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-500">Qualification</p>
                                    <p className="mt-1 font-semibold text-[#07182c]">{doctor.specialization}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Booking Sidebar */}
                    <aside className="h-fit rounded-3xl bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,0.08)]">
                        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eefafa] text-2xl text-[#009f9d]">
                            <FaUserMd />
                        </div>

                        <h2 className="text-2xl font-extrabold text-[#07182c]">
                            Select Slot to Book Appointment
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            Select this doctor and continue to appointment form.
                        </p>

                        <div className="mt-5">
                            <h3 className="text-sm font-extrabold text-[#07182c]">
                                Available Slots
                            </h3>

                            {doctor.availableSlots?.length > 0 ? (
                                <div className="mt-3 grid grid-cols-2 gap-3">
                                    {doctor.availableSlots.slice(0, 8).map((slot) => {
                                        // Format the date to show on the button (e.g., Jun 19)
                                        const shortDate = new Date(slot.date).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                        });

                                        return (
                                            <button
                                                key={slot.scheduleId}
                                                id={slot.scheduleId}
                                                onClick={() => {
                                                    setSelectedSlot(slot);
                                                    setIsModalOpen(true);
                                                }}
                                                className="flex flex-col items-center justify-center rounded-xl border border-slate-200 px-2 py-3 text-center text-xs font-extrabold text-[#07182c] transition hover:border-[#009f9d] hover:bg-[#eefafa]"
                                            >
                                                <span className="mb-1 block text-[11px] font-bold text-[#009f9d]">
                                                    {shortDate} • {slot.day.slice(0, 3)}
                                                </span>
                                                <span>
                                                    {slot.startTime} - {slot.endTime}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            ) : (
                                <p className="mt-3 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-500">
                                    No appointment slots available.
                                </p>
                            )}
                        </div>
                    </aside>
                </div>
            </div>

            {/* Render the Modal */}
            <BookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmBooking}
                slot={selectedSlot}
            />
        </section>
    );
};

export default DoctorProfilePage;