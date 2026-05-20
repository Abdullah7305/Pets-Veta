import {
  CalendarDays,
  ClipboardList,
  Home,
  LogOut,
  Menu,
  Settings,
  Star,
  User,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import DoctorProfileButton from "./DoctorProfileButton";

type AppointmentStatus = "Confirmed" | "Pending" | "Completed" | "Cancelled";

type Doctor = {
  name: string;
  image?: string;
};

type DashboardStats = {
  todayAppointments: number;
  pendingAppointments: number;
  totalPatients: number;
  completedToday: number;
};

type Appointment = {
  id: string | number;
  time: string;
  petName: string;
  petType: string;
  ownerName: string;
  purpose: string;
  status: AppointmentStatus;
};

type DashboardData = {
  doctor: Doctor;
  stats: DashboardStats;
  appointments: Appointment[];
};

const API_URL = "http://localhost:3000/api/doctor/dashboard";

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

const sidebarLinks = [
  { id: 1, label: "Dashboard", icon: Home, active: true },
  { id: 2, label: "Appointments", icon: CalendarDays, active: false },
  { id: 3, label: "Patients", icon: Users, active: false },
  { id: 4, label: "Availability", icon: CalendarDays, active: false },
  { id: 5, label: "Prescriptions", icon: ClipboardList, active: false },
  { id: 6, label: "Reviews", icon: Star, active: false },
  { id: 7, label: "Profile", icon: User, active: false },
  { id: 8, label: "Settings", icon: Settings, active: false },
];

const DoctorDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dashboard, setDashboard] = useState<DashboardData>(defaultDashboard);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("doctorToken");

        if (!token) {
          setError("Doctor token not found. Please login again.");
          return;
        }

        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data.");
        }

        const data: DashboardData = await response.json();
        setDashboard(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

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
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {sidebarOpen && (
        <button
          type="button"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/40 lg:hidden"
          aria-label="Close sidebar"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-72 border-r border-slate-200 bg-white transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-2xl">
              🐾
            </div>
            <h1 className="text-2xl font-black text-slate-900">PawCare</h1>
          </div>

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="space-y-2 px-4 py-5">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;

            return (
              <button
                type="button"
                key={link.id}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                  link.active
                    ? "bg-teal-700 text-white shadow-md shadow-teal-700/20"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Icon size={19} />
                {link.label}
              </button>
            );
          })}

          <div className="pt-8">
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-red-500 transition hover:bg-red-50"
            >
              <LogOut size={19} />
              Logout
            </button>
          </div>
        </nav>
      </aside>

      <section className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 hover:bg-slate-100 lg:hidden"
            >
              <Menu size={22} />
            </button>

            <button
              type="button"
              className="hidden rounded-xl p-2.5 text-slate-500 hover:bg-slate-100 lg:block"
            >
              <Menu size={24} />
            </button>

            <div className="flex items-center gap-4">
              <div className="hidden text-right sm:block">
                <p className="text-xs font-medium text-slate-500">
                  Welcome back,
                </p>
                <h2 className="text-sm font-black text-slate-900">
                  {dashboard.doctor.name}
                </h2>
              </div>

              <DoctorProfileButton
                name={dashboard.doctor.name}
                image={dashboard.doctor.image}
              />
            </div>
          </div>
        </header>

        <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="mb-6">
            <h1 className="text-2xl font-black text-slate-900">
              Doctor Dashboard
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage appointments, patients and availability.
            </p>

            {error && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                {error}
              </div>
            )}
          </div>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {statsCards.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <p className="text-sm font-semibold text-slate-500">
                  {item.title}
                </p>

                <h3 className={`mt-4 text-4xl font-black ${item.color}`}>
                  {item.value}
                </h3>

                <span
                  className={`mt-4 inline-flex rounded-full px-3 py-1 text-xs font-bold ${item.badgeColor}`}
                >
                  {loading ? "Updating..." : "Updated"}
                </span>
              </div>
            ))}
          </section>

          <section className="mt-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
              <h2 className="text-xl font-black text-slate-900">
                Today’s Appointments
              </h2>
            </div>

            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-195 text-left">
                <thead className="bg-slate-50 text-sm text-slate-500">
                  <tr>
                    <th className="px-6 py-4 font-bold">Time</th>
                    <th className="px-6 py-4 font-bold">Pet</th>
                    <th className="px-6 py-4 font-bold">Owner</th>
                    <th className="px-6 py-4 font-bold">Purpose</th>
                    <th className="px-6 py-4 font-bold">Status</th>
                    <th className="px-6 py-4 font-bold">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {dashboard.appointments.length > 0 ? (
                    dashboard.appointments.map((appointment) => (
                      <tr
                        key={appointment.id}
                        className="text-sm transition hover:bg-slate-50"
                      >
                        <td className="px-6 py-5 font-semibold text-slate-700">
                          {appointment.time}
                        </td>

                        <td className="px-6 py-5">
                          <p className="font-black text-teal-700">
                            {appointment.petName}
                          </p>
                          <p className="text-xs font-medium text-slate-500">
                            {appointment.petType}
                          </p>
                        </td>

                        <td className="px-6 py-5 font-semibold text-slate-700">
                          {appointment.ownerName}
                        </td>

                        <td className="px-6 py-5 font-semibold text-slate-700">
                          {appointment.purpose}
                        </td>

                        <td className="px-6 py-5">
                          <StatusBadge status={appointment.status} />
                        </td>

                        <td className="px-6 py-5">
                          <button
                            type="button"
                            className="text-sm font-black text-teal-700 hover:text-teal-800"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-12 text-center text-sm font-semibold text-slate-500"
                      >
                        {loading
                          ? "Loading appointments..."
                          : "No appointments found"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="space-y-4 p-4 md:hidden">
              {dashboard.appointments.length > 0 ? (
                dashboard.appointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-black text-teal-700">
                          {appointment.petName}
                        </h3>
                        <p className="text-xs font-medium text-slate-500">
                          {appointment.petType}
                        </p>
                      </div>

                      <StatusBadge status={appointment.status} />
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-xs font-semibold text-slate-400">
                          Time
                        </p>
                        <p className="mt-1 font-bold text-slate-700">
                          {appointment.time}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-slate-400">
                          Owner
                        </p>
                        <p className="mt-1 font-bold text-slate-700">
                          {appointment.ownerName}
                        </p>
                      </div>

                      <div className="col-span-2">
                        <p className="text-xs font-semibold text-slate-400">
                          Purpose
                        </p>
                        <p className="mt-1 font-bold text-slate-700">
                          {appointment.purpose}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="mt-4 w-full rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-teal-800"
                    >
                      View Details
                    </button>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm font-semibold text-slate-500">
                  {loading ? "Loading appointments..." : "No appointments found"}
                </div>
              )}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
};

const StatusBadge = ({ status }: { status: AppointmentStatus }) => {
  const styles: Record<AppointmentStatus, string> = {
    Confirmed: "bg-green-50 text-green-700",
    Pending: "bg-orange-50 text-orange-600",
    Completed: "bg-blue-50 text-blue-700",
    Cancelled: "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`inline-flex rounded-xl px-4 py-2 text-xs font-black ${styles[status]}`}
    >
      {status}
    </span>
  );
};

export default DoctorDashboard;