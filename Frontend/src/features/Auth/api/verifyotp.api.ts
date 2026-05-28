import axios from "axios";
import type { VerifyOtpFormData } from "../schemas/verify-otp.schema";
import { api } from "@/features/api interface/axios.interface";

export const verifyUserOtp = async<T>(data: VerifyOtpFormData): Promise<T> => {
    try {
        console.log("OTP code inside the function is ", data)
        const response = await api.post("auth/otp-verification",
            data,

        );


        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.status)
            console.error(error.response);

        } else {
            console.error(error);
        }
        throw error;

    }
}

export const resendUserOtp = async<T>(): Promise<T> => {
    try {
        const response = await api.get("auth/resend/otp");


        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.status)
            console.error(error.response);

        } else {
            console.error(error);
        }
        throw error;

    }
}