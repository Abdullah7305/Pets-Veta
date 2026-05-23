/**
 * Shared types for the Appointment feature.
 */

export type DoctorId = string;

export type Review = {
  id: string;
  reviewerName: string;
  rating: number; // 0 - 5
  comment: string;
};

export type Doctor = {
  id: DoctorId;
  name: string;
  image: string;
  specialty: string;
  fee: number; // hourly rate in USD
  experience: string; // free-form summary, e.g. "Over 10 years..."
  rating: number; // 0 - 5, can be decimal e.g. 4.5
  reviews: Review[];
  about: string;
  specialties: string[]; // sub-specialties / strengths
  availability: string[]; // weekday names the doctor accepts, e.g. ["Mon","Tue"]
};

export type TimeSlot = {
  id: string;
  label: string; // displayed string e.g. "08:00 AM"
  disabled?: boolean;
};

export type AppointmentDraft = {
  doctorId: DoctorId | null;
  date: Date | null;
  timeSlotId: string | null;
  patientConcerns: string;
};

export type SortKey = "rating" | "feeAsc" | "feeDesc" | "experience";
