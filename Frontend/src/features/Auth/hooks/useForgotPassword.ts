import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { type ForgotPasswordFormData } from '../schemas/forgot-password.schema'
import { veriyUserEmail, type ApiResponse } from '../api/verifyemail.api'

export const useForgotPassword = (options: UseMutationOptions<ApiResponse, Error, ForgotPasswordFormData>) => {

    return useMutation({
        mutationFn: veriyUserEmail,
        ...options,
        onSuccess: (data, variables, context) => {
            console.log("Forgot Password Successful ", data)
            options.onSuccess?.(data, variables, context)
        },
        onError: (error, variables, context) => {
            console.log("Error is  Forgot Password ", error.message)
            options.onError?.(error, variables, context)
        }
    })
}
