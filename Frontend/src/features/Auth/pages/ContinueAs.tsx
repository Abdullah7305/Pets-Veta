import { useNavigate } from "react-router-dom";
import { Stethoscope, UserRound } from "lucide-react";
import PageBackButton from "@/shared/components/BackButton/PageBackButton";

const ContinueAsPage = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#f4fbff] via-white to-[#e8fbfa] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-5xl">
        <div className="mb-6">
          <PageBackButton fallbackPath="/" />
        </div>

        <div className="text-center mb-10">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="mb-4 inline-block rounded-full bg-white px-5 py-2 font-semibold text-[#178f95] shadow transition hover:bg-[#e8fbfa]"
          >
            Join Pets Veta
          </button>

          <h1 className="text-3xl md:text-5xl font-bold text-[#17233f] mb-4">
            Continue as
          </h1>

          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose your account type to continue registration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          <button
            onClick={() => navigate("/signup/pet-owner")}
            className="group bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-left hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
          >
            <div className="h-16 w-16 rounded-2xl bg-[#e8fbfa] text-[#178f95] flex items-center justify-center mb-6 group-hover:bg-[#178f95] group-hover:text-white transition">
              <UserRound size={32} />
            </div>

            <h2 className="text-2xl font-bold text-[#17233f] mb-3">
              Pet Owner
            </h2>

            <p className="text-gray-600 mb-7 leading-relaxed">
              Create an account to book veterinary appointments, manage your pets,
              and access pet care services.
            </p>

            <span className="inline-flex items-center justify-center rounded-full bg-[#178f95] text-white px-6 py-3 font-semibold group-hover:bg-[#12757a] transition">
              Register as Pet Owner
            </span>
          </button>

          <button
            onClick={() => navigate("/signup/doctor")}
            className="group bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-left hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
          >
            <div className="h-16 w-16 rounded-2xl bg-[#fff1ea] text-[#178f95] flex items-center justify-center mb-6 group-hover:bg-[#178f95] group-hover:text-white transition">
              <Stethoscope size={32} />
            </div>

            <h2 className="text-2xl font-bold text-[#17233f] mb-3">
              Doctor
            </h2>

            <p className="text-gray-600 mb-7 leading-relaxed">
              Create your doctor profile, submit your verification document,
              manage availability, and handle appointments.
            </p>

            <span className="inline-flex items-center justify-center rounded-full bg-[#178f95] text-white px-6 py-3 font-semibold group-hover:bg-[#12757a] transition">
              Register as Doctor
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ContinueAsPage;
