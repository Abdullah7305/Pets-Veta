import { useNavigate } from "react-router-dom";
import type { DoctorProfileButtonProps } from "../doctor.types";

const DoctorProfileButton = ({ name, image }: DoctorProfileButtonProps) => {
  const navigate = useNavigate();

  const handleOpenProfile = () => {
    navigate("/doctor/profile");
  };

  return (
    <button
      type="button"
      onClick={handleOpenProfile}
      className="rounded-full transition hover:scale-105 focus:outline-none focus:ring-4 focus:ring-teal-100"
      title="Open Profile"
    >
      {image ? (
        <img
          src={image}
          alt={name}
          className="h-12 w-12 rounded-full object-cover ring-4 ring-slate-100"
        />
      ) : (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F9C5A8] text-2xl ring-4 ring-slate-100">
          👩‍⚕️
        </div>
      )}
    </button>
  );
};

export default DoctorProfileButton;
