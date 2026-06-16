import AuthRouter from "../features/Auth/auth.route";
import { createBrowserRouter } from "react-router-dom";
import LandingPageRoutes from "../features/Landing Page/routes";
import Notfound from "../shared/components/Notfound/Notfound";
import { doctorDashboardRoutes } from "../features/Doctor/doctor.route";
import { doctorRoutes } from "../features/Appointment/appointment.routes";
import adminRoutes from "../features/Admin/admin.route";
import { doctorAppointmentRoutes } from "../features/Doctorcart/doctorAppointment.route";
import { petsRoutes } from "../features/Pet Owner/pet details/pets.route";
// import { marketplaceRoutes } from "@/features/Marketplace/marketplace.route";
import { aiAssistantRoutes } from "@/features/AiAssistance/aiAssistant.route";
// import { paymentRoutes } from "@/features/Payment/payment.routes";
import { selectPetRoutes } from "@/features/Pet Owner/SelectPet/selectPet.route";
import { petProfileRoutes } from "@/features/Pet Owner/pet profile/petProfile.route";
import { petOwnerDashboardRoutes } from "@/features/PetOwnerDashboard/petOwnerDashboard.route";
import { sellerRoutes } from "@/features/seller/seller.routes";
import { marketplaceRoutes } from "@/features/marketplace1/marketplace.routes";
const Router = createBrowserRouter([
  ...LandingPageRoutes,
  ...AuthRouter,
  ...doctorAppointmentRoutes,
  ...doctorRoutes,
  ...doctorDashboardRoutes,
  ...adminRoutes,
  ...petsRoutes,
  // ...marketplaceRoutes,
  ...aiAssistantRoutes,
    ...selectPetRoutes,
    ...petProfileRoutes,
    ...petOwnerDashboardRoutes,
     ...sellerRoutes,
      ...marketplaceRoutes,
  {
    path: "*",
    element: <Notfound />,
  },
]);

export default Router;