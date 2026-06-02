import { Calendar, List, PawPrint, Shield, User } from "lucide-react";
import { useState } from "react";

type PetCategory = "DOG" | "CAT" | "REPTILE" | "OTHER";

const PetForm = () => {
  const [category, setCategory] = useState<PetCategory | "">("");

  return (
    <main className="min-h-screen bg-[#F7F3FF] px-4 py-8 text-[#1F1F2E]">
      <section className="mx-auto max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl shadow-purple-200/60">
        <div className="relative h-44 bg-gradient-to-br from-[#F4ECFF] to-[#E9DDFF] px-6 py-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E7D9FF] text-[#6D3DD9]">
            <PawPrint size={22} />
          </div>

          <div className="relative z-10 mt-5">
            <h1 className="text-2xl font-black">Add New Pet</h1>
            <p className="mt-2 max-w-[230px] text-sm leading-5 text-slate-600">
              Add your pet details to manage their health and appointments
            </p>
          </div>

          <img
            src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=500&q=80"
            alt="Dog"
            className="absolute bottom-0 right-4 h-40 w-40 object-contain"
          />
        </div>

        <form className="space-y-5 px-5 py-6">
          <InputField label="Pet Name" placeholder="Enter pet name" icon={<User size={18} />} required />
          <InputField label="Age" placeholder="Enter age" icon={<Calendar size={18} />} rightText="Years" required />
          <InputField label="Breed" placeholder="Enter breed" icon={<Shield size={18} />} required />

          <div>
            <label className="mb-2 block text-sm font-black">
              Category <span className="text-red-500">*</span>
            </label>

            <div className="relative flex h-14 items-center rounded-xl border border-slate-200 bg-white px-4 transition focus-within:border-[#6D3DD9] focus-within:ring-4 focus-within:ring-purple-100">
              <List size={18} className="mr-3 text-[#6D3DD9]" />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as PetCategory)}
                className="h-full w-full bg-transparent text-sm font-semibold text-slate-600 outline-none"
              >
                <option value="">Select category</option>
                <option value="DOG">Dog</option>
                <option value="CAT">Cat</option>
                <option value="REPTILE">Reptile</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
          </div>

          <div className="rounded-2xl border border-purple-100 bg-[#F6F0FF] p-4">
            <h3 className="text-sm font-black text-[#4B2DB5]">
              About Pet Categories
            </h3>
            <p className="mt-1 text-xs leading-5 text-slate-600">
              Choose the correct category to help us provide better care for your pet.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              className="h-12 rounded-xl border border-[#6D3DD9]/35 text-sm font-black text-[#6D3DD9]"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#6D3DD9] text-sm font-black text-white shadow-lg shadow-purple-300"
            >
              <PawPrint size={17} />
              Save Pet
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

const InputField = ({
  label,
  placeholder,
  icon,
  rightText,
  required,
}: {
  label: string;
  placeholder: string;
  icon: React.ReactNode;
  rightText?: string;
  required?: boolean;
}) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-black">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="flex h-14 items-center rounded-xl border border-slate-200 bg-white px-4 transition focus-within:border-[#6D3DD9] focus-within:ring-4 focus-within:ring-purple-100">
        <span className="mr-3 text-[#6D3DD9]">{icon}</span>

        <input
          type="text"
          placeholder={placeholder}
          className="h-full w-full bg-transparent text-sm font-semibold text-slate-600 outline-none placeholder:text-slate-400"
        />

        {rightText && (
          <span className="rounded-lg bg-slate-50 px-3 py-1 text-xs font-bold text-slate-500">
            {rightText}
          </span>
        )}
      </div>
    </div>
  );
};

export default PetForm;