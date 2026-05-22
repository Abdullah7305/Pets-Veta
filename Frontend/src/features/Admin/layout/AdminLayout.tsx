import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import MobileSidebar from "./MobileSidebar";
import { Outlet } from "react-router-dom";


const AdminLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen ">
      {/* DESKTOP SIDEBAR */}
      <Sidebar />

      {/* MOBILE SIDEBAR */}
      <MobileSidebar open={open} setOpen={setOpen} />

      {/* RIGHT SIDE */}
      <div className="lg:ml-[220px]">
        {/* TOPBAR */}
        <Topbar setOpen={setOpen} />

        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
