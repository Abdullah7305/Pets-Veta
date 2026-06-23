import { Calendar, List, PawPrint, Shield, User, ImagePlus } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";

import Input from "../../../../shared/components/Input/Input";
import Button from "../../../../shared/components/Button/Button";
import {
  petSchema,
  type PetFormInput,
  type PetFormData,
} from "../schemas/pet.schema";
import type { PetFormProps } from "../types/petProfile.types";
import { createPetApi } from "../api/pets.api";

const PetForm = ({
  title = "Register Pet",
  description = "Please enter your pet details",
  defaultValues,
  isSaving = false,
  onSubmit,
  onSubmitSuccess,
  onCancel,
}: PetFormProps) => {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<PetFormInput, unknown, PetFormData>({
    resolver: zodResolver(petSchema),
    defaultValues: {
      name: "",
      age: "",
      breed: "",
      category: undefined,
      ...defaultValues,
    },
  });

  // Watch the photos field to trigger preview generation
  const selectedPhotos = useWatch({ control, name: "photos" });

  const previews = useMemo(() => {
    if (!selectedPhotos || selectedPhotos.length === 0) {
      return [];
    }

    return Array.from(selectedPhotos).map((file) =>
      URL.createObjectURL(file as File)
    );
  }, [selectedPhotos]);

  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  const handleFormSubmit = async (data: PetFormData) => {
    setSubmitError(null);

    if (!defaultValues && (!data.photos || data.photos.length === 0)) {
      setSubmitError("At least one pet photo is required.");
      return;
    }

    try {
      if (onSubmit) {
        await onSubmit(data);
        return;
      }

      const newPet = await createPetApi(data);

      reset();
      if (onSubmitSuccess) {
        onSubmitSuccess(newPet);
      }
    } catch (err: unknown) {
      const message =
        err &&
          typeof err === "object" &&
          "response" in err &&
          typeof err.response === "object" &&
          err.response &&
          "data" in err.response &&
          typeof err.response.data === "object" &&
          err.response.data &&
          "message" in err.response.data &&
          typeof err.response.data.message === "string"
          ? err.response.data.message
          : "Unable to save pet. Please try again.";

      setSubmitError(message);
    }
  };

  return (
    <section className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl shadow-purple-200/60 text-[#1F1F2E]">
      <div className="relative h-36 bg-gradient-to-br from-[#F4ECFF] to-[#E9DDFF] px-6 flex flex-col justify-center">
        <h1 className="text-2xl font-black tracking-tight text-[#4c249f] sm:text-3xl">
          {title}
        </h1>
        <p className="mt-1 text-sm font-semibold text-[#8B64D7]">
          {description}
        </p>

        <span className="absolute right-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#6D3DD9] shadow-lg shadow-purple-100">
          <PawPrint size={28} />
        </span>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5 px-6 py-6">
        {submitError && (
          <div className="bg-red-50 text-red-650 p-3 rounded-2xl text-xs font-semibold border border-red-100 mb-3">
            {submitError}
          </div>
        )}

        {/* Photo Upload Section - Full Width */}
        <div className="w-full">
          <label className="mb-2 block text-sm font-black">
            Pet Photos
          </label>
          <label className="flex flex-col items-center justify-center w-full h-28 rounded-xl border-2 border-dashed border-purple-200 bg-[#F6F0FF]/50 hover:bg-[#F4ECFF] transition-colors cursor-pointer focus-within:border-[#6D3DD9] focus-within:ring-4 focus-within:ring-purple-100">
            <div className="flex flex-col items-center justify-center pt-4 pb-4 text-[#6D3DD9]">
              <ImagePlus size={26} className="mb-1 opacity-80" />
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
            <div className="mt-3 grid grid-cols-6 gap-2">
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

        {/* Row 1: Name and Age */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>

        {/* Row 2: Breed and Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>

        {/* Info Box - Full Width */}
        <div className="rounded-2xl border border-purple-100 bg-[#F6F0FF] p-4">
          <h3 className="text-sm font-black text-[#4B2DB5]">
            About Pet Categories
          </h3>
          <p className="mt-1 text-xs leading-5 text-slate-600">
            Choose the correct category to help us provide better care for your pet.
          </p>
        </div>

        {/* Action Buttons */}
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
            isSubmitting={isSubmitting || isSaving}
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
