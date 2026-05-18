import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface Props {
  children: ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  return (
    <div className="flex bg-gray-100">
      <Sidebar />

      <div className="flex-1">
        <Topbar />

        <div className="p-8">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
