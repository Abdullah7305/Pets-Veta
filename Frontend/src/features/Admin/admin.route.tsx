import AdminLoginPage from "./pages/AdminLoginPage";
import AdminLayout from "./layout/AdminLayout";
import AdminDoctorPage from "./pages/AdminDoctorPage";

const adminRoutes = [
  {
    path: "admin-dashboard",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminDoctorPage />
      }
    ]
  },
  {
    path: "/admin-login",
    element: <AdminLoginPage />,
  },
];

export default adminRoutes;
