import LoginPage from "./pages/login";
import ContinueAsPage from "./pages/ContinueAs";
import PetOwnerSignupPage from "./pages/pet-owner-signup";
import DoctorSignupPage from "./pages/doctor-signup";

const AuthRouter = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/continue-as",
    element: <ContinueAsPage />,
  },
  {
    path: "/signup/pet-owner",
    element: <PetOwnerSignupPage />,
  },
  {
    path: "/signup/doctor",
    element: <DoctorSignupPage />,
  },
];

export default AuthRouter;