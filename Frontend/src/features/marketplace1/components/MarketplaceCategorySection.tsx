import { Link } from "react-router-dom";
import { FaArrowRight, FaBoxOpen } from "react-icons/fa";

import MarketplaceProductCard from "./MarketplaceProductCard";
import type { MarketplaceCategorySectionProps } from "../types/marketplace.types";

const MarketplaceCategorySection = ({
    category,
    products,
    loading,
    error,
    savedIds,
    onSave,
    onDetails,
}: MarketplaceCategorySectionProps) => {
    return (
        <div className="relative">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-2xl font-black tracking-[-0.04em] text-[#07182c]">
                        {category.title}
                    </h2>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                        {category.subtitle}
                    </p>
                </div>

                <Link
                    to={`/marketplace1/category/${category.slug}`}
                    className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-black text-[#178f95] shadow-sm ring-1 ring-[#178f95]/10 transition hover:-translate-y-0.5 hover:bg-[#178f95] hover:text-white hover:shadow-[0_14px_30px_rgba(23,143,149,0.18)]"
                >
                    {category.viewAllLabel}
                    <FaArrowRight className="text-xs transition group-hover:translate-x-1" />
                </Link>
            </div>

            {loading && (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm"
                        >
                            <div className="h-44 animate-pulse bg-slate-100" />

                            <div className="p-4">
                                <div className="h-4 w-3/4 animate-pulse rounded bg-slate-100" />
                                <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-slate-100" />
                                <div className="mt-4 h-9 w-full animate-pulse rounded bg-slate-100" />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!loading && error && (
                <div className="rounded-2xl bg-white px-5 py-4 text-sm font-semibold text-red-600 shadow-sm">
                    {error}
                </div>
            )}

            {!loading && !error && products.length === 0 && (
                <div className="flex items-center gap-3 rounded-2xl bg-white px-5 py-5 text-sm font-semibold text-slate-500 shadow-sm">
                    <FaBoxOpen className="text-[#178f95]" />
                    No {category.title.toLowerCase()} listings available yet.
                </div>
            )}

            {!loading && !error && products.length > 0 && (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {products.map((product) => (
                        <MarketplaceProductCard
                            key={product.id}
                            product={product}
                            saved={savedIds.includes(product.id)}
                            onSave={() => onSave(product.id)}
                            onDetails={() => onDetails(product.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MarketplaceCategorySection;