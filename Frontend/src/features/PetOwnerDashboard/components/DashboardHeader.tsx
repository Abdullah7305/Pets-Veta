import { Bell, ChevronDown } from "lucide-react";

import type {
  DashboardUser,
} from "../types/petOwnerDashboard.types";

type DashboardHeaderProps = {
  user: DashboardUser;
};

const DashboardHeader = ({
  user,
}: DashboardHeaderProps) => {
  const firstName =
    user.fullName.split(" ")[0] || user.fullName;

  return (
    <header className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-black tracking-[-0.04em] text-[#101b3d]">
          Hi, {firstName}!
        </h1>

        <p className="mt-2 text-sm font-medium text-slate-500">
          Here&apos;s what&apos;s happening with your pets today.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-11 w-11 items-center justify-center rounded-full text-[#101b3d] transition hover:bg-slate-100"
        >
          <Bell size={23} />

          <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-black text-white">
            3
          </span>
        </button>

        <div className="h-12 w-12 overflow-hidden rounded-full bg-[#EAF7F5]">
          <img
            src={user.profileImageUrl}
            alt={user.fullName}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="hidden sm:block">
          <p className="text-sm font-black text-[#101b3d]">
            {user.fullName}
          </p>

          <p className="text-xs font-semibold text-slate-500">
            Pet Parent
          </p>
        </div>

        <ChevronDown size={18} className="text-[#101b3d]" />
      </div>
    </header>
  );
};

export default DashboardHeader;