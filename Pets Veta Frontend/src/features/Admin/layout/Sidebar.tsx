import { useState } from "react";
import Logo from "../../../shared/components/Logo/Logo";

import { sidebarItems } from "../data/sidebar.data";

const Sidebar = () => {
  const [active, setActive] = useState("Dashboard");

  return (
    <div className="w-[260px] min-h-screen bg-white  p-6 flex flex-col justify-between">
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
                <span onClick={() => setActive(item.title)}>{item.title}</span>
              </div>
            );
          })}
        </div>
      </div>

      <button className="bg-red-100 text-red-600 py-3 rounded-xl font-semibold w-full">
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
