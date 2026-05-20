import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";

const adminRoutes = [
  {
    path: "admin-dashboard",
    element: <AdminDashboardPage />,
  },
  {
    path: "/admin-login",
    element: <AdminLoginPage />,
  },
];

export default adminRoutes;
