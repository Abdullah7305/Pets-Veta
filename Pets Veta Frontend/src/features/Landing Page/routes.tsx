import Home from "./pages/Home"
import LandingLayout from "../../layout/landing.layout"
import About from "./pages/About"
import Services from "./pages/Services"
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
            {
                path: 'services',
                element: <Services />
            }

        ]
    }
]

export default LandingPageRoutes