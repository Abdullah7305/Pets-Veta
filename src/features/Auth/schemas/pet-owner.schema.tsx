import { z } from "zod";

export const petOwnerSchema = z
  .object({
    fullName: z.string().min(3, "Full name is required"),

    email: z.string().email("Invalid email address"),

    country: z.string().min(2, "Country is required"),

    phoneNumber: z.string().min(11, "Phone number is required"),

    password: z.string().min(6, "Password must be at least 6 characters"),

    confirmPassword: z.string().min(6, "Confirm your password"),
  })

  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type PetOwnerFormData = z.infer<typeof petOwnerSchema>;