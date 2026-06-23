import type { ReactNode } from "react";

export type PetCategory = "DOG" | "CAT" | "REPTILE" | "OTHER";

export type Pet = {
  id: string;
  petOwnerId: string;
  name: string;
  age: number | string;
  breed: string;
  category: PetCategory;
};

export type AppointmentStatus =
  | "PENDING"
  | "COMPLETED"
  | "CANCELLED";

export type DashboardAppointment = {
  id: string;
  petId: string;
  petName: string;
  doctorId: string;
  doctorName: string;
  appointmentType: string;
  checkupTime: string;
  clinicAddress: string;
  status: AppointmentStatus;
};

export type DashboardCounts = {
  totalPets: number;
  totalAppointments: number;
  upcomingAppointments: number;
  completedAppointments: number;
  cancelledAppointments: number;
  totalReports: number;
};

export type DashboardUser = {
  id: string;
  fullName: string;
  profileImageUrl: string;
};

export type PetOwnerDashboardData = {
  user: DashboardUser;
  counts: DashboardCounts;
  pets: Pet[];
  upcomingAppointments: DashboardAppointment[];
};

export type PetOwnerDashboardResponse = {
  success: boolean;
  message: string;
  data: PetOwnerDashboardData;
};

export type DashboardHeaderProps = {
  user: DashboardUser;
};

export type DashboardStatsProps = {
  counts: DashboardCounts;
};

export type StatusCountProps = {
  label: string;
  value: number;
  className?: string;
};

export type DashboardSidebarItem = {
  label: string;
  path: string;
  icon: ReactNode;
};

export type UpcomingAppointmentsProps = {
  appointments: DashboardAppointment[];
};

export type PetPreviewCardProps = {
  pet: Pet;
};

export type MyPetsPreviewProps = {
  pets: Pet[];
};
