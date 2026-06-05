import DoctorDashboardPage from "./pages/DoctorDashboardPage";
import DoctorProfilePage from "./pages/DoctorProfilePage";
import { DoctorProtectedRoute } from "@/ProtectedRoutes/DoctorProtectedRoutes";
import DoctorSkill from "./pages/SkillPricing";
import { DoctorLayout } from "./Layout/doctor.layout";
import DoctorAvailabilityPage from "./pages/DoctorAvailabilityPage";
import PatientsPage from "./pages/PatientsPage";

export const doctorDashboardRoutes = [
  {
    path: "/",
    element: (
      <DoctorProtectedRoute>
        <DoctorLayout />
      </DoctorProtectedRoute>
    ),
    children: [
      {
        path: "doctor-dashboard",
        element: <DoctorDashboardPage />,
      },
      {
        path: "doctor-dashboard-profile",
        element: <DoctorProfilePage />,
      },
      {
        path: "doctor-pricing",
        element: <DoctorSkill />,
      },
      {
        path: "doctor-availability",
        element: <DoctorAvailabilityPage />,
      },
      {
        path: "pateints",
        element: <PatientsPage />
      }
    ],
  },
];
