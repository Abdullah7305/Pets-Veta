// import { FaSearch } from "react-icons/fa";

// const SearchBar = () => {
//   return (
//     // <div className="flex items-center gap-3 bg-white border border-gray-200 px-4 py-3 rounded-xl w-[320px] shadow-sm">
//     <div
//       className="
//   flex flex-col sm:flex-row
//   items-stretch sm:items-center
//   gap-3
//   w-full xl:w-auto
//   p-2  border-3 border-gray-200 rounded
// "
//     >
//       <FaSearch className="text-gray-400 text-sm" />

//       <input
//         type="text"
//         placeholder="Search doctors..."
//         className="bg-transparent outline-none w-full text-sm"
//       />
//     </div>
//   );
// };

// export default SearchBar;
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <div className="relative w-full md:w-[300px]">
      {/* SEARCH ICON */}
      <FaSearch
        className="
        absolute
        left-4
        top-1/2
        -translate-y-1/2
        text-gray-400
        text-sm
      "
      />

      {/* INPUT */}
      <input
        type="text"
        placeholder="Search doctors..."
        className="
        w-full
        h-12
        rounded-xl
        border-2 border-gray-200
        bg-white
        pl-11 pr-4
        text-sm
        outline-none
        focus:border-cyan-500
        transition-all duration-300
      "
      />
    </div>
  );
};

export default SearchBar;
