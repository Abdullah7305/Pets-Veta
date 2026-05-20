// // import { useState } from "react";

// // import Sidebar from "./Sidebar";

// // import Topbar from "./Topbar";

// // import MobileSidebar from "./MobileSidebar";

// // interface Props {
// //   children: React.ReactNode;
// // }

// // const AdminLayout = ({ children }: Props) => {
// //   const [open, setOpen] = useState(false);

// //   return (
// //     <div className="bg-gray-50 min-h-screen">
// //       {/* DESKTOP SIDEBAR */}
// //       <Sidebar />

// //       {/* MOBILE SIDEBAR */}
// //       <MobileSidebar open={open} setOpen={setOpen} />

// //       {/* TOPBAR */}
// //       <Topbar setOpen={setOpen} />

// //       {/* MAIN CONTENT */}
// //       <main
// //         className="
// //         lg:ml-[260px]
// //         pt-[110px]
// //         p-6
// //       "
// //       >
// //         {children}
// //       </main>
// //     </div>
// //   );
// // };

// // export default AdminLayout;

// import { useState } from "react";

// import Sidebar from "./Sidebar";

// import Topbar from "./Topbar";

// import MobileSidebar from "./MobileSidebar";

// interface Props {
//   children: React.ReactNode;
// }

// const AdminLayout = ({ children }: Props) => {
//   const [open, setOpen] = useState(false);

//   return (
//     <div className="bg-gray-50 min-h-screen flex">
//       {/* DESKTOP SIDEBAR */}
//       <Sidebar />

//       {/* MOBILE SIDEBAR */}
//       <MobileSidebar open={open} setOpen={setOpen} />

//       {/* RIGHT SIDE */}
//       <div className="flex-1 lg:ml-[260px]">
//         {/* TOPBAR */}
//         <Topbar setOpen={setOpen} />

//         {/* PAGE CONTENT */}
//         <main className="p-6">{children}</main>
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;
import { useState } from "react";

import Sidebar from "./Sidebar";

import Topbar from "./Topbar";

import MobileSidebar from "./MobileSidebar";

interface Props {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen ">
      {/* DESKTOP SIDEBAR */}
      <Sidebar />

      {/* MOBILE SIDEBAR */}
      <MobileSidebar open={open} setOpen={setOpen} />

      {/* RIGHT SIDE */}
      <div className="lg:ml-[220px]">
        {/* TOPBAR */}
        <Topbar setOpen={setOpen} />

        {/* PAGE CONTENT */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
