import { z } from "zod";

export const forgotPasswordSchema = z.object({
  emailOrPhone: z
    .string()
    .min(1, "Email or phone is required")
    .refine(
      (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const phoneRegex = /^(\+92|0)?3[0-9]{9}$/;

        return emailRegex.test(value) || phoneRegex.test(value);
      },
      {
        message: "Enter valid email or phone number",
      },
    ),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
