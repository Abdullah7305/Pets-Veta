import type { RouteObject } from "react-router-dom";

import AppointmentPage from "./pages/AppointmentPage";

/**
 * Route(s) exposed by the appointment feature.
 *
 * These are designed to be **nested** under the existing
 * `DoctorDashboardLayout` (sidebar + outlet) so we reuse the dashboard chrome.
 *
 * Final URL when mounted under `/doctor-dashboard`:
 *   /doctor-dashboard/appointment
 */
const AppointmentRoutes: RouteObject[] = [
  {
    path: "appointment",
    element: <AppointmentPage />,
  },
];

export default AppointmentRoutes;
