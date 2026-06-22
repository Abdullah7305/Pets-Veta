import { z } from "zod";

export const petOwnerProfileSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name cannot exceed 50 characters"),
  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores",
    ),
  phone: z
    .string()
    .trim()
    .max(20, "Phone number cannot exceed 20 characters")
    .optional(),
  profileImage: z
    .instanceof(File)
    .optional()
    .refine(
      (file) =>
        !file ||
        ["image/png", "image/jpeg", "image/webp"].includes(file.type),
      "Only PNG, JPEG, and WEBP images are allowed",
    )
    .refine(
      (file) => !file || file.size <= 2 * 1024 * 1024,
      "Profile image must be 2MB or less",
    ),
});

export type PetOwnerProfileFormData = z.infer<
  typeof petOwnerProfileSchema
>;
