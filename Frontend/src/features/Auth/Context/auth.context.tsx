import { useState, createContext, useEffect } from 'react'
import { type ApiResponse, verifyUser } from '../api/loginuser.api';
import type {
    AuthContextProviderProps,
    AuthContextType,
} from "../types/auth.types";


export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {

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
