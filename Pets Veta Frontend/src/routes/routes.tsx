import { createBrowserRouter } from "react-router-dom";
import LandingPageRoutes from "../features/Landing Page/routes";
import Notfound from "../shared/components/Notfound";

const Router = createBrowserRouter([
    ...LandingPageRoutes,
    {
        path: '*',
        element: <Notfound/>
    }

])

export default Router;