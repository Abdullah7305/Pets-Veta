import { createBrowserRouter } from "react-router-dom";
import LandingPageRoutes from "../features/Landing Page/routes";
import { servicesRoutes } from "../features/Services";
import Notfound from "../shared/components/Notfound/Notfound";
import AuthRouter from "../features/Auth/auth.route";
import { doctorDashboardRoutes } from "../features/DoctorDashboard/doctorDashboard.route";

const Router = createBrowserRouter([
  ...servicesRoutes,
  ...LandingPageRoutes,
  ...AuthRouter,
  ...doctorDashboardRoutes,

  {
    path: "*",
    element: <Notfound />,
  },
]);

export default Router;