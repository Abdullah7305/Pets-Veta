const QuickAction = ({
    icon,
    title,
    text,
}: {
    icon: React.ReactNode;
    title: string;
    text: string;
}) => {
    return (
        <div className="flex gap-4 border-b border-slate-100 pb-4 last:border-b-0">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#D4E2E0]/60 text-[#078b91]">
                {icon}
            </div>
            <div>
                <h3 className="font-black text-[#101b3d]">{title}</h3>
                <p className="mt-1 text-sm text-slate-500">{text}</p>
            </div>
        </div>
    );
};

export default QuickAction;
