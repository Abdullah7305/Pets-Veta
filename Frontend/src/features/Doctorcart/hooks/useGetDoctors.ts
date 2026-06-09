import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import { getApprovedDoctors, type DoctorApiResponse } from '../apis/getDoctors.api'

interface GetDoctorsParams {
    page: number,
    limit: number,
    search: string
}

export const useApprovedDoctors = (
    { page, limit, search }: GetDoctorsParams,
    options?: Omit<UseQueryOptions<DoctorApiResponse, Error>, 'queryKey' | 'queryFn'>

) => {
    return useQuery({
        queryKey: ['approved-doctors', page, limit, search],
        queryFn: () => getApprovedDoctors(page, limit, search),
        ...options,
    })
}