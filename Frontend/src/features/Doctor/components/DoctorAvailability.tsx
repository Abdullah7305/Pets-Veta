import {
  CalendarDays,
  Clock3,
  Copy,
  DollarSign,
  Home,
  LayoutDashboard,
  LogOut,
  Plus,
  Settings,
  User,
  Users,
} from "lucide-react";
import { useState } from "react";

import Button from "../../../shared/components/Button/Button";

type DaySchedule = {
  day: string;
  enabled: boolean;
  slots: string[];
};

const initialSchedule: DaySchedule[] = [
  {
    day: "Monday",
    enabled: true,
    slots: [
      "10:00 AM - 11:00 AM",
      "12:00 PM - 01:00 PM",
      "04:00 PM - 05:00 PM",
    ],
  },
  {
    day: "Tuesday",
    enabled: true,
    slots: ["11:00 AM - 12:00 PM", "03:00 PM - 04:00 PM"],
  },
  {
    day: "Wednesday",
    enabled: true,
    slots: [
      "10:00 AM - 11:00 AM",
      "02:00 PM - 03:00 PM",
      "02:00 PM - 03:00 PM",
      "05:00 PM - 06:00 PM",
    ],
  },
  {
    day: "Thursday",
    enabled: true,
    slots: ["11:00 AM - 12:00 PM", "04:00 PM - 05:00 PM"],
  },
  {
    day: "Friday",
    enabled: true,
    slots: [
      "10:00 AM - 11:00 AM",
      "12:00 PM - 01:00 PM",
      "04:00 PM - 05:00 PM",
    ],
  },
  {
    day: "Saturday",
    enabled: false,
    slots: [],
  },
  {
    day: "Sunday",
    enabled: false,
    slots: [],
  },
];

const DoctorAvailability = () => {
  const [schedule, setSchedule] = useState<DaySchedule[]>(initialSchedule);

  const toggleDay = (day: string) => {
    setSchedule((prev) =>
      prev.map((item) =>
        item.day === day ? { ...item, enabled: !item.enabled } : item,
      ),
    );
  };

  const removeSlot = (day: string, slotIndex: number) => {
    setSchedule((prev) =>
      prev.map((item) =>
        item.day === day
          ? {
            ...item,
            slots: item.slots.filter((_, index) => index !== slotIndex),
          }
          : item,
      ),
    );
  };

  const handleSaveChanges = () => {
    console.log("Doctor availability:", schedule);
  };

  return (
    <main className="min-h-screen bg-[#F8FAFA] text-[#20263D]">



      <section className="">

        <div className="px-5 py-8 lg:px-10">
          {/* Page Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-black text-[#101b3d]">
                My Availability
              </h1>

              <p className="mt-2 text-slate-500">
                Manage your weekly availability and time slots
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-[#20263D] transition hover:bg-slate-50"
              >
                <CalendarDays size={18} />
                Weekly View
              </button>

              <Button
                type="button"
                className="flex w-auto items-center justify-center gap-2 px-5"
              >
                <Plus size={18} />
                Add Time Slot
              </Button>
            </div>
          </div>

          {/* Weekly Schedule */}
          <section className="mt-7 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <div className="grid min-w-[1100px] grid-cols-7">
                {schedule.map((item) => (
                  <div
                    key={item.day}
                    className="min-h-[420px] border-r border-slate-200 px-3 py-7 last:border-r-0"
                  >
                    <h3 className="text-center text-lg font-black text-[#101b3d]">
                      {item.day}
                    </h3>

                    <div className="mt-5 flex justify-center">
                      <button
                        type="button"
                        onClick={() => toggleDay(item.day)}
                        className={`relative h-8 w-14 rounded-full transition ${item.enabled ? "bg-[#078b91]" : "bg-slate-300"
                          }`}
                      >
                        <span
                          className={`absolute top-1 h-6 w-6 rounded-full bg-white transition ${item.enabled ? "left-7" : "left-1"
                            }`}
                        />
                      </button>
                    </div>

                    {item.enabled ? (
                      <div className="mt-7 space-y-3">
                        {item.slots.map((slot, index) => (
                          <div
                            key={`${slot}-${index}`}
                            className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm font-bold text-[#078b91]"
                          >
                            <span>{slot}</span>

                            <button
                              type="button"
                              onClick={() => removeSlot(item.day, index)}
                              className="ml-2 text-[#20263D] hover:text-red-500"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="mt-7 flex h-44 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 text-center text-sm font-bold text-slate-500">
                        <CalendarDays size={26} className="mb-3" />
                        Not Available
                        <br />
                        (Day Off)
                      </div>
                    )}

                    <button
                      type="button"
                      className="mt-12 w-full text-sm font-black text-[#078b91]"
                    >
                      + Add Slot
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 border-t border-slate-200 bg-[#F0FAF7] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex items-center gap-3 text-sm font-semibold text-[#078b91]">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#078b91] text-white">
                  i
                </span>
                Your availability will help pet owners to book appointments with
                you.
              </p>

              <Button
                type="button"
                className="w-auto px-7"
                onClick={handleSaveChanges}
              >
                Save Changes
              </Button>
            </div>
          </section>

          {/* Bottom Section */}
          <section className="mt-7 grid gap-6 xl:grid-cols-[330px_1fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-black text-[#101b3d]">
                Quick Actions
              </h2>

              <div className="mt-6 space-y-5">
                <QuickAction
                  icon={<Copy size={21} />}
                  title="Copy Last Week Availability"
                  text="Copy your previous week schedule"
                />

                <QuickAction
                  icon={<Clock3 size={21} />}
                  title="Set Default Availability"
                  text="Set a default time for all working days"
                />

                <QuickAction
                  icon={<CalendarDays size={21} />}
                  title="Block Date"
                  text="Block specific dates for unavailable"
                />
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <CalendarDays size={28} className="text-[#078b91]" />

                <div>
                  <h2 className="text-xl font-black text-[#101b3d]">
                    Upcoming Schedule
                  </h2>

                  <p className="text-sm text-slate-500">
                    Your next 7 days availability overview
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <UpcomingRow
                  day="Today, 22 May"
                  sub="Wednesday"
                  slots={[
                    "10:00 AM - 11:00 AM",
                    "02:00 PM - 03:00 PM",
                    "05:00 PM - 06:00 PM",
                  ]}
                />

                <UpcomingRow
                  day="Tomorrow, 23 May"
                  sub="Thursday"
                  slots={["11:00 AM - 12:00 PM", "04:00 PM - 05:00 PM"]}
                />

                <UpcomingRow
                  day="24 May"
                  sub="Friday"
                  slots={[
                    "10:00 AM - 11:00 AM",
                    "12:00 PM - 01:00 PM",
                    "04:00 PM - 05:00 PM",
                  ]}
                />
              </div>

              <button
                type="button"
                className="mt-6 text-sm font-black text-[#078b91]"
              >
                View Full Calendar →
              </button>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
};

const SidebarItem = ({
  icon,
  label,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) => {
  return (
    <button
      type="button"
      className={`flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-left text-sm font-black transition ${active
          ? "bg-[#D4E2E0]/60 text-[#078b91]"
          : "text-[#20263D] hover:bg-[#D4E2E0]/30"
        }`}
    >
      {icon}
      {label}
    </button>
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
  day,
  sub,
  slots,
}: {
  day: string;
  sub: string;
  slots: string[];
}) => {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 p-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="min-w-40">
        <h3 className="font-black text-[#101b3d]">{day}</h3>
        <p className="text-sm text-slate-500">{sub}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {slots.map((slot) => (
          <span
            key={slot}
            className="rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm font-bold text-[#078b91]"
          >
            {slot}
          </span>
        ))}
      </div>

      <p className="font-black text-slate-600">{slots.length} Slots</p>
    </div>
  );
};

export default DoctorAvailability;