import { z } from "zod";

export const doctorSchema = z
  .object({
    fullName: z.string().min(3, "Full name is required"),

    userName: z.string().min(3, "Username must be at least 3 characters"),

    email: z.string().email("Invalid email address"),

    phoneNumber: z.string().min(11, "phone number is required "),

    experience: z.string().min(1, "experience is required"),

    medicalLicenseNumber: z.string().min(3, "License number is required"),

    clinicAddress: z.string().min(5, "Clinic address  is required"),

    document: z
      .any()
      .refine((file) => file?.length > 0, "Document is required"),

    specialization: z.string().min(1, "Select specialization"),

    password: z.string().min(6, "Password must be at least 6 characters"),

    confirmPassword: z.string().min(6, "Confirm your password"),
  })

  .refine((data) => data.password === data.confirmPassword, {
    message: "Password donot match",
    path: ["confirmPassword"],
  });

export type DoctorFormData = z.infer<typeof doctorSchema>;
