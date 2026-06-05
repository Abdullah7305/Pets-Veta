import type { IconType } from "react-icons";

type ServiceCardProps = {
  title: string;
  description: string;
  icon: IconType;
  color: string;
};

const ServiceCard = ({
  title,
  description,
  icon: Icon,
  color,
}: ServiceCardProps) => {
  return (
    <div className="group rounded-3xl bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
      <div
        className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${color} text-2xl text-[#009f9d]`}
      >
        <Icon />
      </div>

      <h3 className="text-xl font-extrabold text-[#07182c]">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-slate-600">
        {description}
      </p>

      <button
        type="button"
        className="mt-5 text-sm font-extrabold text-[#009f9d] transition group-hover:underline"
      >
        Learn More
      </button>
    </div>
  );
};

export default ServiceCard;