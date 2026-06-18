import DoctorProfilePage from "./pages/DoctorProfilePage";
import BookAppointmentPage from "./pages/BookAppointmentPage";
import { ProtectedRoutes } from "../../ProtectedRoutes/ProtectedRoutes";

export const doctorRoutes = [
    {
        path: '/doctor-profile/:id',
        element: <DoctorProfilePage />
    },
    {
        path: '/book-appointment',
        element: (
            <ProtectedRoutes>
                <BookAppointmentPage />
            </ProtectedRoutes>
        )
    }
]
