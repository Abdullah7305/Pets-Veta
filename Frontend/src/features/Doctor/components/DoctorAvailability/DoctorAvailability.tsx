import { useEffect, useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom"; // 💡 Added: Router navigation
import { CreditCard, AlertTriangle, ArrowRight } from "lucide-react"; // 💡 Added: Icons
import ScheduleModal from "./ScheduleModal";
import ScheduleTable from "./ScheduleTable";
import { createDoctorAvailabilitySlot, getDoctorAvailability } from "../../api/doctorAvailabilityServices";
import { getDoctorProfileApi } from "../../../Doctorcart/apis/doctorProfile.api"; // 💡 Added: Profile API to fetch Stripe status
import type {
  BackendScheduleItem,
  ScheduleFormData,
} from "../../doctor.types";

const DoctorAvailability = () => {
  const navigate = useNavigate(); // 💡 Initialize navigate

  const [schedule, setSchedule] = useState<ScheduleFormData>({
    date: "",
    startTime: "",
    endTime: ""
  });

  const [schedulesList, setSchedulesList] = useState<BackendScheduleItem[]>([]);
  const [error, setError] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);

  // 💡 Added: Stripe validation state
  const [stripeOnboardingCompleted, setStripeOnboardingCompleted] = useState<boolean>(false);
  const [loadingProfile, setLoadingProfile] = useState<boolean>(true);

  // Reusable helper to pull data directly into state
  const loadDoctorSchedule = async () => {
    try {
      const response = await getDoctorAvailability();
      const data = response?.data || response;
      if (Array.isArray(data)) {
        setSchedulesList(data);
      }
    } catch (err) {
      console.error("Failed to load doctor availability slots:", err);
      setError("Could not retrieve your active schedule list.");
    }
  };

  // 💡 Added: Load profile status to confirm Stripe status on mount
  const checkStripeStatusOnMount = async () => {
    try {
      setLoadingProfile(true);
      const response = await getDoctorProfileApi();
      if (response?.success) {
        setStripeOnboardingCompleted(response.data.stripeOnboardingCompleted ?? false);
      }
    } catch (err) {
      console.error("Error reading doctor profile for Stripe verification:", err);
    } finally {
      setLoadingProfile(false);
    }
  };

  useEffect(() => {
    checkStripeStatusOnMount();
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
      const response = await createDoctorAvailabilitySlot(schedule);
      if (response?.success) {
        setSchedule({ date: "", startTime: "", endTime: "" });
        setOpenModal(false);
        await loadDoctorSchedule();
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to save schedule slot.");
    }
  };

  if (loadingProfile) {
    return (
      <div className="flex h-64 items-center justify-center bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
        <div className="text-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-teal-600 border-t-transparent mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-500">Checking onboarding credentials...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8FAFA] px-4 py-5 text-[#20263D] max-w-7xl mx-auto">

      {/* 💡 Lock Block Check: Show locked warning UI if onboarding is incomplete */}
      {!stripeOnboardingCompleted ? (
        <section className="rounded-3xl border border-amber-200 bg-amber-50/50 p-6 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
                <AlertTriangle size={28} />
              </div>
              <div>
                <h3 className="text-lg font-black text-amber-900">Payout Wallet Setup Required</h3>
                <p className="mt-1 text-sm font-medium leading-relaxed text-amber-700 max-w-2xl">
                  To protect our platform booking flows, you must link your bank account via Stripe Connect before adding availability slots. Once onboarded, you can schedule slots and receive patient payments instantly.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate("/doctor-profile")}
              className="flex h-11 w-full md:w-auto items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 text-sm font-bold text-white transition hover:bg-teal-700 cursor-pointer shadow-md shadow-teal-600/10 shrink-0"
            >
              <CreditCard size={16} />
              Go to Profile Setup
              <ArrowRight size={16} />
            </button>
          </div>
        </section>
      ) : (
        /* Render Active Form if Stripe Connected */
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
                className="rounded-xl bg-teal-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-teal-700 cursor-pointer"
              >
                Add Time Slot
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Render active slots list beneath */}
      <section className="mt-10">
        <h2 className="mb-4 text-xl font-extrabold text-slate-900">
          Generated Schedule List
        </h2>
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