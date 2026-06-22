import type { BookableSlot } from "../apis/doctorProfile.api";

export type DoctorProfileViewData = {
  id: string;
  name: string;
  image: string;
  status: string;
  specialty: string;
  experience: number;
  rating: number;
  reviews: number;
  location: string;
  fees: number;
  tags: string[];
  about: string;
  education: string;
  qualification: string;
  certification: string;
  nextSlot: string;
  specialization: string;
  availableSlots: BookableSlot[];
  todaySlots: BookableSlot[];
  nextAvailable: BookableSlot | null;
} | null;

export type CreatedPet = {
  id: string;
  name: string;
};
