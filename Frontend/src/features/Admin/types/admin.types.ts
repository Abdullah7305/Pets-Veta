export interface SidebarItemType {
  id: number;
  title: string;
  icon: React.ElementType;
}

export interface StatsCardType {
  id: number;
  title: string;
  total: number;
  subtitle: string;
  color: string;
  icon: React.ElementType;
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
