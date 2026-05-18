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
    total: 128,
    subtitle: "+12 this month",
    color: "text-cyan-600",
    icon: FaUserMd,
  },
  {
    id: 2,
    title: "Pending Approval",
    total: 18,
    subtitle: "+4 new requests",
    color: "text-orange-500",
    icon: FaClock,
  },
  {
    id: 3,
    title: "Approved Doctors",
    total: 96,
    subtitle: "+8 this month",
    color: "text-green-600",
    icon: FaCheckCircle,
  },
  {
    id: 4,
    title: "Rejected Doctors",
    total: 14,
    subtitle: "+2 this month",
    color: "text-red-500",
    icon: FaTimesCircle,
  },
];
