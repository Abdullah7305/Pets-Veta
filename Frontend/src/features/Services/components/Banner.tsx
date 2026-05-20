import Button from "../../../shared/components/Button/Button";
import bannerImg from "../../../assets/shared/images/petServiceBanner.jpg";

const Banner = () => {
  return (
    <section
      className="relative min-h-[620px] overflow-hidden bg-[#F8FAFC] bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(8, 32, 45, 0.88) 0%, rgba(8, 32, 45, 0.62) 45%, rgba(8, 32, 45, 0.25) 100%), url(${bannerImg})`,
      }}
    >
      {/* Decorative blur circles */}
      <div className="absolute left-[-120px] top-[-120px] h-[320px] w-[320px] rounded-full bg-[#0F766E]/30 blur-3xl" />
      <div className="absolute bottom-[-140px] right-[-120px] h-[360px] w-[360px] rounded-full bg-[#f9c5a8]/40 blur-3xl" />

      <div className="relative z-10 mx-auto grid min-h-[620px] max-w-6xl grid-cols-1 items-center gap-10 px-6 py-14 md:px-8 lg:grid-cols-2 lg:px-10">
        {/* Left Content */}
        <div className="max-w-[640px] text-white">
          <span className="mb-5 inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[13px] font-semibold tracking-wide text-white/90 backdrop-blur-md">
            Trusted Pet Healthcare
          </span>

          <h1 className="mb-5 text-[38px] font-extrabold leading-[1.12] tracking-[-1.2px] md:text-[48px] lg:text-[56px]">
            Meet the Best <br />
            <span className="text-[#f9c5a8]">Pet Hospital</span>
          </h1>

          <p className="mb-8 max-w-[540px] text-[16px] leading-[1.8] text-white/85 md:text-[18px]">
            Quality care, expert doctors, and friendly service for your lovely
            pets.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button className="!w-auto !rounded-full !bg-[#0F766E] !px-7 !py-3.5 !text-sm !font-bold !text-white !shadow-md !shadow-[#0F766E]/30 !transition-all hover:!-translate-y-1 hover:!bg-[#115E59] md:!px-7 md:!py-3.5 md:!text-[15px]">
              Get Quote Now
            </Button>

            <Button className="!w-auto !rounded-full !border !border-white/60 !bg-white/10 !px-7 !py-3.5 !text-sm !font-bold !text-white !backdrop-blur-md !transition-all hover:!-translate-y-1 hover:!bg-white hover:!text-[#0F766E] md:!px-7 md:!py-3.5 md:!text-[15px]">
              Learn More
            </Button>
          </div>
        </div>

        {/* Appointment Form */}
        <div className="mx-auto w-full max-w-[360px] rounded-[22px] border border-slate-100 bg-[#FFFFFF] p-5 shadow-xl shadow-black/20 backdrop-blur-xl md:p-6 lg:ml-auto">
          <div className="mb-5 text-center">
            <span className="mb-3 inline-block rounded-full bg-[#D4E2E0] px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-[#0F766E]">
              Appointment
            </span>

            <h2 className="text-[22px] font-extrabold tracking-[-0.5px] text-[#20263d] md:text-[24px]">
              Book Appointment
            </h2>

            <p className="mt-2 text-[13px] leading-6 text-gray-500">
              Fill the form and our team will contact you.
            </p>
          </div>

          <form className="space-y-3">
            <div>
              <label className="mb-2 block text-[13px] font-bold text-[#20263d]">
                Name *
              </label>
              <input
                type="text"
                placeholder="Full Name"
                className="h-[44px] w-full rounded-xl border border-gray-200 bg-[#F8FAFC] px-4 text-[13px] text-[#20263d] outline-none transition-all placeholder:text-gray-400 focus:border-[#0F766E] focus:bg-white focus:ring-4 focus:ring-[#0F766E]/10"
              />
            </div>

            <div>
              <label className="mb-2 block text-[13px] font-bold text-[#20263d]">
                Email address *
              </label>
              <input
                type="email"
                placeholder="example@gmail.com"
                className="h-[44px] w-full rounded-xl border border-gray-200 bg-[#F8FAFC] px-4 text-[13px] text-[#20263d] outline-none transition-all placeholder:text-gray-400 focus:border-[#0F766E] focus:bg-white focus:ring-4 focus:ring-[#0F766E]/10"
              />
            </div>

            <div>
              <label className="mb-2 block text-[13px] font-bold text-[#20263d]">
                Department *
              </label>
              <select className="h-[44px] w-full cursor-pointer rounded-xl border border-gray-200 bg-[#F8FAFC] px-4 text-[13px] text-gray-500 outline-none transition-all focus:border-[#0F766E] focus:bg-white focus:ring-4 focus:ring-[#0F766E]/10">
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
              <select className="h-[44px] w-full cursor-pointer rounded-xl border border-gray-200 bg-[#F8FAFC] px-4 text-[13px] text-gray-500 outline-none transition-all focus:border-[#0F766E] focus:bg-white focus:ring-4 focus:ring-[#0F766E]/10">
                <option>4:00 Available</option>
                <option>5:00 Available</option>
                <option>6:00 Available</option>
                <option>7:00 Available</option>
              </select>
            </div>

            <Button
              type="submit"
              className="!mt-5 !w-full !rounded-xl !bg-[#0F766E] !py-3.5 !text-sm !font-bold !text-white !shadow-md !shadow-[#0F766E]/25 !transition-all hover:!-translate-y-1 hover:!bg-[#115E59]"
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
