import { FaFilter, FaMapMarkerAlt, FaPaw, FaSearch, FaTags, FaUndo } from "react-icons/fa";

import Input from "@/shared/components/Input/Input";
import Button from "@/shared/components/Button/Button";
import type { MarketplaceFiltersProps } from "../types/marketplace.types";

const categories = ["All", "Pets", "Food", "Medicine", "Accessories"];

const MarketplaceFilters = ({
  search,
  category,
  location,
  onSearch,
  onCategory,
  onLocation,
  onClear,
}: MarketplaceFiltersProps) => {
  return (
    <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-[0.16em] text-[#178f95]">
        <FaFilter />
        Filter Marketplace Listings
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_0.9fr_0.9fr_auto] lg:items-end">
        <Input
          label="Search Listings"
          icon={<FaSearch />}
          placeholder="Search pets, food, medicine, accessories..."
          value={search}
          onChange={(event) => onSearch(event.target.value)}
        />

        <div className="w-full">
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
            <FaTags className="text-[#178f95]" />
            Category
          </label>

          <select
            value={category}
            onChange={(event) => onCategory(event.target.value)}
            className="h-[46px] w-full rounded-lg border border-gray-200 bg-white px-4 text-sm outline-none transition focus:border-[#178f95] focus:ring-2 focus:ring-[#178f95]/20"
          >
            <option value="All">All Categories</option>
            <option value="Pets">Pets</option>
            <option value="Food">Food</option>
            <option value="Medicine">Medicine</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>

        <div className="w-full">
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

        <Button variant="outline" className="h-[46px] gap-2" onClick={onClear}>
          <FaUndo />
          Clear Filters
        </Button>
      </div>

      <div className="mt-5 border-t border-gray-100 pt-4">
        <p className="mb-3 text-sm font-semibold text-gray-700">
          Quick Categories
        </p>

        <div className="flex flex-wrap gap-3">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onCategory(item)}
              className={`flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-semibold transition ${
                category === item
                  ? "border-[#178f95] bg-[#178f95] text-white"
                  : "border-gray-200 bg-white text-gray-600 hover:border-[#178f95] hover:text-[#178f95]"
              }`}
            >
              <FaPaw />
              {item}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketplaceFilters;