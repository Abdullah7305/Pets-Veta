import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import { getDoctorProfileApi, type DoctorProfileApiResponse } from '../apis/doctorProfile.api'



export const useDoctorProfileById = (
    options?: Omit<UseQueryOptions<DoctorProfileApiResponse, Error>, 'queryFn' | 'queryKey'>
) => {
    return useQuery({
        queryKey: ['doctor-profile'],
        queryFn: () => getDoctorProfileApi(),
        ...options
    })
}