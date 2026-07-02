import { api } from "@/features/api interface/axios.interface";
import { handleAxiosError } from "@/features/api interface/axios.interface";

export type BookableSlot = {
    scheduleId: string;
    date: string;
    day: string;
    startTime: string;
    endTime: string;
    startDateTime: string;
    endDateTime: string;
}

export type Data = {
    id: string;
    name: string;
    image: string;
    specialization: string;
    medicalLicenseNumber?: string;
    specialty?: string;
    education: string;
    experience: number;
    fees: number;
    status: string;
    availableDays: string[];
    availableSlots: BookableSlot[];
    todaySlots: BookableSlot[];
    nextAvailable: BookableSlot | null;
}

export type ApiResponse = {
    success: boolean,
    message: string,
    data: Data
}


export const getDoctorProfileData = async (id: string) => {
    try {
        const response = await api.get(`http://localhost:8000/api/v1/user/doctor-profile?doctorId=${id}`);
        console.log("Doctor Profile Data ", response)
        return response.data?.data;
    } catch (error) {
        handleAxiosError(error)
    }
}

export const getUserPets = async () => {
    try {
        const response = await api.get("http://localhost:8000/api/v1/petOwner/my-pets")
        return response.data.data
    } catch (error) {
        handleAxiosError(error)
    }
}
