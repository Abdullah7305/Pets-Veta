import axios from 'axios'
import { api } from '../../api interface/axios.interface'

export type Data = {
    email: string
}

export type ApiResponse = {
    success: boolean,
    message: string,
    data: Data
}

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


export const submitDoctorSkills = async (doctorSkills: { skill: string, price: string }) => {
    try {
        const response = await api.post("http://localhost:8000/api/v1/doctor/add/service", doctorSkills);
        return response.data;

    } catch (error) {
        handleAxiosError(error);
        throw error;
    }

}

