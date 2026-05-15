import { createBrowserRouter } from "react-router-dom";
import LandingPageRoutes from "../features/Landing Page/routes";
import { servicesRoutes } from "../features/Services";
import Notfound from "../shared/components/Notfound/Notfound";

import DoctorSignup from "../features/Auth/pages/doctor-signup";
import LoginPage from "../features/Auth/pages/login";

const Router = createBrowserRouter([
  // Added Services feature routes so /services opens the Services folder UI.
  ...servicesRoutes,
  ...LandingPageRoutes,
  {
    path: "/doctor-signup",
    element: <DoctorSignup />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <Notfound />,
  },
]);

export default Router;

