import { createBrowserRouter } from "react-router-dom";

import LandingPageRoutes from "../features/Landing Page/routes";
import AuthRoutes from "../features/Auth/routes";
import DoctorDashboardRoutes from "../features/DoctorDashboard/routes";
import Notfound from "../shared/components/Notfound/Notfound";

const Router = createBrowserRouter([
  ...LandingPageRoutes,
  ...AuthRoutes,
  ...DoctorDashboardRoutes,
  {
    path: "*",
    element: <Notfound />,
  },
]);

export default Router;