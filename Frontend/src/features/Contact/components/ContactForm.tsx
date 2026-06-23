import Button from "../../../shared/components/Button";
import Input from "@/shared/components/Input";

const ContactForm = () => {
  return (
    <section className="bg-[#f5fbff] px-5 py-16 lg:px-16">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_420px]">
        <div className="rounded-3xl bg-white p-8 shadow-[0_10px_35px_rgba(15,23,42,0.08)]">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-[#07182c]">
              Send Us a Message
            </h2>

            <p className="mt-2 text-slate-500">
              Fill the form and our support team will contact you shortly.
            </p>
          </div>

          <form className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <Input label="Full Name" placeholder="Enter your name" />

              <Input
                label="Email Address"
                placeholder="Enter your email"
                type="email"
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="Phone Number"
                placeholder="03xx xxxxxxx"
              />

              <Input label="Subject" placeholder="Enter subject" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Message
              </label>

              <textarea
                rows={6}
                placeholder="Write your message..."
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#178f95] focus:ring-2 focus:ring-[#178f95]/20"
              />
            </div>

            <Button>Send Message</Button>
          </form>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-[#bdf0ee] via-[#f5fbff] to-[#fff3ec] p-8 shadow-[0_18px_50px_rgba(15,23,42,0.10)]">
          <h2 className="text-3xl font-extrabold text-[#07182c]">
            Why Contact PetsVeta?
          </h2>

          <div className="mt-8 space-y-5">
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <h3 className="font-extrabold text-[#07182c]">
                Doctor Assistance
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Get support regarding appointments, schedules and consultations.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <h3 className="font-extrabold text-[#07182c]">
                Marketplace Help
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Need help with pet products or orders? Our team is here.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <h3 className="font-extrabold text-[#07182c]">
                AI Assistance
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Ask questions about AI symptom assistance and smart pet-care.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
