import { Bell, CheckCircle2, ChevronDown, Heart, Home, Info, PawPrint, Store, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import petOwnerChoice from "@/assets/shared/images/dashboard-choice/pet-owner-choice.png";
import sellerChoice from "@/assets/shared/images/dashboard-choice/seller-choice.png";
import userProfile from "@/assets/icons/user-profile-1.jpg";
import Button from "@/shared/components/Button/Button";
import Card from "@/shared/components/Card/Card";
import PageBackButton from "@/shared/components/BackButton/PageBackButton";
import type { DashboardCardProps } from "../types/auth.types";

const petOwnerItems = [
  "Book Vet Appointments",
  "Shop Pet Products",
  "Manage Pets",
  "Track Orders",
];

const sellerItems = [
  "Manage Products",
  "View & Manage Orders",
  "Track Earnings",
  "Store Analytics",
];

const DashboardChoicePage = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#fbfcff] text-[#13223a]">
      <aside className="fixed left-0 top-0 hidden h-screen w-[92px] border-r border-[#e4e7ee] bg-white lg:block">
        <button
          type="button"
          onClick={() => navigate("/")}
          aria-label="Home"
          className="absolute left-4 top-[106px] flex h-[64px] w-[64px] items-center justify-center rounded-full bg-white text-[#5b20f2] shadow-[0_18px_40px_rgba(91,32,242,0.15)]"
        >
          <Home size={27} strokeWidth={2.4} />
          <span className="absolute left-[76px] rounded-md bg-[#263348] px-3.5 py-2.5 text-[15px] font-semibold text-white shadow-lg">
            Home
          </span>
        </button>
      </aside>

      <section className="lg:pl-[92px]">
        <header className="flex min-h-[86px] items-center justify-between border-b border-[#e4e7ee] bg-white px-5 sm:px-8 lg:px-9">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-4 text-left"
          >
            <div className="text-[#4b14c9]">
              <PawPrint size={46} fill="currentColor" strokeWidth={1.7} />
            </div>

            <div>
              <h1 className="text-[25px] font-black leading-none text-[#4b14c9] sm:text-[28px]">
                Pets Veta
              </h1>
              <p className="mt-1.5 text-[12px] font-bold text-[#4b14c9]">
                Care | Love | Trust
              </p>
            </div>
          </button>

          <div className="flex items-center gap-5">
            <button
              type="button"
              aria-label="Notifications"
              className="relative hidden h-11 w-11 items-center justify-center rounded-full text-[#6b7288] transition hover:bg-slate-50 sm:flex"
            >
              <Bell size={28} strokeWidth={1.8} />
              <span className="absolute right-2 top-2 h-3 w-3 rounded-full bg-[#5b20f2]" />
            </button>

            <img
              src={userProfile}
              alt="User profile"
              className="h-[50px] w-[50px] rounded-full object-cover"
            />

            <ChevronDown size={25} className="hidden text-[#40506b] sm:block" />
          </div>
        </header>

        <section className="mx-auto w-full max-w-[1110px] px-5 pb-6 pt-7 sm:px-8">
          <div className="mb-6">
            <PageBackButton fallbackPath="/" />
          </div>

          <div className="text-center">
            <p className="text-[20px] font-black text-[#5b20f2]">
              Welcome back!
            </p>
            <h2 className="mt-1.5 text-[34px] font-black leading-tight text-[#12213a] sm:text-[42px]">
              Choose Your Dashboard
            </h2>
            <p className="mt-3 text-[17px] font-semibold text-[#65728a]">
              Select how you want to continue on Pets Veta
            </p>
          </div>

          <div className="mt-7 grid gap-6 lg:grid-cols-2">
            <DashboardCard
              accent="purple"
              icon={<PawPrint size={49} fill="currentColor" strokeWidth={1.5} />}
              image={petOwnerChoice}
              title="Pet Owner Dashboard"
              description="Find pet care services, book appointments, shop products, and manage your pets."
              items={petOwnerItems}
              buttonLabel="Go to Pet Owner Dashboard"
              onClick={() => navigate("/pet-owner/dashboard")}
            />

            <DashboardCard
              accent="green"
              icon={<Store size={45} fill="currentColor" strokeWidth={1.6} />}
              image={sellerChoice}
              title="Seller Dashboard"
              description="Manage your store, products, orders, and grow your pet business."
              items={sellerItems}
              buttonLabel="Go to Seller Dashboard"
              onClick={() => navigate("/seller/dashboard")}
            />
          </div>

          <div className="mt-7 flex items-center gap-4 rounded-lg border border-[#bfd7ff] bg-[#f5f9ff] px-5 py-3.5 text-[#0967f2]">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#dcebff]">
              <Info size={24} />
            </span>
            <p className="text-[15px] font-semibold">
              You can switch between dashboards anytime from your profile settings.
            </p>
          </div>

          <footer className="pt-6 text-center text-[13px] font-semibold text-[#647086]">
            &copy; 2024 Pets Veta. All rights reserved.
          </footer>
        </section>
      </section>
    </main>
  );
};

const DashboardCard = ({
  accent,
  icon,
  image,
  title,
  description,
  items,
  buttonLabel,
  onClick,
}: DashboardCardProps) => {
  const isPurple = accent === "purple";
  const color = isPurple ? "#5b20f2" : "#0aaa68";
  const cardClass = isPurple
    ? "border-[#ded1ff] bg-[#fcf9ff] shadow-[0_18px_45px_rgba(91,32,242,0.08)]"
    : "border-[#cfeadf] bg-[#f7fffb] shadow-[0_18px_45px_rgba(10,170,104,0.08)]";
  const buttonClass = isPurple
    ? "bg-[#5b20f2] shadow-[0_13px_25px_rgba(91,32,242,0.24)] hover:bg-[#4c17ce]"
    : "bg-[#08a968] shadow-[0_13px_25px_rgba(8,169,104,0.22)] hover:bg-[#07985f]";

  return (
    <Card className={`rounded-[18px] p-6 sm:p-7 ${cardClass}`}>
      <div className="relative min-h-[190px] overflow-hidden rounded-[16px]">
        <div
          className="absolute left-0 top-0 z-10 flex h-[96px] w-[96px] items-center justify-center rounded-full bg-white shadow-[0_16px_35px_rgba(43,49,78,0.12)]"
          style={{ color }}
        >
          {icon}
        </div>

        <img
          src={image}
          alt=""
          className="ml-auto h-[195px] w-[84%] object-contain object-right"
        />

        <Heart
          size={29}
          fill="currentColor"
          className="absolute right-9 top-14"
          style={{ color, opacity: 0.78 }}
        />
      </div>

      <h3 className="mt-5 text-[23px] font-black" style={{ color }}>
        {title}
      </h3>

      <p className="mt-3 max-w-[390px] text-[15px] font-semibold leading-7 text-[#5f6d84]">
        {description}
      </p>

      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-3 text-[15px] font-semibold text-[#56637a]">
            <CheckCircle2 size={17} className={isPurple ? "text-[#5b20f2]" : "text-[#0aaa68]"} />
            {item}
          </li>
        ))}
      </ul>

      <Button
        type="button"
        variant="primary"
        onClick={onClick}
        fullWidth
        className={`mt-5 h-[52px] gap-3.5 border-0 px-5 text-[16px] font-black text-white ${buttonClass}`}
      >
        {isPurple ? <PawPrint size={23} fill="currentColor" /> : <Store size={23} fill="currentColor" />}
        {buttonLabel}
        <ArrowRight size={25} />
      </Button>
    </Card>
  );
};

export default DashboardChoicePage;
