import ContactHero from "../components/ContactHero";
import ContactInfoCards from "../components/ContactInfoCards";
import ContactForm from "../components/ContactForm";
import ContactHelpCard from "../components/ContactHelpCard";
import ContactTrustBar from "../components/ContactTrustBar";
import ContactCTA from "../components/ContactCTA";

const Contact = () => {
  return (
    <main className="min-h-screen bg-[#FFF8F4] text-[#20263D]">
      <ContactHero />

      <section className="relative z-10 mx-auto -mt-8 max-w-6xl px-5">
        <ContactInfoCards />
      </section>

      <section className="mx-auto grid max-w-6xl gap-7 px-5 py-12 lg:grid-cols-[1.35fr_0.65fr]">
        <ContactForm />
        <ContactHelpCard />
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-8">
        <ContactTrustBar />
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <ContactCTA />
      </section>
    </main>
  );
};

export default Contact;
