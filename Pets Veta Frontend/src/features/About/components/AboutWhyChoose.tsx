import {
  CalendarCheck,
  CheckCircle2,
  Quote,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

const points = [
  "Easy online appointment booking",
  "Verified and experienced doctors",
  "Wide range of pet care services",
  "Support for happy and healthy pets",
];

const AboutWhyChoose = () => {
  return (
    <section className="mx-auto grid max-w-6xl gap-8 px-5 pb-16 lg:grid-cols-[0.8fr_1fr_0.8fr]">
      <div>
        <p className="text-sm font-extrabold uppercase tracking-widest text-[#078b91]">
          Why Choose PawCare
        </p>

        <h2 className="mt-4 text-3xl font-black leading-tight text-[#071B4D] md:text-[2.2rem]">
          We Are Here For You And Your Pets
        </h2>

        <p className="mt-5 text-sm leading-7 text-slate-600">
          Our mission is to provide accessible, affordable, and quality pet
          healthcare by connecting you with trusted veterinary professionals.
        </p>

        <ul className="mt-6 space-y-3">
          {points.map((point) => (
            <li key={point} className="flex items-center gap-3 text-sm text-slate-600">
              <CheckCircle2 size={18} className="text-[#078b91]" />
              {point}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#D4E2E0]/80 to-[#F9C5A8]/50 p-5 shadow-sm">
        <div className="flex min-h-[320px] items-center justify-center rounded-3xl bg-white/60">
          <div className="text-center">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white text-[#078b91] shadow-md">
              <Stethoscope size={50} />
            </div>

            <div className="mt-6 flex justify-center gap-4 text-6xl">
              <span>🐶</span>
              <span>🐱</span>
            </div>

            <p className="mt-5 text-lg font-black text-[#071B4D]">
              Doctor + Pet Care
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Professional care for your pets
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <Quote size={34} className="text-[#078b91]" />

        <p className="mt-6 text-sm leading-8 text-slate-600">
          PawCare made it so easy to find a great doctor for my dog. The
          appointment process is smooth and the care is excellent.
        </p>

        <div className="mt-8 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F9C5A8]/60 text-xl">
            👩
          </div>

          <div>
            <h4 className="font-black text-[#071B4D]">Ayesha Khan</h4>
            <p className="text-sm text-slate-500">Pet Parent</p>
          </div>
        </div>

        <div className="mt-8 grid gap-4">
          <div className="flex items-center gap-3 rounded-2xl bg-[#D4E2E0]/45 p-4">
            <ShieldCheck size={24} className="text-[#078b91]" />
            <span className="text-sm font-bold text-[#071B4D]">
              Trusted doctors
            </span>
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-[#F9C5A8]/35 p-4">
            <CalendarCheck size={24} className="text-[#F28B5B]" />
            <span className="text-sm font-bold text-[#071B4D]">
              Quick appointments
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutWhyChoose;
