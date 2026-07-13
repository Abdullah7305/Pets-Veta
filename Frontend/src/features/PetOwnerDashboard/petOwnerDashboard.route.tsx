import PetOwnerDashboardPage from "./pages/PetOwnerDashboardPage";
import PetOwnerAppointmentsPage from "./pages/PetOwnerAppointmentsPage";
import { PetOwnerProtectedRoutes } from "@/ProtectedRoutes/PetOwnerProtectedRoutes";
import PetOwnerOrdersPage from "./pages/PetOwnerOrdersPage";

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
  {
    path: "/pet-owner/orders",
    element: (
      <PetOwnerProtectedRoutes>
        <PetOwnerOrdersPage />
      </PetOwnerProtectedRoutes>
    ),
  },
];