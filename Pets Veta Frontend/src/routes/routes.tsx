import { createBrowserRouter } from "react-router-dom";
import LandingPageRoutes from "../features/Landing Page/routes";
import { servicesRoutes } from "../features/Services";
import Notfound from "../shared/components/Notfound/Notfound";

import DoctorSignup from "../features/Auth/pages/doctor-signup";
import LoginPage from "../features/Auth/pages/login";
import VerifyOtpPage from "../features/Auth/pages/verify-otp";
import ResetPasswordPage from "../features/Auth/pages/reset-password";
import ForgotPasswordPage from "../features/Auth/pages/forgot-page";
import OtpVerifyPage from "../features/Auth/pages/otp-verify";

const Router = createBrowserRouter([
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
  {
    path: "/otp-verify",
    element: <OtpVerifyPage />,
  },
  {
    path: "*",
    element: <Notfound />,
  },
]);

export default Router;