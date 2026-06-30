import { api, handleAxiosError } from "@/features/api interface/axios.interface";

export type DoctorAppointment = {
  id: string;
  fees: number;
  checkupTime: string;
  status: "PENDING" | "COMPLETED";
  petIssueReport: {
    id: string;
    issue: string;
    user: {
      fullName: string;
      email: string;
      phone: string;
      profileImageUrl: string;
    };
    pet: {
      id: string;
      name: string;
      age: number;
      breed: string;
      category: string;
    };
  };
};

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export const getDoctorAppointments = async () => {
  try {
    const response =
      await api.get<ApiResponse<DoctorAppointment[]>>("doctor/appointments");

    return response.data?.data || [];
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

export const completeAppointmentApi = async (appointmentId: string): Promise<ApiResponse<any>> => {
  try {
    const response = await api.patch(`doctor/appointments/${appointmentId}/complete`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};