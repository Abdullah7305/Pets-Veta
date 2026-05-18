import { doctorsData } from "../../data/doctors.data";
import DoctorRow from "./DoctorRow";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const DoctorTable = () => {
  return (
    <div className="bg-white rounded-2xl p-6 mt-8 overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left border-b">
            <th className="pb-4">Doctor</th>

            <th className="pb-4">Specialization</th>

            <th className="pb-4">Experience</th>

            <th className="pb-4">Email</th>

            <th className="pb-4">Phone</th>

            <th className="pb-4">Status</th>

            <th className="pb-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {doctorsData.map((doctor) => (
            <DoctorRow key={doctor.id} doctor={doctor} />
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-end gap-3 mt-8">
        {/* LEFT */}
        <button className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-cyan-600 hover:text-white transition-all">
          <FaChevronLeft />
        </button>

        {/* PAGES */}
        <button className="w-10 h-10 rounded-lg bg-cyan-600 text-white">
          1
        </button>

        <button className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-cyan-600 hover:text-white transition-all">
          2
        </button>

        <button className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-cyan-600 hover:text-white transition-all">
          3
        </button>

        <span className="text-gray-500">...</span>

        <button className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-cyan-600 hover:text-white transition-all">
          10
        </button>

        {/* RIGHT */}
        <button className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-cyan-600 hover:text-white transition-all">
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default DoctorTable;
