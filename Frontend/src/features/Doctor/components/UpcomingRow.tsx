const UpcomingRow = ({
    date,
    day,
    startTime,
    endTime,
}: {
    date: string;
    day: string;
    startTime: string;
    endTime: string;
}) => {
    return (
        <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 p-4 md:flex-row md:items-center md:justify-between">
            <div>
                <h3 className="font-black text-[#101b3d]">
                    {day} · {date}
                </h3>
                <p className="text-sm text-slate-500">
                    {startTime} - {endTime}
                </p>
            </div>
            <span className="w-fit rounded-full bg-green-50 px-3 py-1.5 text-xs font-black text-green-700">
                Available
            </span>
        </div>
    );
};

export default UpcomingRow;
