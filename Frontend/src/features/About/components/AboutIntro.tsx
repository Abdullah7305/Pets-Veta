import {
  CalendarCheck,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

const features = [
  {
    id: 1,
    title: "Expert Doctors",
    text: "Experienced and verified veterinarians you can trust for your pet’s health.",
    icon: Stethoscope,
    bg: "bg-[#D4E2E0]/70",
    color: "text-[#078b91]",
  },
  {
    id: 2,
    title: "Easy Appointments",
    text: "Book appointments online in just a few clicks. Quick, easy and convenient.",
    icon: CalendarCheck,
    bg: "bg-[#F9C5A8]/50",
    color: "text-[#F28B5B]",
  },
  {
    id: 3,
    title: "Complete Care",
    text: "From checkups to health advice, we provide complete care for pets.",
    icon: HeartPulse,
    bg: "bg-[#D4E2E0]/70",
    color: "text-[#078b91]",
  },
  {
    id: 4,
    title: "Safe & Reliable",
    text: "We follow high standards of care and ensure a safe experience for your pets.",
    icon: ShieldCheck,
    bg: "bg-[#F9C5A8]/50",
    color: "text-[#F28B5B]",
  },
];

const AboutIntro = () => {
  return (
    <section className="mx-auto grid max-w-6xl gap-8 px-5 py-16 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <p className="text-sm font-extrabold uppercase tracking-widest text-[#078b91]">
          Who We Are
        </p>

        <h2 className="mt-4 text-3xl font-black leading-tight text-[#071B4D] md:text-[2.2rem]">
          A Better Way To Care For Your Pets
        </h2>

        <p className="mt-5 text-base leading-8 text-slate-600">
          We understand that pets are family. That is why we created PawCare —
          to help pet owners find trusted veterinary doctors, book appointments
          online, and get the best care for their furry companions.
        </p>

        <p className="mt-4 text-base leading-8 text-slate-600">
          From regular checkups to special treatments, our platform is here to
          make pet healthcare simple, reliable, and stress-free.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {features.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
            className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.bg} ${item.color}`}
              >
                <Icon size={26} />
              </div>

              <h3 className="mt-5 text-lg font-black text-[#071B4D]">
                {item.title}
              </h3>

              <p className="mt-2 text-sm leading-7 text-slate-500">
                {item.text}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AboutIntro;
