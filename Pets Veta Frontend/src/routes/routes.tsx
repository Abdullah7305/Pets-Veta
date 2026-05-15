import { createBrowserRouter } from "react-router-dom";
import LandingPageRoutes from "../features/Landing Page/routes";
import Notfound from "../shared/components/Notfound/Notfound";

import DoctorSignup from "../features/Auth/pages/doctor-signup";
import LoginPage from "../features/Auth/pages/login";
import ForgotPasswordPage from "../features/Auth/pages/forgot-password";
import VerifyOtpPage from "../features/Auth/pages/verify-otp";
import ResetPasswordPage from "../features/Auth/pages/reset-password";

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
    path: "/verify-otp",
    element: <VerifyOtpPage />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
  },
]);

export default Router;
