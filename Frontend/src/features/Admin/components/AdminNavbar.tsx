import { memo } from 'react';
import { Bell } from 'lucide-react'
import { useAuth } from '@/features/Auth/hooks/authhook';

const AdminNavbar = () => {
    const { user } = useAuth();
    return (
        <header className=" sticky top-0 z-50 bg-[#FFFFFF]  flex h-[76px] items-center justify-end gap-8 px-6 lg:px-10">
            <button
                type="button"
                aria-label="Notifications"
                className="relative rounded-lg p-2 text-[#0f172a] transition hover:bg-white cursor-pointer "
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
                    className="h-11 w-11 rounded-full bg-[#dff5f3]"
                />
                <div className="flex items-center gap-2">

                    <p className="rounded-full bg-[#078b91]/10 px-3 py-1 text-[15px] font-bold tracking-wider text-[#078b91] lowercase">
                        {user?.data?.role === 'Admin' ? user.data.username : 'Admin'}
                    </p>
                </div>
            </button>
        </header>
    );
};

export default memo(AdminNavbar);