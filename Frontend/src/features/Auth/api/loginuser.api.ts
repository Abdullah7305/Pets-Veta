import axios from "axios"
import type { LoginFormData } from "../schemas/login.schema";
import { api } from "@/features/api interface/axios.interface";

type Data = {
    id: string,
    email: string,
    role: string,
    username: string
}

export type ApiResponse = {
    success: boolean,
    message: string,
    data: Data
}

export const userLogin = async<T>(data: LoginFormData): Promise<T> => {
    try {
        const response = await api.post("auth/login/user", data)
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                console.log("Status Code", error.response?.status);
                console.log("Response Data", error.response?.data)
            }
            else if (error.request) {
                console.log("No Request Response Recieved from server", error.request)
            }
            else {
                console.error("Axios setup error:", error.message);
            }

        }
        else {
            console.error("Non-Axios Error:", error);
        }
        throw error

    }
}


export const verifyUser = async (): Promise<ApiResponse> => {

    try {
        const response = await api.get("auth/me",
            {
                withCredentials: true
            }
        )
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                console.log("Status Code", error.response?.status);
                console.log("Response Data", error.response?.data)
            }
            else if (error.request) {
                console.log("No Request Response Recieved from server", error.request)
            }
            else {
                console.error("Axios setup error:", error.message);
            }

        }
        else {
            console.error("Non-Axios Error:", error);
        }
        throw error

    }
}