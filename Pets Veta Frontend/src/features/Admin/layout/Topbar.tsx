import NotificationBell from "../../../shared/components/NotificationBell/NotificationBell";
import UserProfile from "../../../shared/components/UserProfile/UserProfile";

const Topbar = () => {
  return (
    <div className="bg-white h-[80px]  px-8 flex items-center justify-end gap-6">
      <NotificationBell />
      <UserProfile />
    </div>
  );
};

export default Topbar;
