import { CalendarDays, GraduationCap, ShieldCheck } from "lucide-react";
import { type Doctor } from "../apis/getDoctors.api";
import { NavLink } from "react-router-dom";

interface DoctorCardProps {
    doctor: Doctor;
    onBookAppointment: (doctorId: string, checkupTime?: string) => void;
}

const DoctorCard = ({ doctor, onBookAppointment }: DoctorCardProps) => {
    return (
        <div
            key={doctor.id}
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
        >
            <div className="grid gap-6 2xl:grid-cols-[1.1fr_0.75fr_1fr_210px]">
                <div className="flex gap-5">
                    <div>
                        <img
                            src={
                                doctor.profileImage ||
                                "https://cdn-icons-png.flaticon.com/512/387/387561.png"
                            }
                            alt={doctor.name}
                            className="h-28 w-28 rounded-3xl object-cover"
                        />

                        <span
                            className={`mt-3 inline-flex rounded-full px-4 py-1.5 text-xs font-black ${doctor.status === "active"
                                ? "bg-green-50 text-green-700"
                                : "bg-red-50 text-red-600"
                                }`}
                        >
                            {doctor.status === "active" ? "Active" : "Inactive"}
                        </span>
                    </div>

                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-2xl font-black">{doctor.name}</h2>
                            <ShieldCheck size={20} className="text-[#078b91]" />
                        </div>

                        <p className="mt-1 text-sm font-semibold text-slate-500">
                            {doctor.specialization}
                        </p>

                        <p className="mt-4 flex items-center gap-2 text-sm text-slate-600">
                            <CalendarDays size={17} />
                            {doctor.experience} years
                        </p>

                        <p className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                            <GraduationCap size={17} />
                            {doctor.education}
                        </p>
                    </div>
                </div>

                <div className="border-slate-200 2xl:border-l 2xl:pl-6">
                    <h3 className="text-sm font-black">Available Days</h3>

                    <div className="mt-3 flex flex-wrap gap-2">
                        {doctor.availableDays.length > 0 ? (
                            doctor.availableDays.map((day) => (
                                <span
                                    key={day}
                                    className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-black text-green-700"
                                >
                                    {day}
                                </span>
                            ))
                        ) : (
                            <span className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-black text-red-600">
                                No available days
                            </span>
                        )}
                    </div>

                    <h3 className="mt-5 text-sm font-black">Next Available</h3>

                    <p className="mt-2 text-sm text-slate-600">
                        {doctor.nextAvailable
                            ? `${doctor.nextAvailable.day}, ${doctor.nextAvailable.startTime} - ${doctor.nextAvailable.endTime}`
                            : "No upcoming slot"}
                    </p>
                </div>

                <div className="border-slate-200 2xl:border-l 2xl:pl-6">
                    <h3 className="text-sm font-black">Today Slots</h3>

                    {doctor.todaySlots.length > 0 ? (
                        <div className="mt-3 flex flex-wrap gap-2">
                            {doctor.todaySlots.map((slot, index) => (
                                <button
                                    key={`${slot.scheduleId}-${slot.startDateTime}-${index}`}
                                    type="button"
                                    onClick={() => onBookAppointment(doctor.id, slot.startDateTime)}
                                    className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold transition hover:border-[#078b91] hover:bg-[#D4E2E0]/40"
                                >
                                    {slot.startTime} - {slot.endTime}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <p className="mt-3 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-500">
                            No slots today
                        </p>
                    )}
                </div>

                <div className="flex flex-col justify-center gap-3 w-full">
                    <NavLink
                        to={`/doctor-profile/${doctor.id}`}
                        className="flex h-11 w-full items-center justify-center rounded-xl bg-[#078b91] text-sm font-black text-white transition hover:bg-[#101b3d]"
                    >
                        Book Appointment
                    </NavLink>
                </div>
            </div>
        </div>
    );
};


export default DoctorCard;
