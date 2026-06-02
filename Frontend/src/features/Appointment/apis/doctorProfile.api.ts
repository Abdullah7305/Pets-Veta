import { api } from "@/features/api interface/axios.interface";
import { handleAxiosError } from "@/features/api interface/axios.interface";

export type Data = {
    email: string
}

export type ApiResponse = {
    success: boolean,
    message: string,
    data: Data
}


export const getDoctorProfileData = async (id: string) => {
    try {
        const response = await api.get(`http://localhost:8000/api/v1/user/doctor-profile?doctorId=${id}`);
        return response.data?.data;
    } catch (error) {
        handleAxiosError(error)
    }
}