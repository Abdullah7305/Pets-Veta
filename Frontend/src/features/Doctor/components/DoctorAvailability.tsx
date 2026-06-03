import { useMemo, useState } from "react";
import { CalendarDays, Copy, Clock3, TimerReset } from "lucide-react";

import type { TimeSlot, SlotForm, WeekDay } from "./DoctorTypes";
import { weekDays } from "./DoctorTypes";
import DoctorHeader from "./DoctorHeader";
import SlotsTable from "./SlotsTable";
import AddSlotModal from "./AddSlotModal";
import StatsCard from "./StatsCard";
import QuickAction from "./QuickAction";
import UpcomingRow from "./UpcomingRow";

const DoctorAvailability = () => {
    const [slots, setSlots] = useState<TimeSlot[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [slotForm, setSlotForm] = useState<SlotForm>({
        date: "",
        day: "MONDAY",
        startTime: "",
        endTime: "",
    });

    const totalSlots = slots.length;
    const activeSlots = slots.filter((slot) => slot.isAvailable).length;
    const inactiveSlots = slots.filter((slot) => !slot.isAvailable).length;

    const sortedSlots = useMemo(() => {
        return [...slots].sort((a, b) => {
            if (a.date !== b.date) return a.date.localeCompare(b.date);
            return a.startTime.localeCompare(b.startTime);
        });
    }, [slots]);

    const formatTime = (time: string) => {
        if (!time) return "";
        const [hourText, minute] = time.split(":");
        const hour = Number(hourText);
        const period = hour >= 12 ? "PM" : "AM";
        const formattedHour = hour % 12 || 12;
        return `${String(formattedHour).padStart(2, "0")}:${minute} ${period}`;
    };

    const formatDate = (date: string) => {
        if (!date) return "";
        return new Date(date).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const getDayLabel = (day: WeekDay) => {
        return weekDays.find((item) => item.value === day)?.label || day;
    };

    const resetSlotForm = () => {
        setSlotForm({ date: "", day: "MONDAY", startTime: "", endTime: "" });
        setError(null);
    };

    const handleAddSlot = () => {
        setError(null);
        if (!slotForm.date || !slotForm.day || !slotForm.startTime || !slotForm.endTime) {
            setError("Please select date, day, start time and end time.");
            return;
        }
        if (slotForm.startTime >= slotForm.endTime) {
            setError("Starting time cannot be greater than or equal to the ending time.");
            return;
        }

        const newSlot: TimeSlot = {
            id: crypto.randomUUID(),
            date: slotForm.date,
            day: slotForm.day,
            label: getDayLabel(slotForm.day),
            startTime: slotForm.startTime,
            endTime: slotForm.endTime,
            isAvailable: true,
        };

        setSlots((prev) => [...prev, newSlot]);
        resetSlotForm();
        setIsModalOpen(false);
    };

    const toggleAvailability = (slotId: string) => {
        setSlots((prev) =>
            prev.map((slot) =>
                slot.id === slotId ? { ...slot, isAvailable: !slot.isAvailable } : slot
            )
        );
    };

    const deleteSlot = (slotId: string) => {
        setSlots((prev) => prev.filter((slot) => slot.id !== slotId));
    };

    const handleSaveChanges = async () => {
        const payload = slots.map((slot) => ({
            date: slot.date,
            day: slot.day,
            startTime: slot.startTime,
            endTime: slot.endTime,
            isAvailable: slot.isAvailable,
        }));
        console.log("Backend payload:", payload);
    };

    return (
        <main className="min-h-screen bg-[#F8FAFA] px-4 py-6 text-[#20263D] sm:px-6 lg:px-8">
            <section className="mx-auto max-w-7xl">
                <DoctorHeader onOpenModal={() => setIsModalOpen(true)} onSave={handleSaveChanges} />

                <section className="mb-6 grid gap-4 md:grid-cols-3">
                    <StatsCard title="Total Slots" value={totalSlots.toString()} />
                    <StatsCard title="Active Slots" value={activeSlots.toString()} />
                    <StatsCard title="Inactive Slots" value={inactiveSlots.toString()} />
                </section>

                <SlotsTable
                    slots={sortedSlots}
                    toggleAvailability={toggleAvailability}
                    deleteSlot={deleteSlot}
                    formatDate={formatDate}
                    formatTime={formatTime}
                />

                <section className="mt-7 grid gap-6 xl:grid-cols-[330px_1fr]">
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="text-xl font-black text-[#101b3d]">Quick Actions</h2>
                        <div className="mt-6 space-y-5">
                            <QuickAction icon={<Copy size={21} />} title="Copy Last Week" text="Copy your previous week availability" />
                            <QuickAction icon={<TimerReset size={21} />} title="Set Default Hours" text="Apply one time range to active dates" />
                            <QuickAction icon={<Clock3 size={21} />} title="Block Time" text="Block specific dates or time slots" />
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="mb-5 flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D4E2E0]/60 text-[#078b91]">
                                <CalendarDays size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-black text-[#101b3d]">Upcoming Schedule</h2>
                                <p className="text-sm text-slate-500">Next active appointment slots</p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            {sortedSlots
                                .filter((slot) => slot.isAvailable)
                                .slice(0, 4)
                                .map((slot) => (
                                    <UpcomingRow
                                        key={slot.id}
                                        date={formatDate(slot.date)}
                                        day={slot.label}
                                        startTime={formatTime(slot.startTime)}
                                        endTime={formatTime(slot.endTime)}
                                    />
                                ))}
                        </div>
                    </div>
                </section>
            </section>

            <AddSlotModal
                isOpen={isModalOpen}
                onClose={() => {
                    resetSlotForm();
                    setIsModalOpen(false);
                }}
                slotForm={slotForm}
                setSlotForm={setSlotForm}
                handleAddSlot={handleAddSlot}
                error={error}
                setError={setError}
                resetSlotForm={resetSlotForm}
            />
        </main>
    );
};

export default DoctorAvailability;