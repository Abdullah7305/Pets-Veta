import { Link } from "react-router-dom";

import {
  FaShieldAlt,
  FaLock,
  FaHeadset,
  FaUsers,
  FaCalendarAlt,
  FaShoppingBag,
  FaPaw,
} from "react-icons/fa";

import img from "@/assets/shared/images/dog2.jpeg";
import Button from "../../../shared/components/Button/Button";

export const Banner = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#f4fbff] via-white to-[#e8fbfa] px-6 py-16 lg:px-16 lg:py-20 flex flex-col lg:flex-row items-center justify-between gap-10">
      <div className="w-full lg:w-1/2 z-10">
        <div className="inline-flex items-center gap-2 bg-white text-[#07182c] font-semibold px-5 py-3 rounded-full shadow-lg mb-7">
          <FaPaw className="text-[#009f9d]" />
          <span>Trusted by 10,000+ pet parents</span>
        </div>

        <h1 className="text-[40px] md:text-[56px] lg:text-[64px] leading-tight font-extrabold text-[#07182c] mb-6">
          Better care for <br />
          your pets, <span className="text-[#00a7a5]">every day.</span>
        </h1>

        <p className="text-base md:text-lg text-slate-700 leading-7 max-w-xl mb-8">
          PetsVeta is your all-in-one platform for expert care, trusted vets,
          quality products and a loving community.
        </p>

        <div className="flex flex-wrap gap-4 mb-8">
          <Link to="/doctors">
            <Button
              variant="primary"
              size="md"
              className="inline-flex items-center gap-3 !bg-[#009f9d] !border-[#009f9d] !text-white hover:!bg-[#008f8d] hover:!text-white rounded-2xl shadow-xl"
            >
              <FaCalendarAlt />
              Book a Vet Appointment
            </Button>
          </Link>

          <Link to="/marketplace1">
            <Button
              variant="outline"
              size="md"
              className="inline-flex items-center gap-3 !bg-white !text-[#07182c] !border-white hover:!bg-white hover:!text-[#009f9d] rounded-2xl shadow-lg"
            >
              <FaShoppingBag />
              Explore Marketplace
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <div className="flex items-center gap-3 text-sm font-bold text-[#07182c]">
            <span className="w-10 h-10 rounded-full bg-[#d9f7f6] text-[#008f8d] flex items-center justify-center shrink-0">
              <FaShieldAlt />
            </span>
            Verified Vets
          </div>

          <div className="flex items-center gap-3 text-sm font-bold text-[#07182c]">
            <span className="w-10 h-10 rounded-full bg-[#d9f7f6] text-[#008f8d] flex items-center justify-center shrink-0">
              <FaLock />
            </span>
            Secure Bookings
          </div>

          <div className="flex items-center gap-3 text-sm font-bold text-[#07182c]">
            <span className="w-10 h-10 rounded-full bg-[#d9f7f6] text-[#008f8d] flex items-center justify-center shrink-0">
              <FaHeadset />
            </span>
            24/7 Support
          </div>

          <div className="flex items-center gap-3 text-sm font-bold text-[#07182c]">
            <span className="w-10 h-10 rounded-full bg-[#d9f7f6] text-[#008f8d] flex items-center justify-center shrink-0">
              <FaUsers />
            </span>
            Trusted by Pet Parents
          </div>
        </div>
      </div>

      <div className="relative w-full lg:w-1/2 min-h-[360px] lg:min-h-[520px] flex items-end justify-center">
        <div className="absolute w-[330px] h-[330px] md:w-[480px] md:h-[480px] rounded-full bg-gradient-to-br from-[#4fd4d1] to-[#009f9d] bottom-4" />

        <img
          src={img}
          alt="PetsVeta pets"
          className="relative z-10 w-full max-w-[620px] object-contain"
        />
      </div>
    </section>
  );
};
