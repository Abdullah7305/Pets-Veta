export type DoctorApiResponse = {
  success: boolean;
  message: string;
  data: {
    data: Doctor[];
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
};

export type Doctor = {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  education: string;
  experience: number;
  profileImage?: string;
  status: "active" | "inactive";
  availableDays: string[];
  todaySlots: {
    scheduleId: string;
    date: string;
    day: string;
    startTime: string;
    endTime: string;
    startDateTime: string;
    endDateTime: string;
  }[];
  nextAvailable: {
    scheduleId: string;
    date: string;
    day: string;
    startTime: string;
    endTime: string;
    startDateTime: string;
    endDateTime: string;
  } | null;
};

export const getApprovedDoctors = async (
  page: number,
  limit: number,
  search: string
): Promise<DoctorApiResponse> => {
  const response = await fetch(
    `http://localhost:8000/api/v1/user/approved-doctors?page=${page}&limit=${limit}&search=${search}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch doctors");
  }
  console.log("DOctor Fetching Error is ", response);

  return response.json();
};
