import { type AppointmentStatus } from "../doctor.types";

export const StatusBadge = ({ status }: { status: AppointmentStatus }) => {
    const styles: Record<AppointmentStatus, string> = {
        Confirmed: "bg-green-50 text-green-700",
        Pending: "bg-orange-50 text-orange-600",
        Completed: "bg-blue-50 text-blue-700",
        Cancelled: "bg-red-50 text-red-700",
    };

    return (
        <span
            className={`inline-flex rounded-xl px-4 py-2 text-xs font-black ${styles[status]}`}
        >
            {status}
        </span>
    );
};