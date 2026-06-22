import { memo } from 'react';
import { Bell, Menu } from 'lucide-react'
import { useAuth } from '@/features/Auth/hooks/authhook';
import type { AdminNavbarProps } from "../types/admin.types";

const AdminNavbar = ({ onMenuClick }: AdminNavbarProps) => {
    const { user } = useAuth();
    return (
        <header className="sticky top-0 z-30 flex h-[68px] items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 shadow-sm sm:h-[76px] sm:px-6 lg:justify-end lg:px-10">
            <button
                type="button"
                onClick={onMenuClick}
                aria-label="Open sidebar"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-[#0f172a] transition hover:bg-slate-100 lg:hidden"
            >
                <Menu size={24} strokeWidth={2.4} />
            </button>

            <div className="flex items-center justify-end gap-3 sm:gap-8">
            <button
                type="button"
                aria-label="Notifications"
                className="relative cursor-pointer rounded-lg p-2 text-[#0f172a] transition hover:bg-slate-100"
            >
                <Bell size={27} strokeWidth={2.4} />
                <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-[#ef4444] text-[11px] font-black text-white">
                    4
                </span>
            </button>

            <button type="button" className="cursor-pointer flex items-center gap-2">
                <img
                    src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
                    alt="Admin"
                    className="h-10 w-10 rounded-full bg-[#dff5f3] sm:h-11 sm:w-11"
                />
                <div className="flex items-center gap-2">

                    <p className="max-w-28 truncate rounded-full bg-[#078b91]/10 px-3 py-1 text-sm font-bold tracking-wider text-[#078b91] lowercase sm:max-w-none sm:text-[15px]">
                        {user?.data?.role === 'Admin' ? user.data.username : 'Admin'}
                    </p>
                </div>
            </button>
            </div>
        </header>
    );
};

export default memo(AdminNavbar);
