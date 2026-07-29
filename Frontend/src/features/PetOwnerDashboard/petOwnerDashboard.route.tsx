import { Navigate } from "react-router-dom";

import PetOwnerAppointmentsPage from "./pages/PetOwnerAppointmentsPage";
import { PetOwnerProtectedRoutes } from "@/ProtectedRoutes/PetOwnerProtectedRoutes";
import PetOwnerOrdersPage from "./pages/PetOwnerOrdersPage";

export const petOwnerDashboardRoutes = [
  {
    path: "/pet-owner/dashboard",
    element: (
      <PetOwnerProtectedRoutes>
        <Navigate to="/seller/dashboard" replace />
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