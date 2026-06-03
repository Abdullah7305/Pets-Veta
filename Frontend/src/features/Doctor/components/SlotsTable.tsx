import Button from "../../../shared/components/Button/Button";
import { Trash2 } from "lucide-react";
import type { TimeSlot } from "./DoctorTypes";

const SlotsTable = ({
    slots,
    toggleAvailability,
    deleteSlot,
    formatDate,
    formatTime,
}: {
    slots: TimeSlot[];
    toggleAvailability: (id: string) => void;
    deleteSlot: (id: string) => void;
    formatDate: (d: string) => string;
    formatTime: (t: string) => string;
}) => {
    return (
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 bg-[#F0FAF7] px-5 py-4">
                <p className="flex items-center gap-3 text-sm font-semibold text-[#078b91]">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#078b91] text-white">
                        i
                    </span>
                    These availability slots will be shown to users on the Find Doctor
                    page.
                </p>
            </div>

            <div className="overflow-visible">
                <table className="w-full table-fixed text-left">
                    <thead className="bg-slate-50">
                        <tr className="border-b border-slate-200">
                            <th className="w-[18%] px-4 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                                Date
                            </th>
                            <th className="w-[17%] px-4 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                                Day
                            </th>
                            <th className="w-[16%] px-4 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                                Start Time
                            </th>
                            <th className="w-[16%] px-4 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                                End Time
                            </th>
                            <th className="w-[20%] px-4 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                                Status
                            </th>
                            <th className="w-[13%] px-4 py-4 text-right text-xs font-black uppercase tracking-wider text-slate-500">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                        {slots.length > 0 ? (
                            slots.map((slot) => (
                                <tr key={slot.id} className="transition hover:bg-slate-50">
                                    <td className="px-4 py-5 align-middle">
                                        <span className="inline-flex rounded-xl bg-slate-100 px-3 py-2 text-xs font-black text-[#20263D]">
                                            {formatDate(slot.date)}
                                        </span>
                                    </td>

                                    <td className="px-4 py-5 align-middle">
                                        <h3 className="truncate text-sm font-black text-[#101b3d]">{slot.label}</h3>
                                        <p className="mt-1 truncate text-[11px] font-bold uppercase tracking-wide text-slate-400">{slot.day}</p>
                                    </td>

                                    <td className="px-4 py-5 align-middle">
                                        <span className="inline-flex rounded-xl bg-slate-100 px-3 py-2 text-xs font-black text-[#20263D]">
                                            {formatTime(slot.startTime)}
                                        </span>
                                    </td>

                                    <td className="px-4 py-5 align-middle">
                                        <span className="inline-flex rounded-xl bg-slate-100 px-3 py-2 text-xs font-black text-[#20263D]">
                                            {formatTime(slot.endTime)}
                                        </span>
                                    </td>

                                    <td className="px-4 py-5 align-middle">
                                        <div className="flex flex-col gap-2 xl:flex-row xl:items-center">
                                            <button
                                                type="button"
                                                onClick={() => toggleAvailability(slot.id)}
                                                className={`relative h-7 w-12 rounded-full transition ${slot.isAvailable ? "bg-[#078b91]" : "bg-slate-300"}`}>
                                                <span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${slot.isAvailable ? "left-6" : "left-1"}`} />
                                            </button>

                                            <span className={`w-fit rounded-full px-3 py-1.5 text-[11px] font-black ${slot.isAvailable ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
                                                {slot.isAvailable ? "Available" : "Inactive"}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="px-4 py-5 text-right align-middle">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="ml-auto w-auto border-red-200 px-3 py-2 text-xs text-red-500 hover:border-red-400 hover:bg-red-50"
                                            onClick={() => deleteSlot(slot.id)}
                                        >
                                            <span className="flex items-center justify-center gap-1">
                                                <Trash2 size={14} />
                                                Delete
                                            </span>
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="px-6 py-14 text-center text-sm font-semibold text-slate-500">No availability slots added yet.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default SlotsTable;
