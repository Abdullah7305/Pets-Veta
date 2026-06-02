import DoctorProfilePage from "./pages/DoctorProfilePage";
import BookAppointmentPage from "./pages/BookAppointmentPage";

export const doctorRoutes = [
    {
        path: '/doctor-profile/:id',
        element: <DoctorProfilePage />
    },
    {
        path: '/book-appointment/:id',
        element: <BookAppointmentPage />
    }
]
