import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { createDoctorAccount } from '../api/doctor.api';
import { type ApiResponse } from '../api/doctor.api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './authhook';

export const useDoctorAccountHook = (options: UseMutationOptions<ApiResponse, Error, FormData> = {}) => {
    const { setUser, setIsAuthenticateUser } = useAuth();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: createDoctorAccount,
        ...options,

        onSuccess: (response, variables, onMutateResult, context) => {
            setUser(response);
            setIsAuthenticateUser(true);

            if (response.success) {
                console.log("Account Success", response);
                navigate("/verify-otp", { replace: true });
            }

            if (options.onSuccess) {
                options.onSuccess(response, variables, onMutateResult, context);
            }
        },

        onError: (error, variables, onMutateResult, context) => {
            console.log("Doctor Account Error ", error);

            if (options.onError) {
                options.onError(error, variables, onMutateResult, context);
            }
        }
    });
}
