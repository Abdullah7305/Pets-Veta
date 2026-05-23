import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  FileText,
  Wallet,
  User,
  Settings,
  LogOut,
} from "lucide-react";

const doctorMenuItems = [
  { label: "Dashboard", to: "/doctor-dashboard", icon: LayoutDashboard, end: true },
  { label: "Appointment", to: "/doctor-dashboard/appointment", icon: Calendar },
  { label: "Appointment Page", to: "/doctor-dashboard/appointment-page", icon: FileText },
  { label: "Payment", to: "/doctor-dashboard/payment", icon: Wallet },
  { label: "Profile", to: "/doctor-dashboard/profile", icon: User },
  { label: "Settings", to: "/doctor-dashboard/settings", icon: Settings },
  { label: "Logout", to: "/login", icon: LogOut },
];

export default function DoctorDashboardSidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col overflow-y-auto bg-white shadow-sm md:flex">
      {/* DOCTOR PROFILE - clickable, navigates to profile page */}
      <NavLink
        to="/doctor-dashboard/profile"
        className="flex flex-col items-center gap-2 p-6 transition hover:bg-gray-50"
      >
        <div className="h-24 w-24 overflow-hidden rounded-full ring-4 ring-blue-100">
          <img
            src="https://i.pravatar.cc/200?img=12"
            alt="Doctor"
            className="h-full w-full object-cover"
          />
        </div>
        <h2 className="text-center text-base font-bold text-blue-900">
          Dr. Marttin Deo
        </h2>
        <p className="text-center text-xs text-gray-500">
          MBBS, FCPS - MD (Medicine), MCPS
        </p>
      </NavLink>

      <div className="mx-6 h-px bg-gray-200" />

      {/* DOCTOR DASHBOARD MENU */}
      <nav className="flex flex-1 flex-col gap-1 p-4">
        {doctorMenuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-blue-900 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <item.icon size={18} />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}