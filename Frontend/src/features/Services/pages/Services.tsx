import Navbar from "../../../shared/components/Navbar/Navbar";

import Banner from "../components/Banner";
import FindDoctor from "../components/FindDoctor";
import ServiceCards from "../components/ServiceCards";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import Newsletter from "../components/Newsletter";

const Services = () => {
  return (
    <>
      <Navbar />

      <main className="bg-[#eeeeee]">
        <Banner />
        <FindDoctor />
        <ServiceCards />
        <Testimonials />
        <FAQ />
        <Newsletter />
      </main>
    </>
  );
};

export default Services;
