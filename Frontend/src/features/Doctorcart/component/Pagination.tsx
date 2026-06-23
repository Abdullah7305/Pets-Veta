import type { PaginationProps } from "../types/doctorcart.types";

const Pagination = ({
    page,
    totalPages,
    onPrevious,
    onNext,
}: PaginationProps) => {
    return (
        <div className="mt-8 flex items-center justify-center gap-3">
            <button
                type="button"
                disabled={page === 1}
                onClick={onPrevious}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-50"
            >
                Previous
            </button>

            <span className="rounded-xl bg-[#D4E2E0]/60 px-4 py-2 text-sm font-black text-[#078b91]">
                Page {page} of {totalPages}
            </span>

            <button
                type="button"
                disabled={page === totalPages}
                onClick={onNext}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
