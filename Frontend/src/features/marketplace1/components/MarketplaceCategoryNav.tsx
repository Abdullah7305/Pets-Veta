import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

import type { MarketplaceCategoryConfig } from "../types/marketplace.types";

type MarketplaceCategoryNavProps = {
    categories: MarketplaceCategoryConfig[];
};

const MarketplaceCategoryNav = ({ categories }: MarketplaceCategoryNavProps) => {
    return (
        <div className="mt-8 flex flex-wrap items-center gap-3">
            {categories.map((category) => (
                <Link
                    key={category.slug}
                    to={`/marketplace1/category/${category.slug}`}
                    className="group inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/95 px-5 py-3 text-sm font-black text-[#178f95] shadow-[0_10px_24px_rgba(15,23,42,0.12)] backdrop-blur transition hover:-translate-y-0.5 hover:bg-[#07182c] hover:text-white"
                >
                    {category.title}
                    <FaArrowRight className="text-xs transition group-hover:translate-x-1" />
                </Link>
            ))}
        </div>
    );
};

export default MarketplaceCategoryNav;