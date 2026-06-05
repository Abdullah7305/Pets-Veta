import FindDoctorPage from "./pages/FindDoctorPage";
import DoctorProfilePage from "./pages/DoctorProfilePage";
import EditDoctorProfilePage from "./pages/EditDoctorProfilePage";

export const doctorAppointmentRoutes = [
  {
    path: "/doctors",
    element: <FindDoctorPage />,
  },
  {
    path: "/doctor-profile",
    element: <DoctorProfilePage />,
  },
  {
    path: "/doctor-profile/edit",
    element: <EditDoctorProfilePage />,
  },
  {
    path: "/doctors/:doctorId",
    element: <DoctorProfilePage />,
  },
];