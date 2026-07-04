import type { RouteObject } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LandingLayout from "../../layout/landing.layout";

import { contactRoutes } from "../Contact/contact.route";
import { aboutRoutes } from "../About/about.route";
import servicesRoutes from "../Services/service.route";
import { marketplaceRoutes } from "../marketplace1/marketplace.routes";
import { aiAssistantRoutes } from "../AiAssistance/aiAssistant.route";

const LandingPageRoutes: RouteObject[] = [
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
      ...marketplaceRoutes,
      ...aiAssistantRoutes,
    ],
  },
];

export default LandingPageRoutes;