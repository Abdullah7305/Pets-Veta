import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Marketplace", path: "/marketplace" },
    { name: "AI Assistant", path: "/ai-assistant" },
    { name: "Doctors", path: "/doctors" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="text-2xl font-bold text-sky-900">
          Pets Veta
        </NavLink>

        <ul className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition ${isActive
                    ? "text-[#178f95]"
                    : "text-gray-600 hover:text-[#178f95]"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <NavLink
            to="/login"
            className="rounded-lg border border-[#178f95] px-5 py-2 text-sm font-semibold text-[#178f95] transition hover:bg-[#178f95] hover:text-white"
          >
            Login
          </NavLink>

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