import axios from "axios";


export const createDoctorAccount = async<T>(data: FormData): Promise<T> => {
    const response = await axios.post<T>("http://localhost:8000/api/v1/auth/register/doctor",
        data,
        {
            withCredentials: true
        }
    )
    return response.data;
}