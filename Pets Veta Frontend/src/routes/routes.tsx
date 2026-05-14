import { createBrowserRouter } from "react-router-dom";
import LandingPageRoutes from "../features/Landing Page/routes";
import Notfound from "../shared/components/Notfound/Notfound";

import DoctorSignup from "../features/Auth/pages/doctor-signup";

const Router = createBrowserRouter([
  ...LandingPageRoutes,
  {
    path: "*",
    element: <Notfound />,
  },
  {
    path: "/doctor-signup",
    element: <DoctorSignup />,
  },
]);

export default Router;
