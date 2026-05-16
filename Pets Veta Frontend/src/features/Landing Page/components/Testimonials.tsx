import Card from "../../../shared/components/Card/Card";
import {testimonialData} from "../data/testimonial.data"

const Testimonial = () => {
    return (
        <section className="bg-gradient-to-b from-[#F9C5A8] to-[#D4E2E0] px-6 py-16">

            <div className="mx-auto max-w-6xl">

                {/* Heading */}
                <div className="mb-10 text-center">
                    <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-[2.2rem]">
                        Testmonials
                    </h2>

                    <p className="mx-auto max-w-2xl text-base leading-8 text-gray-600">
                        Real feedback from our satisfied clients about their experience and service quality                    
                        </p>
                </div>

                {/* Cards */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {testimonialData.map((testimonial) => (
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
