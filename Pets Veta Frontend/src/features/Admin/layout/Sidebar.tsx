import { useState } from "react";
import Logo from "../../../shared/components/Logo/Logo";

import { sidebarItems } from "../data/sidebar.data";

const Sidebar = () => {
  const [active, setActive] = useState("Dashboard");

  return (
    <div
      className="
  hidden lg:flex
  w-[220px]
  min-h-screen
  bg-white
  border-r border-gray-200
  p-6
  flex-col
  justify-between
  fixed left-0 top-0
"
    >
      <div>
        <Logo />

        <div className="mt-10 space-y-3">
          {sidebarItems.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                // className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-cyan-600 hover:text-white cursor-pointer transition-all"
                className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all

${active === item.title ? "bg-cyan-600 text-white" : "hover:bg-cyan-100"}
`}
              >
                <Icon />
                <span>{item.title}</span>
              </div>
            );
          })}
        </div>
      </div>

      <button className="text-red-500 font-semibold">Logout</button>
    </div>
  );
};

export default Sidebar;
