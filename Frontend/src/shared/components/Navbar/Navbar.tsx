import { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronDown, ShoppingCart, User } from "lucide-react";

import NAVLINK from "./navbar.data";
import Button from "../Button/Button";
import { useAuth } from "@/features/Auth/hooks/authhook";
import Logo from "../Logo/Logo";
import { getCartItems } from "@/features/cart/utils/cartStorage";
import NotificationBell from "../NotificationBell/NotificationBell";

const Navbar = () => {
  const { user, isAuthenticatedUser } = useAuth();

  const [cartCount, setCartCount] = useState(0);

  const isAuthenticated = Boolean(isAuthenticatedUser && user?.data);

  const profileName = useMemo(() => {
    return (
      user?.data?.username ||
      user?.data?.name ||
      user?.data?.email?.split("@")[0] ||
      "Profile"
    );
  }, [user?.data?.email, user?.data?.name, user?.data?.username]);

  const profileImageUrl = user?.data?.profileImageUrl;

  const hasProfileImage =
    Boolean(profileImageUrl) &&
    !profileImageUrl?.toLowerCase().includes("enter your image");

  useEffect(() => {
    const updateCartCount = () => {
      const items = getCartItems();
      const count = items.reduce((total, item) => total + item.quantity, 0);

      setCartCount(count);
    };

    updateCartCount();

    window.addEventListener("storage", updateCartCount);
    window.addEventListener("cart-updated", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cart-updated", updateCartCount);
    };
  }, []);

  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Logo />

        <ul className="hidden items-center gap-7 lg:flex">
          {NAVLINK.map((link) => (
            <li key={link.id}>
              {link.children && link.children.length > 0 ? (
                <div className="group relative">
                  <button
                    type="button"
                    className="flex items-center gap-1 text-sm font-semibold text-gray-600 transition hover:text-[#178f95] group-focus-within:text-[#178f95] group-hover:text-[#178f95]"
                  >
                    {link.title}

                    <ChevronDown
                      size={15}
                      className="transition group-hover:rotate-180 group-focus-within:rotate-180"
                    />
                  </button>

                  <div className="invisible absolute left-1/2 top-full z-50 mt-3 w-44 -translate-x-1/2 rounded-xl border border-gray-100 bg-white py-2 opacity-0 shadow-lg shadow-gray-200/70 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    {link.children.map((child) => (
                      <NavLink
                        key={child.id}
                        to={child.path}
                        className={({ isActive }) =>
                          `block px-4 py-2 text-sm font-semibold transition ${isActive
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
                  end={link.path === "/"}
                  className={({ isActive }) =>
                    `text-sm font-semibold transition ${isActive
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

        <div className="hidden items-center gap-3 lg:flex">
          {isAuthenticated ? (
            <>
              <NotificationBell />

              <NavLink
                to="/cart"
                className="relative flex h-11 w-11 items-center justify-center rounded-full border border-gray-100 bg-gray-50 text-gray-600 shadow-sm transition hover:border-[#178f95]/30 hover:bg-[#eefafa] hover:text-[#178f95]"
                aria-label="Cart"
                title="Cart"
              >
                <ShoppingCart size={20} />

                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 inline-flex min-w-[20px] items-center justify-center rounded-full bg-[#178f95] px-1.5 py-0.5 text-[10px] font-black leading-none text-white ring-2 ring-white">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </NavLink>

              <NavLink
                to="/seller/dashboard"
                className="flex cursor-pointer items-center gap-3 rounded-full border border-gray-100 bg-gray-50 py-1.5 pl-2 pr-4 shadow-sm transition hover:border-[#178f95]/30 hover:bg-[#eefafa]"
              >
                {hasProfileImage ? (
                  <img
                    src={profileImageUrl}
                    alt={profileName}
                    className="h-8 w-8 rounded-full border border-[#178f95]/20 object-cover"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#178f95]/10 text-[#178f95]">
                    <User size={18} />
                  </div>
                )}

                <span className="max-w-[130px] select-none truncate text-sm font-bold text-gray-700">
                  {profileName}
                </span>
              </NavLink>
            </>
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