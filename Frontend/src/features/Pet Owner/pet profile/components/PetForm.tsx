import { Calendar, List, PawPrint, Shield, User, ImagePlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

import Input from "../../../../shared/components/Input/Input";
import Button from "../../../../shared/components/Button/Button";
import {
  petSchema,
  type PetFormInput,
  type PetFormData,
} from "../schemas/pet.schema";
import { useAuth } from "@/features/Auth/hooks/authhook";
// import { type submitPetData } from "../apis/pet.api";

interface PetFormProps {
  onSubmitSuccess?: (newPet: any) => void;
  onCancel?: () => void;
}

const PetForm = ({ onSubmitSuccess, onCancel }: PetFormProps) => {
  const { user } = useAuth();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [previews, setPreviews] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
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

  // Watch the photos field to trigger preview generation
  const selectedPhotos = watch("photos");

  useEffect(() => {
    if (!selectedPhotos || selectedPhotos.length === 0) {
      setPreviews([]);
      return;
    }

    const objectUrls = Array.from(selectedPhotos).map((file) =>
      URL.createObjectURL(file as File)
    );
    
    setPreviews(objectUrls);

    return () => {
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [selectedPhotos]);

  const onSubmit = async (data: PetFormData) => {
    setSubmitError(null);
    console.log("Pet Form Data:", data);
    const petOwnerId = user?.data?.id;
    if (!petOwnerId) {
      setSubmitError("You must be logged in to register a pet.");
      return;
    }

  // try {
  //     const newPet = await submitPetData({
  //       ...data,
  //       age: Number(data.age),
  //       petOwnerId,
  //     });

  //     if (newPet) {
  //       reset();
  //       setPreviews([]);
  //       if (onSubmitSuccess) {
  //         onSubmitSuccess(newPet);
  //       }
  //     } else {
  //       setSubmitError("Failed to save pet. Please check inputs.");
  //     }
  //   } catch (err: any) {
  //     setSubmitError(err?.response?.data?.message || "An error occurred while saving the pet.");
  //   }
  };

  return (
    <section className="w-full overflow-hidden rounded-3xl bg-white shadow-2xl shadow-purple-200/60 text-[#1F1F2E]">
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

        {/* Photo Upload Section */}
        <div>
          <label className="mb-2 block text-sm font-black">
            Pet Photos
          </label>
          <label className="flex flex-col items-center justify-center w-full h-32 rounded-xl border-2 border-dashed border-purple-200 bg-[#F6F0FF]/50 hover:bg-[#F4ECFF] transition-colors cursor-pointer focus-within:border-[#6D3DD9] focus-within:ring-4 focus-within:ring-purple-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-[#6D3DD9]">
              <ImagePlus size={28} className="mb-2 opacity-80" />
              <p className="text-xs font-semibold">
                Click to upload <span className="font-normal text-slate-500">or drag and drop</span>
              </p>
            </div>
            <input
              type="file"
              multiple
              className="hidden"
              accept="image/*"
              {...register("photos")}
            />
          </label>

          {/* Previews Grid */}
          {previews.length > 0 && (
            <div className="mt-3 grid grid-cols-4 gap-2">
              {previews.map((src, i) => (
                <div key={src} className="relative aspect-square rounded-lg overflow-hidden border border-purple-100 shadow-sm">
                  <img src={src} alt={`preview-${i}`} className="object-cover w-full h-full" />
                </div>
              ))}
            </div>
          )}

          {errors.photos && (
            <p className="mt-1 text-xs font-semibold text-red-500">
              {errors.photos.message as string}
            </p>
          )}
        </div>

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
            Choose the correct category to help us provide better care for your pet.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            className="border-[#6D3DD9]/35 text-[#6D3DD9]"
            onClick={() => {
              reset();
              setPreviews([]);
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
  );
};

export default PetForm;