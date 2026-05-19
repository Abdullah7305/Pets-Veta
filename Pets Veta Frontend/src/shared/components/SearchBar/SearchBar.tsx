import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    // <div className="flex items-center gap-3 bg-white border border-gray-200 px-4 py-3 rounded-xl w-[320px] shadow-sm">
    <div
      className="
  flex flex-col sm:flex-row
  items-stretch sm:items-center
  gap-3
  w-full xl:w-auto
  p-2  border-3 border-gray-200 rounded
"
    >
      <FaSearch className="text-gray-400 text-sm" />

      <input
        type="text"
        placeholder="Search doctors..."
        className="bg-transparent outline-none w-full text-sm"
      />
    </div>
  );
};

export default SearchBar;
