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
        title: "Razia Ahmed",
        description: "It was a very good experience. The service was on time and the staff was very professional.” — Razia Ahmed",
        image: getImage("testimonial1.jpg")
    },
    {
        id: 2,
        title: "Farzana Malik",
        description: "I got very good results here. The treatment was smooth and clearly explained. — Farzana Malik",
        image: getImage("testimonial2.jpg")
    },
    {
        id: 3,
        title: "Shabana Khan",
        description: "The doctor provided excellent care, and the whole process was simple and comfortable.” — Shabana Khan",
        image: getImage("testimonial3.jpg")
    }
];

const Testimonial = () => {
    return (
        <section className="py-20 px-6 bg-gradient-to-b from-[#F9C5A8] to-[#D4E2E0]">

            <div className="max-w-7xl mx-auto">

                {/* Heading */}
                <div className="text-center mb-14">
                    <h2 className="text-4xl font-bold mb-4 text-gray-800">
                        Testmonials
                    </h2>

                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Real feedback from our satisfied clients about their experience and service quality                    
                        </p>
                </div>

                {/* Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {servicesData.map((testimonial) => (
                        <Card
                            key={testimonial.id}
                            title={testimonial.title}
                            description={testimonial.description}
                            image={testimonial.image}
                        />
                    ))}
                </div>

            </div>

        </section>
    );
};

export default Testimonial;