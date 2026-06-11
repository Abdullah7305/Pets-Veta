import { CalendarDays, GraduationCap, ShieldCheck, User } from "lucide-react";
import { type Doctor } from "../apis/getDoctors.api";
import { NavLink } from "react-router-dom";

interface DoctorCardProps {
    doctor: Doctor;
    onBookAppointment: (doctorId: string, checkupTime?: string) => void;
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
    return (
        <div
            key={doctor.id}
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
        >
            <div className="grid gap-6 2xl:grid-cols-[1.1fr_0.75fr_1fr_210px]">
                <div className="flex gap-5">
                    <div>
                        {
                            doctor?.profileImage?.startsWith('/') ? (
                                <img
                                    src={doctor.profileImage}
                                    alt="Doctor"
                                    className="h-28 w-28 rounded-3xl object-cover"
                                />
                            ) : (
                                <User
                                    size={112}
                                    className="rounded-3xl border p-4 text-gray-400"
                                />
                            )
                        }


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


                    <h3 className="mt-5 text-sm font-black">Next Available</h3>

                    <p className="mt-2 text-sm text-slate-600">
                        {doctor.nextAvailable
                            ? `${doctor.nextAvailable.day}, ${doctor.nextAvailable.startTime} - ${doctor.nextAvailable.endTime}`
                            : "No upcoming slot"}
                    </p>
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
