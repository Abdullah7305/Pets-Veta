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
        description: "Professional health checkups for your pets.",
        image: getImage("petGenralService.jpg")
    },
    {
        id: 2,
        title: "Vaccination Services",
        description: "Keep your pets clean, healthy, and happy.",
        image: getImage("petVaccinationService.jpg")
    },
    {
        id: 3,
        title: "Grooming Services",
        description: "Protect your pets with timely vaccinations.",
        image: getImage("petGroomingService.jpg")
    },
    {
        id: 4,
        title: "Diagnostic Services",
        description: "Training sessions for better pet behavior.",
        image: getImage("petDiagnosticService.jpg")
    },
    {
        id: 5,
        title: "Surgical Services",
        description: "Safe and comfortable stay for your pets.",
        image: getImage("petSurgicalService.jpg")
    },
    {
        id: 6,
        title: "Training & Behavior",
        description: "24/7 emergency support for your pets.",
        image: getImage("petTraining&behavior.jpg")
    },
];

const Services = () => {
    return (
        <section className="py-20 px-6 bg-gradient-to-b from-[#F9C5A8] to-[#D4E2E0]">

            <div className="max-w-7xl mx-auto">

                {/* Heading */}
                <div className="text-center mb-14">
                    <h2 className="text-4xl font-bold mb-4 text-gray-800">
                        Our Pet Services
                    </h2>

                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        We provide complete pet care services to keep your
                        furry friends healthy, happy, and safe.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {servicesData.map((service) => (
                        <Card
                            key={service.id}
                            title={service.title}
                            description={service.description}
                            image={service.image}
                        />
                    ))}
                </div>

            </div>

        </section>
    );
};

export default Services;