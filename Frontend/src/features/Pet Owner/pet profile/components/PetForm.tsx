import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import Input from "@/shared/components/Input/Input";
import Button from "@/shared/components/Button/Button";
import Card from "@/shared/components/Card/Card";

import {
  petSchema,
  type PetFormData,
  type PetFormInput,
} from "../schemas/pet.schema";

type PetFormProps = {
  title: string;
  description: string;
  defaultValues?: Partial<PetFormInput>;
  isSaving?: boolean;
  onSubmit: (data: PetFormData) => Promise<void>;
  onCancel: () => void;
};

const PetForm = ({
  title,
  description,
  defaultValues,
  isSaving = false,
  onSubmit,
  onCancel,
}: PetFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PetFormInput, unknown, PetFormData>({
    resolver: zodResolver(petSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      age: defaultValues?.age ?? "",
      breed: defaultValues?.breed ?? "",
      category: defaultValues?.category,
    },
  });

  return (
    <Card className="mx-auto max-w-3xl p-6 sm:p-8">
      <div className="mb-7">
        <h1 className="text-3xl font-black tracking-[-0.03em] text-[#101b3d]">
          {title}
        </h1>

        <p className="mt-2 text-sm font-medium text-slate-500">
          {description}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <Input
            label="Pet Name"
            placeholder="Enter pet name"
            error={errors.name?.message}
            {...register("name")}
          />

          <Input
            label="Age"
            type="number"
            step="0.1"
            min="0"
            placeholder="Enter age"
            error={errors.age?.message}
            {...register("age")}
          />

          <Input
            label="Breed"
            placeholder="Enter breed"
            error={errors.breed?.message}
            {...register("breed")}
          />

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Category
            </label>

            <select
              {...register("category")}
              className={`h-[46px] w-full rounded-xl border bg-white px-4 text-sm font-medium text-slate-600 outline-none transition-all ${
                errors.category
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-[#078b91]"
              }`}
            >
              <option value="">Select category</option>
              <option value="DOG">Dog</option>
              <option value="CAT">Cat</option>
              <option value="REPTILE">Reptile</option>
              <option value="OTHER">Other</option>
            </select>

            {errors.category && (
              <p className="text-sm text-red-500">
                {errors.category.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-3 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            className="w-auto px-7"
            onClick={onCancel}
            disabled={isSaving || isSubmitting}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            className="w-auto px-7"
            disabled={isSaving || isSubmitting}
            isSubmitting={isSaving || isSubmitting}
          >
            Save Pet
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default PetForm;