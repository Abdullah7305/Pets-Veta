import { z } from "zod";

export const petSchema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.string().min(1, "Age is required"),
  breed: z.string().optional(),
  category: z.enum(["DOG", "CAT", "REPTILE", "OTHER"]),
  photos: z.any().refine((files) => files?.length > 0, "At least one photo is required"),
});

export type PetFormInput = z.input<typeof petSchema>;
export type PetFormData = z.output<typeof petSchema>;