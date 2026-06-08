import type { ResetPasswordFormData } from "../schemas/reset-password.schema";
import { api, handleAxiosError } from "@/features/api interface/axios.interface";

type Data = {
    email: string
}

export type ApiResponse = {
    success: boolean,
    message: string,
    data: Data
}

export const resetPasswordRequest = async (data: ResetPasswordFormData): Promise<ApiResponse> => {
    try {
        const response = await api.post("auth/password-resets", data)

        return response.data;

    } catch (error) {
        handleAxiosError(error)
        throw error

    }
}