import { Link } from "react-router-dom";
import Button from "../../../shared/components/Button";

const AboutCTA = () => {
  return (
    <section className="bg-white px-5 pb-16 lg:px-16">
      <div className="mx-auto max-w-7xl rounded-[36px] bg-gradient-to-br from-[#bdf0ee] via-[#f5fbff] to-[#fff3ec] p-8 text-center shadow-[0_18px_50px_rgba(15,23,42,0.10)] md:p-12">
        <h2 className="text-3xl font-extrabold text-[#07182c] md:text-4xl">
          Ready to care better for your pet?
        </h2>

        <p className="mx-auto mt-3 max-w-2xl leading-7 text-slate-600">
          Explore verified doctors, book appointments and get smart assistance
          for your pet’s health.
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-4">
          <Link to="/doctors">
            <Button>Find Doctors</Button>
          </Link>

          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl border border-[#009f9d] px-5 py-3 text-sm font-bold text-[#009f9d] transition hover:bg-[#eefafa]"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutCTA;