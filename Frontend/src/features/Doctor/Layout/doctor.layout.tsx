import { useState } from "react";
import { Outlet } from "react-router-dom";
import { DoctorSidebar } from "../components/DoctorSideBar"; // Adjust path to your Sidebar

export const DoctorLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50">

            <DoctorSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />


            <div className="lg:pl-72">
                <div className="mx-auto max-w-7xl p-4 md:p-6 lg:p-8">

                    <Outlet />
                </div>
            </div>
        </div>
    );
};