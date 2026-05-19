// interface Props {
//   title: string;
//   total: number;
//   subtitle: string;
//   color: string;
//   icon: React.ElementType;
// }

// const StatsCard = ({ title, total, subtitle, color, icon: Icon }: Props) => {
//   return (
//     // <div className="bg-white rounded-2xl p-6 shadow-sm flex items-center justify-between">
//     <div className="
// bg-white
// rounded-2xl
// p-6
// border border-transparent
// hover:border-cyan-500
// hover:shadow-xl
// hover:-translate-y-1
// transition-all
// duration-300
// cursor-pointer
// ">
//       <div>
//         <p className="text-gray-500">{title}</p>

//         <h2 className="text-3xl font-bold mt-2">{total}</h2>

//         <p className={`mt-2 text-sm ${color}`}>{subtitle}</p>
//       </div>

//       <div className={`text-4xl ${color}`}>
//         <Icon />
//       </div>
//     </div>
//   );
// };

// export default StatsCard;
interface Props {
  title: string;
  total: string;
  subtitle: string;
  color: string;
  icon: React.ElementType;
}

const StatsCard = ({ title, total, subtitle, color, icon: Icon }: Props) => {
  return (
    <div
      className="
      bg-white
      rounded-2xl
      p-5
      border border-gray-100
      hover:border-cyan-500
      hover:shadow-lg
      transition-all duration-300
      flex items-center gap-4
      w-full
    "
    >
      {/* ICON */}
      <div
        className={`
        w-13 h-13
        rounded-2xl
        flex items-center justify-center
        text-white
        text-3xl
        ${color}
      `}
      >
        <Icon size={30} />
      </div>

      {/* TEXT */}
      <div className="flex-1">
        <p className="text-gray-500 text-sm">{title}</p>

        <h2 className="text-3xl font-bold text-gray-800 mt-1">{total}</h2>

        <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
      </div>
    </div>
  );
};

export default StatsCard;
