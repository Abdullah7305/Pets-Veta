import { Outlet } from "react-router-dom";
import DoctorDashboardSidebar from "./DoctorDashboardSidebar";

export default function DoctorDashboardLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* <DoctorDashboardSidebar /> */}
      <div className="flex flex-1 flex-col overflow-x-hidden">
        <Outlet />
      </div>
    </div>
  );
}