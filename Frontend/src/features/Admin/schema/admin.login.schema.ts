import { z } from "zod";

export const adminLoginSchema = z.object({
  email: z
    .string()
    .min(1, "Email required ")
    .email("Valid email enter "),

  password: z
    .string()
    .min(1, "Password required ")
    .min(6, "Password must be 6 characters "),
});

export type AdminLoginFormValues = z.infer<typeof adminLoginSchema>;