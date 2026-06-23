import { FaEnvelopeOpenText } from "react-icons/fa";

const ContactHero = () => {
  return (
    <section className="mt-20 bg-gradient-to-br from-[#f5fbff] via-white to-[#d9f7f6] px-5 py-16 lg:px-16">
      <div className="mx-auto max-w-7xl text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#009f9d] shadow-sm">
          <FaEnvelopeOpenText />
          Contact PetsVeta
        </div>

        <h1 className="mx-auto max-w-4xl text-4xl font-extrabold leading-tight text-[#07182c] md:text-5xl">
          We’re here to help you and your pets.
        </h1>

        <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-600">
          Have questions about appointments, pet care, marketplace products or
          AI assistance? Contact our team anytime.
        </p>
      </div>
    </section>
  );
};

export default ContactHero;
