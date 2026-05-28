import axios from "axios";
import { api } from "@/features/api interface/axios.interface";

export type UserData = {
    id: string;
    fullName: string;
    email: string;
    phone: string;
};

export type DoctorData = {
    id: string;
    education: string;
    specialization: string;
    degreeLicenseUrl: string;
    experience: number;
    isVerified: 'PENDING' | 'APPROVED' | 'REJECTED';
    user: UserData;
};

export type ApiPayload = {
    doctors: DoctorData[];
    totalCount: number;
};

export type DoctorStats = {
    pending: number;
    approved: number;
    total: number;
};

export type ApiResponse<T> = {
    success: boolean;
    message: string;
    data: T;
};

export const PendingDoctors = async (page: number, limit: number): Promise<ApiResponse<ApiPayload>> => {
    try {
        const response = await api.get(`/admin/pending/doctors?limit=${limit}&page=${page}`);
        return response.data;
    } catch (error) {
        handleAxiosError(error);
        throw error;
    }
};

export const ApprovedDoctors = async (page: number, limit: number): Promise<ApiResponse<ApiPayload>> => {
    try {
        const response = await api.get(`/admin/approved/doctors?limit=${limit}&page=${page}`);
        return response.data;
    } catch (error) {
        handleAxiosError(error);
        throw error;
    }
};

export const AllDoctors = async (page: number, limit: number): Promise<ApiResponse<ApiPayload>> => {
    try {
        const response = await api.get(`/admin/all/doctors?limit=${limit}&page=${page}`);
        return response.data;
    } catch (error) {
        handleAxiosError(error);
        throw error;
    }
};

export const approveDoctorRequest = async (doctorId: string): Promise<ApiResponse<any>> => {
    try {
        const response = await api.post('http://localhost:8000/api/v1/admin/approve-pending/doctor', { doctorId });
        return response.data;
    } catch (error) {
        handleAxiosError(error);
        throw error;
    }
};

export const rejectDoctorRequest = async (doctorId: string): Promise<ApiResponse<any>> => {
    try {
        const response = await api.post("http://localhost:8000/api/v1/admin/reject/doctor", { doctorId });
        return response.data;
    } catch (error) {
        handleAxiosError(error);
        throw error;
    }
};

export const fetchDoctorStats = async (): Promise<ApiResponse<DoctorStats>> => {
    try {
        const response = await api.get("http://localhost:8000/api/v1/admin/doctor-stats");
        return response.data;
    } catch (error) {
        handleAxiosError(error);
        throw error;
    }
};


const handleAxiosError = (error: any) => {
    if (axios.isAxiosError(error)) {
        if (error.response) {
            console.log("Status Code", error.response?.status);
            console.log("Response Data", error.response?.data);
        } else if (error.request) {
            console.log("No Request Response Received from server", error.request);
        } else {
            console.error("Axios setup error:", error.message);
        }
    } else {
        console.error("Non-Axios Error:", error);
    }
};