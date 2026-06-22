import AuthRouter from "../features/Auth/auth.route";
import { createBrowserRouter } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import LandingPageRoutes from "../features/Landing Page/routes";
import DashboardHomeMenu from "@/features/Landing Page/components/DashboardHomeMenu";
import Notfound from "../shared/components/Notfound/Notfound";
import { doctorDashboardRoutes } from "../features/Doctor/doctor.route";
import { doctorRoutes } from "../features/Appointment/appointment.routes";
import adminRoutes from "../features/Admin/admin.route";
import { doctorAppointmentRoutes } from "../features/Doctorcart/doctorAppointment.route";
import { petsRoutes } from "../features/Pet Owner/pet details/pets.route";
import { aiAssistantRoutes } from "@/features/AiAssistance/aiAssistant.route";
import { selectPetRoutes } from "@/features/Pet Owner/SelectPet/selectPet.route";
import { petProfileRoutes } from "@/features/Pet Owner/pet profile/petProfile.route";
import { petOwnerDashboardRoutes } from "@/features/PetOwnerDashboard/petOwnerDashboard.route";
import { sellerRoutes } from "@/features/seller/seller.routes";
import { marketplaceRoutes } from "@/features/marketplace1/marketplace.routes";
import { cartRoutes } from "@/features/cart/cart.routes";
import { paymentRoutes } from "@/features/Payment/payment.routes";

const withDashboardMenu = (routes: RouteObject[]): RouteObject[] =>
  routes.map((route) => ({
    ...route,
    element: (
      <>
        {route.element}
        <DashboardHomeMenu />
      </>
    ),
  }));

const Router = createBrowserRouter([
  ...LandingPageRoutes,
  ...AuthRouter,
  ...doctorAppointmentRoutes,
  ...doctorRoutes,
  ...doctorDashboardRoutes,
  ...adminRoutes,
  ...withDashboardMenu(petsRoutes),
  // ...marketplaceRoutes,
  ...paymentRoutes,
  ...aiAssistantRoutes,
  ...selectPetRoutes,
  ...petProfileRoutes,
  ...petOwnerDashboardRoutes,
  ...sellerRoutes,
  ...marketplaceRoutes,
  ...cartRoutes,
  ...withDashboardMenu(selectPetRoutes),
  ...withDashboardMenu(petProfileRoutes),
  ...withDashboardMenu(petOwnerDashboardRoutes),
  ...withDashboardMenu(sellerRoutes),
  ...withDashboardMenu(marketplaceRoutes),
  ...withDashboardMenu(cartRoutes),
  {
    path: "*",
    element: <Notfound />,
  },
]);

export default Router;
