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