import { FaSearch } from "react-icons/fa";
import type { ChangeEventHandler } from "react";

type SearchBarProps = {
  placeholder?: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  className?: string;
};

const SearchBar = ({
  placeholder,
  value,
  onChange,
  className = "",
}: SearchBarProps) => {
  return (
    <div className={`relative w-full max-w-full ${className}`}>
      <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400" />

      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="h-12 w-full rounded-xl border-2 border-gray-200 bg-white pl-11 pr-4 text-sm outline-none transition-all duration-300 focus:border-cyan-500"
      />
    </div>
  );
};

export default SearchBar;