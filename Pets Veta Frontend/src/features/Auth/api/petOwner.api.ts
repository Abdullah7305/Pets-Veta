import axios from "axios";
import type { PetOwnerFormData } from "../schemas/petowner.schema";

export const createPetOwnerAccount = async <T>(data: PetOwnerFormData): Promise<T> => {
    try {
        const response = await axios.post(
            "http://localhost:8000/api/auth/register/pet-owner",
            data,
            {
                withCredentials: true
            }
        );

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Safely check if a response was actually returned from the server
            if (error.response) {
                console.log("Status Code:", error.response.status); // Correct way to get status
                console.error("Response Data:", error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                console.error("No response received from server:", error.request);
            } else {
                // Something happened in setting up the request
                console.error("Axios setup error:", error.message);
            }
        } else {
            console.error("Non-Axios Error:", error);
        }
        throw error;
    }
}