import { z } from "zod";

export const checkoutSchema = z.object({
  phoneNumber: z.string().trim().min(1, "Phone number is required"),
  shippingAddress: z.string().trim().min(1, "Shipping address is required"),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
