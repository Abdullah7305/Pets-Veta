import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  ClipboardPlus,
  Info,
  Pencil,
  Send,
} from "lucide-react";
import SelectPetStep from "../components/SelectPetComponent";
import Button from "../../../shared/components/Button/Button";
import { submitPetIssue } from "../../Pet Owner/pet details/apis/pet.api";

const BookAppointmentPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [issue, setIssue] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePetSelectComplete = (petId: string) => {
    localStorage.setItem("petPatientId", petId);
    setStep(2);
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      setIssue("");
      setError("");
      return;
    }

    navigate(-1);
  };

  const handleSubmit = async () => {
    const petId = localStorage.getItem("petPatientId");
    const doctorId = localStorage.getItem('doctorId');
    const scheduleId = localStorage.getItem('scheduleId');
    const trimmedIssue = issue.trim();

    if (!petId) {
      setError("Please select a pet first.");
      setStep(1);
      return;
    }
    if (!doctorId || !scheduleId) {
      setError("Id Missing From Storages");
      return;
    }
    if (!trimmedIssue) {
      setError("Please describe the issue your pet is facing.");
      return;
    }

    if (trimmedIssue.length < 10) {
      setError("Issue description must be at least 10 characters.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      const result = await submitPetIssue({
        petId,
        issue: trimmedIssue,
        doctorId: doctorId,
        scheduleId: scheduleId
      });
      console.log("Report and Checkout Url Data is ", result);
      if (result.success) {
        localStorage.removeItem("petPatientId");

        setIssue("");
        setStep(3);
        window.location.href = result.data.checkoutUrl;

      } else {
        setError("Failed to submit issue report.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === 3) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] px-4 py-12">
        <div className="flex w-full max-w-md flex-col items-center rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-[0_15px_40px_rgba(15,23,42,0.06)]">
          <div className="mb-6 flex h-20 w-20 animate-bounce items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="mb-3 text-3xl font-extrabold text-slate-800">
            Issue Submitted!
          </h2>
          <p className="mb-8 max-w-sm leading-relaxed text-slate-500">
            Your pet&apos;s issue has been submitted successfully.
          </p>
          <Button
            onClick={() => navigate("/doctors")}
            className="w-full rounded-2xl bg-[#0B8F5A] py-4 font-bold text-white hover:bg-[#097b4d]"
          >
            Return to Doctors List
          </Button>
        </div>
      </main>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-100 bg-white/80 px-6 py-4 shadow-sm backdrop-blur-md">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 font-bold text-slate-500 transition-colors duration-200 hover:text-slate-800"
        >
          <ArrowLeft size={18} />
          <span>{step === 2 ? "Back to Pet Selection" : "Back"}</span>
        </button>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${step >= 1
                ? "bg-[#6D3DD9] text-white"
                : "bg-slate-100 text-slate-400"
                }`}
            >
              {step > 1 ? <CheckCircle2 size={16} /> : "1"}
            </div>
            <span
              className={`hidden text-sm font-extrabold sm:inline ${step === 1 ? "text-[#6D3DD9]" : "text-slate-400"
                }`}
            >
              Select Pet
            </span>
          </div>

          <div className="h-[2px] w-8 bg-slate-200" />

          <div className="flex items-center gap-2">
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${step >= 2
                ? "bg-[#0B8F5A] text-white"
                : "bg-slate-100 text-slate-400"
                }`}
            >
              2
            </div>
            <span
              className={`hidden text-sm font-extrabold sm:inline ${step === 2 ? "text-[#0B8F5A]" : "text-slate-400"
                }`}
            >
              Describe Issue
            </span>
          </div>
        </div>

        <div className="w-10 sm:w-16" />
      </div>

      <div className="flex-1">
        {step === 1 ? (
          <SelectPetStep onNextStep={handlePetSelectComplete} />
        ) : (
          <main className="min-h-[calc(100vh-65px)] bg-[#F3FAF7] px-4 py-8 text-[#17233F]">
            <section className="mx-auto max-w-md overflow-hidden rounded-[28px] bg-white shadow-2xl shadow-emerald-100">
              <div className="relative h-36 bg-gradient-to-br from-[#F4FFFA] to-[#DFF5EA] px-6 py-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0B8F5A] text-white">
                  <ClipboardPlus size={22} />
                </div>

                <div className="relative z-10 mt-4">
                  <h1 className="text-2xl font-black">Describe the Issue</h1>
                  <p className="mt-1 max-w-[260px] text-sm leading-5 text-slate-600">
                    Tell us what&apos;s going on with your pet
                  </p>
                </div>

                <img
                  src="https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=500&q=80"
                  alt="Pet"
                  className="absolute bottom-0 right-5 h-32 w-32 object-cover mix-blend-multiply"
                />
              </div>

              <div className="space-y-5 px-5 py-6">
                {error && (
                  <div className="rounded-xl border border-red-100 bg-red-50 p-3 text-sm font-semibold text-red-600">
                    {error}
                  </div>
                )}

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
                        value={issue}
                        onChange={(e) => {
                          setIssue(e.target.value);
                          if (error) setError("");
                        }}
                        maxLength={500}
                        placeholder="Describe the issue your pet is facing..."
                        className="min-h-32 w-full resize-none bg-transparent text-sm font-semibold text-slate-600 outline-none placeholder:text-slate-400"
                      />
                    </div>

                    <p className="text-right text-xs font-semibold text-slate-400">
                      {issue.length}/500
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-emerald-100 bg-[#EFFBF5] p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0B8F5A] text-white">
                      <Info size={16} />
                    </div>

                    <div>
                      <h3 className="text-sm font-black text-[#0B8F5A]">
                        Helpful Tip
                      </h3>
                      <p className="mt-1 text-xs leading-5 text-slate-600">
                        Add symptoms, duration, and behavior changes for better
                        understanding.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    className="h-12 rounded-xl border-slate-300 font-bold text-slate-600 hover:bg-slate-50"
                  >
                    Back
                  </Button>

                  <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="h-12 rounded-xl bg-[#0B8F5A] font-bold text-white hover:bg-[#097b4d] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Submitting...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Send size={17} />
                        Submit
                      </span>
                    )}
                  </Button>
                </div>
              </div>
            </section>
          </main>
        )}
      </div>
    </div>
  );
};

export default BookAppointmentPage;