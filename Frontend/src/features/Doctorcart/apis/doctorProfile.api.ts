import { api, handleAxiosError } from "@/features/api interface/axios.interface";
import type { DoctorProfileFormData } from "../schemas/doctorProfile.schema";

export type DoctorProfileData = {
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

type BackendDoctorProfileData = {
  id: string;
  fullName: string;
  username: string;
  email: string;
  phone: string;
  profileImageUrl: string;
  doctors: {
    id: string;
    specialization: string;
    education: string;
    address: string;
    experience: number;
    fees: number;
    isAvailable: boolean;
    isVerified: "PENDING" | "APPROVED" | "REJECTED";
  } | null;
};

type BackendDoctorProfileResponse = {
  success: boolean;
  message: string;
  data: BackendDoctorProfileData;
};

export type DoctorProfileApiResponse = {
  success: boolean;
  message: string;
  data: DoctorProfileData;
};

const mapDoctorProfile = (
  response: BackendDoctorProfileResponse
): DoctorProfileApiResponse => {
  const doctor = response.data.doctors;

  if (!doctor) {
    throw new Error("Doctor data not found");
  }

  return {
    success: response.success,
    message: response.message,
    data: {
      id: doctor.id,
      userId: response.data.id,
      fullName: response.data.fullName || "",
      username: response.data.username || "",
      email: response.data.email || "",
      phone: response.data.phone || "",
      profileImageUrl: response.data.profileImageUrl || "",
      specialization: doctor.specialization || "",
      education: doctor.education || "",
      address: doctor.address || "",
      experience: doctor.experience || 0,
      fees: doctor.fees || 0,
      isAvailable: doctor.isAvailable ?? true,
      isVerified: doctor.isVerified,
    },
  };
};

export const getDoctorProfileApi = async () => {
  try {
    const response = await api.get<BackendDoctorProfileResponse>(
      "doctor/profile"
    );

    return mapDoctorProfile(response.data);
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

export const updateDoctorProfileApi = async (
  payload: DoctorProfileFormData
) => {
  try {
    const response = await api.patch<BackendDoctorProfileResponse>(
      "doctor/profile",
      payload
    );

    return mapDoctorProfile(response.data);
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};