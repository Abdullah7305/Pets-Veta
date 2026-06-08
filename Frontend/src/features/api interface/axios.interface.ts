import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:8000/api/v1/',
    withCredentials: true
})

export const handleAxiosError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        if (error.response) {
            console.log("Status Code", error.response?.status);
            console.log("Response Data", error.response?.data);
        } else if (error.request) {
            console.log("No Request Response Received", error.request);
        }
        
        throw error;
    } else {
        console.error("Non-Axios Error:", error);
        throw error;
    }
};

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                console.log("Acces token expires ...trying to make the new access token");

                await axios.get("http://localhost:8000/api/v1/auth/refresh/token",
                    {
                        withCredentials: true
                    }
                )
                console.log("Token Refreshed...");
                return api(originalRequest);

            } catch (refreshError) {
                console.error("Refresh Token expired or Invalid");

                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
)

