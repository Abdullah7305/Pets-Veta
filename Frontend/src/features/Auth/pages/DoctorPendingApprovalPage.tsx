import { useNavigate } from "react-router-dom";
import {
  Clock,
  ShieldCheck,
  CheckCircle2,
  Mail,
  Home,
  LogIn,
  FileCheck,
  Stethoscope,
} from "lucide-react";
import PageBackButton from "@/shared/components/BackButton/PageBackButton";

const DoctorPendingApprovalPage = () => {
  const navigate = useNavigate();

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#f8fbfb] text-[#12213a] flex items-center justify-center px-4 py-10">
      {/* Background Decorative Gradients */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(249,197,168,0.3)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,rgba(217,243,239,0.5)_0%,transparent_50%)]" />

      <div className="relative z-10 w-full max-w-2xl">
        <div className="mb-6">
          <PageBackButton fallbackPath="/" />
        </div>

        <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
          {/* Header Status Badge */}
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#d9f3ef] text-[#078b91] shadow-inner">
              <Clock size={40} className="animate-pulse" />
              <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-orange-500 text-white shadow-md">
                <Stethoscope size={15} />
              </span>
            </div>

            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-orange-50 border border-orange-200 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-orange-600">
              <span className="h-2 w-2 rounded-full bg-orange-500 animate-ping" />
              Verification In Progress
            </span>

            <h1 className="text-2xl sm:text-3xl font-black text-[#0f1b2f]">
              Application Under Review
            </h1>

            <p className="mt-3 max-w-lg text-sm sm:text-base leading-relaxed text-[#587087]">
              Thank you for registering with <strong>PetsVeta</strong>. Your medical credentials and degree license have been submitted and are currently awaiting administrative attestation.
            </p>
          </div>

          {/* Verification Timeline / Steps */}
          <div className="mt-8 space-y-3 rounded-2xl border border-slate-100 bg-[#f8fbfb] p-5">
            <h2 className="text-xs font-black uppercase tracking-wider text-[#718198]">
              Application Progress
            </h2>

            <div className="flex items-start gap-3.5 pt-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                <CheckCircle2 size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-[#0f1b2f]">Email & OTP Verified</p>
                <p className="text-xs text-[#718198]">Your account contact details are confirmed.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 pt-1">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                <FileCheck size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-[#0f1b2f]">Admin Document Review</p>
                <p className="text-xs text-[#718198]">Our verification team is reviewing your license certificate.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 pt-1">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <ShieldCheck size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-slate-400">Dashboard & Patient Appointments</p>
                <p className="text-xs text-slate-400">Unlocked automatically once your application is approved.</p>
              </div>
            </div>
          </div>

          {/* Info Notice Box */}
          <div className="mt-6 flex items-center gap-3 rounded-xl border border-teal-100 bg-[#eefaf8] p-4 text-xs font-semibold text-[#078b91]">
            <Mail size={20} className="shrink-0 text-[#078b91]" />
            <span>You will receive an email notification at your registered email address as soon as your account is approved.</span>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white font-bold text-[#12213a] shadow-sm transition hover:bg-slate-50"
            >
              <Home size={18} />
              Back to Home
            </button>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#078b91] font-bold text-white shadow-lg shadow-teal-700/20 transition hover:bg-[#06777d]"
            >
              <LogIn size={18} />
              Check Login Status
            </button>
          </div>
        </article>
      </div>
    </main>
  );
};

export default DoctorPendingApprovalPage;