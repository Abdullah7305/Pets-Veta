import AuthRouter from "../features/Auth/auth.route";
import { createBrowserRouter } from "react-router-dom";
import LandingPageRoutes from "../features/Landing Page/routes";
import { servicesRoutes } from "../features/Services";
import Notfound from "../shared/components/Notfound/Notfound";
import { doctorDashboardRoutes } from "../features/Doctor/doctor.route";
import adminRoutes from "../features/Admin/admin.route";
import { doctorAppointmentRoutes } from "../features/Doctorcart/doctorAppointment.route";


const Router = createBrowserRouter([
  ...servicesRoutes,
  ...LandingPageRoutes,
  ...AuthRouter,
  ...doctorDashboardRoutes,
  ...adminRoutes,
  ...doctorAppointmentRoutes,
  {
    path: "*",
    element: <Notfound />,
  },

]);

export default Router;
