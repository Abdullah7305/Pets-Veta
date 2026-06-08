import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { type VerifyOtpFormData } from '../schemas/verify-otp.schema'
import { verifyUserOtp, type ApiResponse } from '../api/verifyotp.api'

export const useOtp = (options: UseMutationOptions<ApiResponse, Error, VerifyOtpFormData>) => {

    return useMutation({
        mutationFn: verifyUserOtp,
        ...options,
        onSuccess: (data) => {
            console.log("Otp Send success", data)
        },
        onError: (error) => {
            console.log("OTP Error ", error.message);
        }
    })

}