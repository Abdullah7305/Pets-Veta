import type { ReactNode } from "react";

type SectionHeadingProps = {
    eyebrow: string;
    title: ReactNode;
    description?: string;
    align?: "center" | "left";
};

const SectionHeading = ({
    eyebrow,
    title,
    description,
    align = "center",
}: SectionHeadingProps) => {
    const isCenter = align === "center";

    return (
        <div
            className={`mb-10 ${isCenter ? "mx-auto max-w-3xl text-center" : "max-w-2xl text-left"
                }`}
        >
            <div
                className={`mb-4 flex items-center gap-3 ${isCenter ? "justify-center" : "justify-start"
                    }`}
            >
                <span className="h-px w-10 bg-[#178f95]/25" />

                <span className="rounded-full border border-[#178f95]/15 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#178f95] shadow-sm">
                    {eyebrow}
                </span>

                {isCenter && <span className="h-px w-10 bg-[#178f95]/25" />}
            </div>

            <h2 className="text-[32px] font-black leading-[1.08] tracking-[-0.045em] text-[#07182c] md:text-[44px]">
                {title}
            </h2>

            {description && (
                <p
                    className={`mt-4 text-base leading-7 text-slate-500 ${isCenter ? "mx-auto max-w-2xl" : "max-w-xl"
                        }`}
                >
                    {description}
                </p>
            )}
        </div>
    );
};

export default SectionHeading;