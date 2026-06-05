import { z } from "zod";

export const doctorProfileSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  username: z.string().min(2, "Username is required"),
  phone: z.string().min(10, "Phone number is required"),

  profileImageUrl: z.string().optional(),

  specialization: z.string().min(2, "Specialization is required"),
  education: z.string().min(2, "Education is required"),
  address: z.string().min(5, "Clinic address is required"),

  experience: z.coerce
    .number({
      message: "Experience is required",
    })
    .min(0, "Experience cannot be negative")
    .max(60, "Experience is too high"),

  fees: z.coerce
    .number({
      message: "Fees is required",
    })
    .min(0, "Fees cannot be negative"),

  isAvailable: z.boolean(),
});

export type DoctorProfileFormInput = z.input<typeof doctorProfileSchema>;
export type DoctorProfileFormData = z.output<typeof doctorProfileSchema>;