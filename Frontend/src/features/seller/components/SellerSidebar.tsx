import { NavLink } from "react-router-dom";
import {
  FaBox,
  FaChartPie,
  FaClipboardList,
  FaHeart,
  FaPlusCircle,
  FaShoppingCart,
  FaStore,
  FaUserCircle,
  FaUser,
} from "react-icons/fa";

const links = [
  { label: "Dashboard", icon: FaChartPie, path: "/seller/dashboard" },
  { label: "My Listings", icon: FaClipboardList, path: "/seller/listings" },
  { label: "Add Product", icon: FaPlusCircle, path: "/seller/add-product" },
  { label: "Orders", icon: FaShoppingCart, path: "/seller/orders" },
  { label: "Stock", icon: FaBox, path: "/seller/stock" },
  { label: "Saved Listings", icon: FaHeart, path: "/seller/saved-listings" },
  { label: "Marketplace", icon: FaStore, path: "/marketplace1" },
  { label: "Profile", icon: FaUser, path: "/seller/profile" },
  { label: "Switch to Pet Owner", icon: FaUserCircle, path: "/pet-owner/dashboard" },
];

const SellerSidebar = () => {
  return (
    <aside className="flex min-h-screen w-64 flex-col border-r border-gray-100 bg-white px-5 py-6">
      <div className="mb-10">
        <h2 className="text-xl font-bold text-[#178f95]">Pets Veta</h2>
        <p className="text-xs text-gray-400">Care. Love. Trust.</p>
      </div>

      <nav className="flex-1 space-y-2">
        {links.map(({ label, icon: Icon, path }) => (
          <NavLink
            key={label}
            to={path}
            className={({ isActive }) =>
              `flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-[#e8f7f7] text-[#178f95]"
                  : "text-gray-600 hover:bg-gray-50"
              }`
            }
          >
            <Icon className="text-sm" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="rounded-lg bg-[#178f95] p-4 text-white">
        <p className="text-sm font-semibold">Need Help?</p>
        <p className="text-xs opacity-90">Contact Support</p>
      </div>
    </aside>
  );
};

export default SellerSidebar;
