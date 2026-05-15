import Card from "../../../shared/components/Card/Card";
import { teamData } from "../data/team.data";
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
                    {teamData.map((team) => (
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