import { api, handleAxiosError } from "@/features/api interface/axios.interface";

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


type BookDoctorSlotPayload = {
    slotId: string;
    doctorId: string;
};

export const bookDoctorSlot = async (schedule: BookDoctorSlotPayload) => {
    try {
        const response = await api.post("http://localhost:8000/api/v1/petOwner/book-slot", schedule);
        return response.data
    } catch (error) {
        handleAxiosError(error)
    }
} 
