import axios from "axios";
import type { VerifyOtpFormData } from "../schemas/verify-otp.schema";

export const verifyUserOtp = async<T>(data: VerifyOtpFormData): Promise<T> => {
    try {
        console.log("OTP code inside the function is ", data)
        const response = await axios.post("http://localhost:8000/api/v1/auth/otp-verification",
            data,
            {
                withCredentials: true
            }
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
        const response = await axios.get("http://localhost:8000/api/auth/resend/otp",
            {
                withCredentials: true
            }
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