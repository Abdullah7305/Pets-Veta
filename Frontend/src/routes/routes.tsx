import AuthRouter from "../features/Auth/auth.route";
import { createBrowserRouter } from "react-router-dom";
import LandingPageRoutes from "../features/Landing Page/routes";
import Notfound from "../shared/components/Notfound/Notfound";
import { doctorDashboardRoutes } from "../features/Doctor/doctor.route";
import adminRoutes from "../features/Admin/admin.route";
import { doctorAppointmentRoutes } from "../features/Doctorcart/doctorAppointment.route";
import { petsRoutes } from "../features/Pet Owner/pet details/pets.route";
import { marketplaceRoutes } from "@/features/Marketplace/marketplace.route";
import { aiAssistantRoutes } from "@/features/AiAssistance/aiAssistant.route";

const Router = createBrowserRouter([
  ...LandingPageRoutes,
  ...AuthRouter,
  ...doctorAppointmentRoutes,
  ...doctorRoutes,
  ...doctorDashboardRoutes,
  ...adminRoutes,
  ...petsRoutes,
<<<<<<< HEAD
=======
  ...marketplaceRoutes,
  ...aiAssistantRoutes,

>>>>>>> 01a3854942989e8ebbfd1599897a475fe4ed4146
  {
    path: "*",
    element: <Notfound />,
  },
]);

export default Router;