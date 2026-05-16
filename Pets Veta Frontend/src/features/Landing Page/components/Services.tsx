import Card from "../../../shared/components/Card/Card";
import { servicesData } from "../data/services.data";

const Services = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F9C5A8] via-[#f7d2bd] to-[#D4E2E0] px-4 py-12 sm:px-6 sm:py-14 md:py-16 lg:py-18">
      {/* Background decorations */}
      <div className="absolute left-[-120px] top-10 h-[240px] w-[240px] rounded-full bg-white/25 blur-3xl" />
      <div className="absolute bottom-[-120px] right-[-100px] h-[280px] w-[280px] rounded-full bg-[#078b91]/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mx-auto mb-8 max-w-3xl text-center md:mb-10">
          <span className="mb-4 inline-block rounded-full bg-white/60 px-5 py-2 text-sm font-bold text-[#078b91] shadow-sm backdrop-blur-md">
            What We Offer
          </span>

          <h2 className="mb-4 text-[30px] font-extrabold leading-tight text-[#20263d] sm:text-[34px] md:text-[38px]">
            Our Pet Services
          </h2>

          <p className="mx-auto max-w-2xl text-[15px] leading-[1.8] text-gray-700 sm:text-[16px] md:text-[17px]">
            We provide complete pet care services to keep your furry friends
            healthy, happy, and safe.
          </p>
        </div>

        {/* Cards */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="mx-auto w-full max-w-[330px] transition-all duration-500 ease-out hover:-translate-y-1.5"
            >
              <Card
                title={service.title}
                description={service.description}
                image={service.image}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
