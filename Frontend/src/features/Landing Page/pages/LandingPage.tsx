import { Banner } from "../components/Banner"
import About from "../components/About"
import Popular from "../components/Popular"
import Services from "../components/Services"
import CTA from "../components/CTA"
import Testimonials from "../components/Testimonials"
import ChooseUs from "../components/ChooseUs"
import AIAssistant from "../components/AIAssistance"
import TopRatedDoctors from "../components/TopDoctor"

const LandingPage = () => {
    return (
        <>
            <Banner />
            <About />
            <Services />
            <Popular />
            <TopRatedDoctors />
            <AIAssistant />
            <ChooseUs />
            <Testimonials />
            <CTA />
        </>
    )
}

export default LandingPage;