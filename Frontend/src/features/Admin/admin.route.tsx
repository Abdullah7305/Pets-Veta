import AdminLoginPage from "./pages/AdminLoginPage";
import AdminLayout from "./layout/AdminLayout";
import AdminDoctorPage from "./pages/AdminDoctorPage";


import DoctorRequestsPage from "./pages/DoctorRequestsPage";
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

   {
    path: "/admin/doctors",
    element: <DoctorRequestsPage />,
  },

];

export default adminRoutes;
