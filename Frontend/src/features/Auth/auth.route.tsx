import LoginPage from "./pages/login";
import ContinueAs from "./pages/ContinueAs";
import PetOwnerSignupPage from "./pages/pet-owner-signup";
import DoctorSignupPage from "./pages/doctor-signup";

const AuthRouter = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/continue-as",
    element: <ContinueAs />,
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