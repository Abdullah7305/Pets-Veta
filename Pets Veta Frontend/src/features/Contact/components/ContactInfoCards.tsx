import { Clock, Mail, MapPin, Phone } from "lucide-react";

const contactInfo = [
  {
    id: 1,
    title: "Phone",
    value: "+92 300 1234567",
    text: "Mon - Sat 9AM to 8PM",
    icon: Phone,
    bg: "bg-[#D4E2E0]/70",
    color: "text-[#078b91]",
  },
  {
    id: 2,
    title: "Email",
    value: "support@pawcare.com",
    text: "We reply within 24 hours",
    icon: Mail,
    bg: "bg-[#F9C5A8]/50",
    color: "text-[#F28B5B]",
  },
  {
    id: 3,
    title: "Location",
    value: "Lahore, Pakistan",
    text: "Visit our office",
    icon: MapPin,
    bg: "bg-[#D4E2E0]/70",
    color: "text-[#078b91]",
  },
  {
    id: 4,
    title: "Working Hours",
    value: "Mon - Sat: 9AM - 8PM",
    text: "Sunday: Closed",
    icon: Clock,
    bg: "bg-[#F9C5A8]/50",
    color: "text-[#F28B5B]",
  },
];

const ContactInfoCards = () => {
  return (
    <div className="grid gap-5 rounded-3xl border border-slate-100 bg-white p-5 shadow-xl shadow-slate-200/60 md:grid-cols-2 lg:grid-cols-4">
      {contactInfo.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={item.id}
            className={`flex items-center gap-4 px-2 py-4 ${
              index !== contactInfo.length - 1
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
              <p className="mt-1 text-sm font-semibold text-slate-700">
                {item.value}
              </p>
              <p className="mt-1 text-sm text-slate-500">{item.text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ContactInfoCards;