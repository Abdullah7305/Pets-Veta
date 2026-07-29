import type { ScheduleTableProps } from "../../doctor.types";

const ScheduleTable = ({ schedules }: ScheduleTableProps) => {

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            timeZone: "UTC" 
        });
    };

    const formatTime = (timeStr: string) => {
        return new Date(timeStr).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            timeZone: "UTC"
        });
    };

    if (schedules.length === 0) {
        return (
            <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-sm font-medium text-slate-500">
                No slots generated yet. Set a schedule block above to create availability.
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full border-collapse text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-700 border-b border-slate-200">
                    <tr>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Start Time</th>
                        <th className="px-6 py-4">End Time</th>
                        <th className="px-6 py-4">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {schedules.map((item) => (
                        <tr key={item.id} className="transition hover:bg-slate-50/50">
                            {/* Formatted Date */}
                            <td className="white-space-nowrap px-6 py-4 font-semibold text-slate-800">
                                {formatDate(item.date)}
                            </td>

                            {/* Formatted Start Time */}
                            <td className="px-6 py-4 text-slate-600 font-medium">
                                {formatTime(item.startTime)}
                            </td>

                            {/* Formatted End Time */}
                            <td className="px-6 py-4 text-slate-600 font-medium">
                                {formatTime(item.endTime)}
                            </td>

                            {/* Status Badge */}
                            <td className="px-6 py-4">
                                <span
                                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${item.isBooked
                                        ? "bg-red-50 text-red-700 border border-red-100"
                                        : "bg-emerald-50 text-emerald-700 border border-emerald-100"
                                        }`}
                                >
                                    <span className={`h-1.5 w-1.5 rounded-full ${item.isBooked ? "bg-red-500" : "bg-emerald-500"}`} />
                                    {item.isBooked ? "Booked" : "Available"}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ScheduleTable;
