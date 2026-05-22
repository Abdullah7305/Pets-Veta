import { useState, type SetStateAction } from "react";
import { PendingDoctors } from "../../apis/doctorquery.api";

const tabs = [
  { name: "Pending", status: 'pending', id: 1, },
  { name: "Approved", status: 'approved', id: 2 },
  { name: "Rejected", status: 'rejected', id: 3 }
];

const DoctorTabs = () => {

  const [isActive, setActive] = useState<string>('');

  const handlePendingDoctors = async (status: string, name: string) => {
    setActive(name);
    try {
      if (status.toLowerCase() === 'pending') {
        const response = await PendingDoctors();
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      className="
      grid grid-cols-2
      sm:flex
      gap-3
      w-full sm:w-auto
    "
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handlePendingDoctors(tab.status, tab.name)}
          className={`
                   px-5 py-3
                  rounded-xl
                  text-sm font-medium
                  transition-all duration-300
                  cursor-pointer

                ${isActive === tab.name
              ? "bg-cyan-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-cyan-100"
            }
            `}
        >
          {tab.name}
        </button>
      ))}
    </div>
  );
};

export default DoctorTabs;
