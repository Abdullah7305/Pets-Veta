import Button from "../../../shared/components/Button/Button";
import bannerImg from "../../../assets/shared/images/petServiceBanner.jpg";

const Banner = () => {
  return (
    <section
      className="relative min-h-[720px] overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(8, 32, 45, 0.88) 0%, rgba(8, 32, 45, 0.62) 45%, rgba(8, 32, 45, 0.25) 100%), url(${bannerImg})`,
      }}
    >
      {/* Decorative blur circles */}
      <div className="absolute left-[-120px] top-[-120px] h-[320px] w-[320px] rounded-full bg-[#078b91]/30 blur-3xl" />
      <div className="absolute bottom-[-140px] right-[-120px] h-[360px] w-[360px] rounded-full bg-[#f9c5a8]/40 blur-3xl" />

      <div className="relative z-10 mx-auto grid min-h-[720px] max-w-[1500px] grid-cols-1 items-center gap-12 px-6 py-16 md:px-10 lg:grid-cols-2 lg:px-12">
        {/* Left Content */}
        <div className="max-w-[700px] text-white">
          <span className="mb-5 inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[13px] font-semibold tracking-wide text-white/90 backdrop-blur-md">
            Trusted Pet Healthcare
          </span>

          <h1 className="mb-6 text-[40px] font-extrabold leading-[1.12] tracking-[-1.2px] md:text-[56px] lg:text-[66px]">
            Meet the Best <br />
            <span className="text-[#f9c5a8]">Pet Hospital</span>
          </h1>

          <p className="mb-9 max-w-[560px] text-[17px] leading-[1.8] text-white/85 md:text-[20px]">
            Quality care, expert doctors, and friendly service for your lovely
            pets.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button className="!w-auto !rounded-full !bg-[#078b91] !px-7 !py-3.5 !text-sm !font-bold !text-white !shadow-md !shadow-[#078b91]/30 !transition-all hover:!-translate-y-1 hover:!bg-[#06777c] md:!px-8 md:!py-4 md:!text-[15px]">
              Get Quote Now
            </Button>

            <Button className="!w-auto !rounded-full !border !border-white/60 !bg-white/10 !px-7 !py-3.5 !text-sm !font-bold !text-white !backdrop-blur-md !transition-all hover:!-translate-y-1 hover:!bg-white hover:!text-[#078b91] md:!px-8 md:!py-4 md:!text-[15px]">
              Learn More
            </Button>
          </div>
        </div>

        {/* Appointment Form */}
        <div className="mx-auto w-full max-w-[390px] rounded-[22px] border border-white/40 bg-white/95 p-6 shadow-xl shadow-black/20 backdrop-blur-xl md:p-7 lg:ml-auto">
          <div className="mb-6 text-center">
            <span className="mb-3 inline-block rounded-full bg-[#078b91]/10 px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-[#078b91]">
              Appointment
            </span>

            <h2 className="text-[24px] font-extrabold tracking-[-0.5px] text-[#20263d] md:text-[26px]">
              Book Appointment
            </h2>

            <p className="mt-2 text-[13px] leading-6 text-gray-500">
              Fill the form and our team will contact you.
            </p>
          </div>

          <form className="space-y-4">
            <div>
              <label className="mb-2 block text-[13px] font-bold text-[#20263d]">
                Name *
              </label>
              <input
                type="text"
                placeholder="Full Name"
                className="h-[48px] w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-[13px] text-[#20263d] outline-none transition-all placeholder:text-gray-400 focus:border-[#078b91] focus:bg-white focus:ring-4 focus:ring-[#078b91]/10"
              />
            </div>

            <div>
              <label className="mb-2 block text-[13px] font-bold text-[#20263d]">
                Email address *
              </label>
              <input
                type="email"
                placeholder="example@gmail.com"
                className="h-[48px] w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-[13px] text-[#20263d] outline-none transition-all placeholder:text-gray-400 focus:border-[#078b91] focus:bg-white focus:ring-4 focus:ring-[#078b91]/10"
              />
            </div>

            <div>
              <label className="mb-2 block text-[13px] font-bold text-[#20263d]">
                Department *
              </label>
              <select className="h-[48px] w-full cursor-pointer rounded-xl border border-gray-200 bg-gray-50 px-4 text-[13px] text-gray-500 outline-none transition-all focus:border-[#078b91] focus:bg-white focus:ring-4 focus:ring-[#078b91]/10">
                <option>Please Select</option>
                <option>Dental treatments</option>
                <option>Bones treatments</option>
                <option>Diagnosis</option>
                <option>Cardiology</option>
                <option>Surgery</option>
                <option>Eye care</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-[13px] font-bold text-[#20263d]">
                Time *
              </label>
              <select className="h-[48px] w-full cursor-pointer rounded-xl border border-gray-200 bg-gray-50 px-4 text-[13px] text-gray-500 outline-none transition-all focus:border-[#078b91] focus:bg-white focus:ring-4 focus:ring-[#078b91]/10">
                <option>4:00 Available</option>
                <option>5:00 Available</option>
                <option>6:00 Available</option>
                <option>7:00 Available</option>
              </select>
            </div>

            <Button
              type="submit"
              className="!mt-5 !w-full !rounded-xl !bg-[#078b91] !py-3.5 !text-sm !font-bold !text-white !shadow-md !shadow-[#078b91]/25 !transition-all hover:!-translate-y-1 hover:!bg-[#06777c]"
            >
              Book Appointment
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Banner;