import AuthRouter from "../features/Auth/auth.route";
import { createBrowserRouter } from "react-router-dom";
import LandingPageRoutes from "../features/Landing Page/routes";
import Notfound from "../shared/components/Notfound/Notfound";
import { doctorDashboardRoutes } from "../features/Doctor/doctor.route";
import { doctorRoutes } from "../features/Appointment/appointment.routes";
import adminRoutes from "../features/Admin/admin.route";
import { doctorAppointmentRoutes } from "../features/Doctorcart/doctorAppointment.route";
import { petsRoutes } from "../features/Pet Owner/pet details/pets.route";
import { marketplaceRoutes } from "@/features/Marketplace/marketplace.route";
import { aiAssistantRoutes } from "@/features/AiAssistance/aiAssistant.route";
import { selectPetRoutes } from "@/features/Pet Owner/SelectPet/selectPet.route";
import { petProfileRoutes } from "@/features/Pet Owner/pet profile/petProfile.route";
import { petOwnerDashboardRoutes } from "@/features/PetOwnerDashboard/petOwnerDashboard.route";

// 1. Import your newly defined paymentRoutes
import { paymentRoutes } from "../features/Payment/payment.routes";

const Router = createBrowserRouter([
  ...LandingPageRoutes,
  ...AuthRouter,
  ...doctorAppointmentRoutes,
  ...doctorRoutes,
  ...doctorDashboardRoutes,
  ...adminRoutes,
  ...petsRoutes,
  ...marketplaceRoutes,
  ...aiAssistantRoutes,
  ...selectPetRoutes,
  ...petProfileRoutes,
  ...petOwnerDashboardRoutes,

  // 2. Inject the payment routes into the master collection
  ...paymentRoutes,

  {
    path: "*",
    element: <Notfound />,
  },
]);

export default Router;