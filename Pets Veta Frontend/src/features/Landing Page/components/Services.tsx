import Card from "../../../shared/components/card/Card";

const images = import.meta.glob(
  "../../../assets/shared/images/*.{png,jpg,jpeg,svg}",
  {
    eager: true,
    import: "default",
  }
) as Record<string, string>;

const getImage = (name: string) =>
  images[`../../../assets/shared/images/${name}`];

const servicesData = [
  {
    id: 1,
    title: "General Vet Services",
    description: "Professional health checkups and routine care for your pets.",
    image: getImage("petGenralService.jpg"),
  },
  {
    id: 2,
    title: "Vaccination Services",
    description: "Protect your pets with safe and timely vaccinations.",
    image: getImage("petVaccinationService.jpg"),
  },
  {
    id: 3,
    title: "Grooming Services",
    description: "Keep your pets clean, fresh, healthy, and happy.",
    image: getImage("petGroomingService.jpg"),
  },
  {
    id: 4,
    title: "Diagnostic Services",
    description: "Accurate testing and diagnosis for better pet treatment.",
    image: getImage("petDiagnosticService.jpg"),
  },
  {
    id: 5,
    title: "Surgical Services",
    description: "Safe surgical care handled by experienced pet doctors.",
    image: getImage("petSurgicalService.jpg"),
  },
  {
    id: 6,
    title: "Training & Behavior",
    description: "Helpful training sessions for better pet behavior.",
    image: getImage("petTraining&behavior.jpg"),
  },
];

const Services = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F9C5A8] via-[#f7d2bd] to-[#D4E2E0] px-4 py-14 sm:px-6 sm:py-16 md:py-20 lg:py-22">
      {/* Background decorations */}
      <div className="absolute left-[-120px] top-10 h-[240px] w-[240px] rounded-full bg-white/25 blur-3xl" />
      <div className="absolute bottom-[-120px] right-[-100px] h-[280px] w-[280px] rounded-full bg-[#078b91]/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-[1180px]">
        {/* Heading */}
        <div className="mx-auto mb-10 max-w-3xl text-center md:mb-12">
          <span className="mb-4 inline-block rounded-full bg-white/60 px-5 py-2 text-sm font-bold text-[#078b91] shadow-sm backdrop-blur-md">
            What We Offer
          </span>

          <h2 className="mb-4 text-[30px] font-extrabold leading-tight text-[#20263d] sm:text-[36px] md:text-[42px]">
            Our Pet Services
          </h2>

          <p className="mx-auto max-w-2xl text-[15px] leading-[1.8] text-gray-700 sm:text-[16px] md:text-[17px]">
            We provide complete pet care services to keep your furry friends
            healthy, happy, and safe.
          </p>
        </div>

        {/* Cards */}
        <div className="mx-auto grid max-w-[1080px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
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