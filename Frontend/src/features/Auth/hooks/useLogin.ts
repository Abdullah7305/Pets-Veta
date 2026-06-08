import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { userLogin, type ApiResponse } from '../api/loginuser.api'
import { type LoginFormData } from '../schemas/login.schema'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './authhook'

export const useLogin = (options: UseMutationOptions<ApiResponse, Error, LoginFormData>) => {
    const navigate = useNavigate();
    const { setIsAuthenticateUser, setUser } = useAuth()
    return useMutation({
        mutationFn: userLogin,
        ...options,

        onSuccess: (data) => {
            console.log("Login Success", data)
            setUser(data);
            setIsAuthenticateUser(true);
            if (data.data.role === "Admin") {
                navigate("/admin-dashboard", { replace: true });
            }
            else if (data.data.role === "Doctor") {
                navigate("/doctor-dashboard", { replace: true });
            }
            else {
                navigate("/", { replace: true });
            }
        },

        onError: (error) => {
            console.log("Login Error ", error.message)
        }

    })
}