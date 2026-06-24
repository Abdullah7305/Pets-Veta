import PetOwnerDashboardPage from "./pages/PetOwnerDashboardPage";
import PetOwnerAppointmentsPage from "./pages/PetOwnerAppointmentsPage";
import { PetOwnerProtectedRoutes } from "@/ProtectedRoutes/PetOwnerProtectedRoutes"; 

export const petOwnerDashboardRoutes = [
  {
    path: "/pet-owner/dashboard",
    element: (
      <PetOwnerProtectedRoutes>
        <PetOwnerDashboardPage />
      </PetOwnerProtectedRoutes>
    ),
  },
  {
    path: "/pet-owner/appointments",
    element: (
      <PetOwnerProtectedRoutes>
        <PetOwnerAppointmentsPage />
      </PetOwnerProtectedRoutes>
    ),
  },
];