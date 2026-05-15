import { createBrowserRouter } from "react-router-dom";
import LandingPageRoutes from "../features/Landing Page/routes";
import Notfound from "../shared/components/Notfound/Notfound";

import DoctorSignup from "../features/Auth/pages/doctor-signup";
import LoginPage from "../features/Auth/pages/login";
<<<<<<< HEAD
import ForgotPasswordPage from "../features/Auth/pages/forgot-password";
import VerifyOtpPage from "../features/Auth/pages/verify-otp";
import ResetPasswordPage from "../features/Auth/pages/reset-password";
=======
import ForgotPasswordPage from "../features/Auth/pages/forgot-page";
import OtpVerifyPage from "../features/Auth/pages/otp-verify";
>>>>>>> 0d8d88fbfda6d674d57c1ddca8c125b17accd528

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
<<<<<<< HEAD
    path: "/verify-otp",
    element: <VerifyOtpPage />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
=======
    path: "/otp-verify",
    element: <OtpVerifyPage />,
>>>>>>> 0d8d88fbfda6d674d57c1ddca8c125b17accd528
  },
]);

export default Router;
