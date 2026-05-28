import axios from "axios";


export type Data = {
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
    console.log("Api response go==>", data)
    const response = await axios.post("http://localhost:8000/api/v1/auth/login/admin",
        data,
        {
            withCredentials: true
        }
    )
    console.log("Api response come==>", response.data)
    return response.data;
}


export const logoutAdmin = async (): Promise<ApiResponse> => {

    const response = await axios.post("http://localhost:8000/api/v1/auth/logout/user",
        {},
        {
            withCredentials: true
        }
    )
    console.log("Api response come==>", response.data)
    return response.data;
}