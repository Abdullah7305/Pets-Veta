import { Hourglass } from 'lucide-react'
const toneClasses = {
  orange: "bg-[#fff0da] text-[#f59e0b]",
  green: "bg-[#d9f8e5] text-[#16a34a]",
  red: "bg-[#ffe1e6] text-[#ef4444]",
  blue: "bg-[#dceeff] text-[#2f8be6]",
};


const StatCard = ({
  title,
  value,
  tone,
  icon: Icon,
}: {
  title: string;
  value: string;
  tone: keyof typeof toneClasses;
  icon: typeof Hourglass;
}) => {
  return (
    <div className="border-b border-slate-200 bg-white p-6 last:border-b-0 md:odd:border-r xl:border-b-0 xl:border-r xl:last:border-r-0">
      <div className="flex items-center gap-5">
        <div
          className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full ${toneClasses[tone]}`}
        >
          <Icon size={34} strokeWidth={2.8} />
        </div>
        <div>
          <p className="font-semibold text-[#12213a]">{title}</p>
          <h2 className="mt-1 text-3xl font-black leading-none text-[#0f1b2f]">
            {value}
          </h2>
          <p className="mt-2 text-sm text-[#405169]">Doctors</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard