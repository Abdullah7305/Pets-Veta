import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import NAVLINK from "./navbar.data";
import Logo from "../Logo/Logo";
import Button from "../Button";

const Navbar = () => {
<<<<<<< HEAD
  const { user, isLoading } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsProfileOpen(false);
    window.location.href = "/login";
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/30 bg-white/35 text-[#20263d] shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-2xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-2.5 md:px-8">
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="LOGO"
            className="h-[52px] w-auto object-contain transition-transform duration-300 hover:scale-105"
          />
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          {NAVLINKS.map((link) => (
=======
  return (
    <nav className="bg-gray-100">
      <div className="flex items-center justify-around py-4">
        <Logo />

        <ul className="flex gap-6 font-bold text-sky-800">
          {NAVLINK.map((link) => (
>>>>>>> 01a3854942989e8ebbfd1599897a475fe4ed4146
            <li key={link.id}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
<<<<<<< HEAD
                  `relative text-[15px] font-semibold transition-all duration-300 
                  ${
                    isActive
                      ? "text-[#078b91]"
                      : "text-[#20263d] hover:text-[#078b91]"
                  }
                  after:absolute after:left-0 after:top-[28px] after:h-[3px] after:rounded-full after:bg-[#078b91] after:transition-all after:duration-300
                  ${
                    isActive
                      ? "after:w-full"
                      : "after:w-0 hover:after:w-full"
=======
                  `relative pb-1 transition-all duration-300 ${isActive
                    ? "text-[#178f95] after:absolute after:left-0 after:-bottom-1 after:h-[3px] after:w-full after:rounded-full after:bg-[#178f95]"
                    : "text-sky-800 hover:text-[#178f95]"
>>>>>>> 01a3854942989e8ebbfd1599897a475fe4ed4146
                  }`
                }
              >
                {link.title}
              </NavLink>
            </li>
          ))}
        </ul>

<<<<<<< HEAD
        <div className="flex min-w-[120px] items-center justify-end">
          {isLoading ? (
            <div className="hidden h-10 w-32 animate-pulse rounded-full bg-[#078b91]/10 md:block" />
          ) : user?.data ? (
            <div className="relative flex items-center gap-1.5">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
                alt="Profile Avatar"
                className="h-11 w-11 rounded-full bg-[#dff5f3]"
              />

              <button
                type="button"
                onClick={() => setIsProfileOpen((prev) => !prev)}
                className="rounded-full bg-[#078b91]/10 px-3 py-1 text-[15px] font-bold lowercase tracking-wider text-[#078b91] transition hover:bg-[#078b91]/20"
              >
                {user.data.username}
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 top-14 w-44 rounded-2xl border border-white/40 bg-white/95 p-2 shadow-xl backdrop-blur-xl">
                  <NavLink
                    to="/doctor/profile"
                    onClick={() => setIsProfileOpen(false)}
                    className="block rounded-xl px-4 py-2 text-sm font-semibold text-[#20263d] transition hover:bg-[#078b91]/10 hover:text-[#078b91]"
                  >
                    Profile
                  </NavLink>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="block w-full rounded-xl px-4 py-2 text-left text-sm font-semibold text-red-500 transition hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden items-center gap-3 md:flex">
              <NavLink
                to="/login"
                className="rounded-full border border-[#078b91]/30 bg-white/30 px-5 py-2.5 text-sm font-bold text-[#078b91] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/60"
              >
                Login
              </NavLink>

              <NavLink
                to="/petowner-signup"
                className="rounded-full bg-[#078b91]/90 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#078b91]/25 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#06777c]"
              >
                Sign Up
              </NavLink>
            </div>
          )}
        </div>

        <button className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/35 shadow-sm backdrop-blur-xl transition-all duration-300 hover:bg-white/60 lg:hidden">
          <span className="space-y-1.5">
            <span className="block h-[2px] w-5 rounded-full bg-[#20263d]" />
            <span className="block h-[2px] w-5 rounded-full bg-[#20263d]" />
            <span className="block h-[2px] w-5 rounded-full bg-[#20263d]" />
          </span>
        </button>
=======
        <div className="flex gap-2">
          <Link to="/login">
            <Button>Login</Button>
          </Link>

          <Link to="/continue-as">
            <Button>Signup</Button>
          </Link>
        </div>
>>>>>>> 01a3854942989e8ebbfd1599897a475fe4ed4146
      </div>
    </nav>
  );
};

export default Navbar;