import Button from "../../../shared/components/Button/Button";
import SearchBar from "../../../shared/components/SearchBar/SearchBar";

interface FilterSidebarProps {
    search: string;
    onSearchChange: (value: string) => void;
    onReset: () => void;
}

const FilterSidebar = ({
    search,
    onSearchChange,
    onReset,
}: FilterSidebarProps) => {
    return (
        <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-black">Filters</h2>

                <button
                    type="button"
                    onClick={onReset}
                    className="text-sm font-bold text-[#078b91]"
                >
                    Reset
                </button>
            </div>

            <div className="mt-6 space-y-5">
                <div className="w-full max-w-full overflow-hidden">
                    <SearchBar
                        placeholder="Search doctor..."
                        value={search}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            onSearchChange(e.target.value);
                        }}
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-bold">
                        Specialization
                    </label>

                    <select className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#078b91] focus:ring-4 focus:ring-[#D4E2E0]/60">
                        <option>All Specializations</option>
                        <option>Veterinary Surgeon</option>
                        <option>Pet Dermatology</option>
                        <option>Animal Nutritionist</option>
                    </select>
                </div>

                <Button type="button">Apply Filters</Button>
            </div>
        </aside>
    );
};

export default FilterSidebar;
