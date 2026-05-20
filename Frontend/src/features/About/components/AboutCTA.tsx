import { CalendarCheck } from "lucide-react";

const AboutCTA = () => {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-16">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#071B4D] to-[#0B255F] p-6 text-white shadow-xl md:p-8">
        <div className="absolute right-10 top-8 text-7xl opacity-10">🐾</div>
        <div className="absolute bottom-0 left-10 hidden text-8xl md:block">
          🐶
        </div>

        <div className="relative grid items-center gap-8 md:grid-cols-[1fr_1.5fr_0.8fr]">
          <div className="hidden md:block" />

          <div>
            <h2 className="text-3xl font-black md:text-[2.2rem]">
              Ready To Book An Appointment?
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75">
              Your pet’s health is our priority. Book an appointment today and
              give your pet the best care possible.
            </p>
          </div>

          <div className="flex md:justify-end">
            <button className="inline-flex items-center gap-2 rounded-xl bg-[#F28B5B] px-6 py-3 text-sm font-black text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#ff9b6e]">
              <CalendarCheck size={18} />
              Book Appointment Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCTA;
