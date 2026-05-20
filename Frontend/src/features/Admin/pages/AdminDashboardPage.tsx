import { FaFilter } from "react-icons/fa";

import AdminLayout from "../layout/AdminLayout";

import StatsCard from "../components/cards/StatsCard";

import DoctorTabs from "../components/doctors/DoctorTabs";

import DoctorTable from "../components/doctors/DoctorTable";

import { statsData } from "../data/stats.data";

import SearchBar from "../../../shared/components/SearchBar/SearchBar";

const AdminDashboardPage = () => {
  return (
    <AdminLayout>
      {/* TOP SECTION */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>

          <p className="text-gray-500 mt-2">Welcome back Admin</p>
        </div>

        {/* DATE PICKER */}
        <div className="flex flex-col items-end">
          <p className="text-sm text-gray-500 mb-2">Select Date</p>

          <input
            type="date"
            className="bg-white border border-gray-200 px-4 py-3 rounded-xl outline-none shadow-sm"
          />
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">
        {statsData.map((item) => (
          <StatsCard
            key={item.id}
            title={item.title}
            total={item.total}
            subtitle={item.subtitle}
            color={item.color}
            icon={item.icon}
          />
        ))}
      </div>

      {/* DOCTOR SECTION */}
      <div className="bg-white rounded-2xl p-6 mt-10 shadow-sm">
        {/* TOP */}
        <div
          className="
  flex flex-col xl:flex-row
  xl:items-center
  justify-between
  gap-5
  mt-8
"
        >
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Doctors List</h2>

            <p className="text-gray-500 mt-1">Manage all doctors here</p>
          </div>
        </div>

        {/* TABS + SEARCH */}
        {/* <div className="flex items-center justify-between mt-8"> */}
        <div
          className="
  flex flex-col xl:flex-row
  xl:items-center
  justify-between
  gap-5
  mt-8
"
        >
          <DoctorTabs />

          {/* <div className="flex items-center gap-3"> */}
          <div
            className="
  flex flex-col md:flex-row
  gap-3
  w-full md:w-auto
"
          >
            <SearchBar />

            <button className="bg-cyan-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 shadow-sm">
              <FaFilter />
              Filter
            </button>
          </div>
        </div>

        {/* TABLE */}
        <DoctorTable />
      </div>
    </AdminLayout>
  );
};

export default AdminDashboardPage;
