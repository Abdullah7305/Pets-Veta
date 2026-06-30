import { z } from "zod";

export const sellerProfileSchema = z.object({
    businessName: z
        .string()
        .trim()
        .min(2, "Store name must contain at least 2 characters")
        .max(60, "Store name is too long"),

    phoneNumber: z
        .string()
        .trim()
        .min(10, "Please enter a valid phone number (at least 10 digits)")
        .max(20, "Phone number is too long"),

    city: z
        .string()
        .trim()
        .min(2, "City name must contain at least 2 characters"),

    businessAddress: z
        .string()
        .trim()
        .min(5, "Please enter a complete business address"),

    storeDescription: z
        .string()
        .trim()
        .max(500, "Description cannot exceed 500 characters")
        .optional()
        .or(z.literal("")),


    storeLogo: z
        .instanceof(File)
        .optional()
        .refine(
            (file) =>
                !file ||
                ["image/png", "image/jpeg", "image/webp"].includes(file.type),
            "Only PNG, JPEG, and WEBP formats are supported"
        )
        .refine(
            (file) => !file || file.size <= 2 * 1024 * 1024,
            "Store logo must be 2MB or less"
        ),
});

export type SellerProfileFormData = z.infer<typeof sellerProfileSchema>;