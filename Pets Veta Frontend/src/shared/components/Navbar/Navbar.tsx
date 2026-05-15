import { NavLink } from "react-router-dom";
import logo from "../../../assets/icons/Gemini_Generated_Image_34da4a34da4a34da-removebg-preview.png";
import { NAVLINKS } from "./navbar.data";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 text-[#20263d] shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-3 md:px-8 lg:px-10">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src={logo}
            alt="LOGO"
            className="h-[58px] w-auto object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Links */}
        <ul className="hidden items-center gap-8 lg:flex">
          {NAVLINKS.map((link) => (
            <li key={link.id}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `relative text-[16px] font-semibold transition-all duration-300 
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
                  }`
                }
              >
                {link.title}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <button className="rounded-full border border-[#078b91]/30 px-6 py-3 text-[15px] font-bold text-[#078b91] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#078b91]/10">
            Login
          </button>

          <button className="rounded-full bg-[#078b91] px-6 py-3 text-[15px] font-bold text-white shadow-lg shadow-[#078b91]/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#06777c]">
            Sign Up
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <button className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:bg-gray-50 lg:hidden">
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