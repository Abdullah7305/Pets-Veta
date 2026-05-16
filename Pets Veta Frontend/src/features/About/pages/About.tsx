import AboutHero from "../components/AboutHero";
import AboutIntro from "../components/AboutIntro";
import AboutStats from "../components/AboutStats";
import AboutSteps from "../components/AboutSteps";
import AboutWhyChoose from "../components/AboutWhyChoose";
import AboutCTA from "../components/AboutCTA";

const About = () => {
  return (
    <main className="min-h-screen bg-[#FFF8F4] text-[#20263D]">
      <AboutHero />
      <AboutIntro />
      <AboutStats />
      <AboutSteps />
      <AboutWhyChoose />
      <AboutCTA />
    </main>
  );
};

export default About;
