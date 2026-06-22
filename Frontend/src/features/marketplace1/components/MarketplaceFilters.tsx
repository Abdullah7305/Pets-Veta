import Input from "@/shared/components/Input/Input";
import Button from "@/shared/components/Button/Button";
import type { MarketplaceFiltersProps } from "../types/marketplace.types";

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
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="grid gap-4 md:grid-cols-4">
        <Input
          placeholder="Search pets, food, accessories..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => onCategory(e.target.value)}
          className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#178f95]"
        >
          <option value="All">All Categories</option>
          <option value="Pets">Pets</option>
          <option value="Food">Food</option>
          <option value="Accessories">Accessories</option>
        </select>

        <select
          value={location}
          onChange={(e) => onLocation(e.target.value)}
          className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#178f95]"
        >
          <option value="All">All Locations</option>
          <option value="Lahore">Lahore</option>
          <option value="Karachi">Karachi</option>
          <option value="Islamabad">Islamabad</option>
          <option value="Multan">Multan</option>
        </select>

        <Button variant="outline" onClick={onClear}>
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default MarketplaceFilters;
