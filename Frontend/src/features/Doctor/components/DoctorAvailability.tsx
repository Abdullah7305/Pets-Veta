import {
  CalendarDays,
  Clock3,
  Copy,
  Info,
  Plus,
  TimerReset,
  Trash2,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

import Button from "../../../shared/components/Button/Button";

type WeekDay =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

type TimeSlot = {
  id: string;
  date: string;
  day: WeekDay;
  label: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
};

type SlotForm = {
  date: string;
  day: WeekDay;
  startTime: string;
  endTime: string;
};

const weekDays: { value: WeekDay; label: string }[] = [
  { value: "MONDAY", label: "Monday" },
  { value: "TUESDAY", label: "Tuesday" },
  { value: "WEDNESDAY", label: "Wednesday" },
  { value: "THURSDAY", label: "Thursday" },
  { value: "FRIDAY", label: "Friday" },
  { value: "SATURDAY", label: "Saturday" },
  { value: "SUNDAY", label: "Sunday" },
];

const initialSlots: TimeSlot[] = [
  {
    id: "1",
    date: "2026-06-03",
    day: "MONDAY",
    label: "Monday",
    startTime: "10:00",
    endTime: "11:00",
    isAvailable: true,
  },
  {
    id: "2",
    date: "2026-06-03",
    day: "MONDAY",
    label: "Monday",
    startTime: "12:00",
    endTime: "13:00",
    isAvailable: true,
  },
  {
    id: "3",
    date: "2026-06-04",
    day: "TUESDAY",
    label: "Tuesday",
    startTime: "11:00",
    endTime: "12:00",
    isAvailable: true,
  },
  {
    id: "4",
    date: "2026-06-05",
    day: "WEDNESDAY",
    label: "Wednesday",
    startTime: "14:00",
    endTime: "15:00",
    isAvailable: true,
  },
];

const DoctorAvailability = () => {
  const [slots, setSlots] = useState<TimeSlot[]>(initialSlots);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      if (a.date !== b.date) {
        return a.date.localeCompare(b.date);
      }

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
    setSlotForm({
      date: "",
      day: "MONDAY",
      startTime: "",
      endTime: "",
    });
  };

  const handleAddSlot = () => {
    if (
      !slotForm.date ||
      !slotForm.day ||
      !slotForm.startTime ||
      !slotForm.endTime
    ) {
      alert("Please select date, day, start time and end time.");
      return;
    }

    if (slotForm.startTime >= slotForm.endTime) {
      alert("End time must be greater than start time.");
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
        slot.id === slotId
          ? {
              ...slot,
              isAvailable: !slot.isAvailable,
            }
          : slot,
      ),
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

    // Later API call:
    // await saveDoctorAvailability(payload);
  };

  return (
    <main className="min-h-screen bg-[#F8FAFA] px-4 py-6 text-[#20263D] sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-[#078b91]">
              Doctor Panel
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-[-0.03em] text-[#101b3d]">
              My Availability
            </h1>

            <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-slate-500">
              Set your appointment date and time slots so pet owners can book
              according to your schedule.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              type="button"
              className="flex h-12 w-auto items-center justify-center gap-2 px-5"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus size={18} />
              Add Time Slot
            </Button>

            <Button
              type="button"
              className="h-12 w-auto px-6"
              onClick={handleSaveChanges}
            >
              Save Changes
            </Button>
          </div>
        </div>

        <section className="mb-6 grid gap-4 md:grid-cols-3">
          <StatsCard title="Total Slots" value={totalSlots.toString()} />
          <StatsCard title="Active Slots" value={activeSlots.toString()} />
          <StatsCard title="Inactive Slots" value={inactiveSlots.toString()} />
        </section>

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 bg-[#F0FAF7] px-5 py-4">
            <p className="flex items-center gap-3 text-sm font-semibold text-[#078b91]">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#078b91] text-white">
                <Info size={15} />
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
                {sortedSlots.length > 0 ? (
                  sortedSlots.map((slot) => (
                    <tr key={slot.id} className="transition hover:bg-slate-50">
                      <td className="px-4 py-5 align-middle">
                        <span className="inline-flex rounded-xl bg-slate-100 px-3 py-2 text-xs font-black text-[#20263D]">
                          {formatDate(slot.date)}
                        </span>
                      </td>

                      <td className="px-4 py-5 align-middle">
                        <h3 className="truncate text-sm font-black text-[#101b3d]">
                          {slot.label}
                        </h3>

                        <p className="mt-1 truncate text-[11px] font-bold uppercase tracking-wide text-slate-400">
                          {slot.day}
                        </p>
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
                            className={`relative h-7 w-12 rounded-full transition ${
                              slot.isAvailable ? "bg-[#078b91]" : "bg-slate-300"
                            }`}
                          >
                            <span
                              className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
                                slot.isAvailable ? "left-6" : "left-1"
                              }`}
                            />
                          </button>

                          <span
                            className={`w-fit rounded-full px-3 py-1.5 text-[11px] font-black ${
                              slot.isAvailable
                                ? "bg-green-50 text-green-700"
                                : "bg-red-50 text-red-600"
                            }`}
                          >
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
                    <td
                      colSpan={6}
                      className="px-6 py-14 text-center text-sm font-semibold text-slate-500"
                    >
                      No availability slots added yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-7 grid gap-6 xl:grid-cols-[330px_1fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#101b3d]">
              Quick Actions
            </h2>

            <div className="mt-6 space-y-5">
              <QuickAction
                icon={<Copy size={21} />}
                title="Copy Last Week"
                text="Copy your previous week availability"
              />

              <QuickAction
                icon={<TimerReset size={21} />}
                title="Set Default Hours"
                text="Apply one time range to active dates"
              />

              <QuickAction
                icon={<Clock3 size={21} />}
                title="Block Time"
                text="Block specific dates or time slots"
              />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D4E2E0]/60 text-[#078b91]">
                <CalendarDays size={24} />
              </div>

              <div>
                <h2 className="text-xl font-black text-[#101b3d]">
                  Upcoming Schedule
                </h2>

                <p className="text-sm text-slate-500">
                  Next active appointment slots
                </p>
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

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-[#101b3d]">
                  Add Time Slot
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Select date, day, start time and end time.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  resetSlotForm();
                  setIsModalOpen(false);
                }}
                className="rounded-full bg-slate-100 p-2 text-slate-500 transition hover:bg-slate-200"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-black text-[#20263D]">
                  Date
                </label>

                <input
                  type="date"
                  value={slotForm.date}
                  onChange={(e) =>
                    setSlotForm((prev) => ({
                      ...prev,
                      date: e.target.value,
                    }))
                  }
                  className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none transition focus:border-[#078b91] focus:ring-4 focus:ring-[#D4E2E0]/60"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-black text-[#20263D]">
                  Day
                </label>

                <select
                  value={slotForm.day}
                  onChange={(e) =>
                    setSlotForm((prev) => ({
                      ...prev,
                      day: e.target.value as WeekDay,
                    }))
                  }
                  className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none transition focus:border-[#078b91] focus:ring-4 focus:ring-[#D4E2E0]/60"
                >
                  {weekDays.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-2 block text-sm font-black text-[#20263D]">
                    Start Time
                  </label>

                  <input
                    type="time"
                    value={slotForm.startTime}
                    onChange={(e) =>
                      setSlotForm((prev) => ({
                        ...prev,
                        startTime: e.target.value,
                      }))
                    }
                    className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none transition focus:border-[#078b91] focus:ring-4 focus:ring-[#D4E2E0]/60"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-black text-[#20263D]">
                    End Time
                  </label>

                  <input
                    type="time"
                    value={slotForm.endTime}
                    onChange={(e) =>
                      setSlotForm((prev) => ({
                        ...prev,
                        endTime: e.target.value,
                      }))
                    }
                    className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none transition focus:border-[#078b91] focus:ring-4 focus:ring-[#D4E2E0]/60"
                  />
                </div>
              </div>

              <div className="rounded-2xl bg-[#F0FAF7] p-4 text-sm font-semibold text-[#078b91]">
                This slot will be added to your appointment availability.
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    resetSlotForm();
                    setIsModalOpen(false);
                  }}
                >
                  Cancel
                </Button>

                <Button type="button" onClick={handleAddSlot}>
                  Add Slot
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

const StatsCard = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-bold text-slate-500">{title}</p>
      <h3 className="mt-2 text-3xl font-black text-[#078b91]">{value}</h3>
    </div>
  );
};

const QuickAction = ({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) => {
  return (
    <div className="flex gap-4 border-b border-slate-100 pb-4 last:border-b-0">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#D4E2E0]/60 text-[#078b91]">
        {icon}
      </div>

      <div>
        <h3 className="font-black text-[#101b3d]">{title}</h3>
        <p className="mt-1 text-sm text-slate-500">{text}</p>
      </div>
    </div>
  );
};

const UpcomingRow = ({
  date,
  day,
  startTime,
  endTime,
}: {
  date: string;
  day: string;
  startTime: string;
  endTime: string;
}) => {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 p-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h3 className="font-black text-[#101b3d]">
          {day} · {date}
        </h3>

        <p className="text-sm text-slate-500">
          {startTime} - {endTime}
        </p>
      </div>

      <span className="w-fit rounded-full bg-green-50 px-3 py-1.5 text-xs font-black text-green-700">
        Available
      </span>
    </div>
  );
};

export default DoctorAvailability;