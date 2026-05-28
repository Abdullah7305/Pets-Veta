import DoctorDashboardPage from "./pages/DoctorDashboardPage";
import DoctorProfilePage from "./pages/DoctorProfilePage";
import { DoctorProtectedRoute } from "@/ProtectedRoutes/DoctorProtectedRoutes";

export const doctorDashboardRoutes = [
  {
    path: "/doctor-dashboard",
    element: (
      <DoctorProtectedRoute>

        <DoctorDashboardPage />

      </DoctorProtectedRoute>
    ),
  },
  {
    path: "/doctor-profile",
    element: <DoctorProfilePage />,
  },
];