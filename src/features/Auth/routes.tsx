import Login from "./pages/login"
import DoctorSignup from "./pages/doctor-signup"
import PetOwnerSignup from "./pages/pet-owner-signup"
import ForgotPage from "./pages/forgot-page"
// import OtpVerify from "./pages/otp-verify"
// import ResetPassword from "./pages/reset-password"

const AuthRoutes = [
    {
        path: 'login',
        element: <Login />
    },
    {
        path: 'doctor-signup',
        element: <DoctorSignup />
    },
    {
        path: 'pet-owner-signup',
        element: <PetOwnerSignup />
    },
    {
        path: 'forgot-password',
        element: <ForgotPage />
    },
//     {
//         path: 'otp-verify',
//         element: <OtpVerify />
//     },
//     {
//         path: 'reset-password',
//         element: <ResetPassword />
//     }
 ]

export default AuthRoutes