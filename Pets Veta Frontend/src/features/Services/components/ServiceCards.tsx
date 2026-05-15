import { ArrowRight } from "lucide-react";

import dentalImg from "../../../assets/shared/images/petGenralService.jpg";
import bonesImg from "../../../assets/shared/images/petVaccinationService.jpg";
import diagnosisImg from "../../../assets/shared/images/petDiagnosticService.jpg";
import surgeryImg from "../../../assets/shared/images/petSurgicalService.jpg";
import groomingImg from "../../../assets/shared/images/petTraining&behavior.jpg";
import eyeImg from "../../../assets/shared/images/petDiagnosticService.jpg";

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
    <section className="bg-[#eeeeee] px-4 py-14 sm:px-6 sm:py-16 md:py-20 lg:py-24">
      {/* Heading */}
      <div className="mx-auto mb-10 max-w-[820px] text-center sm:mb-12 md:mb-14">
        <span className="mb-3 inline-block rounded-full bg-[#078b91]/10 px-4 py-2 text-xs font-bold text-[#078b91] sm:text-sm">
          Our Services
        </span>

        <h2 className="mb-3 text-[30px] font-extrabold leading-tight text-[#078b91] sm:text-[36px] md:text-[42px] lg:text-[46px]">
          Services we provide
        </h2>

        <p className="mx-auto max-w-[720px] text-[15px] leading-[1.7] text-gray-600 sm:text-[16px] md:text-[18px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit semper dalar
          elementum tempus hac tellus libero accumsan.
        </p>
      </div>

      {/* Cards */}
      <div className="mx-auto grid max-w-[1250px] grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
        {servicesData.map((service) => (
          <div
            key={service.id}
            className="group rounded-[22px] border border-gray-100 bg-white p-4 shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:border-[#078b91]/20 hover:shadow-[0_18px_45px_rgba(7,139,145,0.16)] sm:p-5 md:rounded-[24px]"
          >
            {/* Image */}
            <div className="mb-4 overflow-hidden rounded-[16px] sm:mb-5">
              <img
                src={service.image}
                alt={service.title}
                className="h-[170px] w-full rounded-[16px] object-cover transition-transform duration-700 ease-out group-hover:scale-110 sm:h-[180px] md:h-[190px] lg:h-[180px]"
              />
            </div>

            {/* Content */}
            <div>
              <h3 className="mb-2 text-[21px] font-bold text-[#078b91] transition-colors duration-300 group-hover:text-[#056f74] sm:mb-3 sm:text-[23px] md:text-[24px]">
                {service.title}
              </h3>

              <p className="mb-4 text-[14px] leading-[1.7] text-gray-600 sm:mb-5 sm:text-[15px] md:text-[16px]">
                {service.description}
              </p>

              <button className="flex items-center gap-2 text-[15px] font-bold text-[#078b91] transition-all duration-500 ease-out group-hover:gap-4 group-hover:text-[#056f74] sm:text-[16px] md:text-[17px]">
                Learn more
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#078b91]/10 transition-all duration-500 ease-out group-hover:bg-[#078b91] group-hover:text-white">
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