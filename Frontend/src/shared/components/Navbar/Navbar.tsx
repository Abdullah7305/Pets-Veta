import { NavLink } from "react-router-dom";
import { User } from "lucide-react"; // Lightweight default user icon
import NAVLINK from "./navbar.data";
import Button from "../Button/Button";
import { useAuth } from "@/features/Auth/hooks/authhook";
import Logo from "../Logo/Logo";

const Navbar = () => {
  // Assuming useAuth returns { user, isAuthenticated } or similar based on standard patterns
  // and user object contains { name, role }
  const { user } = useAuth();

  const isPetOwner = user?.data.role === "PetOwner";
  const profileImageUrl = user?.data.profileImageUrl;
  const hasProfileImage =
    profileImageUrl &&
    !profileImageUrl.toLowerCase().includes("enter your image");

  return (
    /* Changed 'sticky top-0' to 'relative' to make it completely static */
    <nav className="fixed top-0 left-0 w-full  z-50 border-b border-gray-100 bg-white">
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

        {/* Right Side Actions: Conditional Auth UI */}
        <div className="hidden items-center gap-3 lg:flex">
          {isPetOwner ? (
            /* Authenticated PetOwner View */
            <>
              <NavLink to={'/pet-owner/profile'}
                className="flex cursor-pointer items-center gap-3 rounded-full bg-gray-50 border border-gray-100 py-1.5 pl-2 pr-4 transition hover:bg-gray-100">
                {hasProfileImage ? (
                  <img
                    src={profileImageUrl}
                    alt={user.data.username}
                    className="h-8 w-8 rounded-full object-cover border border-[#178f95]/20"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#178f95]/10 text-[#178f95]">
                    <User size={18} />
                  </div>
                )}
                <span className="text-sm font-semibold text-gray-700 select-none">
                  {user.data.username}
                </span>
              </NavLink>
            </>
          ) : (
            /* Guest / Unauthenticated View */
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
