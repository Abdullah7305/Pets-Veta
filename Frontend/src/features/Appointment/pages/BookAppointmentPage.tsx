import { useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import PetForm from "../../Pet Owner/pet details/components/PetForm";
import PetIssueReportForm from "../../Pet Owner/pet details/components/PetIssueReportForm";
import Button from "../../../shared/components/Button/Button";
import type { CreatedPet } from "../types/appointment.types";

const BookAppointmentPage = () => {
  const { id: doctorId } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const selectedCheckupTime = searchParams.get("checkupTime") || "";

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [createdPet, setCreatedPet] = useState<CreatedPet | null>(null);

  const handlePetSubmitSuccess = (newPet: CreatedPet) => {
    console.log("Successfully added pet for appointment:", newPet);
    setCreatedPet(newPet);
    setStep(2);
  };

  const handleIssueSubmitSuccess = (issueReport: unknown) => {
    console.log("Successfully submitted issue report:", issueReport);
    setStep(3);
  };

  const handleCancel = () => {
    navigate(-1);
  };
  
  if (step === 3) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] px-4 py-12 flex flex-col items-center justify-center font-sans">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_15px_40px_rgba(15,23,42,0.06)] border border-slate-100 overflow-hidden p-8 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6 text-emerald-500 animate-bounce">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-800 mb-3">
            Appointment Booked!
          </h2>
          <p className="text-slate-500 max-w-sm mb-8 leading-relaxed">
            Your pet&apos;s issue report has been successfully submitted and the appointment has been booked. You will receive updates shortly.
          </p>
          <Button
            onClick={() => navigate("/doctors")}
            className="bg-[#0B8F5A] hover:bg-[#097b4d] text-white w-full py-4 rounded-2xl font-bold shadow-lg shadow-emerald-900/10 transition-transform duration-200 active:scale-[0.98]"
          >
            Return to Doctors List
          </Button>
        </div>
      </main>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Sticky Step Progress Header bar */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex items-center justify-between shadow-sm">
        <button
          onClick={handleCancel}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-850 font-bold transition-colors duration-200"
        >
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>

        {/* Step Indicators */}
        <div className="flex items-center gap-6">
          {/* Step 1 */}
          <div className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${step >= 1
                ? "bg-[#6D3DD9] text-white"
                : "bg-slate-100 text-slate-400"
                }`}
            >
              1
            </div>
            <span className={`text-sm font-extrabold hidden sm:inline ${step === 1 ? "text-[#6D3DD9]" : "text-slate-400"}`}>
              Register Pet
            </span>
          </div>

          {/* Line separator */}
          <div className="w-8 h-[2px] bg-slate-200" />

          {/* Step 2 */}
          <div className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${step >= 2
                ? "bg-[#0B8F5A] text-white"
                : "bg-slate-100 text-slate-400"
                }`}
            >
              2
            </div>
            <span className={`text-sm font-extrabold hidden sm:inline ${step === 2 ? "text-[#0B8F5A]" : "text-slate-400"}`}>
              Pet Issue Details
            </span>
          </div>
        </div>

        <div className="w-10 sm:w-16" /> {/* Spacer to center the progress indicator */}
      </div>

      {/* Render current step component */}
      <div className="flex-1">
        {step === 1 ? (
          <PetForm
            onSubmitSuccess={handlePetSubmitSuccess}
            onCancel={handleCancel}
          />
        ) : (
          <PetIssueReportForm
            preselectedPetId={createdPet?.id}
            doctorId={doctorId || ""}
            preselectedCheckupTime={selectedCheckupTime}
            onSubmitSuccess={handleIssueSubmitSuccess}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default BookAppointmentPage;
