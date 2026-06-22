import type { Dispatch, ElementType, SetStateAction } from "react";
import type { DoctorData } from "../apis/doctorquery.api";

export interface SidebarItemType {
  id: number;
  title: string;
  icon: ElementType;
}

export interface StatsCardType {
  id: number;
  title: string;
  total: number;
  subtitle: string;
  color: string;
  icon: ElementType;
}

export interface DoctorType {
  id: number;
  name: string;
  specialist: string;
  experience: string;
  email: string;
  phone: string;
  status: string;
  image: string;
}

export type AdminNavbarProps = {
  onMenuClick: () => void;
};

export type SidebarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

export interface MobileSidebarProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export interface DoctorStatusBadgeProps {
  status: string;
}

export type DoctorRequestCardProps = {
  doctor: DoctorData;
  onApprove: (doctorId: string) => void;
  onReject: (doctorId: string) => void;
  doctorRequestProceed: boolean;
};
