import { useState } from "react";
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
  const [dashboard] = useState<DashboardData>(defaultDashboard);
  const loading = false;
  const { user } = useAuth();

  const statsCards = [
    {
      title: "Today's Appointments",
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
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mb-6 sm:mb-8 lg:mb-10">
        <h1 className="text-2xl font-bold leading-tight text-slate-900 sm:text-3xl lg:text-4xl">
          Welcome back, {user?.data.username || "Doctor"}!
        </h1>
        <p className="mt-2 text-sm text-slate-600 sm:text-base">
          Here's your dashboard overview
        </p>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
        {statsCards.map((item) => (
          <div
            key={item.title}
            className="flex min-h-40 flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-5 lg:p-6"
          >
            <p className="text-sm font-semibold text-slate-500">
              {item.title}
            </p>

            <h3 className={`mt-4 text-3xl font-black sm:text-4xl ${item.color}`}>
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
