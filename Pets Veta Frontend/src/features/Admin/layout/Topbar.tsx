import { Bell, Menu } from "lucide-react";

import userImage from "../../../assets/icons/user-profile-1.jpg";

import Logo from "../../../shared/components/Logo/Logo";

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
      {/* LEFT SIDE */}
      <div className="flex items-center gap-3">
        {/* MOBILE MENU */}
        <button
          className="
          lg:hidden
          w-11 h-11
          rounded-xl
          bg-gray-100
          flex items-center justify-center
        "
          onClick={() => setOpen(true)}
        >
          <Menu size={26} />
        </button>

        {/* MOBILE LOGO */}
        <div className="flex items-center gap-2 lg:hidden">
          <Logo />

          <h2 className="text-xl font-bold text-cyan-600">PetsVeta</h2>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-5">
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
