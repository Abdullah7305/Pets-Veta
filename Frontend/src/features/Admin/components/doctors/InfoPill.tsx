export const InfoPill = ({ icon, text }: { icon: React.ReactNode; text: string }) => {
    return (
        <span className="inline-flex max-w-full items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-[#405169]">
            <span className="shrink-0 text-[#718198]">{icon}</span>
            <span className="truncate">{text}</span>
        </span>
    );
};