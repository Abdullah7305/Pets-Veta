import { Link, NavLink } from "react-router-dom";

import NAVLINK from "./navbar.data";
import Logo from "../Logo/Logo";
import Button from "../Button";

const Navbar = () => {
  return (
    <nav className="bg-gray-100">
      <div className="flex items-center justify-around py-4">
        <Logo />

        <ul className="flex gap-6 font-bold text-sky-800">
          {NAVLINK.map((link) => (
            <li key={link.id}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `relative pb-1 transition-all duration-300 ${isActive
                    ? "text-[#178f95] after:absolute after:left-0 after:-bottom-1 after:h-[3px] after:w-full after:rounded-full after:bg-[#178f95]"
                    : "text-sky-800 hover:text-[#178f95]"
                  }`
                }
              >
                {link.title}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex gap-2">
          <Link to="/login">
            <Button>Login</Button>
          </Link>

          <Link to="/continue-as">
            <Button>Signup</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;