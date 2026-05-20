import DoctorSignup from "./pages/doctor-signup";
import LoginPage from "./pages/login";
import ForgotPasswordPage from "./pages/forgot-password";
import VerifyOtpPage from "./pages/verify-otp";
import ResetPasswordPage from "./pages/reset-password";
import PetOwnerSignup from "./pages/pet-owner-signup";
import { AuthSuccess } from "./components/AuthSuccess";



const AuthRouter = [
    {
        path: "/auth-success",
        element: <AuthSuccess />
    },
    {
        path: "/doctor-signup",
        element: <DoctorSignup />,
    },
    {
        path: "/petowner-signup",
        element: <PetOwnerSignup />
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
]

export default AuthRouter;