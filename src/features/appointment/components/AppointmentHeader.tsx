import { useEffect, useRef, useState } from "react";
import {
  Search,
  Bell,
  Mail,
  ChevronDown,
  Plus,
  PawPrint,
  User,
  CalendarCheck,
  Settings,
  LogOut,
} from "lucide-react";

type AppointmentHeaderProps = {
  title: string;
  subtitle?: string;
  availableCount?: number;
  userName?: string;
  userRole?: string;
  userAvatar?: string;
  notificationCount?: number;
  messageCount?: number;
  onNewAppointment?: () => void;
  onSearch?: (query: string) => void;
  onProfile?: () => void;
  onLogout?: () => void;
};

export default function AppointmentHeader({
  title,
  subtitle = "Find and book the right care for your pet",
  availableCount,
  userName = "Aisha Khan",
  userRole = "Pet Owner",
  userAvatar,
  notificationCount = 3,
  messageCount = 2,
  onNewAppointment,
  onSearch,
  onProfile,
  onLogout,
}: AppointmentHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!profileOpen) return;
    function handleClick(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [profileOpen]);

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSearch?.(searchQuery);
  }

  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-30 border-b border-gray-100 bg-white">
      <div className="flex items-center gap-4 px-4 py-4 md:px-6">

        <div className="flex min-w-0 items-center gap-3">
          <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-900 shadow-md shadow-blue-900/20 sm:flex">
            <PawPrint size={22} className="text-white" strokeWidth={2.2} />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold leading-tight text-gray-800 md:text-2xl">
                {title}
              </h1>
              {typeof availableCount === "number" && (
                <span className="hidden rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-900 sm:inline-block">
                  {availableCount} available
                </span>
              )}
            </div>
            {subtitle && (
              <p className="mt-0.5 truncate text-xs text-gray-500 md:text-sm">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">

          <form
            onSubmit={handleSearchSubmit}
            className="hidden lg:block"
            role="search"
          >
            <div className="relative w-56 xl:w-72">
              <Search
                size={15}
                className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search doctors..."
                aria-label="Search"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pr-3 pl-9 text-sm text-gray-700 outline-none transition focus:border-blue-600 focus:bg-white"
              />
            </div>
          </form>

          <button
            type="button"
            onClick={onNewAppointment}
            className="hidden items-center gap-1.5 rounded-xl bg-blue-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 active:scale-[0.98] md:flex"
          >
            <Plus size={15} strokeWidth={2.5} />
            <span>New</span>
          </button>

          <button
            type="button"
            aria-label={`Notifications, ${notificationCount} new`}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition hover:border-gray-300 hover:bg-gray-50"
          >
            <Bell size={16} />
            {notificationCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-blue-900 px-1 text-[10px] font-bold text-white ring-2 ring-white">
                {notificationCount > 9 ? "9+" : notificationCount}
              </span>
            )}
          </button>

          <button
            type="button"
            aria-label={`Messages, ${messageCount} new`}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition hover:border-gray-300 hover:bg-gray-50"
          >
            <Mail size={16} />
            {messageCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-blue-900 px-1 text-[10px] font-bold text-white ring-2 ring-white">
                {messageCount > 9 ? "9+" : messageCount}
              </span>
            )}
          </button>

          <div className="mx-1 hidden h-8 w-px bg-gray-200 md:block" />

          <div className="relative" ref={profileRef}>
            <button
              type="button"
              onClick={() => setProfileOpen((s) => !s)}
              aria-haspopup="menu"
              aria-expanded={profileOpen}
              aria-label="Open profile menu"
              className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white p-1.5 pr-2.5 transition hover:border-gray-300 hover:bg-gray-50"
            >
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt={userName}
                  className="h-7 w-7 rounded-lg object-cover"
                />
              ) : (
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-900 text-[11px] font-bold text-white">
                  {initials}
                </div>
              )}
              <span className="hidden text-sm font-semibold text-gray-700 sm:inline">
                {userName.split(" ")[0]}
              </span>
              <ChevronDown
                size={14}
                className={`text-gray-400 transition-transform duration-200 ${
                  profileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {profileOpen && (
              <div
                role="menu"
                className="absolute right-0 z-20 mt-2 w-64 rounded-xl border border-gray-100 bg-white p-2 shadow-lg"
              >
                <div className="flex items-center gap-3 border-b border-gray-100 px-2 py-3">
                  {userAvatar ? (
                    <img
                      src={userAvatar}
                      alt={userName}
                      className="h-10 w-10 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-900 text-xs font-bold text-white">
                      {initials}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-gray-800">{userName}</p>
                    <p className="truncate text-xs text-gray-500">{userRole}</p>
                  </div>
                </div>

                <div className="py-1">
                  <button
                    type="button"
                    onClick={onProfile}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                  >
                    <User size={15} className="text-gray-400" />
                    My Profile
                  </button>
                  <button
                    type="button"
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                  >
                    <PawPrint size={15} className="text-gray-400" />
                    My Pets
                  </button>
                  <button
                    type="button"
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                  >
                    <CalendarCheck size={15} className="text-gray-400" />
                    My Appointments
                  </button>
                  <button
                    type="button"
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                  >
                    <Settings size={15} className="text-gray-400" />
                    Settings
                  </button>
                </div>

                <div className="border-t border-gray-100 pt-1">
                  <button
                    type="button"
                    onClick={onLogout}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                  >
                    <LogOut size={15} className="text-gray-400" />
                    Log out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 pb-3 lg:hidden">
        <form onSubmit={handleSearchSubmit} role="search">
          <div className="relative">
            <Search
              size={15}
              className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search doctors..."
              aria-label="Search"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pr-3 pl-9 text-sm text-gray-700 outline-none transition focus:border-blue-600 focus:bg-white"
            />
          </div>
        </form>
      </div>
    </header>
  );
}
