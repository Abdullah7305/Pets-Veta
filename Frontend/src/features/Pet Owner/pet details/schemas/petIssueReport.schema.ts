import { z } from "zod";

export const petIssueReportSchema = z.object({
  petId: z.string().min(1, "Please select your pet"),
  issue: z
    .string()
    .min(10, "Issue details must be at least 10 characters")
    .max(500, "Issue details must be less than 500 characters"),
  appointmentType: z.enum(["NORMAL_CHECKUP"], {
    message: "Please select appointment type",
  }),
  checkupTime: z.string().min(1, "Please select an appointment slot"),
});

export type PetIssueReportFormData = z.infer<typeof petIssueReportSchema>;
