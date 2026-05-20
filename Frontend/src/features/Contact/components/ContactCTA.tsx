import { PawPrint } from "lucide-react";

const ContactCTA = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-100 bg-gradient-to-r from-[#D4E2E0]/80 via-white to-[#FFF1E9] p-6 shadow-sm md:p-8">
      <div className="absolute left-10 top-8 hidden text-4xl text-[#F28B5B]/40 md:block">
        ♡
      </div>

      <div className="absolute right-20 bottom-8 hidden text-4xl text-[#F28B5B]/40 md:block">
        ♡
      </div>

      <div className="relative grid items-center gap-8 md:grid-cols-[0.8fr_1.2fr_0.7fr]">
        <div className="hidden md:flex">
          <div className="flex h-28 w-full items-center justify-center gap-4 rounded-3xl bg-white/50">
            <span className="text-5xl">🐶</span>
            <span className="text-4xl">🐱</span>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-black text-[#071B4D] md:text-3xl">
            Love Your Pet? We Do Too!
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Join thousands of pet parents who trust PawCare for the best
            services and products.
          </p>
        </div>

        <div className="flex md:justify-end">
          <button className="inline-flex items-center gap-2 rounded-xl bg-[#071B4D] px-6 py-3 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#0B255F]">
            <PawPrint size={18} />
            Explore Services
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactCTA;
