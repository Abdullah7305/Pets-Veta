interface Props {
  title: string;
  total: number;
  subtitle: string;
  color: string;
  icon: React.ElementType;
}

const StatsCard = ({ title, total, subtitle, color, icon: Icon }: Props) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm flex items-center justify-between">
      <div>
        <p className="text-gray-500">{title}</p>

        <h2 className="text-3xl font-bold mt-2">{total}</h2>

        <p className={`mt-2 text-sm ${color}`}>{subtitle}</p>
      </div>

      <div className={`text-4xl ${color}`}>
        <Icon />
      </div>
    </div>
  );
};

export default StatsCard;
