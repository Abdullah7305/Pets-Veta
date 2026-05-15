import Home from "./pages/Home"
import LandingLayout from "../../layout/landing.layout"
import About from "./pages/About"
import Contact from "./pages/Contact"

const LandingPageRoutes = [
    {
        path: '/',
        element: <LandingLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'contact',
                element: <Contact />
            },
            {
                path: 'about',
                element: <About />
            },
            // Services route is handled by src/features/Services/ServicesRoute.tsx.

        ]
    }
]

export default LandingPageRoutes
