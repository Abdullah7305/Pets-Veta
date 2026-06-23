import type { ChangeEvent } from "react";
import type { Doctor } from "../apis/getDoctors.api";

export interface DoctorCardProps {
  doctor: Doctor;
  onBookAppointment: (doctorId: string, checkupTime?: string) => void;
}

export interface DoctorsListProps {
  doctors: Doctor[];
  loading: boolean;
  onBookAppointment: (doctorId: string, checkupTime?: string) => void;
}

export interface FilterSidebarProps {
  search: string;
  onSearchChange: (value: string) => void;
  onReset: () => void;
}

export type SearchInputChangeEvent = ChangeEvent<HTMLInputElement>;

export interface PaginationProps {
  page: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}

export type DoctorProfileData = {
  fullName: string;
  email: string;
  phone: string;
  profileImageUrl: string;
  specialization: string;
  education: string;
  experience: number;
  fees: number;
  rating: number;
  reviews: number;
  licenseNumber: string;
  languages: string;
  address: string;
  about: string;
  isVerified: boolean;
  isAvailable: boolean;
};

export interface GetDoctorsParams {
  page: number;
  limit: number;
  search: string;
}
