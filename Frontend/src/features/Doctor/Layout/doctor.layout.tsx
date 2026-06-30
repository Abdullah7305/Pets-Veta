import { useState } from "react";
import { Menu } from "lucide-react";
import { Outlet } from "react-router-dom";
import PageBackButton from "@/shared/components/BackButton/PageBackButton";
import { DoctorSidebar } from "../components/DoctorSideBar"; // Adjust path to your Sidebar

export const DoctorLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50">
            <DoctorSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <div className="lg:pl-72">
                <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 shadow-sm lg:hidden">
                    <button
                        type="button"
                        onClick={() => setSidebarOpen(true)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100"
                        aria-label="Open sidebar"
                    >
                        <Menu size={22} />
                    </button>
                    <span className="text-sm font-bold text-slate-800">Doctor Panel</span>
                    <span className="h-10 w-10" aria-hidden="true" />
                </header>

                <div className="mx-auto w-full max-w-7xl p-4 sm:p-5 md:p-6 lg:p-8">
                    <div className="mb-5">
                        <PageBackButton fallbackPath="/" />
                    </div>

                    <Outlet />
                </div>
            </div>
        </div>
    );
};
