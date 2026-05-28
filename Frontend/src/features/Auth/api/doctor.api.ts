import axios from "axios";
import { api } from "@/features/api interface/axios.interface";


export const createDoctorAccount = async<T>(data: FormData): Promise<T> => {
    try {
        const response = await api.post("auth/register/doctor", data)


        return response.data;
    }
    catch (error) {
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