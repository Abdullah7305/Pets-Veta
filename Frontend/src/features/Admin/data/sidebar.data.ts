import {
  FaUserMd,
  FaCalendarAlt,
  FaUsers,
  FaCog,
  FaShoppingBag, // 👈 Imported icon
} from "react-icons/fa";

export const sidebarItems = [
  {
    id: 2,
    title: "Doctors",
    address: "",
    icon: FaUserMd,
  },
  {
    id: 3,
    title: "Appointments",
    address: "appointments",
    icon: FaCalendarAlt,
  },
  {
    id: 4,
    title: "Patients",
    address: "pateint",
    icon: FaUsers,
  },
  {
    id: 6, 
    title: "Orders",
    address: "orders",
    icon: FaShoppingBag,
  },
  {
    id: 5,
    title: "Settings",
    address: "settings",
    icon: FaCog,
  },
];