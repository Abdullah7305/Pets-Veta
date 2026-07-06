import {
  FaArrowRight,
  FaPaw,
  FaRobot,
  FaShoppingBasket,
  FaStethoscope,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

import dogMarket from "@/assets/shared/images/dogMarket.jpg";
import vet from "@/assets/shared/images/vet.jpg"
import AiImg from "@/assets/shared/images/ai.jpg";

const services = [
  {
    title: "Pet Marketplace",
    label: "Shop Essentials",
    description:
      "Buy food, accessories, medicines, and pet-care products from trusted sellers.",
    icon: <FaShoppingBasket />,
    image: dogMarket,
    button: "Explore Marketplace",
    url: "/marketplace1",
    highlights: ["Verified sellers", "Fast shopping"],
  },
  {
    title: "Vet Consultation",
    label: "Book Care",
    description:
      "Find verified veterinarians and book appointments for your pet easily.",
    icon: <FaStethoscope />,
    image: vet,
    button: "Book Consultation",
    url: "/doctors",
    highlights: ["Approved vets", "Easy booking"],
  },
  {
    title: "AI Assistant",
    label: "Smart Help",
    description:
      "Get quick pet-care guidance for health, food, symptoms, and daily care.",
    icon: <FaRobot />,
    image: AiImg,
    button: "Ask AI Assistant",
    url: "/ai-assistant",
    highlights: ["Instant answers", "24/7 guidance"],
  },
];

const Services = () => {
  return (
    <section className="relative overflow-hidden bg-[#fbfefe] px-5 py-16 lg:px-16">
      <div className="pointer-events-none absolute left-[-120px] top-20 h-72 w-72 rounded-full bg-[#178f95]/10 blur-3xl" />
      <div className="pointer-events-none absolute right-[-120px] bottom-10 h-80 w-80 rounded-full bg-[#f9c5a8]/25 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto mb-11 max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-[#e8f7f7] px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#178f95]">
            <FaPaw />
            Our Services
          </p>

          <h2 className="mt-5 text-3xl font-black leading-tight tracking-[-0.04em] text-[#07182c] md:text-5xl">
            Simple services for smarter pet care
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-500">
            Shop essentials, book trusted vets, and get instant AI-powered pet
            care support.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              style={{
                backgroundImage: `linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.9) 44%, rgba(232,247,247,0.36) 100%), url(${service.image})`,
                backgroundSize: "cover, 58%",
                backgroundPosition: "center, right 18px bottom 18px",
                backgroundRepeat: "no-repeat",
              }}
              className="group relative min-h-[365px] overflow-hidden rounded-[34px] border border-slate-100 bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1.5 hover:border-[#178f95]/25 hover:shadow-[0_28px_75px_rgba(15,23,42,0.13)]"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-white/25 via-transparent to-transparent" />

              <div className="relative z-10 flex min-h-[317px] flex-col">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8f7f7] text-2xl text-[#178f95] shadow-sm">
                    {service.icon}
                  </div>

                  <span className="rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.16em] text-[#178f95] shadow-sm ring-1 ring-[#178f95]/10 backdrop-blur">
                    {service.label}
                  </span>
                </div>

                <div className="max-w-[88%]">
                  <h3 className="text-[26px] font-black leading-tight tracking-[-0.04em] text-[#07182c]">
                    {service.title}
                  </h3>

                  <p className="mt-4 max-w-[270px] text-sm leading-6 text-slate-600">
                    {service.description}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {service.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-slate-600 shadow-sm ring-1 ring-slate-100 backdrop-blur"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-8">
                  <NavLink
                    to={service.url}
                    className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-[#178f95] px-5 py-3.5 text-sm font-black text-white shadow-[0_14px_30px_rgba(23,143,149,0.22)] transition hover:bg-[#12757a]"
                  >
                    {service.button}
                    <FaArrowRight className="text-xs transition group-hover:translate-x-1" />
                  </NavLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;