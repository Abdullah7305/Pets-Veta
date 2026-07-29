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
  medicalLicenseNumber: string;
  education: string;
  address: string;
  experience: number;
  fees: number;
  isAvailable: boolean;
  isVerified: "PENDING" | "APPROVED" | "REJECTED";
  stripeOnboardingCompleted?: boolean;
  stripeConnectedAccountId?: string | null;
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
    medicalLicenseNumber: string;
    education: string;
    address: string;
    experience: number;
    fees: number;
    isAvailable: boolean;
    isVerified: "PENDING" | "APPROVED" | "REJECTED";
     stripeOnboardingCompleted?: boolean;
    stripeConnectedAccountId?: string | null;
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

type UpdateDoctorProfilePayload = DoctorProfileFormData | FormData;

const mapDoctorProfile = (
  response: BackendDoctorProfileResponse
): DoctorProfileApiResponse => {
  const user = response.data;
  const doctor = user.doctors;

  if (!doctor) {
    throw new Error("Doctor data not found");
  }

  return {
    success: response.success,
    message: response.message,
    data: {
      id: doctor.id,
      userId: user.id,
      fullName: user.fullName || "",
      username: user.username || "",
      email: user.email || "",
      phone: user.phone || "",
      profileImageUrl: user.profileImageUrl || "",
      specialization: doctor.specialization || "",
      medicalLicenseNumber: doctor.medicalLicenseNumber || "",
      education: doctor.education || "",
      address: doctor.address || "",
      experience: doctor.experience || 0,
      fees: doctor.fees || 0,
      isAvailable: doctor.isAvailable ?? false,
      isVerified: doctor.isVerified,
      stripeOnboardingCompleted: doctor.stripeOnboardingCompleted ?? false,
      stripeConnectedAccountId: doctor.stripeConnectedAccountId || null,
    
    },
  };
};

export const getDoctorProfileApi = async () => {
  try {
    const response = await api.get<BackendDoctorProfileResponse>(
      "/doctor/profile"
    );

    return mapDoctorProfile(response.data);
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

export const updateDoctorProfileApi = async (
  payload: UpdateDoctorProfilePayload
) => {
  try {
    const isFormData = payload instanceof FormData;

    const response = await api.patch<BackendDoctorProfileResponse>(
      "/doctor/profile",
      payload,
      isFormData
        ? {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        : undefined
    );

    return mapDoctorProfile(response.data);
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};


export const getStripeOnboardingLinkApi = async () => {
  try {
    const response = await api.get<{
      success: boolean;
      message: string;
      data: { onboardingUrl: string; stripeConnectedAccountId: string };
    }>("/doctor/connect/onboarding");
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const getStripeStatusApi = async () => {
  try {
    const response = await api.get<{
      success: boolean;
      message: string;
      data: { stripeOnboardingCompleted: boolean; stripeConnectedAccountId: string };
    }>("/doctor/connect/status");
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};