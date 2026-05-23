import DoctorDashboardLayout from "./components/DoctorDashboardLayout";
import DoctorDashboard from "./pages/DoctorDashboard";
import DoctorProfile from "./pages/DoctorProfile";

import AppointmentRoutes from "../appointment/routes";

const DoctorDashboardRoutes = [
  {
    path: "/doctor-dashboard",
    element: <DoctorDashboardLayout />,
    children: [
      {
        index: true,
        element: <DoctorDashboard />,
      },
      {
        path: "profile",
        element: <DoctorProfile />,
      },

      // ── Appointment feature ──
      // Nested so the sidebar/header layout is reused.
      // Final URL: /doctor-dashboard/appointment
      ...AppointmentRoutes,
    ],
  },
];

export default DoctorDashboardRoutes;
