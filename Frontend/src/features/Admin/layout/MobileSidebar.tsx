import Sidebar from "./Sidebar";
import type { MobileSidebarProps } from "../types/admin.types";

const MobileSidebar = ({ open, setOpen }: MobileSidebarProps) => {
  return <Sidebar sidebarOpen={open} setSidebarOpen={setOpen} />;
};

export default MobileSidebar;
