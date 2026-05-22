import SearchBar from "../../../shared/components/SearchBar/SearchBar";
import StatsCard from "../components/cards/StatsCard";
import DoctorTabs from "../components/doctors/DoctorTabs";
import DoctorTable from "../components/doctors/DoctorTable";
import { statsData } from "../data/stats.data";


const AdminDoctorPage = () => {
  return (

    <>
      <div className="flex flex-col  items-center mt-2  gap-5">

        <h1 className="text-4xl font-bold text-blue-600">Dashboard</h1>

        <p className="text-gray-500 mt-2">Welcome back Admin</p>


      </div>


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


      <div className="bg-white rounded-2xl p-6 mt-10 shadow-sm">
        {/* TOP */}
        <div
          className="
              flex flex-col xl:flex-row
              xl:items-center
              justify-between
              gap-5
              mt-8"
        >
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Doctors List</h2>

            <p className="text-gray-500 mt-1">Manage all doctors here</p>
          </div>
        </div>


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


          <div
            className="flex flex-col md:flex-row gap-3 md:w-auto "
          >
            <SearchBar />

          </div>
        </div>

        <DoctorTable />
      </div>
    </>
  );
};

export default AdminDoctorPage;
