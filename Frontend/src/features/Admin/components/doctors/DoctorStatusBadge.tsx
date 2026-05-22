import React from "react";

// 1. Defining a strict union type for your statuses so TypeScript can protect against typos
export type DoctorStatus = "Approved" | "Pending" | "Rejected";

interface Props {
  status: DoctorStatus;
  // 2. Added an onChange handler so your parent component knows when a user changes the status
  onChange?: (newStatus: DoctorStatus) => void;
}

const DoctorStatusDropdown = ({ status }: Props) => {
  // A helper function to grab the exact color classes you used before
  const getColorClass = (currentStatus: DoctorStatus) => {
    switch (currentStatus) {
      case "Approved":
        return "bg-green-100 text-green-600 border-green-200";
      case "Pending":
        return "bg-orange-100 text-orange-600 border-orange-200";
      case "Rejected":
      default:
        return "bg-red-100 text-red-600 border-red-200";
    }
  };

  return (
    <div className="relative inline-block text-left">
      <select
        value={status}
        onChange={(e) => onChange(e.target.value as DoctorStatus)}
        className={`px-3 py-1 pr-8 rounded-full text-sm font-medium border cursor-pointer appearance-none focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition-colors duration-150 ${getColorClass(
          status
        )}`}
      >
        <option value="Approved" className="bg-white text-gray-800">
          Approved
        </option>
        <option value="Pending" className="bg-white text-gray-800">
          Pending
        </option>
        <option value="Rejected" className="bg-white text-gray-800">
          Rejected
        </option>
      </select>

      {/* Custom Chevron Arrow since 'appearance-none' removes the ugly default browser dropdown arrow */}
      <div className={`pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 ${status === "Approved" ? "text-green-600" : status === "Pending" ? "text-orange-600" : "text-red-600"}`}>
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};

export default DoctorStatusDropdown;