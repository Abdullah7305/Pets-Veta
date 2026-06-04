import Sidebar from "./Sidebar";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileSidebar = ({ open, setOpen }: Props) => {
  return <Sidebar sidebarOpen={open} setSidebarOpen={setOpen} />;
};

export default MobileSidebar;
