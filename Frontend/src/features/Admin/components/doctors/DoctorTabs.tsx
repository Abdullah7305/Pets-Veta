// const tabs = ["All Doctors", "Pending", "Approved", "Rejected"];

// const DoctorTabs = () => {
//   return (
//     <div className="flex items-center gap-3">
//       {tabs.map((tab, index) => (
//         <button
//           key={tab}
//           className={`px-5 py-3 rounded-xl transition-all font-medium

//           ${
//             index === 0 ? "bg-cyan-600 text-white" : "bg-gray-100 text-gray-600"
//           }
//           `}
//         >
//           {tab}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default DoctorTabs;

const tabs = ["All Doctor", "Pending", "Approved", "Rejected"];

const DoctorTabs = () => {
  return (
    <div
      className="
      grid grid-cols-2
      sm:flex
      gap-3
      w-full sm:w-auto
    "
    >
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`
            px-5 py-3
            rounded-xl
            text-sm font-medium
            transition-all duration-300

            ${
              index === 0
                ? "bg-cyan-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-cyan-100"
            }
          `}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default DoctorTabs;
