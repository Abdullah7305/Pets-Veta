import DoctorDashboardPage from "./pages/DoctorDashboardPage";
import DoctorProfilePage from "./pages/DoctorProfilePage";

export const doctorDashboardRoutes = [
  {
    path: "/doctor/dashboard",
    element: <DoctorDashboardPage />,
  },
  {
    path: "/doctor/profile",
    element: <DoctorProfilePage />,
  },
];