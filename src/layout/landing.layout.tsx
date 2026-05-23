// import { Outlet } from "react-router-dom";
import Navbar from "../shared/components/Navbar/Navbar";
// import Footer from "../shared/components/Footer/Footer";
import Hero from "../features/Landing Page/components/Hero";
import About from "../features/Landing Page/components/About";
import Services from "../features/Landing Page/components/Services";

const LandingLayout = () => {
    return (
        <>
            <Navbar />
            {/* <Footer />/ */}
            <Hero />
            <About />
            <Services />
        </>
    );
};

export default LandingLayout;