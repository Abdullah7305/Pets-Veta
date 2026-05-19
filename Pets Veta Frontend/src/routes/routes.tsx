import { createBrowserRouter } from "react-router-dom";

import AuthRouter from "../features/Auth/auth.route";
import LandingPageRoutes from "../features/Landing Page/routes";
import { servicesRoutes } from "../features/Services";
import { doctorDashboardRoutes } from "../features/DoctorDashboard/doctorDashboard.route";
import adminRoutes from "../features/Admin/admin.route";

import Notfound from "../shared/components/Notfound/Notfound";

const Router = createBrowserRouter([
  ...servicesRoutes,
  ...LandingPageRoutes,
  ...AuthRouter,
  ...doctorDashboardRoutes,
  ...adminRoutes,
  {
    path: "*",
    element: <Notfound />,
  },
]);

export default Router;