import { Navigate } from "react-router-dom";
import Notfound from "@/shared/components/Notfound/Notfound";
import { useAuth } from "@/features/Auth/hooks/authhook";

export const DoctorProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const role = 'doctor';
    const { isAuthenticatedUser, user, isLoading } = useAuth();
    if (isLoading) {
        return <h1>Loading...</h1>
    }
    if (!isAuthenticatedUser) {
        return <Navigate to={'/login'}></Navigate>
    }
    if (!user?.data.role.toLowerCase().includes(role)) {
        return <Notfound />
    }
    return children;
}