import {
  FaClock,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";

const info = [
  {
    icon: <FaPhoneAlt />,
    title: "Phone Number",
    value: "+92 300 1234567",
  },
  {
    icon: <FaEnvelope />,
    title: "Email Address",
    value: "support@petsveta.com",
  },
  {
    icon: <FaMapMarkerAlt />,
    title: "Location",
    value: "Lahore, Pakistan",
  },
  {
    icon: <FaClock />,
    title: "Support Hours",
    value: "24/7 Available",
  },
];

const ContactInfo = () => {
  return (
    <section className="bg-white px-5 py-14 lg:px-16">
      <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {info.map((item) => (
          <div
            key={item.title}
            className="rounded-3xl bg-[#f5fbff] p-6 text-center"
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-xl text-[#009f9d] shadow-sm">
              {item.icon}
            </div>

            <h3 className="text-lg font-extrabold text-[#07182c]">
              {item.title}
            </h3>

            <p className="mt-2 text-sm font-semibold text-slate-600">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContactInfo;