import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { createDoctorAccount } from '../api/doctor.api';
import { type DoctorFormData } from '../schemas/doctor.schema';
import { type ApiResponse } from '../api/doctor.api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './authhook';


export const useDoctorAccountHook = (options: UseMutationOptions<ApiResponse, Error, DoctorFormData> = {}) => {
    const { setUser, setIsAuthenticateUser } = useAuth();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: createDoctorAccount,
        // Spread options FIRST so they don't overwrite your custom handlers
        ...options,

        onSuccess: (response, variables, context) => {
            // 1. Your Custom Hook Logic
            setUser(response);
            setIsAuthenticateUser(true);

            if (response.success) {
                console.log("Account Success", response);
                navigate("/verify-otp", { replace: true });
            }

            // 2. Execute the component's onSuccess if it exists
            if (options.onSuccess) {
                options.onSuccess(response, variables, context);
            }
        },

        onError: (error, variables, context) => {
            // 1. Your Custom Hook Logic
            console.log("Doctor Account Error ", error);

            // 2. Execute the component's onError if it exists
            if (options.onError) {
                options.onError(error, variables, context);
            }
        }
    });
}
