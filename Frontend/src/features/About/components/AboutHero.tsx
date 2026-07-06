import { FaShieldAlt, FaUserMd } from "react-icons/fa";

const AboutHero = () => {
  return (
    <section className="mt-20 bg-gradient-to-br from-[#f5fbff] via-white to-[#d9f7f6] px-5 py-16 lg:px-16">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
        <div>

          <h1 className="text-4xl font-extrabold leading-tight text-[#07182c] md:text-5xl">
            Trusted pet care, marketplace and veterinary support in one place.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
            PetsVeta is designed to help pet owners find verified doctors,
            quality pet products, reliable services and smart AI assistance for
            better pet care.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <span className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-[#07182c] shadow-sm">
              <FaShieldAlt className="text-[#009f9d]" />
              Verified Doctors
            </span>

            <span className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-[#07182c] shadow-sm">
              <FaUserMd className="text-[#009f9d]" />
              Smart Pet Care
            </span>
          </div>
        </div>

        <div className="rounded-[40px] bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.10)]">
          <div className="rounded-[32px] bg-gradient-to-br from-[#bdf0ee] to-[#fff3ec] p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-white p-5 shadow-sm">
                <h3 className="text-3xl font-extrabold text-[#009f9d]">
                  100+
                </h3>
                <p className="mt-1 text-sm font-semibold text-slate-600">
                  Verified Doctors
                </p>
              </div>

              <div className="rounded-3xl bg-white p-5 shadow-sm">
                <h3 className="text-3xl font-extrabold text-[#009f9d]">
                  10K+
                </h3>
                <p className="mt-1 text-sm font-semibold text-slate-600">
                  Pet Owners
                </p>
              </div>

              <div className="rounded-3xl bg-white p-5 shadow-sm">
                <h3 className="text-3xl font-extrabold text-[#009f9d]">
                  24/7
                </h3>
                <p className="mt-1 text-sm font-semibold text-slate-600">
                  Pet Support
                </p>
              </div>

              <div className="rounded-3xl bg-white p-5 shadow-sm">
                <h3 className="text-3xl font-extrabold text-[#009f9d]">
                  4.8
                </h3>
                <p className="mt-1 text-sm font-semibold text-slate-600">
                  Average Rating
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
