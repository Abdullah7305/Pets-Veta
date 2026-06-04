import { FaFilter } from "react-icons/fa";
import { categories } from "../data/marketplace.data";

const MarketplaceFilters = () => {
    return (
        <aside className="h-fit rounded-3xl bg-white p-5 shadow-[0_10px_35px_rgba(15,23,42,0.08)]">
            <div className="mb-5 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-lg font-extrabold text-[#07182c]">
                    <FaFilter className="text-[#009f9d]" />
                    Filters
                </h3>

                <button
                    type="button"
                    className="text-sm font-bold text-[#009f9d] hover:underline"
                >
                    Reset
                </button>
            </div>

            <div>
                <h4 className="mb-3 text-sm font-extrabold text-[#07182c]">
                    Categories
                </h4>

                <div className="space-y-3">
                    {categories.slice(0, 7).map((category) => (
                        <label
                            key={category}
                            className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-slate-600"
                        >
                            <input
                                type="checkbox"
                                className="accent-[#009f9d]"
                            />
                            {category}
                        </label>
                    ))}
                </div>
            </div>

            <div className="mt-6 border-t border-slate-100 pt-6">
                <h4 className="mb-3 text-sm font-extrabold text-[#07182c]">
                    Price Range
                </h4>

                <input
                    type="range"
                    min="0"
                    max="100"
                    className="w-full accent-[#009f9d]"
                />

                <div className="mt-2 flex justify-between text-xs font-bold text-slate-500">
                    <span>$0</span>
                    <span>$100+</span>
                </div>
            </div>

            <div className="mt-6 border-t border-slate-100 pt-6">
                <h4 className="mb-3 text-sm font-extrabold text-[#07182c]">
                    Rating
                </h4>

                {["4.5 & above", "4.0 & above", "3.5 & above"].map((rating) => (
                    <label
                        key={rating}
                        className="mb-3 flex cursor-pointer items-center gap-2 text-sm font-semibold text-slate-600"
                    >
                        <input
                            type="checkbox"
                            className="accent-[#009f9d]"
                        />
                        {rating}
                    </label>
                ))}
            </div>

            <div className="mt-6 border-t border-slate-100 pt-6">
                <h4 className="mb-3 text-sm font-extrabold text-[#07182c]">
                    Availability
                </h4>

                {["In Stock", "On Sale", "Best Seller"].map((item) => (
                    <label
                        key={item}
                        className="mb-3 flex cursor-pointer items-center gap-2 text-sm font-semibold text-slate-600"
                    >
                        <input
                            type="checkbox"
                            className="accent-[#009f9d]"
                        />
                        {item}
                    </label>
                ))}
            </div>
        </aside>
    );
};

export default MarketplaceFilters;