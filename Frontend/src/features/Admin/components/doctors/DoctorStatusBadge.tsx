import type { DoctorStatusBadgeProps } from "../../types/admin.types";

const DoctorStatusBadge = ({ status }: DoctorStatusBadgeProps) => {
  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium

      ${
        status === "Approved"
          ? "bg-green-100 text-green-600"
          : status === "Pending"
            ? "bg-orange-100 text-orange-600"
            : "bg-red-100 text-red-600"
      }
      `}
    >
      {status}
    </span>
  );
};

export default DoctorStatusBadge;
