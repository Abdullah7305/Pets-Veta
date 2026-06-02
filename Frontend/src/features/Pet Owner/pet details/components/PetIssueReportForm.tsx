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

import Button from "../../../../shared/components/Button/Button";
import {
  petIssueReportSchema,
  type PetIssueReportFormData,
} from "../schemas/petIssueReport.schema";

const PetIssueReportForm = () => {
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
      petId: "",
      issue: "",
      appointmentType: "NORMAL_CHECKUP",
    },
  });

  const issue = watch("issue") || "";
  const appointmentType = watch("appointmentType");

  const onSubmit = async (data: PetIssueReportFormData) => {
    console.log("Pet issue report:", data);

    // API connect later
    // await createPetIssueReport(data);

    reset();
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
          <div>
            <label className="mb-2 block text-sm font-black">
              Select Pet <span className="text-red-500">*</span>
            </label>

            <div className="flex h-14 items-center rounded-xl border border-slate-200 bg-white px-4 transition focus-within:border-[#0B8F5A] focus-within:ring-4 focus-within:ring-emerald-100">
              <span className="mr-3 flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-[#0B8F5A]">
                <PawPrint size={18} />
              </span>

              <select
                {...register("petId")}
                className="h-full w-full bg-transparent text-sm font-semibold text-slate-500 outline-none"
              >
                <option value="">Choose your pet</option>
                <option value="pet-id-1">Buddy - Dog</option>
                <option value="pet-id-2">Milo - Cat</option>
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
            <Button type="button" variant="outline" onClick={() => reset()}>
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