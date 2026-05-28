import React, { useState, createContext, useEffect, type SetStateAction } from 'react'
import { type ApiResponse, verifyUser } from '../api/loginuser.api';


type AuthContextType = {
    isAuthenticatedUser: boolean,
    setIsAuthenticateUser: React.Dispatch<SetStateAction<boolean>>,
    user: ApiResponse | undefined,
    setUser: React.Dispatch<SetStateAction<ApiResponse | undefined>>,
    isLoading: boolean,
    setIsLoading: React.Dispatch<SetStateAction<boolean>>
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [isAuthenticatedUser, setIsAuthenticateUser] = useState<boolean>(false);
    const [user, setUser] = useState<ApiResponse | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const veirfyAuthenticatedUser = async () => {
            try {
                setIsLoading(true);
                const response = await verifyUser();
                console.log("Auth Context working....", response)

                if (response.success) {
                    setUser(response);
                    setIsAuthenticateUser(true);
                } else {
                    setIsAuthenticateUser(false);
                    setUser(undefined);
                }
           

            } catch (error) {
                console.log("Error in Auth Provider:", error);
                setIsAuthenticateUser(false);
                setUser(undefined);
            } finally {
                console.log("Finally works");
                setIsLoading(false);
            }
        };

        veirfyAuthenticatedUser();

    }, [])




    return (
        <AuthContext.Provider value={{ user, setUser, isAuthenticatedUser, setIsAuthenticateUser, isLoading, setIsLoading }}>
            {children}
        </AuthContext.Provider>
    )
}