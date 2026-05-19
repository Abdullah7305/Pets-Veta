// import { createBrowserRouter } from "react-router-dom";
// import LandingPageRoutes from "../features/Landing Page/routes";
// import { servicesRoutes } from "../features/Services";
// import Notfound from "../shared/components/Notfound/Notfound";

// const Router = createBrowserRouter([
//   ...servicesRoutes,
//   ...LandingPageRoutes,
//   ...AuthRouter,
//   ...doctorDashboardRoutes,
// ...adminRoutes,
//   {
//     path: "*",
//     element: <Notfound />,
//   },

// ]);

// export default Router;
// ------------------------------------------------------------------------------->>>
import AuthRouter from "../features/Auth/auth.route";

<<<<<<< HEAD
=======
import { createBrowserRouter } from "react-router-dom";

import LandingPageRoutes from "../features/Landing Page/routes";

import { servicesRoutes } from "../features/Services";

import Notfound from "../shared/components/Notfound/Notfound";


// import adminRoutes from "../features/Admin/admin.route";
import adminRoutes from "../features/Admin/admin.route";
>>>>>>> 32626ea040f90c60ade6a4abf210ed64fc9596a6

const Router = createBrowserRouter([

  ...AuthRouter,

  ...servicesRoutes,

  ...LandingPageRoutes,

  ...adminRoutes,

  {
    path: "*",
    element: <Notfound />,
  },
]);

export default Router;
