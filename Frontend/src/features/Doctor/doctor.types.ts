import type { Dispatch, SetStateAction } from "react";
import type { DoctorAppointment } from "./api/doctorAppointments.api";
import type { ItemType } from "./components/DoctorSkill";
import type { SlotForm } from "./components/DoctorTypes";

export type AppointmentStatus = "Confirmed" | "Pending" | "Completed" | "Cancelled";

export type Doctor = {
    name: string;
    image?: string;
};

export type DashboardStats = {
    todayAppointments: number;
    pendingAppointments: number;
    totalPatients: number;
    completedToday: number;
};

export type Appointment = {
    id: string | number;
    time: string;
    petName: string;
    petType: string;
    ownerName: string;
    purpose: string;
    status: AppointmentStatus;
};

export type DashboardData = {
    doctor: Doctor;
    stats: DashboardStats;
    appointments: Appointment[];
};


export type TimeSlot = {
    id: string;
    day: string;
    startTime: string;
    endTime: string;
};

export const DAYS_OF_WEEK = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

export type DeleteModalProps = {
    isOpen: boolean;
    serviceName: string;
    price: string;
    itemId: string;
    onCancel: () => void;
    onConfirmDelete: (itemId: string) => void;
    isLoading?: boolean;
};

export interface AddSlotModalProps {
    isOpen: boolean;
    onClose: () => void;
    slotForm: SlotForm;
    setSlotForm: Dispatch<SetStateAction<SlotForm>>;
    handleAddSlot: () => void;
    error: string | null;
    resetSlotForm: () => void;
    setError: (error: string | null) => void;
}

export type DoctorHeaderProps = {
    onOpenModal: () => void;
};

export type DoctorProfileButtonProps = {
    name: string;
    image?: string;
};

export type DoctorSidebarProps = {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
};

export type PatientCardProps = {
    appointment: DoctorAppointment;
     onMarkAsDone?: (appointmentId: string) => void; 
};

export type DoctorServiceData = {
    id: string;
    userId: string;
    price: string;
    skill: string;
};

export type DoctorServicesTableProps = {
    onEdit: (item: ItemType) => void | Promise<void>;
    onDelete: (itemId: string) => Promise<void>;
};

export interface ScheduleFormData {
    date: string;
    startTime: string;
    endTime: string;
}

export interface BackendScheduleItem {
    id: string;
    doctorId: string;
    date: string;
    startTime: string;
    endTime: string;
    isBooked: boolean;
}

export interface ScheduleTableProps {
    schedules: BackendScheduleItem[];
}


