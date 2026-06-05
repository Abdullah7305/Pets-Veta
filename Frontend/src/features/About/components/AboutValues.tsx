import { ArrowRight, CalendarCheck, PawPrint, UsersRound } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Choose Doctor",
    text: "Browse through our list of experienced veterinary doctors and select the best one for your pet.",
    icon: UsersRound,
    bg: "bg-[#D4E2E0]/70",
    color: "text-[#078b91]",
  },
  {
    id: "02",
    title: "Book Time Slot",
    text: "Pick your preferred date and time based on the doctor’s availability.",
    icon: CalendarCheck,
    bg: "bg-[#F9C5A8]/60",
    color: "text-[#F28B5B]",
  },
  {
    id: "03",
    title: "Visit & Get Care",
    text: "Visit the clinic, get expert care and keep your pet healthy and happy.",
    icon: PawPrint,
    bg: "bg-[#D4E2E0]/70",
    color: "text-[#078b91]",
  },
];

const AboutSteps = () => {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-16">
      <div className="mb-8 text-center">
        <p className="text-sm font-extrabold uppercase tracking-widest text-[#078b91]">
          How It Works
        </p>

        <h2 className="mt-4 text-3xl font-black text-[#071B4D] md:text-[2.2rem]">
          Simple Steps For Pet Doctor Appointment
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500">
          We keep the appointment process simple so pet owners can get help
          quickly.
        </p>
      </div>

      <div className="grid items-center gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <>
              <div
                key={step.id}
                className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${step.bg} ${step.color}`}
                  >
                    <Icon size={26} />
                  </div>

                  <div>
                    <span className="text-lg font-black text-[#078b91]">
                      {step.id}
                    </span>
                    <h3 className="mt-1 text-lg font-black text-[#071B4D]">
                      {step.title}
                    </h3>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-7 text-slate-500">
                  {step.text}
                </p>
              </div>

              {index !== steps.length - 1 && (
                <div
                  key={`${step.id}-arrow`}
                  className="hidden text-[#078b91]/60 md:block"
                >
                    <ArrowRight size={22} />
                </div>
              )}
            </>
          );
        })}
      </div>
    </section>
  );
};

export default AboutSteps;
