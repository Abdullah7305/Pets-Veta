import { NavLink } from "react-router-dom";
import logo from "../../../assets/icons/Gemini_Generated_Image_34da4a34da4a34da-removebg-preview.png";
import { NAVLINKS } from "./navbar.data";

const Navbar = () => {
    return (
        <nav className="bg-white text-black shadow-md">
            <div className="flex items-center justify-between">
                <div>
                    <img
                        src={logo}
                        alt="LOGO"
                        className="w-30 h-15 object-contain"
                    />
                </div>
                <ul className="flex items-center gap-6">
                    {NAVLINKS.map((link) => (
                        <li key={link.id}>
                            <NavLink to={link.path}>
                                {link.title}
                            </NavLink>
                        </li>
                    ))}
                </ul>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 border rounded-lg hover:bg-gray-100">
                        Login
                    </button>

                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                        Sign Up
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;