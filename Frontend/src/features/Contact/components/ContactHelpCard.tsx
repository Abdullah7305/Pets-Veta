import { Headphones, MapPin, Stethoscope } from "lucide-react";

const ContactHelpCard = () => {
  return (
    <aside className="space-y-6">
      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-2xl font-black text-[#071B4D]">
          Need Immediate Help?
        </h2>

        <div className="mt-7 space-y-7">
          <div className="flex gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#D4E2E0]/70 text-[#078b91]">
              <Stethoscope size={30} />
            </div>

            <div>
              <h3 className="text-base font-extrabold text-[#071B4D]">
                Book a Vet Appointment
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Consult our expert veterinarians for your pet’s health.
              </p>

              <button className="mt-3 text-sm font-bold text-[#078b91]">
                Book Now →
              </button>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#F9C5A8]/50 text-[#F28B5B]">
              <Headphones size={30} />
            </div>

            <div>
              <h3 className="text-base font-extrabold text-[#071B4D]">
                Emergency Support
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                For urgent pet care assistance, contact our support team.
              </p>

              <p className="mt-3 text-sm font-black text-[#F28B5B]">
                +92 300 1234567
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-2xl font-black text-[#071B4D]">Our Location</h2>

        <div className="mt-5 flex h-56 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#D4E2E0]/80 to-[#F9C5A8]/50">
          <div className="text-center">
            <MapPin className="mx-auto text-[#071B4D]" size={46} />

            <p className="mt-3 text-sm font-bold text-[#071B4D]">
              Lahore, Pakistan
            </p>
          </div>
        </div>

        <div className="mt-5 flex gap-3 text-sm text-slate-600">
          <MapPin className="mt-0.5 shrink-0 text-slate-500" size={20} />

          <p>123 Pet Care Street, DHA Phase 5, Lahore, Pakistan</p>
        </div>
      </div>
    </aside>
  );
};

export default ContactHelpCard;