import { CalendarDays, PawPrint, Stethoscope, UsersRound } from "lucide-react";

const stats = [
  {
    id: 1,
    number: "2,500+",
    label: "Happy Pet Parents",
    icon: UsersRound,
  },
  {
    id: 2,
    number: "120+",
    label: "Expert Doctors",
    icon: Stethoscope,
  },
  {
    id: 3,
    number: "5,000+",
    label: "Appointments Booked",
    icon: CalendarDays,
  },
  {
    id: 4,
    number: "15,000+",
    label: "Pets Treated",
    icon: PawPrint,
  },
];

const AboutStats = () => {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-16">
      <div className="grid gap-5 rounded-3xl bg-[#D4E2E0]/45 p-5 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className={`flex items-center gap-3 px-3 py-3 ${
                index !== stats.length - 1
                  ? "lg:border-r lg:border-[#078b91]/20"
                  : ""
              }`}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[#078b91] shadow-sm">
                <Icon size={24} />
              </div>

              <div>
                <h3 className="text-2xl font-black text-[#078b91]">
                  {item.number}
                </h3>
                <p className="mt-1 text-sm font-medium text-[#071B4D]">
                  {item.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AboutStats;
