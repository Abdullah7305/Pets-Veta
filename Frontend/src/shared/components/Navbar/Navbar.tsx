import { NavLink } from "react-router-dom";
import { User } from "lucide-react";
import NAVLINK from "./navbar.data";
import Button from "../Button/Button";
import { useAuth } from "@/features/Auth/hooks/authhook";
import Logo from "../Logo/Logo";

const Navbar = () => {
  const { user } = useAuth();

  const isAuthenticated = Boolean(user?.success && user?.data);
  const profileImageUrl = user?.data?.profileImageUrl;
  const username = user?.data?.username || user?.data?.name || "Profile";

  const hasProfileImage =
    profileImageUrl &&
    !profileImageUrl.toLowerCase().includes("enter your image");

  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-gray-100 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Logo />

        {/* Desktop Navigation Links */}
        <ul className="hidden items-center gap-7 lg:flex">
          {NAVLINK.map((link) => (
            <li key={link.id}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition ${isActive
                    ? "text-[#178f95]"
                    : "text-gray-600 hover:text-[#178f95]"
                  }`
                }
              >
                {link.title}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right Side Actions */}
        <div className="hidden items-center gap-3 lg:flex">
          {isAuthenticated ? (
            <NavLink
              to="/seller/dashboard"
              className="flex cursor-pointer items-center gap-3 rounded-full border border-gray-100 bg-gray-50 py-1.5 pl-2 pr-4 transition hover:bg-gray-100"
            >
              {hasProfileImage ? (
                <img
                  src={profileImageUrl}
                  alt={username}
                  className="h-8 w-8 rounded-full border border-[#178f95]/20 object-cover"
                />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#178f95]/10 text-[#178f95]">
                  <User size={18} />
                </div>
              )}

              <span className="select-none text-sm font-semibold text-gray-700">
                {username}
              </span>
            </NavLink>
          ) : (
            <>
              <Button href="/login" variant="outline" size="sm">
                Login
              </Button>

              <NavLink
                to="/continue-as"
                className="rounded-lg bg-[#178f95] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#12757a]"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;