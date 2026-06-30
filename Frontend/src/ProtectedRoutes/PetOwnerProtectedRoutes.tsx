import { useAuth } from "@/features/Auth/hooks/authhook";
import Notfound from "@/shared/components/Notfound/Notfound";
import type React from "react";
import { Navigate } from "react-router-dom";

export const PetOwnerProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticatedUser, isLoading, user } = useAuth();

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#F8FAFA]">
                <div className="flex flex-col items-center gap-2">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#078b91] border-t-transparent" />
                    <p className="text-sm font-semibold text-slate-500">Checking authorization status...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticatedUser) {
        return <Navigate to="/login" replace />;
    }

    // Safely verify if the active session is a registered Pet Owner
    if (!user?.data?.role?.includes("PetOwner")) {
        return <Notfound />;
    }

    return <>{children}</>;
};