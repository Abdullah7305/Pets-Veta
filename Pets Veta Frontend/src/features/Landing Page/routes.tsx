import LandingPage from "./pages/LandingPage";
import LandingLayout from "../../layout/landing.layout";
import { contactRoutes } from "../Contact/contact.route";
import { aboutRoutes } from "../About/about.route";

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
    ],
  },
];

export default LandingPageRoutes;
