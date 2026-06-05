import LandingPage from "./pages/LandingPage";
import LandingLayout from "../../layout/landing.layout";

import { contactRoutes } from "../Contact/contact.route";
import { aboutRoutes } from "../About/about.route";
import servicesRoutes from "../Services/service.route";
import { marketplaceRoutes } from "../Marketplace/marketplace.route";
import { aiAssistantRoutes } from "../AiAssistance/aiAssistant.route";

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
      ...marketplaceRoutes,
      ...aiAssistantRoutes,
    ],
  },
];

export default LandingPageRoutes;