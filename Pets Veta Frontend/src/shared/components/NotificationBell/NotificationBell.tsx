import { FaBell } from "react-icons/fa";

const NotificationBell = () => {
  return (
    <div className="relative cursor-pointer">
      <FaBell size={20} />

      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
        5
      </span>
    </div>
  );
};

export default NotificationBell;
