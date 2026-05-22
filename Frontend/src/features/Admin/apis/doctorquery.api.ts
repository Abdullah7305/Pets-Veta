import axios from "axios";

type Data = {
    id: string,
    userId: string,
    isAvailable: boolean,
    education: string,
    specialization: string,
    address: string,
    degreeLicenseUrl: string,
    experience: number,
    fees: number,
    isVerified: boolean
}

type ApiResponse = {
    success: boolean,
    message: string,
    data?: Data[]
}

export const PendingDoctors = async (): Promise<ApiResponse> => {
    const response = await axios.get('http://localhost:8000/api/v1/admin/pending/doctors',
        {
            withCredentials: true
        }
    )
    return response.data;
}

export const ApprovedDoctors = async (): Promise<ApiResponse> => {
    const response = await axios.get(`http://localhost:8000/api/v1/admin/approved/doctors`,

        {
            withCredentials: true
        }
    )
    return response.data;
}


