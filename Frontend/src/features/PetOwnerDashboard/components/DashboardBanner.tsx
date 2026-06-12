import { HeartPulse } from "lucide-react";

const DashboardBanner = () => {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-[#EAF7F5] px-6 py-5">
      <div className="relative z-10 flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#078b91]">
          <HeartPulse size={24} />
        </div>

        <div>
          <h3 className="font-black text-[#078b91]">
            A happy pet makes a happy family!
          </h3>

          <p className="mt-1 text-sm font-medium text-slate-600">
            Regular checkups and timely care keep your pets healthy and joyful.
          </p>
        </div>
      </div>

      <div className="absolute -bottom-8 right-6 hidden text-[100px] opacity-10 md:block">
        🐾
      </div>
    </section>
  );
};

export default DashboardBanner;