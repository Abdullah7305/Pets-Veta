import {
  Calendar,
  ClipboardPlus,
  Info,
  PawPrint,
  Pencil,
  Send,
  ShieldPlus,
  Stethoscope,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

import Button from "../../../../shared/components/Button/Button";
import {
  petIssueReportSchema,
  type PetIssueReportFormData,
} from "../schemas/petIssueReport.schema";
import { useAuth } from "@/features/Auth/hooks/authhook";
import { getPetsData, submitPetIssue, type PetResponse } from "../apis/pet.api";
import {
  getDoctorProfileData,
  type BookableSlot,
} from "@/features/Appointment/apis/doctorProfile.api";

interface PetIssueReportFormProps {
  preselectedPetId?: string;
  doctorId?: string;
  preselectedCheckupTime?: string;
  onSubmitSuccess?: (data: unknown) => void;
  onCancel?: () => void;
}

const PetIssueReportForm = ({
  preselectedPetId = "",
  doctorId,
  preselectedCheckupTime = "",
  onSubmitSuccess,
  onCancel,
}: PetIssueReportFormProps) => {
  const { user } = useAuth();
  const [pets, setPets] = useState<PetResponse[]>([]);
  const [loadingPets, setLoadingPets] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [loadPetsError, setLoadPetsError] = useState<string | null>(null);
  const [loadSlotsError, setLoadSlotsError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [availableSlots, setAvailableSlots] = useState<BookableSlot[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PetIssueReportFormData>({
    resolver: zodResolver(petIssueReportSchema),
    defaultValues: {
      petId: preselectedPetId,
      issue: "",
      appointmentType: "NORMAL_CHECKUP",
      checkupTime: preselectedCheckupTime,
    },
  });

  const fetchPets = async () => {
    setLoadingPets(true);
    setLoadPetsError(null);
    try {
      const data = await getPetsData();
      if (data) {
        setPets(data);
      }
    } catch {
      setLoadPetsError("Failed to load your pets. Please retry.");
    } finally {
      setLoadingPets(false);
    }
  };

  const fetchDoctorSlots = async () => {
    if (!doctorId) {
      setLoadSlotsError("Doctor is required to load appointment slots.");
      return;
    }

    setLoadingSlots(true);
    setLoadSlotsError(null);

    try {
      const data = await getDoctorProfileData(doctorId);
      setAvailableSlots(data?.availableSlots || []);
    } catch {
      setLoadSlotsError("Failed to load appointment slots. Please retry.");
    } finally {
      setLoadingSlots(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  useEffect(() => {
    fetchDoctorSlots();
  }, [doctorId]);

  useEffect(() => {
    if (preselectedPetId) {
      setValue("petId", preselectedPetId);
    }
  }, [preselectedPetId, setValue]);

  useEffect(() => {
    if (preselectedCheckupTime) {
      setValue("checkupTime", preselectedCheckupTime);
    }
  }, [preselectedCheckupTime, setValue]);

  const issue = watch("issue") || "";
  const appointmentType = watch("appointmentType");
  const selectedCheckupTime = watch("checkupTime");

  const onSubmit = async (data: PetIssueReportFormData) => {
    setSubmitError(null);
    console.log("Pet issue report:", data);
    const petOwnerId = user?.data?.id;
    if (!petOwnerId) {
      setSubmitError("You must be logged in to report a pet issue.");
      return;
    }

    if (!doctorId) {
      setSubmitError("Please select a doctor before booking an appointment.");
      return;
    }

    try {
      const result = await submitPetIssue({
        ...data,
        petOwnerId,
        doctorId,
      });

      if (result) {
        reset();
        if (onSubmitSuccess) {
          onSubmitSuccess(result);
        }
      } else {
        setSubmitError("Failed to submit issue report.");
      }
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "An error occurred while submitting the issue report.",
      );
    }
  };

  return (
    <main className="min-h-screen bg-[#F3FAF7] px-4 py-8 text-[#17233F]">
      <section className="mx-auto max-w-md overflow-hidden rounded-[28px] bg-white shadow-2xl shadow-emerald-100">
        <div className="relative h-40 bg-gradient-to-br from-[#F4FFFA] to-[#DFF5EA] px-6 py-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0B8F5A] text-white">
            <ClipboardPlus size={22} />
          </div>

          <div className="relative z-10 mt-5">
            <h1 className="text-2xl font-black">Report Pet Issue</h1>
            <p className="mt-2 max-w-[250px] text-sm leading-5 text-slate-600">
              Tell us about your pet&apos;s health issue so we can assist you
              better
            </p>
          </div>

          <img
            src="https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=500&q=80"
            alt="Cat"
            className="absolute bottom-0 right-5 h-36 w-36 object-cover mix-blend-multiply"
          />

          <div className="absolute bottom-8 right-7 flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-[#0B8F5A] shadow-sm">
            <ShieldPlus size={22} />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 px-5 py-6">
          {submitError && (
            <div className="rounded-xl border border-red-100 bg-red-50 p-3 text-sm font-semibold text-red-600">
              {submitError}
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm font-black">
              Select Pet <span className="text-red-500">*</span>
            </label>

            {loadPetsError && (
              <div className="mb-2 flex items-center justify-between rounded-xl bg-red-55 text-red-600 p-2 text-xs font-semibold border border-red-100">
                <span>{loadPetsError}</span>
                <button
                  type="button"
                  onClick={fetchPets}
                  className="rounded-lg bg-red-100 px-2 py-1 text-xs font-bold text-red-700 hover:bg-red-200 transition"
                >
                  Retry
                </button>
              </div>
            )}

            <div className="flex h-14 items-center rounded-xl border border-slate-200 bg-white px-4 transition focus-within:border-[#0B8F5A] focus-within:ring-4 focus-within:ring-emerald-100">
              <span className="mr-3 flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-[#0B8F5A]">
                <PawPrint size={18} />
              </span>

              <select
                {...register("petId")}
                className="h-full w-full bg-transparent text-sm font-semibold text-slate-500 outline-none"
              >
                <option value="">{loadingPets ? "Loading pets..." : "Choose your pet"}</option>
                {pets.map((pet) => (
                  <option key={pet.id} value={pet.id}>
                    {pet.name} - {pet.category} ({pet.breed})
                  </option>
                ))}
              </select>
            </div>

            {errors.petId && (
              <p className="mt-1 text-xs font-semibold text-red-500">
                {errors.petId.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-black">
              Appointment Slot <span className="text-red-500">*</span>
            </label>

            {loadSlotsError && (
              <div className="mb-2 flex items-center justify-between rounded-xl border border-red-100 bg-red-50 p-2 text-xs font-semibold text-red-600">
                <span>{loadSlotsError}</span>
                <button
                  type="button"
                  onClick={fetchDoctorSlots}
                  className="rounded-lg bg-red-100 px-2 py-1 text-xs font-bold text-red-700 transition hover:bg-red-200"
                >
                  Retry
                </button>
              </div>
            )}

            {loadingSlots ? (
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-500">
                Loading available slots...
              </div>
            ) : availableSlots.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {availableSlots.slice(0, 10).map((slot) => (
                  <button
                    key={`${slot.scheduleId}-${slot.startDateTime}`}
                    type="button"
                    onClick={() => setValue("checkupTime", slot.startDateTime)}
                    className={`rounded-xl border p-3 text-left text-xs font-black transition ${
                      selectedCheckupTime === slot.startDateTime
                        ? "border-[#0B8F5A] bg-emerald-50 text-[#0B8F5A]"
                        : "border-slate-200 bg-white text-slate-600 hover:border-[#0B8F5A]"
                    }`}
                  >
                    <span className="block text-[11px] uppercase text-slate-400">
                      {slot.day}
                    </span>
                    {slot.startTime} - {slot.endTime}
                  </button>
                ))}
              </div>
            ) : (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-500">
                No appointment slots available for this doctor.
              </p>
            )}

            <input type="hidden" {...register("checkupTime")} />

            {errors.checkupTime && (
              <p className="mt-1 text-xs font-semibold text-red-500">
                {errors.checkupTime.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-black">
              Issue Details <span className="text-red-500">*</span>
            </label>

            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 transition focus-within:border-[#0B8F5A] focus-within:ring-4 focus-within:ring-emerald-100">
              <div className="flex gap-3">
                <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-[#0B8F5A]">
                  <Pencil size={18} />
                </span>

                <textarea
                  {...register("issue")}
                  maxLength={500}
                  placeholder="Describe the issue your pet is facing..."
                  className="min-h-24 w-full resize-none bg-transparent text-sm font-semibold text-slate-600 outline-none placeholder:text-slate-400"
                />
              </div>

              <p className="text-right text-xs font-semibold text-slate-400">
                {issue.length}/500
              </p>
            </div>

            {errors.issue && (
              <p className="mt-1 text-xs font-semibold text-red-500">
                {errors.issue.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-black">
              Appointment Type <span className="text-red-500">*</span>
            </label>

            <div className="flex h-14 items-center rounded-xl border border-slate-200 bg-white px-4">
              <span className="mr-3 flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-[#0B8F5A]">
                <Calendar size={18} />
              </span>

              <select
                {...register("appointmentType")}
                className="h-full w-full bg-transparent text-sm font-semibold text-slate-500 outline-none"
              >
                <option value="NORMAL_CHECKUP">Normal Checkup</option>
              </select>
            </div>

            {errors.appointmentType && (
              <p className="mt-1 text-xs font-semibold text-red-500">
                {errors.appointmentType.message}
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-[#EFFBF5] p-4">
            <div className="mb-4 flex items-start gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0B8F5A] text-white">
                <Info size={16} />
              </div>

              <div>
                <h3 className="text-sm font-black text-[#0B8F5A]">
                  Appointment Type
                </h3>
                <p className="mt-1 text-xs leading-5 text-slate-600">
                  Choose normal checkup for regular pet health consultation.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setValue("appointmentType", "NORMAL_CHECKUP")}
              className={`w-full rounded-xl border p-3 text-left transition ${
                appointmentType === "NORMAL_CHECKUP"
                  ? "border-[#0B8F5A] bg-white"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex items-start gap-3">
                <Stethoscope size={26} className="text-[#0B8F5A]" />
                <div>
                  <h4 className="text-sm font-black">Normal Checkup</h4>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Book a regular consultation for your pet&apos;s health issue.
                  </p>
                </div>
              </div>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset();
                if (onCancel) onCancel();
              }}
            >
              Cancel
            </Button>

            <Button type="submit" isSubmitting={isSubmitting}>
              <span className="flex items-center justify-center gap-2">
                <Send size={17} />
                Submit Report
              </span>
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default PetIssueReportForm;
