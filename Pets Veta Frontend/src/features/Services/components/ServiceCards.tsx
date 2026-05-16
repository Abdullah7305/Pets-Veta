import { ArrowRight } from "lucide-react";

import dentalImg from "../../../assets/shared/images/petGenralService.webp";
import bonesImg from "../../../assets/shared/images/petVaccinationService.webp";
import diagnosisImg from "../../../assets/shared/images/petDiagnosticService.webp";
import surgeryImg from "../../../assets/shared/images/petSurgicalService.webp";
import groomingImg from "../../../assets/shared/images/petTraining&behavior.webp";
import eyeImg from "../../../assets/shared/images/petDiagnosticService.webp";

type ServiceItem = {
  id: number;
  title: string;
  description: string;
  image: string;
};

const servicesData: ServiceItem[] = [
  {
    id: 1,
    title: "Dental treatments",
    description:
      "Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalaracc lacus vel facilisis volutpat est velitolm.",
    image: dentalImg,
  },
  {
    id: 2,
    title: "Bones treatments",
    description:
      "Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalaracc lacus vel facilisis volutpat est velitolm.",
    image: bonesImg,
  },
  {
    id: 3,
    title: "Diagnosis",
    description:
      "Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalaracc lacus vel facilisis volutpat est velitolm.",
    image: diagnosisImg,
  },
  {
    id: 4,
    title: "Cardiology",
    description:
      "Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalaracc lacus vel facilisis volutpat est velitolm.",
    image: surgeryImg,
  },
  {
    id: 5,
    title: "Surgery",
    description:
      "Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalaracc lacus vel facilisis volutpat est velitolm.",
    image: groomingImg,
  },
  {
    id: 6,
    title: "Eye care",
    description:
      "Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalaracc lacus vel facilisis volutpat est velitolm.",
    image: eyeImg,
  },
];

const ServiceCards = () => {
  return (
    <section className="bg-[#F8FAFC] px-4 py-12 sm:px-6 sm:py-14 md:py-16 lg:py-20">
      {/* Heading */}
      <div className="mx-auto mb-9 max-w-[760px] text-center sm:mb-10 md:mb-12">
        <span className="mb-3 inline-block rounded-full bg-[#D4E2E0] px-4 py-2 text-xs font-bold text-[#20263D] sm:text-sm">
          Our Services
        </span>

        <h2 className="mb-3 text-[30px] font-extrabold leading-tight text-[#20263D] sm:text-[34px] md:text-[38px] lg:text-[42px]">
          Services we provide
        </h2>

        <p className="mx-auto max-w-[680px] text-[15px] leading-[1.7] text-gray-600 sm:text-[16px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit semper dalar
          elementum tempus hac tellus libero accumsan.
        </p>
      </div>

      {/* Cards */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {servicesData.map((service, index) => (
          <div
            key={service.id}
            className="group rounded-[22px] border border-slate-100 bg-white p-4 shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:border-[#D4E2E0] hover:shadow-[0_18px_45px_rgba(32,38,61,0.10)] md:rounded-[24px]"
          >
            {/* Image */}
            <div className="mb-4 overflow-hidden rounded-[16px] sm:mb-5">
              <img
                src={service.image}
                alt={service.title}
                className="h-[160px] w-full rounded-[16px] object-cover transition-transform duration-700 ease-out group-hover:scale-110 sm:h-[170px] md:h-[180px] lg:h-[170px]"
              />
            </div>

            {/* Content */}
            <div>
              <h3 className="mb-2 text-[20px] font-bold text-[#20263D] transition-colors duration-300 group-hover:text-[#20263D] sm:mb-3 sm:text-[21px] md:text-[22px]">
                {service.title}
              </h3>

              <p className="mb-4 text-[14px] leading-[1.7] text-gray-600 sm:mb-5 sm:text-[15px]">
                {service.description}
              </p>

              <button className="flex items-center gap-2 text-[15px] font-bold text-[#20263D] transition-all duration-500 ease-out group-hover:gap-4 sm:text-[16px] md:text-[17px]">
                Learn more
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-[#20263D] transition-all duration-500 ease-out group-hover:scale-110 ${
                    index % 2 === 0 ? "bg-[#F9C5A8]" : "bg-[#D4E2E0]"
                  }`}
                >
                  <ArrowRight size={20} />
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceCards;
