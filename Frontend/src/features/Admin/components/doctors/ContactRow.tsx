export const ContactRow = ({
    icon,
    text,
    className = "",
}: {
    icon: React.ReactNode;
    text: string;
    className?: string;
}) => {
    return (
        <div
            className={`flex min-w-0 items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 ${className}`}
        >
            <span className="shrink-0 text-[#718198]">{icon}</span>
            <span className="min-w-0 truncate font-semibold">{text}</span>
        </div>
    );
};