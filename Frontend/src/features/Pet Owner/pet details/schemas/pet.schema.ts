import { z } from "zod";

export const petSchema = z.object({
  name: z.string().min(2, "Pet name must be at least 2 characters"),

  age: z.coerce
    .number({
      message: "Age is required",
    })
    .positive("Age must be greater than 0")
    .max(100, "Age is too high"),

  breed: z.string().min(2, "Breed is required"),

  category: z.enum(["DOG", "CAT", "REPTILE", "OTHER"], {
    message: "Please select pet category",
  }),

  photos: z
    .custom<FileList>()
    .refine((files) => files && files.length > 0, "At least one pet photo is required"),
});

export type PetFormInput = z.input<typeof petSchema>;
export type PetFormData = z.output<typeof petSchema>;
