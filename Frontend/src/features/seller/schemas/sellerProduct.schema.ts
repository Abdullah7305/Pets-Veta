import { z } from "zod";

export const sellerProductSchema = z.object({
  title: z.string().trim().min(1, "Product title is required"),
  category: z.enum(["Food", "Pets", "Accessories"]),
  price: z
    .string()
    .trim()
    .min(1, "Price is required")
    .refine((value) => Number(value) > 0, "Price must be greater than 0"),
  stock: z
    .string()
    .trim()
    .min(1, "Stock quantity is required")
    .refine((value) => Number(value) >= 0, "Stock cannot be negative"),
  location: z.string().trim().optional(),
  description: z.string().trim().optional(),
  status: z.enum(["Active", "Draft", "Sold Out"]),
});

export type SellerProductFormData = z.infer<typeof sellerProductSchema>;
