import axios from "axios";
import type { DoctorProfileFormData } from "../schemas/doctorProfile.schema";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

export type DoctorProfileApiResponse = {
  success: boolean;
  message: string;
  data: {
    id: string;
    userId: string;
    fullName: string;
    username: string;
    email: string;
    phone: string;
    profileImageUrl: string;
    specialization: string;
    education: string;
    address: string;
    experience: number;
    fees: number;
    isAvailable: boolean;
    isVerified: "PENDING" | "APPROVED" | "REJECTED";
  };
};

export const getDoctorProfileApi = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get<DoctorProfileApiResponse>(
    `${API_BASE_URL}/doctor/profile`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

export const updateDoctorProfileApi = async (
  payload: DoctorProfileFormData,
) => {
  const token = localStorage.getItem("token");

  const response = await axios.patch<DoctorProfileApiResponse>(
    `${API_BASE_URL}/doctor/profile`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};