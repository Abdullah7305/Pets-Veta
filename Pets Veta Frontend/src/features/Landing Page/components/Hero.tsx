import heroImage from "../../../assets/shared/images/pexels-ten-brinke-photography-3877392-15488735-removebg-preview.png"

const Hero = () => {
    return (
        <section className="bg-[linear-gradient(180deg,_rgba(249,197,168,1)_0%,_rgba(249,197,168,1)_19%,_rgba(249,197,168,1)_27%,_rgba(212,226,224,1)_100%)] flex items-center">

            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center w-full">

                {/* Left Side */}
                <div className="text-white">
                    <h1 className="text-5xl font-bold leading-tight mb-6">
                        Caring For Your Pets Starts Here
                    </h1>

                    <p className="text-lg mb-8 text-gray-100">
                        Schedule vet appointments, grooming sessions, and pet checkups quickly and easily — all in one place.
                    </p>

                    <div className="flex gap-4">
                        <button className="bg-white text-blue-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200">
                            Get Started
                        </button>

                        <button className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-500">
                            Learn More
                        </button>
                    </div>
                </div>

                {/* Right Side */}
                <div className="flex justify-center">
                    <img
                        src={heroImage}
                        alt="Hero"
                        className="w-full max-w-md"
                    />
                </div>

            </div>

        </section>
    );
};

export default Hero;