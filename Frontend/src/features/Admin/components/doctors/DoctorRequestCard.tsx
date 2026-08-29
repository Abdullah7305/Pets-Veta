import {
  Award,
  BriefcaseMedical,
  Check,
  Eye,
  FileText,
  Mail,
  Phone,
  Stethoscope,
  X,
} from "lucide-react";
import doctorLogo from "../../../../assets/icons/doctor.png";
import { InfoPill } from "./InfoPill";
import { ContactRow } from "./ContactRow";
import type { DoctorData } from "../../apis/doctorquery.api";

interface DoctorRequestCardProps {
  doctor: DoctorData;
  onApprove: (doctorId: string) => void;
  onReject: (doctorId: string) => void;
  isApproving?: boolean;
  isRejecting?: boolean;
}

const DoctorRequestCard = ({
  doctor,
  onApprove,
  onReject,
  isApproving = false,
  isRejecting = false,
}: DoctorRequestCardProps) => {
  const isPending = doctor.isVerified === "PENDING";
  const isProcessing = isApproving || isRejecting;
  const certificateUrl = doctor.degreeLicenseUrl;

  const certificateButtonClass =
    "items-center gap-2 rounded-xl border border-slate-300 bg-white text-sm font-black text-[#078b91] transition hover:border-[#078b91] hover:bg-[#eefaf8]";
  const disabledCertificateButtonClass =
    "items-center gap-2 rounded-xl border border-slate-200 bg-slate-100 text-sm font-black text-slate-400";

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,23,42,0.12)]">
      <div className="h-3 bg-gradient-to-r from-[#078b91] via-[#82d5cf] to-[#f9c5a8]" />

      <div className="p-5 sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row">
          <img
            src={doctorLogo}
            alt={doctor.user.fullName}
            className="h-28 w-28 shrink-0 rounded-2xl bg-[#e7f4f2] object-cover object-top"
          />

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="truncate text-2xl font-black text-[#0f1b2f]">
                  {doctor.user.fullName}
                </h2>

                <p className="mt-1 font-semibold text-[#078b91]">
                  {doctor.specialization}
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-black uppercase tracking-wide ${
                  isPending
                    ? "bg-orange-100 text-orange-600"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {isPending ? "Pending" : "Approved"}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <InfoPill
                icon={<BriefcaseMedical size={16} />}
                text={`${doctor.experience} Yrs Experience`}
              />
              <InfoPill icon={<Award size={16} />} text={doctor.education} />
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-3 text-sm text-[#26364f] sm:grid-cols-2">
          <ContactRow icon={<Mail size={18} />} text={doctor.user.email} />
          <ContactRow
            icon={<Phone size={18} />}
            text={doctor.user.phone || "No phone provided"}
          />
          <ContactRow
            icon={<Stethoscope size={18} />}
            text={doctor.specialization}
            className="sm:col-span-2"
          />
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-[#f8fbfb] p-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#d9f3ef] text-[#078b91]">
              <FileText size={26} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="mt-1 text-sm font-medium text-[#587087]">
                Degree Certificate
              </p>
            </div>

            {certificateUrl ? (
              <a
                href={certificateUrl}
                target="_blank"
                rel="noreferrer"
                className={`hidden h-10 px-4 sm:flex ${certificateButtonClass}`}
              >
                <Eye size={17} />
                View
              </a>
            ) : (
              <button
                type="button"
                disabled
                className={`hidden h-10 cursor-not-allowed px-4 sm:flex ${disabledCertificateButtonClass}`}
              >
                No Certificate
              </button>
            )}
          </div>

          {certificateUrl ? (
            <a
              href={certificateUrl}
              target="_blank"
              rel="noreferrer"
              className={`mt-4 flex h-10 w-full justify-center sm:hidden ${certificateButtonClass}`}
            >
              <Eye size={17} />
              View Certificate
            </a>
          ) : (
            <button
              type="button"
              disabled
              className={`mt-4 flex h-10 w-full cursor-not-allowed justify-center sm:hidden ${disabledCertificateButtonClass}`}
            >
              No Certificate
            </button>
          )}
        </div>

        {isPending ? (
          <div className="mt-5 grid grid-cols-2 gap-3">
            <button
              disabled={isProcessing}
              type="button"
              onClick={() => onReject(doctor.id)}
              className={`flex h-11 items-center justify-center gap-2 rounded-xl border border-red-200 bg-white font-black transition ${
                isProcessing
                  ? "cursor-not-allowed text-red-300"
                  : "cursor-pointer text-red-500 hover:bg-red-50"
              }`}
            >
              <X size={19} />
              {isRejecting ? "Rejecting..." : "Reject"}
            </button>

            <button
              type="button"
              disabled={isProcessing}
              onClick={() => onApprove(doctor.id)}
              className={`flex h-11 items-center justify-center gap-2 rounded-xl font-black text-white shadow-lg shadow-cyan-100 transition ${
                isProcessing
                  ? "cursor-not-allowed bg-[#0aa082]/70"
                  : "cursor-pointer bg-[#078b91] hover:bg-[#06777d]"
              }`}
            >
              <Check size={19} />
              {isApproving ? "Approving..." : "Approve"}
            </button>
          </div>
        ) : (
          <div className="mt-5 flex h-11 items-center justify-center gap-2 rounded-xl bg-green-50 font-black text-green-700">
            <Check size={19} />
            Approved Doctor
          </div>
        )}
      </div>
    </article>
  );
};

export default DoctorRequestCard;