import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";

const adminRoutes = [
  {
    path: "admin-dashbaord",
    element: <AdminDashboardPage />,
  },
  {
    path: "/admin-login",
    element: <AdminLoginPage />,
  },
];

export default adminRoutes;
