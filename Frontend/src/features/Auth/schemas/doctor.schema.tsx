import { z } from "zod";

// Helper to check for a valid file size (e.g., max 5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];

export const doctorSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),

  // z.coerce automatically converts the string from the HTML input into a number
  experience: z.coerce
    .number({ error: "Experience must be a number" })
    .min(0, "Experience cannot be negative"),

  medicalLicenseNumber: z.string().min(3, "License number is required"),
  education: z.string().min(2, "Education/Qualifications are required"),
  address: z.string().min(5, "Please enter a complete address"),
  specialization: z.string().min(1, "Please select a specialization"),
  fees: z.string().min(1, "Enter The Checkup Fees"),



  document: z
    .any()
    // 1. Check if a file was selected by checking the length of the FileList
    .refine((files) => files && files.length > 0, "Document is required.")

    // 2. Look at the FIRST file in the list and check its size
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      "Max file size is 5MB."
    )

    // 3. Look at the FIRST file and check its type (Browser uses 'type', not 'mimetype')
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .pdf formats are supported."
    ),

  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Please confirm your password"),
})
  // The .refine() block at the end compares the two password fields
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // This tells RHF to attach the error to the confirmPassword field
  });

// Exporting the inferred TypeScript type so you can use it in your component
export type DoctorFormData = z.infer<typeof doctorSchema>;
export type DoctorFormInput = z.input<typeof doctorSchema>;
