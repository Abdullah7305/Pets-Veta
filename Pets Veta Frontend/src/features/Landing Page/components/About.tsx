import dog from "../../../assets/shared/images/dog2.jpeg"

const About = () => {
    return (
        <section className="py-20 px-6 bg-white">

            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

                {/* Left Side Image */}
                <div className="flex justify-center">
                    <img
                        src={dog}
                        alt="About Pet Care"
                        className="w-full max-w-md rounded-2xl shadow-xl"
                    />
                </div>

                {/* Right Side Content */}
                <div>

                    <h2 className="text-4xl font-bold mb-6 text-gray-800">
                        About Our Pet Care Services
                    </h2>

                    <p className="text-gray-600 text-lg mb-6 leading-8">
                        We provide trusted and professional pet care services
                        to keep your furry friends healthy, happy, and safe.
                        From vet appointments to grooming sessions, we make
                        pet care simple and stress-free.
                    </p>

                    <p className="text-gray-600 text-lg mb-8 leading-8">
                        Our experienced team is dedicated to giving your pets
                        the love and attention they deserve.
                    </p>

                    <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800">
                        Learn More
                    </button>

                </div>

            </div>

        </section>
    );
};

export default About;