import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/icons/Gemini_Generated_Image_34da4a34da4a34da-removebg-preview.png";
import { NAVLINKS } from "./navbar.data";
import { useAuth } from "@/features/Auth/hooks/authhook";

const Navbar = () => {
  const { user, isLoading } = useAuth();

  return (
    <nav className="sticky top-0 z-50 border-b border-white/30 bg-white/35 text-[#20263d] shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-2xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-2.5 md:px-8">

        {/* Logo */}
        <Link to={'/'} className="flex items-center">
          <img
            src={logo}
            alt="LOGO"
            className="h-[52px] w-auto object-contain transition-transform duration-300 hover:scale-105"
          />
        </Link>

        {/* Links */}
        <ul className="hidden items-center gap-7 lg:flex">
          {NAVLINKS.map((link) => (
            <li key={link.id}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `relative text-[15px] font-semibold transition-all duration-300 
                  ${isActive
                    ? "text-[#078b91]"
                    : "text-[#20263d] hover:text-[#078b91]"
                  }
                  after:absolute after:left-0 after:top-[28px] after:h-[3px] after:rounded-full after:bg-[#078b91] after:transition-all after:duration-300
                  ${isActive
                    ? "after:w-full"
                    : "after:w-0 hover:after:w-full"
                  }`
                }
              >
                {link.title}
              </NavLink>
            </li>
          ))}
        </ul>


        <div className="flex items-center justify-end min-w-[120px]">
          {isLoading ? (
    
            <div className="hidden h-10 w-32 animate-pulse rounded-full bg-[#078b91]/10 md:block" />
          ) : user?.data ? (

            <div className="flex items-center gap-1.5">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
                alt="Profile Avatar"
                className="h-11 w-11 rounded-full bg-[#dff5f3]"
              />
              <div className="flex items-center gap-2">
                <p className="rounded-full bg-[#078b91]/10 px-3 py-1 text-[15px] font-bold tracking-wider text-[#078b91] lowercase">
                  {user.data.username}
                </p>
              </div>
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
      </div>
    </nav>
  );
};

export default Navbar;