import {
  CalendarDays,
  LayoutDashboard,
  LogOut,
  PawPrint,
  Settings,
  ShoppingCart,
  Stethoscope,
  UserRound,
  FileText,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

type SidebarItem = {
  label: string;
  path: string;
  icon: React.ReactNode;
};

const sidebarItems: SidebarItem[] = [
  {
    label: "Dashboard",
    path: "/pet-owner/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    label: "Appointments",
    path: "/pet-owner/appointments",
    icon: <CalendarDays size={20} />,
  },
  {
    label: "Reports",
    path: "/pet-owner/reports",
    icon: <FileText size={20} />,
  },
  {
    label: "Find Doctor",
    path: "/doctors",
    icon: <Stethoscope size={20} />,
  },
  {
    label: "Marketplace",
    path: "/marketplace1",
    icon: <ShoppingCart size={20} />,
  },
  {
    label: "Profile",
    path: "/pet-owner/profile",
    icon: <UserRound size={20} />,
  },
  {
    label: "Settings",
    path: "/pet-owner/settings",
    icon: <Settings size={20} />,
  },
];

const DashboardSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-[260px] border-r border-slate-200 bg-white lg:flex lg:flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-slate-100 px-7 py-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF7F5] text-[#078b91]">
          <PawPrint size={27} />
        </div>

        <div>
          <h1 className="text-xl font-black text-[#078b91]">
            Pets Veta
          </h1>

          <p className="text-xs font-semibold text-slate-500">
            Care • Love • Heal
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 px-4 py-6">
        {sidebarItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 rounded-xl px-4 py-3.5 text-sm font-bold transition ${
                isActive
                  ? "bg-[#EAF7F5] text-[#078b91]"
                  : "text-[#20263D] hover:bg-slate-50"
              }`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Small sidebar info */}
      <div className="mx-4 mb-5 rounded-2xl bg-[#F1FAF8] p-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#078b91]">
          <PawPrint size={24} />
        </div>

        <h3 className="mt-4 text-lg font-black text-[#101b3d]">
          We care for your pets
        </h3>

        <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
          Book appointments and track your pet&apos;s health easily.
        </p>
      </div>

      {/* Logout */}
      <button
        type="button"
        onClick={handleLogout}
        className="mx-5 mb-6 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-red-500 transition hover:bg-red-50"
      >
        <LogOut size={20} />
        Logout
      </button>
    </aside>
  );
};

export default DashboardSidebar;
