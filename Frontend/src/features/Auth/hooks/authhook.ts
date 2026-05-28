import { AuthContext } from "../Context/auth.context";
import { useContext } from "react";

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthContextProvider");
    }
    return context;
}
