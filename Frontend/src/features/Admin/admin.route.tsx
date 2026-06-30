import AdminLoginPage from "./pages/AdminLoginPage";
import AdminLayout from "./layout/AdminLayout";
import AdminDoctorPage from "./pages/AdminDoctorPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
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
      },
      {
        path: "orders",
        element: <AdminOrdersPage />
      }
    ]
  }

];

export default adminRoutes;
