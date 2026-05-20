import {
  BadgeCheck,
  HeartHandshake,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

const trustItems = [
  {
    id: 1,
    title: "Trusted & Safe",
    text: "Your pet’s safety is our top priority.",
    icon: ShieldCheck,
    bg: "bg-[#D4E2E0]/70",
    color: "text-[#078b91]",
  },
  {
    id: 2,
    title: "Expert Team",
    text: "Professional vets and support staff.",
    icon: UsersRound,
    bg: "bg-[#F9C5A8]/50",
    color: "text-[#F28B5B]",
  },
  {
    id: 3,
    title: "Quality Care",
    text: "We provide the best care for your pets.",
    icon: HeartHandshake,
    bg: "bg-[#D4E2E0]/70",
    color: "text-[#078b91]",
  },
  {
    id: 4,
    title: "24/7 Support",
    text: "We’re here whenever you need.",
    icon: BadgeCheck,
    bg: "bg-[#F9C5A8]/50",
    color: "text-[#F28B5B]",
  },
];

const ContactTrustBar = () => {
  return (
    <div className="grid gap-5 rounded-3xl border border-slate-100 bg-white p-5 shadow-sm md:grid-cols-2 lg:grid-cols-4">
      {trustItems.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={item.id}
            className={`flex items-center gap-4 px-2 py-4 ${
              index !== trustItems.length - 1
                ? "lg:border-r lg:border-slate-200"
                : ""
            }`}
          >
            <div
              className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${item.bg} ${item.color}`}
            >
              <Icon size={28} />
            </div>

            <div>
              <h3 className="text-base font-extrabold text-[#071B4D]">
                {item.title}
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                {item.text}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ContactTrustBar;