import { FaBell, FaChevronDown } from "react-icons/fa";
import Input from "@/shared/components/Input/Input";

const SellerHeader = () => {
  return (
    <header className="flex items-center justify-between border-b border-gray-100 bg-white px-7 py-4">
      <div>
        <h1 className="text-lg font-semibold text-gray-900">
          Welcome back, Furries Store
        </h1>
        <p className="text-sm text-gray-500">
          Here's what's happening with your store today.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Input placeholder="Search..." className="w-72" />

        <button className="relative rounded-full border border-gray-100 p-3 text-gray-600">
          <FaBell />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/80?img=12"
            alt="seller"
            className="h-10 w-10 rounded-full object-cover"
          />

          <div>
            <p className="text-sm font-semibold text-gray-900">Furries Store</p>
            <p className="text-xs text-gray-500">Seller</p>
          </div>

          <FaChevronDown className="text-xs text-gray-500" />
        </div>
      </div>
    </header>
  );
};

export default SellerHeader;