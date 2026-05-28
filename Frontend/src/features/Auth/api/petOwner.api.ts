import axios from "axios";
import type { PetOwnerFormData } from "../schemas/petowner.schema";
import { api } from "@/features/api interface/axios.interface";

export const createPetOwnerAccount = async <T>(data: PetOwnerFormData): Promise<T> => {
    try {
        const response = await api.post("auth/register/pet-owner", data);

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {

            if (error.response) {
                console.log("Status Code:", error.response.status);
                console.error("Response Data:", error.response.data);
            } else if (error.request) {

                console.error("No response received from server:", error.request);
            } else {

                console.error("Axios setup error:", error.message);
            }
        } else {
            console.error("Non-Axios Error:", error);
        }
        throw error;
    }
}

export const getGoogleAuthUrlApi = async () => {
    try {
        const response = await api.get("http://localhost:8000/api/v1/auth/google/url");
        return response.data
    }
    catch (error) {
        if (axios.isAxiosError(error)) {

            if (error.response) {
                console.log("Status Code:", error.response.status);
                console.error("Response Data:", error.response.data);
            } else if (error.request) {

                console.error("No response received from server:", error.request);
            } else {

                console.error("Axios setup error:", error.message);
            }
        } else {
            console.error("Non-Axios Error:", error);
        }
        throw error;
    }
}