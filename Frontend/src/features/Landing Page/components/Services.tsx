import {
  FaPaw,
  FaShoppingBasket,
  FaStethoscope,
  FaRobot,
  FaCheck,
  FaShieldAlt,
  FaAward,
  FaLock,
  FaHeadset,
  FaArrowRight,
} from "react-icons/fa";

import img from "@/assets/shared/images/dog2.jpeg"
import { NavLink } from "react-router-dom";

const services = [
  {
    title: "Pet Marketplace",
    desc: "Shop a wide range of trusted pet products delivered to your doorstep.",
    icon: <FaShoppingBasket />,
    color: "text-[#159f9b]",
    checkBg: "bg-[#159f9b]",
    iconBg: "bg-[#d8f4ef]",
    bg: "from-[#eefbf7] to-[#f8fffd]",
    btn: "!bg-[#119f98] !border-[#119f98]",
    image: img,
    items: [
      "Premium pet food",
      "Toys & accessories",
      "Medications & supplements",
      "Grooming essentials",
    ],
    button: "Explore Marketplace",
    url:"/marketplace1"
  },
  {
    title: "Vet Consultation",
    desc: "Connect with verified veterinarians and book appointments with ease.",
    icon: <FaStethoscope />,
    color: "text-[#168dcc]",
    checkBg: "bg-[#168dcc]",
    iconBg: "bg-[#d9f0fb]",
    bg: "from-[#eef8ff] to-[#f7fcff]",
    btn: "!bg-[#168dcc] !border-[#168dcc]",
    image: img,
    items: [
      "Book online appointments",
      "Verified & experienced vets",
      "Video & in-clinic consultation",
      "Health records & prescriptions",
    ],
    button: "Book a Consultation",
    url:"/doctors"
  },
  {
    title: "AI Assistant",
    desc: "Get 24/7 AI support for your pet's health, nutrition and well-being.",
    icon: <FaRobot />,
    color: "text-[#6e36b8]",
    checkBg: "bg-[#6e36b8]",
    iconBg: "bg-[#eadcf8]",
    bg: "from-[#faf4ff] to-[#fff9ff]",
    btn: "!bg-[#6e36b8] !border-[#6e36b8]",
    image: img,
    items: [
      "Instant answers to your questions",
      "Health & symptom checker",
      "Nutrition & diet guidance",
      "Care tips & reminders",
    ],
    button: "Ask AI Assistant",
    url:"/ai-assistant"
  },
];

const bottomFeatures = [
  {
    icon: <FaShieldAlt />,
    title: "Trusted & Secure",
    desc: "100% genuine products and reliable care",
  },
  {
    icon: <FaAward />,
    title: "Verified Experts",
    desc: "Experienced vets & pet care professionals",
  },
  {
    icon: <FaLock />,
    title: "Safe & Private",
    desc: "Your pet's data is protected with top security",
  },
  {
    icon: <FaHeadset />,
    title: "24/7 Support",
    desc: "We're always here for you and your pets",
  },
];

const Services = () => {
  return (
    <section className="bg-white px-6 py-12 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="mb-2 flex items-center justify-center gap-2 text-sm font-extrabold uppercase tracking-wider text-[#009f9d]">
            Our Services <FaPaw />
          </p>

          <h2 className="text-[28px] font-extrabold leading-tight text-[#07182c] md:text-[36px]">
            Everything your pet needs, in{" "}
            <span className="text-[#009f9d]">one place</span>
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-600">
            From shopping the best products to expert care and AI support,
            <br className="hidden md:block" />
            we make pet parenting easier, smarter and worry-free.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className={`rounded-[24px] bg-gradient-to-br ${service.bg} p-6 shadow-[0_12px_35px_rgba(15,23,42,0.08)]`}
            >
              <div className="mb-6 flex items-start gap-4">
                <div
                  className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full ${service.iconBg} ${service.color} text-3xl`}
                >
                  {service.icon}
                </div>

                <div>
                  <h3 className="mb-2 text-[20px] font-extrabold text-[#07182c]">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-6 text-slate-600">
                    {service.desc}
                  </p>
                </div>
              </div>

              <div className="mb-6 space-y-3">
                {service.items.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm font-medium text-[#07182c]"
                  >
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full ${service.checkBg} text-white`}
                    >
                      <FaCheck className="text-[10px]" />
                    </span>
                    {item}
                  </div>
                ))}
              </div>

              <div className="mb-6 flex h-[230px] items-end justify-center overflow-hidden rounded-3xl">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-full w-full object-contain object-bottom"
                />
              </div>

              <NavLink
                to={service.url}
                className={`inline-flex items-center gap-3 p-3 !rounded-xl !text-white hover:!text-white ${service.btn}`}
              >
                {service.button}hh
                <FaArrowRight />
              </NavLink>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 rounded-[22px] bg-white px-7 py-5 shadow-[0_10px_35px_rgba(15,23,42,0.08)] md:grid-cols-2 lg:grid-cols-4">
          {bottomFeatures.map((feature) => (
            <div key={feature.title} className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#e0f7f5] text-2xl text-[#009f9d]">
                {feature.icon}
              </div>
              <div>
                <h4 className="text-base font-extrabold text-[#07182c]">
                  {feature.title}
                </h4>
                <p className="text-sm leading-5 text-slate-600">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
