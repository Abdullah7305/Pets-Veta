import LandingPage from "./pages/LandingPage";
import LandingLayout from "../../layout/landing.layout";
import type { RouteObject } from "react-router-dom";

import { contactRoutes } from "../Contact/contact.route";
import { aboutRoutes } from "../About/about.route";
import servicesRoutes from "../Services/service.route";
import { marketplaceRoutes } from "../marketplace1/marketplace.routes";
import { aiAssistantRoutes } from "../AiAssistance/aiAssistant.route";
import DashboardHomeMenu from "./components/DashboardHomeMenu";

const withDashboardMenu = (routes: RouteObject[]): RouteObject[] =>
  routes.map((route) => ({
    ...route,
    element: (
      <>
        {route.element}
        <DashboardHomeMenu />
      </>
    ),
  }));

const LandingPageRoutes = [
  {
    path: "/",
    element: <LandingLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },

      ...aboutRoutes,
      ...contactRoutes,
      ...servicesRoutes,
      ...withDashboardMenu(marketplaceRoutes),
      ...aiAssistantRoutes,
    ],
  },
];

export default LandingPageRoutes;
