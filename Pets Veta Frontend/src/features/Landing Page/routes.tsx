import LandingPage from "./pages/LandingPage"
import LandingLayout from "../../layout/landing.layout"

const LandingPageRoutes = [
    {
        path: '/',
        element: <LandingLayout />,
        children: [
            {
                index: true,
                element: <LandingPage />
            }
        
        ]
    }
]

export default LandingPageRoutes