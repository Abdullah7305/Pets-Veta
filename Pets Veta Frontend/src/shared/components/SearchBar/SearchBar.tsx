import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <div className="flex items-center gap-3 bg-white border border-gray-200 px-4 py-3 rounded-xl w-[320px] shadow-sm">
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
