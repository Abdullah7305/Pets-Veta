import { useState } from "react";
import Sidebar from "./Sidebar";
import AdminNavbar from "../components/AdminNavbar";
import { Outlet } from "react-router-dom";


const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="lg:ml-[210px]">
        <AdminNavbar onMenuClick={() => setSidebarOpen(true)} />
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
