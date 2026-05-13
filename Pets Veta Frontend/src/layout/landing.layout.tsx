import { Outlet } from "react-router-dom";
import Navbar from "../shared/components/Navbar/Navbar";
import Footer from "../shared/components/Footer/Footer";

const LandingLayout = () => {
    return (
        <>
            <Navbar />
            <main className='pt-28'>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default LandingLayout;