import axios from "axios";

import { api } from "../../api interface/axios.interface";

export type WeekDay =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

export type DoctorSchedule = {
  id: string;
  doctorId: string;
  day: WeekDay;
  startTime: string;
  endTime: string;
};

export type DoctorSchedulePayload = {
  day: WeekDay;
  startTime: string;
  endTime: string;
};

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

const handleAxiosError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    throw new Error(
      error.response?.data?.message || error.message || "Request failed",
    );
  }

  throw error;
};

export const getDoctorAvailability = async () => {
  try {
    const response =
      await api.get<ApiResponse<DoctorSchedule[]>>("doctor/schedule/me");

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createDoctorAvailabilitySlot = async (
  payload: DoctorSchedulePayload,
) => {
  try {
    const response = await api.post<ApiResponse<DoctorSchedule>>(
      "doctor/schedule",
      payload,
    );

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const deleteDoctorAvailabilitySlot = async (scheduleId: string) => {
  try {
    const response = await api.delete<ApiResponse<null>>(
      `doctor/schedule/${scheduleId}`,
    );

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};
