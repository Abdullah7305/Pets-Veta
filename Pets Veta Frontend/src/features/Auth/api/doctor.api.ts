import axios from "axios";


export const createDoctorAccount = async<T>(data: FormData): Promise<T> => {
    const response = await axios.post<T>("http://localhost:8000/api/auth/register/doctor",
        data,
        {
            withCredentials: true
        }
    )
    return response.data;
}