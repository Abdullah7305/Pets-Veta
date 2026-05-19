
import {
  FaUserMd,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

export const statsData = [
  {
    id: 1,
    title: "Total Doctors",
    total: "120",
    subtitle: "Available Doctors",
    color: "bg-cyan-600",
    icon: FaUserMd,
  },

  {
    id: 2,
    title: "Pending Approval",
    total: "15",
    subtitle: "Waiting Doctors",
    color: "bg-yellow-500",
    icon: FaClock,
  },

  {
    id: 3,
    title: "Approved Doctors",
    total: "95",
    subtitle: "Verified Doctors",
    color: "bg-green-500",
    icon: FaCheckCircle,
  },

  {
    id: 4,
    title: "Rejected Doctors",
    total: "10",
    subtitle: "Rejected Accounts",
    color: "bg-red-500",
    icon: FaTimesCircle,
  },
];
