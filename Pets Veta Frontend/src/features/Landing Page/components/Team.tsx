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
        title: "Dr. Ahmad Khan",
        description: "Professional health checkups for your pets.",
        image: getImage("maleDoctor1.jpg")
    },
    {
        id: 2,
        title: "Dr. Muhammad Hamza",
        description: "Keep your pets clean, healthy, and happy.",
        image: getImage("maleDoctor2.jpg")
    },
    {
        id: 3,
        title: "Dr. Ali Raza",
        description: "Protect your pets with timely vaccinations.",
        image: getImage("maleDoctor3.jpg")
    },
    {
        id: 4,
        title: "Dr. Ayesha Noor",
        description: "Training sessions for better pet behavior.",
        image: getImage("femaleDoctor1.jpg")
    },
    {
        id: 5,
        title: "Dr. Fatima Zahra    ",
        description: "Safe and comfortable stay for your pets.",
        image: getImage("femaleDoctor2.jpg")
    },
    {
        id: 6,
        title: "Dr. Zainab Ali",
        description: "24/7 emergency support for your pets.",
        image: getImage("femaleDoctor3.jpg")
    },
];

const Team = () => {
    return (
        <section className="py-20 px-6">

            <div className="max-w-7xl mx-auto">

                {/* Heading */}
                <div className="text-center mb-14">
                    <h2 className="text-4xl font-bold mb-4 text-gray-800">
                        Meet Our Team Members
                    </h2>

                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Our caring team of pet lovers is here to provide trusted medical care, grooming, and support for your beloved pets. We treat every animal like family and ensure they receive the best possible care.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {servicesData.map((team) => (
                        <Card
                            key={team.id}
                            title={team.title}
                            description={team.description}
                            image={team.image}
                        />
                    ))}
                </div>

            </div>

        </section>
    );
};

export default Team;