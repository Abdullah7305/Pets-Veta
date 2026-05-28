import AdminLoginPage from "./pages/AdminLoginPage";
import AdminLayout from "./layout/AdminLayout";
import AdminDoctorPage from "./pages/AdminDoctorPage";
import { AdminProtectedRoutes } from "@/ProtectedRoutes/AdminProtectedRoutes";


const adminRoutes = [
  {
    path: "/admin-login",
    element: <AdminLoginPage />,
  },

  {
    path: "admin-dashboard",
    element: (
      <AdminProtectedRoutes>

        <AdminLayout />

      </AdminProtectedRoutes>
    ),
    children: [
      {
        index: true,
        element: <AdminDoctorPage />
      }
    ]
  }

];

export default adminRoutes;
