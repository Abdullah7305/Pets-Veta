import { FaCheck, FaTimes } from "react-icons/fa";

const DoctorActions = () => {
  return (
    <div className="flex items-center gap-3">
      <button className="bg-green-100 text-green-600 w-10 h-10 rounded-lg flex items-center justify-center">
        <FaCheck />
      </button>

      <button className="bg-red-100 text-red-600 w-10 h-10 rounded-lg flex items-center justify-center">
        <FaTimes />
      </button>
    </div>
  );
};

export default DoctorActions;
