import { FaUsers, FaUserMd, FaShoppingBag, FaStar } from "react-icons/fa";

const stats = [
  {
    icon: <FaUsers />,
    value: "10k+",
    label: "Happy Pet Parents",
  },
  {
    icon: <FaUserMd />,
    value: "500+",
    label: "Verified Vets",
  },
  {
    icon: <FaShoppingBag />,
    value: "2k+",
    label: "Pet Products",
  },
  {
    icon: <FaStar />,
    value: "4.9",
    label: "Average Rating",
  },
];

const Stats = () => {
  return (
    <section className="relative z-20 px-6 lg:px-16 -mt-10">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-5 rounded-[28px] bg-white px-6 py-7 shadow-2xl md:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center justify-center text-center"
          >
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#d9f7f6] text-xl text-[#008f8d]">
              {item.icon}
            </div>

            <h3 className="text-2xl font-extrabold text-[#07182c] md:text-3xl">
              {item.value}
            </h3>

            <p className="mt-1 text-sm font-semibold text-slate-500">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;