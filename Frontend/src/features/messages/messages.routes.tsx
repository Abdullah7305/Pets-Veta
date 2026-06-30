import { ProtectedRoutes } from "@/ProtectedRoutes/ProtectedRoutes";
import MessagesPage from "./pages/MessagesPage";

export const messageRoutes = [
    {
        path: "/messages",
        element: (
            <ProtectedRoutes>
                <MessagesPage />
            </ProtectedRoutes>
        ),
    },
];