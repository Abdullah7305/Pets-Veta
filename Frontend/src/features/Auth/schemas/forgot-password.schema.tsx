// forgotPasswordSchema.ts
import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),
});

// Optional: Export the type generated from the schema
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;