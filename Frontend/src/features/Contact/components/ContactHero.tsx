import { Mail, Phone } from "lucide-react";

const ContactHero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#FFF8F4] via-white to-[#D4E2E0]/70 px-5 py-16 lg:py-20">
      <div className="absolute left-[-120px] top-[-120px] h-72 w-72 rounded-full bg-[#F9C5A8]/50 blur-3xl" />
      <div className="absolute bottom-[-120px] right-[-120px] h-80 w-80 rounded-full bg-[#D4E2E0]/80 blur-3xl" />

      <div className="absolute left-[52%] top-28 hidden text-5xl text-[#F9C5A8] opacity-70 lg:block">
        🐾
      </div>

      <div className="absolute right-20 top-32 hidden text-4xl text-[#F9C5A8] opacity-60 lg:block">
        ♡
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
        <div>
          <div className="mb-5">
            <p className="text-sm font-extrabold uppercase tracking-widest text-[#078b91]">
              Contact Us
            </p>
            <div className="mt-2 h-1 w-12 rounded-full bg-[#078b91]" />
          </div>

          <h1 className="max-w-xl text-4xl font-black leading-tight text-[#071B4D] md:text-5xl">
            We’re Here to Help{" "}
            <span className="text-[#F28B5B]">You & Your Pets</span>
          </h1>

          <p className="mt-5 max-w-lg text-base leading-8 text-slate-600">
            Have questions about our services, appointments, or pet care
            products? Get in touch with our friendly team — we’d love to hear
            from you.
          </p>

          <div className="mt-7 flex flex-wrap gap-4">
            <button className="inline-flex items-center gap-2 rounded-xl bg-[#071B4D] px-6 py-3 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#0B255F]">
              <Phone size={18} />
              Call Us Now
            </button>

            <button className="inline-flex items-center gap-2 rounded-xl border border-[#F28B5B] bg-white px-6 py-3 text-sm font-bold text-[#F28B5B] transition hover:-translate-y-0.5 hover:bg-[#FFF1E9]">
              <Mail size={18} />
              Email Us
            </button>
          </div>
        </div>

        <div className="relative hidden min-h-[380px] lg:block">
          <div className="absolute bottom-0 right-0 h-64 w-[460px] rounded-tl-[180px] rounded-tr-[180px] bg-[#D4E2E0]" />

          <div className="absolute bottom-8 right-10 z-10 flex items-end gap-4">
            <div className="flex h-60 w-44 items-center justify-center rounded-[3rem] bg-white/80 text-7xl shadow-xl">
              🐱
            </div>

            <div className="flex h-80 w-56 items-center justify-center rounded-[3rem] bg-white/80 text-8xl shadow-xl">
              🐶
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
