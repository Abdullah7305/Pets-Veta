import { z } from "zod";

export const petSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Pet name must contain at least 2 characters")
    .max(50, "Pet name is too long"),

  age: z.coerce
    .number({
      message: "Age is required",
    })
    .min(0, "Age cannot be negative")
    .max(100, "Enter a valid pet age"),

  breed: z
    .string()
    .trim()
    .min(2, "Breed must contain at least 2 characters")
    .max(50, "Breed is too long"),

  category: z.enum(["DOG", "CAT", "REPTILE", "OTHER"], {
    message: "Please select a category",
  }),

  // 💡 Added: Informs TypeScript that photos exist in the schema
  photos: z.any().optional(),
});

export type PetFormInput = z.input<typeof petSchema>;
export type PetFormData = z.output<typeof petSchema>;
