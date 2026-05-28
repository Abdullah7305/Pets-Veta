import { useAuth } from "@/features/Auth/hooks/authhook";
import Notfound from "@/shared/components/Notfound/Notfound";
import type React from "react";
import { Navigate } from "react-router-dom";


export const AdminProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticatedUser, isLoading, user } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!isAuthenticatedUser) {
        return <Navigate to={'/admin-login'} />
    }
    if (!user?.data.role.includes('Admin')) {
        return <Notfound />
    }
    return children;
}