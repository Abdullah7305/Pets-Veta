import { Mail, MessageSquare, Phone, Send, User } from "lucide-react";

const ContactForm = () => {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm md:p-6">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#071B4D]">
            Send Us a Message
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500">
            Fill out the form below and our team will get back to you as soon
            as possible.
          </p>
        </div>

        <span className="hidden text-4xl opacity-20 md:block">🐾</span>
      </div>

      <form className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-bold text-[#071B4D]">
              Your Name
            </label>

            <div className="relative">
              <User
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />

              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm outline-none transition focus:border-[#078b91] focus:ring-4 focus:ring-[#D4E2E0]/50"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-[#071B4D]">
              Email Address
            </label>

            <div className="relative">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm outline-none transition focus:border-[#078b91] focus:ring-4 focus:ring-[#D4E2E0]/50"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-bold text-[#071B4D]">
              Phone Number
            </label>

            <div className="relative">
              <Phone
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />

              <input
                type="text"
                placeholder="Enter your phone number"
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm outline-none transition focus:border-[#078b91] focus:ring-4 focus:ring-[#D4E2E0]/50"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-[#071B4D]">
              Subject
            </label>

            <select className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 outline-none transition focus:border-[#078b91] focus:ring-4 focus:ring-[#D4E2E0]/50">
              <option>Select a subject</option>
              <option>Doctor Appointment</option>
              <option>Pet Food / Products</option>
              <option>Pet Grooming</option>
              <option>Seller Support</option>
              <option>General Question</option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold text-[#071B4D]">
            Your Message
          </label>

          <div className="relative">
            <MessageSquare
              className="absolute left-4 top-4 text-slate-400"
              size={18}
            />

            <textarea
              rows={5}
              placeholder="Write your message here..."
              className="w-full resize-none rounded-xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm outline-none transition focus:border-[#078b91] focus:ring-4 focus:ring-[#D4E2E0]/50"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-2 md:flex-row md:items-center md:justify-between">
          <label className="flex items-center gap-2 text-sm text-slate-500">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 accent-[#078b91]"
            />
            I agree to the{" "}
            <span className="font-semibold text-[#F28B5B]">
              Terms & Conditions
            </span>
          </label>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#071B4D] px-6 py-3 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#0B255F]"
          >
            <Send size={18} />
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
