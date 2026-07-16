import {
  ArrowRight,
  Bot,
  CheckCircle2,
  ShoppingBag,
  Stethoscope,
} from "lucide-react";
import { NavLink } from "react-router-dom";

import dogMarket from "@/assets/shared/images/dogMarket.jpg";
import vet from "@/assets/shared/images/vet.jpg";
import aiImg from "@/assets/shared/images/ai.jpg";

const services = [
  {
    title: "Pet Marketplace",
    label: "Shop",
    description:
      "Buy food, accessories, medicines, and pet-care products from trusted sellers.",
    icon: ShoppingBag,
    image: dogMarket,
    button: "Explore Marketplace",
    url: "/marketplace1",
    highlights: ["Verified sellers", "Fast shopping"],
  },
  {
    title: "Vet Consultation",
    label: "Care",
    description:
      "Find verified veterinarians and book appointments for your pet easily.",
    icon: Stethoscope,
    image: vet,
    button: "Book Consultation",
    url: "/doctors",
    highlights: ["Approved vets", "Easy booking"],
  },
  {
    title: "AI Assistant",
    label: "AI Help",
    description:
      "Get quick pet-care guidance for health, food, symptoms, and daily care.",
    icon: Bot,
    image: aiImg,
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
          <h2 className="text-[34px] font-black leading-[1.06] tracking-[-0.05em] text-[#07182c] md:text-[46px]">
            Simple services for{" "}
            <span className="text-[#178f95]">smarter pet care</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-500">
            Shop essentials, book trusted vets, and get instant AI-powered
            support from one simple pet-care platform.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article
                key={service.title}
                className="group relative min-h-[430px] overflow-hidden rounded-[34px] border border-white bg-white shadow-[0_18px_55px_rgba(15,23,42,0.1)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_75px_rgba(15,23,42,0.16)]"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#07182c]/85 via-[#07182c]/35 to-[#07182c]/10" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#178f95]/20 via-transparent to-[#f9c5a8]/15" />

                <div className="relative z-10 flex min-h-[430px] flex-col justify-between p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/90 text-[#178f95] shadow-sm backdrop-blur">
                      <Icon size={27} strokeWidth={2.6} />
                    </div>

                    <span className="rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.16em] text-[#178f95] shadow-sm backdrop-blur">
                      {service.label}
                    </span>
                  </div>

                  <div>
                    <h3 className="max-w-[290px] text-[30px] font-black leading-tight tracking-[-0.05em] text-white drop-shadow">
                      {service.title}
                    </h3>

                    <p className="mt-4 max-w-[310px] text-sm leading-6 text-white/85">
                      {service.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {service.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm backdrop-blur"
                        >
                          <CheckCircle2
                            size={13}
                            className="text-[#178f95]"
                            strokeWidth={2.8}
                          />
                          {highlight}
                        </span>
                      ))}
                    </div>

                    <NavLink
                      to={service.url}
                      className="mt-7 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-[#178f95] px-5 py-3.5 text-sm font-black text-white shadow-[0_14px_30px_rgba(23,143,149,0.28)] transition hover:bg-[#12757a]"
                    >
                      {service.button}
                      <ArrowRight
                        size={16}
                        strokeWidth={2.8}
                        className="transition group-hover:translate-x-1"
                      />
                    </NavLink>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;