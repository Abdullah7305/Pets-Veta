const StatsCard = ({ title, value }: { title: string; value: string }) => {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-bold text-slate-500">{title}</p>
            <h3 className="mt-2 text-3xl font-black text-[#078b91]">{value}</h3>
        </div>
    );
};

export default StatsCard;
