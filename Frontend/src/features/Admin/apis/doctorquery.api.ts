import axios from "axios";

export const PendingDoctors = async () => {
    const response = await axios.get('http://localhost:8000/api/v1/admin/pending/doctor',
        {
            withCredentials: true
        }
    )
    return response.data;
}