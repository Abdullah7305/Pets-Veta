import DoctorCard from "./DoctorCard";
import type { DoctorsListProps } from "../types/doctorcart.types";

const DoctorsList = ({
    doctors,
    loading,
    onBookAppointment,
}: DoctorsListProps) => {
    if (loading) {
        return (
            <div className="rounded-3xl bg-white p-10 text-center font-black text-[#078b91]">
                Loading doctors...
            </div>
        );
    }

    if (doctors.length === 0) {
        return (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
                <h2 className="text-xl font-black">No doctors found</h2>
                <p className="mt-2 text-sm text-slate-500">
                    Try changing your search.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-5">
            {doctors.map((doctor) => (
                <DoctorCard
                    key={doctor.id}
                    doctor={doctor}
                    onBookAppointment={onBookAppointment}
                />
            ))}
        </div>
    );
};

export default DoctorsList;
