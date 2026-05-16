import dog from "../../../assets/shared/images/dog2.jpeg";

const About = () => {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-14 sm:px-6 sm:py-16 md:px-8 md:py-18 lg:px-10 lg:py-20">
      {/* Soft background effects */}
      <div className="absolute left-[-120px] top-[80px] h-[280px] w-[280px] rounded-full bg-[#F9C5A8]/35 blur-3xl" />
      <div className="absolute bottom-[-120px] right-[-100px] h-[320px] w-[320px] rounded-full bg-[#078b91]/15 blur-3xl" />

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-9 md:grid-cols-2 md:gap-10 lg:gap-12">
        {/* Left Side Image */}
        <div className="flex justify-center md:justify-start">
          <div className="group relative w-full max-w-[390px] rounded-[34px] border border-white/60 bg-gradient-to-br from-[#F9C5A8]/35 to-[#D4E2E0]/50 p-3 shadow-2xl shadow-[#078b91]/10 backdrop-blur-xl transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-[#078b91]/20 sm:max-w-[420px]">
            <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-[#078b91]/20 blur-2xl" />
            <div className="absolute -bottom-5 -left-5 h-24 w-24 rounded-full bg-[#F9C5A8]/45 blur-2xl" />

            <img
              src={dog}
              alt="About Pet Care"
              className="relative z-10 h-[290px] w-full rounded-[26px] object-cover shadow-xl transition-transform duration-700 ease-out group-hover:scale-[1.03] sm:h-[340px] md:h-[380px]"
            />
          </div>
        </div>

        {/* Right Side Content */}
        <div className="text-center md:text-left">
          <span className="mb-4 inline-block rounded-full bg-[#078b91]/10 px-5 py-2 text-sm font-bold text-[#078b91]">
            About Us
          </span>

          <h2 className="mb-5 text-[30px] font-extrabold leading-tight text-[#20263d] sm:text-[36px] md:text-[40px] lg:text-[44px]">
            About Our Pet Care Services
          </h2>

          <p className="mx-auto mb-5 max-w-[600px] text-[15px] leading-[1.8] text-gray-600 sm:text-[16px] md:mx-0 md:text-[17px]">
            We provide trusted and professional pet care services to keep your
            furry friends healthy, happy, and safe. From vet appointments to
            grooming sessions, we make pet care simple and stress-free.
          </p>

          <p className="mx-auto mb-7 max-w-[600px] text-[15px] leading-[1.8] text-gray-600 sm:text-[16px] md:mx-0 md:text-[17px]">
            Our experienced team is dedicated to giving your pets the love and
            attention they deserve.
          </p>

          {/* Feature points */}
          <div className="mx-auto mb-8 grid max-w-[620px] grid-cols-1 gap-3 sm:grid-cols-2 md:mx-0">
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lg">
              <h3 className="text-[17px] font-bold text-[#078b91]">
                Expert Doctors
              </h3>
              <p className="mt-1 text-sm leading-6 text-gray-500">
                Professional care by trained pet specialists.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lg">
              <h3 className="text-[17px] font-bold text-[#078b91]">
                Safe Care
              </h3>
              <p className="mt-1 text-sm leading-6 text-gray-500">
                Comfortable and friendly environment for pets.
              </p>
            </div>
          </div>

          <button className="rounded-full bg-[#078b91] px-7 py-3.5 text-[15px] font-bold text-white shadow-lg shadow-[#078b91]/25 transition-all duration-500 ease-out hover:-translate-y-1 hover:bg-[#06777c] hover:shadow-xl hover:shadow-[#078b91]/30">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
