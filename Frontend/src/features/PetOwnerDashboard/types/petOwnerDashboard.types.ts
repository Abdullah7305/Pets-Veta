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
export type DBAppointmentStatus =
  | "PENDING_DETAILS"
  | "PENDING_REPORT"
  | "PENDING_PAYMENT"
  | "PAYMENT_PROCESSING"
  | "CONFIRMED"
  | "PAYMENT_FAILED"
  | "EXPIRED"
  | "CANCELLED"
  | "COMPLETED"
  | "REFUNDED"
  | "NO_SHOW";

export type DBPaymentStatus =
  | "PENDING"
  | "REQUIRES_PAYMENT_METHOD"
  | "REQUIRES_ACTION"
  | "PROCESSING"
  | "SUCCEEDED"
  | "FAILED"
  | "CANCELLED"
  | "REFUNDED";

export interface PetOwnerAppointment {
  id: string;
  doctorId: string;
  petOwnerId: string;
  petId: string | null;
  petIssueReportId: string | null;
  scheduleId: string;
  fees: number;
  currency: string;
  status: DBAppointmentStatus;
  paymentStatus: DBPaymentStatus;
  checkupTime: string;
  expiresAt: string | null;
  confirmedAt: string | null;
  cancelledAt: string | null;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
  doctor: {
    id: string;
    specialization: string;
    user: {
      fullName: string;
      profileImageUrl: string;
      email: string;
      phone: string;
    };
  };
  pet: {
    id: string;
    name: string;
    category: string;
    breed: string;
    age: number;
  } | null;
  doctorSchedule: {
    id: string;
    date: string;
    startTime: string;
    endTime: string;
    status: string;
  };
  petIssueReport: {
    id: string;
    issue: string;
    createdAt: string;
  } | null;
  payment: {
    id: string;
    status: DBPaymentStatus;
    amount: number;
    currency: string;
  } | null;
}

export interface PetOwnerAppointmentsResponse {
  success: boolean;
  message: string;
  data: PetOwnerAppointment[];
}

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
