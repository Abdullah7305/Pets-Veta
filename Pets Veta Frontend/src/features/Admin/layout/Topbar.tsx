import { Bell, Menu } from "lucide-react";

import userImage from "../../../assets/icons/user-profile-1.jpg";

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Topbar = ({ setOpen }: Props) => {
  return (
    <div
      className="
      h-[90px]
      bg-white
      border-b border-gray-200
      px-6
      flex items-center justify-between
      sticky top-0
      z-30
    "
    >
      {/* MOBILE MENU */}
      <button className="lg:hidden" onClick={() => setOpen(true)}>
        <Menu size={28} />
      </button>

      {/* DESKTOP EMPTY */}
      <div className="hidden lg:block" />

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-5 ml-auto">
        {/* NOTIFICATION */}
        <button
          className="
          relative
          w-12 h-12
          rounded-full
          bg-gray-100
          flex items-center justify-center
          hover:bg-cyan-100
          transition-all duration-300
        "
        >
          <Bell size={22} />

          <span
            className="
            absolute top-2 right-2
            w-2 h-2 rounded-full
            bg-red-500
          "
          />
        </button>

        {/* USER */}
        <div className="flex items-center gap-3">
          <img
            src={userImage}
            alt="user"
            className="
            w-12 h-12
            rounded-full
            object-cover
            border-2 border-cyan-500
          "
          />

          <div className="hidden sm:block">
            <h3 className="font-semibold text-gray-800">Admin</h3>

            <p className="text-sm text-gray-500">Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
