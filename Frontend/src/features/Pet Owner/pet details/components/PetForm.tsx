import { Calendar, List, PawPrint, Shield, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import Input from "../../../../shared/components/Inputs/Input";
import Button from "../../../../shared/components/Button/Button";
import {
  petSchema,
  type PetFormInput,
  type PetFormData,
} from "../schemas/pet.schema";
import { useAuth } from "@/features/Auth/hooks/authhook";
import { submitPetData } from "../apis/pet.api";

interface PetFormProps {
  onSubmitSuccess?: (newPet: any) => void;
  onCancel?: () => void;
}

const PetForm = ({ onSubmitSuccess, onCancel }: PetFormProps) => {
  const { user } = useAuth();
  const [submitError, setSubmitError] = useState<string | null>(null);
  
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
    setSubmitError(null);
    console.log("Pet Form Data:", data);
    const petOwnerId = user?.data?.id;
    if (!petOwnerId) {
      setSubmitError("You must be logged in to register a pet.");
      return;
    }

    try {
      const newPet = await submitPetData({
        ...data,
        age: Number(data.age),
        petOwnerId,
      });

      if (newPet) {
        reset();
        if (onSubmitSuccess) {
          onSubmitSuccess(newPet);
        }
      } else {
        setSubmitError("Failed to save pet. Please check inputs.");
      }
    } catch (err: any) {
      setSubmitError(err?.response?.data?.message || "An error occurred while saving the pet.");
    }
  };

  return (
    <main className="min-h-screen bg-[#F7F3FF] px-4 py-8 text-[#1F1F2E]">
      <section className="mx-auto max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl shadow-purple-200/60">
        <div className="relative h-44 bg-gradient-to-br from-[#F4ECFF] to-[#E9DDFF] px-6 py-6">
          <h1 className="text-2xl font-black tracking-tight text-[#4c249f] sm:text-3xl">
            Register Pet
          </h1>
          <p className="mt-1 text-sm font-semibold text-[#8B64D7]">
            Please enter your pet details
          </p>

          <span className="absolute bottom-6 right-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-[#6D3DD9] shadow-lg shadow-purple-100">
            <PawPrint size={32} />
          </span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 px-5 py-6">
          {submitError && (
            <div className="bg-red-50 text-red-650 p-3 rounded-2xl text-xs font-semibold border border-red-100 mb-3">
              {submitError}
            </div>
          )}

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
              onClick={() => {
                reset();
                if (onCancel) onCancel();
              }}
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