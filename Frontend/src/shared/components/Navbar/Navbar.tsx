import { Link, NavLink } from "react-router-dom";

import NAVLINK from "./navbar.data";
import Logo from "../Logo/Logo";
import Button from "../Button";

const Navbar = () => {
  return (
    <nav className="bg-gray-100">
      <div className="flex items-center justify-around py-4">
        <Logo />

        <ul className="flex gap-4 font-bold text-sky-800">
          {NAVLINK.map((link) => (
            <li key={link.id}>
              <NavLink to={link.path}>{link.title}</NavLink>
            </li>
          ))}
        </ul>

        <div className="flex gap-2">
          <Link to="/login">
            <Button>Login</Button>
          </Link>

          <Link to="/signup">
            <Button>Signup</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;