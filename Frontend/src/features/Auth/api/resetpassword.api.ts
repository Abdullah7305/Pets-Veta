import axios from "axios";
import type { ResetPasswordFormData } from "../schemas/reset-password.schema";

export const resetPasswordRequest = async<T>(data: ResetPasswordFormData): Promise<T> => {
    try {
        const response = await axios.post("http://localhost:8000/api/v1/auth/password-resets",
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