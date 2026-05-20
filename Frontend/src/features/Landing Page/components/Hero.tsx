import heroImage from "../../../assets/shared/images/pexels-ten-brinke-photography-3877392-15488735-removebg-preview.png";

const Hero = () => {
  return (
    <section className="relative flex min-h-[calc(100vh-82px)] items-center overflow-hidden bg-gradient-to-br from-[#F9C5A8] to-[#D4E2E0] px-4 py-12 sm:px-6 sm:py-14 md:px-8 md:py-16 lg:px-10 lg:py-20">
      {/* Background Blur Effects */}
      <div className="absolute left-[-120px] top-[-100px] h-[260px] w-[260px] rounded-full bg-white/35 blur-3xl sm:h-[320px] sm:w-[320px]" />
      <div className="absolute right-[-150px] top-[120px] h-[280px] w-[280px] rounded-full bg-[#078b91]/20 blur-3xl sm:h-[360px] sm:w-[360px]" />
      <div className="absolute bottom-[-120px] left-[30%] h-[240px] w-[240px] rounded-full bg-white/30 blur-3xl sm:h-[280px] sm:w-[280px]" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-9 md:grid-cols-2 md:gap-10 lg:gap-12">
        {/* Left Side */}
        <div className="order-2 text-center md:order-1 md:text-left">
          <span className="mb-4 inline-flex rounded-full border border-white/50 bg-white/30 px-4 py-2 text-xs font-bold text-[#078b91] shadow-sm backdrop-blur-xl sm:mb-5 sm:px-5 sm:text-sm">
            Trusted Pet Care Platform
          </span>

          <h1 className="mx-auto mb-5 max-w-[680px] text-[34px] font-extrabold leading-[1.12] tracking-[-1px] text-[#20263d] sm:text-[42px] md:mx-0 md:text-[48px] lg:text-[56px]">
            Caring For Your Pets{" "}
            <span className="text-[#078b91]">Starts Here</span>
          </h1>

          <p className="mx-auto mb-7 max-w-[580px] text-[15px] leading-[1.8] text-gray-700 sm:text-[16px] md:mx-0 md:text-[17px] lg:text-[18px]">
            Schedule vet appointments, grooming sessions, and pet checkups
            quickly and easily — all in one place.
          </p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4 md:justify-start">
            <button className="rounded-full bg-[#078b91] px-7 py-3.5 text-[14px] font-bold text-white shadow-lg shadow-[#078b91]/25 transition-all duration-500 ease-out hover:-translate-y-1 hover:bg-[#06777c] hover:shadow-xl hover:shadow-[#078b91]/30 sm:px-8 sm:py-4 sm:text-[15px]">
              Get Started
            </button>

            <button className="rounded-full border border-white/70 bg-white/25 px-7 py-3.5 text-[14px] font-bold text-[#20263d] shadow-sm backdrop-blur-xl transition-all duration-500 ease-out hover:-translate-y-1 hover:bg-white hover:text-[#078b91] hover:shadow-lg sm:px-8 sm:py-4 sm:text-[15px]">
              Learn More
            </button>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-8 grid max-w-[500px] grid-cols-3 gap-2 rounded-[20px] border border-white/50 bg-white/25 p-3 shadow-sm backdrop-blur-xl sm:mt-10 sm:gap-3 sm:rounded-[24px] sm:p-4 md:mx-0">
            <div className="text-center">
              <h3 className="text-[18px] font-extrabold text-[#078b91] sm:text-[22px]">
                24/7
              </h3>
              <p className="text-[11px] font-semibold text-gray-700 sm:text-xs">
                Support
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-[18px] font-extrabold text-[#078b91] sm:text-[22px]">
                50+
              </h3>
              <p className="text-[11px] font-semibold text-gray-700 sm:text-xs">
                Doctors
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-[18px] font-extrabold text-[#078b91] sm:text-[22px]">
                5k+
              </h3>
              <p className="text-[11px] font-semibold text-gray-700 sm:text-xs">
                Happy Pets
              </p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="relative order-1 flex justify-center md:order-2 md:justify-end">
          <div className="absolute bottom-2 h-[240px] w-[240px] rounded-full bg-white/35 blur-3xl sm:h-[330px] sm:w-[330px] md:h-[380px] md:w-[380px] lg:h-[430px] lg:w-[430px]" />

          <div className="relative rounded-[28px] border border-white/50 bg-white/20 p-3 shadow-2xl shadow-[#078b91]/10 backdrop-blur-xl transition-all duration-700 ease-out hover:-translate-y-2 hover:bg-white/25 sm:rounded-[34px] sm:p-4 md:rounded-[40px]">
            <img
              src={heroImage}
              alt="Pet care hero"
              className="relative z-10 w-full max-w-[240px] object-contain drop-shadow-2xl transition-transform duration-700 ease-out hover:scale-[1.03] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[420px] xl:max-w-[460px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
