export const PaginationButton = ({
    children,
    ariaLabel,
    onClick,    
    disabled,   
}: {
    children: React.ReactNode;
    ariaLabel: string;
    onClick?: () => void;   
    disabled?: boolean;     
}) => {
    return (
        <button
            type="button"
            aria-label={ariaLabel}
            onClick={onClick}       
            disabled={disabled}     
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#8a99aa] shadow-sm transition hover:text-[#078b91] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:text-[#8a99aa]" // 👈 7. Visual guardrails
        >
            {children}
        </button>
    );
};