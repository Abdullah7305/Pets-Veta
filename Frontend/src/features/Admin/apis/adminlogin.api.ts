import axios from "axios";

type Data = {
    name: string,
    email: string,
    username: string,
    role: string
}

export type ApiResponse = {
    success: boolean,
    message: string,
    data: Data
}

type ApiPostData = {
    email: string,
    password: string
}

export const loginAdminAccount = async (data: ApiPostData): Promise<ApiResponse> => {
    const response = await axios.post("http://localhost:8000/api/v1/auth/login/admin",
        data,
    )
    return response.data;
}