import { useState } from "react";
import { Link } from "react-router-dom";
import { Grid3X3, Home, PawPrint, ShoppingCart, Store, UserRound, X } from "lucide-react";

const menuItems = [
  {
    title: "Pet Owner Dashboard",
    description: "Manage your pets, appointments & more",
    path: "/pet-owner/dashboard",
    icon: <UserRound size={26} />,
    accent: "text-[#6334ff]",
  },
  {
    title: "Seller Dashboard",
    description: "Manage your store, products & orders",
    path: "/seller/dashboard",
    icon: <Store size={26} />,
    accent: "text-[#12b971]",
  },
  {
    title: "My Cart",
    description: "View your cart & checkout",
    path: "/cart",
    icon: <ShoppingCart size={26} />,
    accent: "text-[#ff850f]",
  },
];

const DashboardHomeMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-[70]">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open dashboard menu"
          className="group flex h-12 w-12 items-center justify-center rounded-full bg-[radial-gradient(circle_at_28%_24%,#6ce5df_0%,#009f9d_62%,#007c7a_100%)] text-white shadow-[0_16px_34px_rgba(0,159,157,0.3)] ring-[6px] ring-white/80 transition hover:-translate-y-1 hover:scale-105"
        >
          <Grid3X3 size={22} strokeWidth={2.6} />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-[70] h-[390px] w-[min(350px,calc(100vw-24px))] overflow-hidden rounded-[24px] bg-[#f4fffe] shadow-[0_18px_48px_rgba(0,159,157,0.18)]">
      <div className="absolute -left-[130px] -top-[68px] h-[480px] w-[460px] rounded-[50%] bg-[radial-gradient(circle_at_30%_30%,#55deda_0%,#009f9d_58%,#007c7a_100%)] shadow-[inset_-18px_-24px_56px_rgba(0,83,82,0.24)]" />
      <div className="absolute -left-[34px] top-[104px] h-[230px] w-[122px] rounded-r-full border-r border-dashed border-white/60" />

      <div className="absolute right-7 top-6 grid grid-cols-3 gap-2 opacity-55">
        {Array.from({ length: 9 }).map((_, index) => (
          <span key={index} className="h-1.5 w-1.5 rounded-full bg-white" />
        ))}
      </div>

      <div className="absolute right-8 top-24 h-12 w-16 rounded-full bg-white/5 text-white/10">
        <PawPrint size={48} fill="currentColor" />
      </div>

      <div className="absolute left-9 top-[106px] flex flex-col gap-[58px]">
        <span className="h-3 w-3 rounded-full border-[3px] border-white bg-[#8b45ff] shadow-[0_0_14px_rgba(139,69,255,0.8)]" />
        <span className="h-3 w-3 rounded-full border-[3px] border-white bg-[#35df76] shadow-[0_0_14px_rgba(53,223,118,0.8)]" />
        <span className="h-3 w-3 rounded-full border-[3px] border-white bg-[#ff8b18] shadow-[0_0_14px_rgba(255,139,24,0.8)]" />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-center gap-4 pl-[58px] pr-5">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="group grid grid-cols-[62px_minmax(0,1fr)_34px] items-center gap-3"
          >
            <span className={`flex h-[62px] w-[62px] items-center justify-center rounded-full bg-white ${item.accent} shadow-[0_12px_24px_rgba(0,83,82,0.18)] ring-[5px] ring-white/35 transition group-hover:-translate-y-1`}>
              {item.icon}
            </span>

            <span className="min-w-0 text-white">
              <span className="block text-base font-black leading-tight">
                {item.title}
              </span>
              <span className="mt-1 block max-w-[170px] text-xs font-medium leading-5 text-white/90">
                {item.description}
              </span>
            </span>

            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#007c7a]/70 text-white transition group-hover:translate-x-1 group-hover:bg-white group-hover:text-[#009f9d]">
              <span className="text-xl leading-none">›</span>
            </span>
          </Link>
        ))}
      </div>

      <div className="absolute bottom-5 left-5 z-10 flex items-center gap-3 rounded-full bg-white/90 px-4 py-2.5 text-xs font-bold text-[#163051] shadow-[0_12px_35px_rgba(20,67,151,0.16)]">
        <span className="flex items-center gap-2">
          <Home size={15} className="text-[#0a62ea]" />
          Safe
        </span>
        <span className="h-1 w-1 rounded-full bg-[#0aa68b]" />
        <span className="flex items-center gap-2">
          <PawPrint size={15} className="text-[#6b35ff]" />
          Trusted
        </span>
        <span className="h-1 w-1 rounded-full bg-[#0aa68b]" />
        <span className="flex items-center gap-2">
          <PawPrint size={15} className="text-[#0ca5c7]" />
          Loved
        </span>
      </div>

      <button
        type="button"
        onClick={() => setIsOpen(false)}
        aria-label="Close dashboard menu"
        className="absolute bottom-5 right-5 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#009f9d] shadow-[0_12px_28px_rgba(0,159,157,0.24)] ring-[8px] ring-white/20"
      >
        <X size={24} strokeWidth={3.4} />
      </button>
    </div>
  );
};

export default DashboardHomeMenu;
