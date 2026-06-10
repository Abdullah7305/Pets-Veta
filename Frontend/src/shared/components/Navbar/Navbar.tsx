import { NavLink } from "react-router-dom";
import NAVLINK from "./navbar.data";
import Button from "../Button/Button";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="text-2xl font-bold text-sky-900">
          Pets Veta
        </NavLink>

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

        <div className="hidden items-center gap-3 lg:flex">
          <Button href="/login" variant="outline" size="sm">
            Login
          </Button>

          <NavLink
            to="/continue-as"
            className="rounded-lg bg-[#178f95] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#12757a]"
          >
            Register
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;