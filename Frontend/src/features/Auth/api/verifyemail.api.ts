import axios from "axios";
import type { ForgotPasswordFormData } from "../schemas/forgot-password.schema";

export const veriyUserEmail = async<T>(data: ForgotPasswordFormData): Promise<T> => {
    try {
        const response = await axios.post("http://localhost:8000/api/v1/auth/verify/email",
            data,
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