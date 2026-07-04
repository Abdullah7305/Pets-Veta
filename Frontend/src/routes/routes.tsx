import { createBrowserRouter } from "react-router-dom";

import AuthRouter from "../features/Auth/auth.route";
import LandingPageRoutes from "../features/Landing Page/routes";
import Notfound from "../shared/components/Notfound/Notfound";

import { doctorDashboardRoutes } from "../features/Doctor/doctor.route";
import { doctorRoutes } from "../features/Appointment/appointment.routes";
import adminRoutes from "../features/Admin/admin.route";
import { doctorAppointmentRoutes } from "../features/Doctorcart/doctorAppointment.route";
import { petsRoutes } from "../features/Pet Owner/pet details/pets.route";
import { selectPetRoutes } from "@/features/Pet Owner/SelectPet/selectPet.route";
import { petProfileRoutes } from "@/features/Pet Owner/pet profile/petProfile.route";
import { petOwnerDashboardRoutes } from "@/features/PetOwnerDashboard/petOwnerDashboard.route";
import { sellerRoutes } from "@/features/seller/seller.routes";
import { cartRoutes } from "@/features/cart/cart.routes";
import { paymentRoutes } from "@/features/Payment/payment.routes";
import { messageRoutes } from "@/features/messages/messages.routes";

const Router = createBrowserRouter([
  ...LandingPageRoutes,
  ...AuthRouter,

  ...doctorAppointmentRoutes,
  ...doctorRoutes,
  ...doctorDashboardRoutes,
  ...adminRoutes,

  ...petsRoutes,
  ...paymentRoutes,
  ...selectPetRoutes,
  ...petProfileRoutes,
  ...petOwnerDashboardRoutes,

  ...sellerRoutes,
  ...cartRoutes,
  ...messageRoutes,

  {
    path: "*",
    element: <Notfound />,
  },
]);

export default Router;