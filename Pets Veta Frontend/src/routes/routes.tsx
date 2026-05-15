import { createBrowserRouter } from "react-router-dom";
import LandingPageRoutes from "../features/Landing Page/routes";
import Notfound from "../shared/components/Notfound/Notfound";

import DoctorSignup from "../features/Auth/pages/doctor-signup";
import LoginPage from "../features/Auth/pages/login";
import ForgotPasswordPage from "../features/Auth/pages/forgot-page";
import OtpVerifyPage from "../features/Auth/pages/otp-verify";

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
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/otp-verify",
    element: <OtpVerifyPage />,
  },
]);

export default Router;

