import { NavLink } from "react-router-dom";
import { ChevronDown, User } from "lucide-react"; // Lightweight default user icon
import NAVLINK from "./navbar.data";
import Button from "../Button/Button";
import { useAuth } from "@/features/Auth/hooks/authhook";
import Logo from "../Logo/Logo";

const Navbar = () => {
  const { user, isAuthenticatedUser } = useAuth();

  const role = user?.data.role;
  const isLoggedIn = isAuthenticatedUser && Boolean(user?.data);
  const dashboardPath =
    role === "Doctor"
      ? "/doctor-dashboard"
      : role === "Seller"
        ? "/seller/dashboard"
        : "/pet-owner/dashboard";
  const displayName = user?.data.name || user?.data.username || "Account";
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
              {link.children ? (
                <div className="group relative">
                  <button
                    type="button"
                    className="flex items-center gap-1 text-sm font-medium text-gray-600 transition hover:text-[#178f95] group-focus-within:text-[#178f95] group-hover:text-[#178f95]"
                  >
                    {link.title}
                    <ChevronDown
                      size={15}
                      className="transition group-hover:rotate-180 group-focus-within:rotate-180"
                    />
                  </button>

                  <div className="invisible absolute left-1/2 top-full z-50 mt-3 w-44 -translate-x-1/2 rounded-lg border border-gray-100 bg-white py-2 opacity-0 shadow-lg shadow-gray-200/70 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    {link.children.map((child) => (
                      <NavLink
                        key={child.id}
                        to={child.path}
                        className={({ isActive }) =>
                          `block px-4 py-2 text-sm font-medium transition ${isActive
                            ? "bg-[#178f95]/10 text-[#178f95]"
                            : "text-gray-600 hover:bg-gray-50 hover:text-[#178f95]"
                          }`
                        }
                      >
                        {child.title}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ) : (
                <NavLink
                  to={link.path ?? "/"}
                  className={({ isActive }) =>
                    `text-sm font-medium transition ${isActive
                      ? "text-[#178f95]"
                      : "text-gray-600 hover:text-[#178f95]"
                    }`
                  }
                >
                  {link.title}
                </NavLink>
              )}
            </li>
          ))}
        </ul>

        {/* Right Side Actions: Conditional Auth UI */}
        <div className="hidden items-center gap-3 lg:flex">
          {isLoggedIn ? (
            /* Authenticated View */
            <>
              <NavLink to={dashboardPath}
                className="flex cursor-pointer items-center gap-3 rounded-full bg-gray-50 border border-gray-100 py-1.5 pl-2 pr-4 transition hover:bg-gray-100">
                {hasProfileImage ? (
                  <img
                    src={profileImageUrl}
                    alt={displayName}
                    className="h-8 w-8 rounded-full object-cover border border-[#178f95]/20"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#178f95]/10 text-[#178f95]">
                    <User size={18} />
                  </div>
                )}
                <span className="text-sm font-semibold text-gray-700 select-none">
                  {displayName}
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
