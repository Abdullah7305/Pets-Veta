import { Calendar, List, PawPrint, Shield, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "../../../../shared/components/Inputs/Input";
import Button from "../../../../shared/components/Button/Button";
import {
  petSchema,
  type PetFormInput,
  type PetFormData,
} from "../schemas/pet.schema";
const PetForm = () => {
  const {
  register,
  handleSubmit,
  reset,
  formState: { errors, isSubmitting },
} = useForm<PetFormInput, unknown, PetFormData>({
  resolver: zodResolver(petSchema),
  defaultValues: {
    name: "",
    age: "",
    breed: "",
    category: undefined,
  },
});

  const onSubmit = async (data: PetFormData) => {
    console.log("Pet Form Data:", data);

    // API connect later
    // await createPet(data)

    reset();
  };

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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 px-5 py-6">
          <Input
            label="Pet Name"
            type="text"
            placeholder="Enter pet name"
            error={errors.name?.message}
            icon={<User size={18} />}
            {...register("name")}
          />

          <Input
            label="Age"
            type="number"
            placeholder="Enter age"
            error={errors.age?.message}
            icon={<Calendar size={18} />}
            rightText="Years"
            {...register("age")}
          />

          <Input
            label="Breed"
            type="text"
            placeholder="Enter breed"
            error={errors.breed?.message}
            icon={<Shield size={18} />}
            {...register("breed")}
          />

          <div>
            <label className="mb-2 block text-sm font-black">
              Category <span className="text-red-500">*</span>
            </label>

            <div className="relative flex h-14 items-center rounded-xl border border-slate-200 bg-white px-4 transition focus-within:border-[#6D3DD9] focus-within:ring-4 focus-within:ring-purple-100">
              <List size={18} className="mr-3 text-[#6D3DD9]" />

              <select
                {...register("category")}
                className="h-full w-full bg-transparent text-sm font-semibold text-slate-600 outline-none"
              >
                <option value="">Select category</option>
                <option value="DOG">Dog</option>
                <option value="CAT">Cat</option>
                <option value="REPTILE">Reptile</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            {errors.category && (
              <p className="mt-1 text-xs font-semibold text-red-500">
                {errors.category.message}
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-purple-100 bg-[#F6F0FF] p-4">
            <h3 className="text-sm font-black text-[#4B2DB5]">
              About Pet Categories
            </h3>
            <p className="mt-1 text-xs leading-5 text-slate-600">
              Choose the correct category to help us provide better care for your
              pet.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="border-[#6D3DD9]/35 text-[#6D3DD9]"
              onClick={() => reset()}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              isSubmitting={isSubmitting}
              className="bg-[#6D3DD9] hover:bg-[#5630B2] hover:text-white"
            >
              Save Pet
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default PetForm;