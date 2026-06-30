import { CalendarClock, Mail, PawPrint, Phone, Wallet, CheckCircle2 } from "lucide-react";
import type { PatientCardProps } from "../doctor.types";

const formatDateTime = (value: string) => {
  return new Date(value).toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const PatientCard = ({ appointment, onMarkAsDone }: PatientCardProps) => {
  console.log("Appointment in the component is ", appointment);
  const patient = appointment.petIssueReport.user;
  const pet = appointment.petIssueReport.pet;
  const isCompleted = appointment.status === "COMPLETED";

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-[#078b91]/40 hover:shadow-md">
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div className="flex gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-black text-[#101b3d]">
                {patient.fullName}
              </h2>

              <span className={`rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-wider ${isCompleted ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                }`}>
                {appointment.status.replace(/_/g, " ")}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-3 text-xs font-semibold text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <Mail size={14} />
                {patient.email}
              </span>

              <span className="inline-flex items-center gap-1.5">
                <Phone size={14} />
                {patient.phone || "No phone"}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-[#F0FAF7] px-4 py-3 text-sm font-black text-[#078b91]">
          <CalendarClock size={17} className="mr-2 inline" />
          {formatDateTime(appointment.checkupTime)}
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-[1fr_1.4fr_150px]">
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="flex items-center gap-2 text-xs font-black uppercase text-slate-400">
            <PawPrint size={15} />
            Pet
          </p>

          <h3 className="mt-2 font-black text-[#101b3d]">{pet.name}</h3>
          <p className="mt-1 text-sm font-semibold text-slate-500">
            {pet.category} · {pet.breed}
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-black uppercase text-slate-400">
            Issue
          </p>

          <p className="mt-2 line-clamp-3 text-sm font-semibold leading-6 text-slate-600">
            {appointment.petIssueReport.issue}
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 p-4">
          <p className="flex items-center gap-2 text-xs font-black uppercase text-slate-400">
            <Wallet size={15} />
            Fees
          </p>

          <h3 className="mt-2 font-black text-[#101b3d]">
            Rs. {appointment.fees}
          </h3>
        </div>
      </div>


      {!isCompleted && onMarkAsDone && (
        <div className="mt-5 flex justify-end border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={() => onMarkAsDone(appointment.id)}
            className="flex items-center gap-2 rounded-xl bg-[#078b91] px-5 py-2.5 text-xs font-black text-white transition hover:bg-[#056f75] cursor-pointer"
          >
            <CheckCircle2 size={14} />
            Mark as Done
          </button>
        </div>
      )}
    </article>
  );
};

export default PatientCard;