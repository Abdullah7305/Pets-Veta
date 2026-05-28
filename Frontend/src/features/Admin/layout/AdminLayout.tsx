import { useState } from "react";
import Sidebar from "./Sidebar";
import AdminNavbar from "../components/AdminNavbar";
// import MobileSidebar from "./MobileSidebar";
import { Outlet } from "react-router-dom";


const AdminLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen ">
      {/* DESKTOP SIDEBAR */}

      <Sidebar />

    
      {/* <MobileSidebar open={open} setOpen={setOpen} /> */}


      <div className="lg:ml-[210px]">
  

        <AdminNavbar />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
