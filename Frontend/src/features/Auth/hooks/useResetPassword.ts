import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { type ResetPasswordFormData } from '../schemas/reset-password.schema'
import { resetPasswordRequest, type ApiResponse } from '../api/resetpassword.api'


export const useResetPassword = (options: UseMutationOptions<ApiResponse, Error, ResetPasswordFormData>) => {

    return useMutation({
        mutationFn: resetPasswordRequest,
        ...options,
        onSuccess: (data, variables, context) => {
            console.log("Password Reset Successfully", data)
            options.onSuccess?.(data, variables, context)
        },
        onError(error, variables, context) {
            console.log("Error is Reset Password is ", error)
            options.onError?.(error, variables, context)
        },
    })
}
