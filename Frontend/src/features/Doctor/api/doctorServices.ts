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


export const getDoctorServices = async () => {
    try {
        const response = await api.get("http://localhost:8000/api/v1/doctor/get/services");
        return response.data;

    } catch (error) {
        handleAxiosError(error);
        throw error;
    }

}


export const editDoctorService = async (data: { serviceId: string, skill: string, price: string }) => {
    try {
        const response = await api.patch("http://localhost:8000/api/v1/doctor/edit/service", data);
        return response.data;

    } catch (error) {
        handleAxiosError(error);
        throw error;
    }
}


export const deleteDoctorService = async (serviceId: string) => {
    try {
        const response = await api.delete("http://localhost:8000/api/v1/doctor/delete/service", { data: { serviceId } });
        return response.data;

    } catch (error) {
        handleAxiosError(error);
        throw error;
    }
}