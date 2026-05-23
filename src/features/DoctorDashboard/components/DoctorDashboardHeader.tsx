import { Search, Bell, Mail, Menu } from "lucide-react";

type DoctorDashboardHeaderProps = {
  title?: string;
};

export default function DoctorDashboardHeader({
  title = "Dashboard",
}: DoctorDashboardHeaderProps) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 bg-white px-6 py-4">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>

      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Messages"
          className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100"
        >
          <Mail size={20} />
        </button>

        <button
          type="button"
          aria-label="Notifications"
          className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100"
        >
          <Bell size={20} />
        </button>

        <div className="relative">
          <Search
            size={18}
            className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
          />
          <input
            type="search"
            placeholder="Search"
            className="w-44 rounded-lg border border-gray-200 bg-gray-50 py-2 pr-3 pl-10 text-sm outline-none transition focus:border-blue-600 sm:w-56"
          />
        </div>

        <button
          type="button"
          aria-label="Menu"
          className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100"
        >
          <Menu size={20} />
        </button>
      </div>
    </header>
  );
}