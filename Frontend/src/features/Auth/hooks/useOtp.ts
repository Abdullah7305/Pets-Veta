import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { type VerifyOtpFormData } from '../schemas/verify-otp.schema'
import { verifyUserOtp, type ApiResponse } from '../api/verifyotp.api'

export const useOtp = (options: UseMutationOptions<ApiResponse, Error, VerifyOtpFormData>) => {

    return useMutation({
        mutationFn: verifyUserOtp,
        ...options,
        onSuccess: (data, variables, context) => {
            console.log("Otp Send success", data)
            options.onSuccess?.(data, variables, context)
        },
        onError: (error, variables, context) => {
            console.log("OTP Error ", error.message);
            options.onError?.(error, variables, context)
        }
    })

}
