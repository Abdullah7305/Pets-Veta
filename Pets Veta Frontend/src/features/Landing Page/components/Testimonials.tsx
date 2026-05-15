import Card from "../../../shared/components/Card/Card";
import {testimonialData} from "../data/testimonial.data"

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