import { useEffect, useState, type ChangeEvent } from "react";
import ScheduleModal from "./ScheduleModal";
import ScheduleTable from "./ScheduleTable";
import { createDoctorAvailabilitySlot, getDoctorAvailability } from "../../api/doctorAvailabilityServices";
import type {
  BackendScheduleItem,
  ScheduleFormData,
} from "../../doctor.types";

const DoctorAvailability = () => {
  
  const [schedule, setSchedule] = useState<ScheduleFormData>({
    date: "",
    startTime: "",
    endTime: ""
  });


  const [schedulesList, setSchedulesList] = useState<BackendScheduleItem[]>([]);
  const [error, setError] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);

  // Reusable helper to pull data directly into state
  const loadDoctorSchedule = async () => {
    try {
      const response = await getDoctorAvailability();
      // Handle standard wrappers (like response.data) if your API instance utilizes them
      const data = response?.data || response;
      if (Array.isArray(data)) {
        setSchedulesList(data);
      }
    } catch (err) {
      console.error("Failed to load doctor availability slots:", err);
      setError("Could not retrieve your active schedule list.");
    }
  };

  // Initial fetch on component mounting
  useEffect(() => {
    loadDoctorSchedule();
  }, []);

  const handleSchedule = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSchedule((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const scheduleApiFunc = () => {
    if (!schedule.date || !schedule.startTime || !schedule.endTime) {
      setError("Schedule timing data is missing.");
      return;
    }

    if (schedule.startTime >= schedule.endTime) {
      setError("Starting time must be earlier than the ending time.");
      return;
    }

    const selectedDate = new Date(`${schedule.date}T${schedule.startTime}`);
    const currentTime = new Date();
    const [startHours, startMinutes] = schedule.startTime.split(':').map(Number);
    const [endHours, endingMinutes] = schedule.endTime.split(":").map(Number);

    const totalStartTime = (startHours * 60) + startMinutes;
    const totalEndTime = (endHours * 60) + endingMinutes;
    const durationMinutes = totalEndTime - totalStartTime;

    if (durationMinutes % 60 !== 0) {
      setError("Please select full-hour increments only.");
      return;
    }

    if (selectedDate <= currentTime) {
      setError("Please select a future date and time.");
      return;
    }

    setError("");
    setOpenModal(true);
  };

  const handleDoctorSchedule = async () => {
    try {
      setError("");
      console.log("Finalized Schedule ready for Database API: ", schedule);


      await createDoctorAvailabilitySlot(schedule);

    
      setSchedule({
        date: "",
        startTime: "",
        endTime: ""
      });

      setOpenModal(false);

     
      await loadDoctorSchedule();
    } catch (err) {
      console.error("Error creating schedule slot:", err);
      setError("Failed to sync new slot generation with database records.");
      setOpenModal(false);
    }
  };

  return (
    <main className="mx-auto max-w-5xl p-6">
      <section>
        <h1 className="mb-6 text-3xl font-extrabold tracking-tight text-slate-900">
          Set Your Schedule
        </h1>
        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="flex flex-col gap-2">
              <label htmlFor="date" className="text-sm font-bold text-slate-700">
                Select Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={schedule.date}
                onChange={handleSchedule}
                className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-50"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="startTime" className="text-sm font-bold text-slate-700">
                Start Time
              </label>
              <input
                name="startTime"
                type="time"
                id="startTime"
                value={schedule.startTime}
                onChange={handleSchedule}
                className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-50"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="endTime" className="text-sm font-bold text-slate-700">
                End Time
              </label>
              <input
                type="time"
                name="endTime"
                id="endTime"
                value={schedule.endTime}
                onChange={handleSchedule}
                className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-50"
              />
            </div>
          </div>

          {error && (
            <div className="mb-5 mt-5 flex items-center gap-3 rounded-xl border border-red-100 bg-red-50 p-4 text-sm font-bold text-red-600">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500 text-xs font-black text-white">
                !
              </span>
              <p>{error}</p>
            </div>
          )}

          <div className="mt-6 flex justify-end border-t border-slate-100 pt-6">
            <button
              onClick={scheduleApiFunc}
              type="button"
              className="rounded-xl bg-teal-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-teal-700"
            >
              Add Time Slot
            </button>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-xl font-extrabold text-slate-900">
          Generated Schedule List
        </h2>
        {/* Sends backend-compliant type layout safely downstream */}
        <ScheduleTable schedules={schedulesList} />
      </section>

      <ScheduleModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        schedule={schedule}
        setSchedule={setSchedule}
        error={error}
        setError={setError}
        onConfirm={handleDoctorSchedule}
      />
    </main>
  );
};

export default DoctorAvailability;
