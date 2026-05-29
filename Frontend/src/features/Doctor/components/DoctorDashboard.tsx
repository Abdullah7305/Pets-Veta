import { useEffect, useState } from "react"
import { type DashboardData } from "../doctor.types";
import { useAuth } from "../../Auth/hooks/authhook";





const defaultDashboard: DashboardData = {
  doctor: {
    name: "Doctor",
    image: "",
  },
  stats: {
    todayAppointments: 0,
    pendingAppointments: 0,
    totalPatients: 0,
    completedToday: 0,
  },
  appointments: [],
};



const DoctorDashboard = () => {

  const [dashboard, setDashboard] = useState<DashboardData>(defaultDashboard);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useAuth();

  const statsCards = [
    {
      title: "Today’s Appointments",
      value: dashboard.stats.todayAppointments,
      color: "text-teal-700",
      badgeColor: "bg-teal-50 text-teal-700",
    },
    {
      title: "Pending Appointments",
      value: dashboard.stats.pendingAppointments,
      color: "text-orange-500",
      badgeColor: "bg-orange-50 text-orange-600",
    },
    {
      title: "Total Patients",
      value: dashboard.stats.totalPatients,
      color: "text-blue-600",
      badgeColor: "bg-blue-50 text-blue-600",
    },
    {
      title: "Completed Today",
      value: dashboard.stats.completedToday,
      color: "text-green-600",
      badgeColor: "bg-green-50 text-green-700",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 p-8">
      {/* Welcome Section */}
      <section className="mb-10">
        <h1 className="text-4xl font-bold text-slate-900">
          Welcome back, {user?.data.username || "Doctor"}! 👋
        </h1>
        <p className="text-slate-600 mt-2">Here's your dashboard overview</p>
      </section>

      {/* Stats Cards Grid - 2 columns */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {statsCards.map((item) => (
          <div
            key={item.title}
            className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <p className="text-sm font-semibold text-slate-500">
              {item.title}
            </p>

            <h3 className={`mt-4 text-4xl font-black ${item.color}`}>
              {item.value}
            </h3>

            <span
              className={`mt-4 inline-flex w-fit rounded-full px-3 py-1 text-xs font-bold ${item.badgeColor}`}
            >
              {loading ? "Updating..." : "Updated"}
            </span>
          </div>
        ))}
      </section>
    </main>
  );
};



export default DoctorDashboard;