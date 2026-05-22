import Logo from "../../../shared/components/Logo/Logo";
import { NavLink } from "react-router-dom";
import { sidebarItems } from "../data/sidebar.data";
import { LogOut } from 'lucide-react'

const Sidebar = () => {
  return (
    <div
      className="
              hidden lg:flex
              w-[220px]
              min-h-screen
            bg-white
              border-r border-gray-200
              p-6
              flex-col justify-between
              fixed left-0 top-0
              "
    >
      <div>
        <Logo />

        <div className="mt-10 space-y-3">
          {sidebarItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.id}
                to={item.address}
                className={({ isActive }: { isActive: boolean }) => `
                             flex items-center gap-3
                             px-4 py-3
                              rounded-xl
                            cursor-pointer
                              transition-all duration-300

                             ${isActive
                    ? "bg-cyan-600 text-white shadow-lg"
                    : "hover:bg-cyan-100 text-gray-700"}
                              `}
              >
                <Icon />
                {item.title}
              </NavLink>

            );
          })}
        </div>
      </div>

      <div className="flex gap-1.5 items-center justify-start ">
        <button className="text-red-500 font-semibold cursor-pointer">Logout </button>
        <LogOut className="size-4 text-red-500 hover:scale-75 cursor-pointer" />
      </div>
    </div >
  );
};

export default Sidebar;
