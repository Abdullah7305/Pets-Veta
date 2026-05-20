import {
  CalendarCheck,
  PawPrint,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

const AboutHero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#FFF8F4] via-white to-[#D4E2E0]/70 px-5 py-16 lg:py-20">
      <div className="absolute left-[-120px] top-[-120px] h-72 w-72 rounded-full bg-[#F9C5A8]/50 blur-3xl" />
      <div className="absolute bottom-[-120px] right-[-120px] h-80 w-80 rounded-full bg-[#D4E2E0]/80 blur-3xl" />

      <div className="absolute left-[45%] top-36 hidden text-4xl text-[#F28B5B]/70 lg:block">
        ♡
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="text-sm font-extrabold uppercase tracking-widest text-[#078b91]">
            About PawCare
          </p>

          <div className="mt-2 h-1 w-14 rounded-full bg-[#078b91]" />

          <h1 className="mt-5 max-w-xl text-4xl font-black leading-tight text-[#071B4D] md:text-5xl">
            Trusted Pet Care{" "}
            <span className="text-[#F28B5B]">Starts With Us</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
            PawCare is a modern platform that connects pet parents with
            experienced veterinary doctors. We make it easy to book
            appointments, get expert advice, and keep your pets healthy and
            happy.
          </p>

          <div className="mt-7 flex flex-wrap gap-4">
            <button className="inline-flex items-center gap-2 rounded-xl bg-[#071B4D] px-6 py-3 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#0B255F]">
              <CalendarCheck size={18} />
              Book Appointment
            </button>

            <button className="inline-flex items-center gap-2 rounded-xl border border-[#F28B5B] bg-white px-6 py-3 text-sm font-bold text-[#F28B5B] transition hover:-translate-y-0.5 hover:bg-[#FFF1E9]">
              <PawPrint size={18} />
              Explore Services
            </button>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex -space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-[#D4E2E0] text-lg">
                👩
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-[#F9C5A8] text-lg">
                👨
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-white text-lg">
                🧑
              </div>
            </div>

            <p className="text-sm leading-6 text-slate-600">
              <span className="font-black text-[#078b91]">2,000+</span> happy
              pet parents trust our services
            </p>
          </div>
        </div>

        <div className="relative hidden min-h-[400px] lg:block">
          <div className="absolute bottom-0 right-0 h-[340px] w-[460px] rounded-[45%] bg-[#D4E2E0]/90" />

          <div className="absolute bottom-8 right-16 z-10 flex items-end gap-4">
            <div className="flex h-64 w-48 items-center justify-center rounded-[3rem] bg-white/80 text-7xl shadow-xl">
              🐱
            </div>

            <div className="flex h-80 w-56 items-center justify-center rounded-[3rem] bg-white/80 text-8xl shadow-xl">
              🐶
            </div>
          </div>

          <div className="absolute right-0 top-16 z-20 rounded-3xl bg-white p-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4E2E0]/80 text-[#078b91]">
                <ShieldCheck size={24} />
              </div>

              <div>
                <p className="text-sm font-black text-[#071B4D]">
                  Trusted & Verified Doctors
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  100% quality care
                </p>
              </div>
            </div>
          </div>

          <div className="absolute left-4 bottom-16 z-20 rounded-3xl bg-white p-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F9C5A8]/60 text-[#F28B5B]">
                <Stethoscope size={24} />
              </div>

              <div>
                <p className="text-sm font-black text-[#071B4D]">
                  Expert Pet Doctors
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Book online easily
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
