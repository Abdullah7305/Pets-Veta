import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { type PetOwnerFormData } from '../schemas/petowner.schema'
import { createPetOwnerAccount } from '../api/petOwner.api'
import { type ApiResponse } from '../api/petOwner.api'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './authhook'
import { AxiosError } from 'axios'

type ApiErrorRespone = {
    message: string
}


export const usePetOwnerHook = (options: UseMutationOptions<ApiResponse, AxiosError<ApiErrorRespone>, PetOwnerFormData>) => {

    const { setUser, setIsAuthenticateUser } = useAuth();
    const navigate = useNavigate();


    return useMutation({

        mutationFn: createPetOwnerAccount,

        ...options,

        onSuccess: (response) => {
            console.log("Account Success", response)
            setUser(response);
            setIsAuthenticateUser(true);
            if (response?.success) {
                navigate('/verify-otp')
            }

        },

        onError: (error) => {
            console.log("Account Error ", error.message)

        }
    })
}