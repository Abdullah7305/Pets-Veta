import {
  FaHome,
  FaUserMd,
  FaCalendarAlt,
  FaUsers,
  FaCog,
} from "react-icons/fa";

export const sidebarItems = [
  {
    id: 2,
    title: "Doctors",
    address: "doctors",
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
    id: 5,
    title: "Settings",
    address: "settings",
    icon: FaCog,
  },
];
