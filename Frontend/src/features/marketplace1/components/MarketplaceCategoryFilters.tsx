import { Link } from "react-router-dom";
import { FaArrowLeft, FaMapMarkerAlt, FaSearch, FaUndo } from "react-icons/fa";

import Button from "@/shared/components/Button/Button";
import Input from "@/shared/components/Input/Input";
import type { MarketplaceCategoryFiltersProps } from "../types/marketplace.types";

const MarketplaceCategoryFilters = ({
    search,
    location,
    categoryTitle,
    onSearch,
    onLocation,
    onClear,
}: MarketplaceCategoryFiltersProps) => {
    return (
        <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between gap-4">
                <Link
                    to="/marketplace1"
                    className="inline-flex items-center gap-2 rounded-full bg-[#e8f7f7] px-4 py-2.5 text-sm font-black text-[#178f95] transition hover:bg-[#178f95] hover:text-white"
                >
                    <FaArrowLeft className="text-xs" />
                    Back to Marketplace
                </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-[1.4fr_0.9fr_auto] md:items-end">
                <Input
                    label="Search Listings"
                    icon={<FaSearch />}
                    placeholder={`Search ${categoryTitle.toLowerCase()}...`}
                    value={search}
                    onChange={(event) => onSearch(event.target.value)}
                />

                <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <FaMapMarkerAlt className="text-[#178f95]" />
                        Location
                    </label>

                    <select
                        value={location}
                        onChange={(event) => onLocation(event.target.value)}
                        className="h-[46px] w-full rounded-lg border border-gray-200 bg-white px-4 text-sm outline-none transition focus:border-[#178f95] focus:ring-2 focus:ring-[#178f95]/20"
                    >
                        <option value="All">All Locations</option>
                        <option value="Lahore">Lahore</option>
                        <option value="Karachi">Karachi</option>
                        <option value="Islamabad">Islamabad</option>
                        <option value="Multan">Multan</option>
                    </select>
                </div>

                <Button
                    variant="outline"
                    className="h-[46px] gap-2"
                    onClick={onClear}
                >
                    <FaUndo />
                    Clear
                </Button>
            </div>
        </section>
    );
};

export default MarketplaceCategoryFilters;