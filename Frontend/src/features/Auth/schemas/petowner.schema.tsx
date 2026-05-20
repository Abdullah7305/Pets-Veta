// src/features/auth/schemas/petOwner.schema.ts
import { z } from "zod";

export const petOwnerSchema = z
    .object({
        fullName: z
            .string()
            .min(2, "Full name must be at least 2 years/characters long")
            .max(50, "Full name cannot exceed 50 characters"),

        username: z
            .string()
            .min(3, "Username must be at least 3 characters long")
            .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),

        email: z
            .email("Please enter a valid email address"),

        password: z
            .string()
            .min(6, "Password must be at least 6 characters long"),

        confirmPassword: z
            .string()
            .min(1, "Please confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"], // Highlights the error on the confirmPassword input field
    });

// Export the inferred TypeScript type from the Zod schema
export type PetOwnerFormData = z.infer<typeof petOwnerSchema>;