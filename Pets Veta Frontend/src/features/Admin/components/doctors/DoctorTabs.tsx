// const tabs = ["All Doctors", "Pending", "Approved", "Rejected"];

// const DoctorTabs = () => {
//   return (
//     <div className="flex gap-3 mt-8">
//       {tabs.map((tab) => (
//         <button
//           key={tab}
//           className="px-5 py-2 rounded-xl bg-white hover:bg-cyan-600 hover:text-white transition-all"
//         >
//           {tab}
//         </button>
//       ))}

//     </div>
//   );
// };

// export default DoctorTabs;
const tabs = ["All Doctors", "Pending", "Approved", "Rejected"];

const DoctorTabs = () => {
  return (
    <div className="flex items-center gap-3">
      {tabs.map((tab, index) => (
        <button
          key={tab}
          className={`px-5 py-3 rounded-xl transition-all font-medium

          ${
            index === 0 ? "bg-cyan-600 text-white" : "bg-gray-100 text-gray-600"
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
