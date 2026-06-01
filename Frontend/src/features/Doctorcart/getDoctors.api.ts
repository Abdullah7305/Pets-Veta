export type DoctorApiResponse = {
  success: boolean;
  message: string;
  data: Doctor[];
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type Doctor = {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  qualification: string;
  experience: string;
  profileImage?: string;
  status: "active" | "inactive";
  availableDays: string[];
  todaySlots: {
    id: string;
    day: string;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
  }[];
  nextAvailable: {
    day: string;
    startTime: string;
    endTime: string;
  } | null;
};

export const getApprovedDoctors = async (
  page: number,
  limit: number,
  search: string
): Promise<DoctorApiResponse> => {
  const response = await fetch(
    `http://localhost:5000/api/doctors/approved?page=${page}&limit=${limit}&search=${search}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch doctors");
  }

  return response.json();
};