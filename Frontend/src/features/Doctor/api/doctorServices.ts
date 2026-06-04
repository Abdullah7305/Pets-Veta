import axios from 'axios'
import { api } from '../../api interface/axios.interface'
import { handleAxiosError } from '../../api interface/axios.interface'

export type Data = {
    email: string
}

export type ApiResponse = {
    success: boolean,
    message: string,
    data: Data
}



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