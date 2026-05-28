// import {
//   BarChart3,
//   CalendarDays,
//   ChevronDown,
//   ChevronUp,
//   LayoutDashboard,
//   LogOut,
//   PawPrint,
//   Settings,
//   Star,
//   Stethoscope,
//   Users,
//   type LucideIcon,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// export type DoctorRequestTab = "all" | "pending" | "approved";

// type AdminSidebarProps = {
//   activeTab: DoctorRequestTab;
//   setActiveTab: (tab: DoctorRequestTab) => void;
// };

// type MenuItem = {
//   label: string;
//   icon: LucideIcon;
// };


// const lowerMenu: MenuItem[] = [
//   { label: "Appointments", icon: CalendarDays },
//   { label: "Pets", icon: PawPrint },
//   { label: "Reviews", icon: Star },
//   { label: "Reports", icon: BarChart3 },
//   { label: "Settings", icon: Settings },
// ];

// const doctorTabs: Array<{ label: string; value: DoctorRequestTab }> = [
//   { label: "Doctor Requests", value: "pending" },
//   { label: "Approved Doctors", value: "approved" },
// ];

// const AdminSidebar = ({ activeTab, setActiveTab }: AdminSidebarProps) => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     navigate("/admin-login");
//   };

//   return (
//     <>
//       <div className="border-b border-slate-200 bg-[#f4fbfb] px-4 py-4 lg:hidden">
//         <div className="flex items-center justify-between">
//           <button
//             type="button"
//             onClick={() => setActiveTab("all")}
//             className="flex items-center gap-3"
//           >
//             <BrandMark />
//           </button>

//           <button
//             type="button"
//             onClick={handleLogout}
//             className="flex h-10 w-10 items-center justify-center rounded-lg border border-red-100 bg-white text-red-500"
//             aria-label="Logout"
//           >
//             <LogOut size={20} />
//           </button>
//         </div>

//         <div className="mt-4 grid grid-cols-3 gap-2 text-xs font-black sm:text-sm">
//           {doctorTabs.map((tab) => (
//             <button
//               key={tab.value}
//               type="button"
//               onClick={() => setActiveTab(tab.value)}
//               className={`min-h-11 rounded-lg px-2 transition ${activeTab === tab.value
//                 ? "bg-[#078b91] text-white shadow-md shadow-cyan-100"
//                 : "bg-white text-[#405169]"
//                 }`}
//             >
//               {tab.label}
//             </button>
//           ))}
//         </div>
//       </div>

//       <aside className="fixed left-0 top-0 z-20 hidden h-screen w-[272px] border-r border-slate-200 bg-[#f4fbfb] text-[#12213a] shadow-[10px_0_35px_rgba(15,118,110,0.08)] lg:flex lg:flex-col">
//         <button
//           type="button"
//           onClick={() => setActiveTab("all")}
//           className="flex h-[102px] items-center gap-3 border-b border-slate-200 px-8 text-left"
//         >
//           <BrandMark />
//         </button>

//         <nav className="flex-1 space-y-3 overflow-y-auto px-4 py-8">
      

//           <div className="rounded-lg bg-[#dff5f3] px-5 py-4 text-[#078b91]">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <Stethoscope size={22} />
//                 <span className="font-black">Doctors</span>
//               </div>
//               <ChevronUp size={16} />
//             </div>

//             <div className="mt-6 space-y-2 pl-9 text-sm font-semibold">
//               {doctorTabs.map((tab) => (
//                 <button
//                   key={tab.value}
//                   type="button"
//                   onClick={() => setActiveTab(tab.value)}
//                   className={`flex w-full items-center justify-between rounded-lg px-4 py-3 text-left transition ${activeTab === tab.value
//                     ? "bg-[#ccefea] text-[#078b91] shadow-sm"
//                     : "text-[#405169] hover:bg-white/60"
//                     }`}
//                 >
//                   <span>{tab.label}</span>
//                   {activeTab === tab.value && (
//                     <span className="h-2 w-2 rounded-full bg-[#078b91]" />
//                   )}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {lowerMenu.map((item) => (
//             <SidebarButton key={item.label} item={item} />
//           ))}
//         </nav>

//         <button
//           type="button"
//           onClick={handleLogout}
//           className="flex w-full items-center justify-center gap-3 rounded-lg border border-red-100 bg-white px-4 py-3 font-black text-red-500 transition hover:bg-red-50"
//         >
//           <LogOut size={20} />
//           Logout
//         </button>
//         {/* </div> */}
//       </aside>
//     </>
//   );
// };

// const BrandMark = () => {
//   return (
//     <>
//       <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#d9f3ef] text-[#078b91]">
//         <PawPrint size={30} fill="currentColor" />
//       </div>
//       <h1 className="text-2xl font-black text-[#078b91]">PetsVeta</h1>
//     </>
//   );
// };

// const SidebarButton = ({
//   item,
//   active = false,
//   onClick,
// }: {
//   item: MenuItem;
//   active?: boolean;
//   onClick?: () => void;
// }) => {
//   const Icon = item.icon;

//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className={`flex w-full items-center gap-4 rounded-lg px-5 py-3.5 text-left font-semibold transition ${active
//         ? "bg-[#dff5f3] text-[#078b91] shadow-sm"
//         : "text-[#12213a] hover:bg-[#e3f4f2] hover:text-[#078b91]"
//         }`}
//     >
//       <Icon size={22} className={active ? "text-[#078b91]" : "text-[#587087]"} />
//       {item.label}
//     </button>
//   );
// };

// export default AdminSidebar;
