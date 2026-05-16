import Card from "../../../shared/components/Card/Card";
import { teamData } from "../data/team.data";
const Team = () => {
    return (
        <section className="px-6 py-16">

            <div className="mx-auto max-w-6xl">

                {/* Heading */}
                <div className="mb-10 text-center">
                    <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-[2.2rem]">
                        Meet Our Team Members
                    </h2>

                    <p className="mx-auto max-w-2xl text-base leading-8 text-gray-600">
                        Our caring team of pet lovers is here to provide trusted medical care, grooming, and support for your beloved pets. We treat every animal like family and ensure they receive the best possible care.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
