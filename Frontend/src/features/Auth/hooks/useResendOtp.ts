import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { resendUserOtp, type ApiResponse } from '../api/verifyotp.api'


export const useResendOtp = (options: UseMutationOptions<ApiResponse, Error>) => {
    return useMutation({
        mutationFn: resendUserOtp,
        ...options,
        onSuccess: (data) => {
            console.log("Resend OTP Success ", data)
        },
        onError: (error) => {
            console.log("Resend OTP error ", error.message)
        }
    })
}