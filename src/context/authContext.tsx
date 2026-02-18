import { createContext } from "react";

/* User Type */
export interface User {
    _id: string;
    name: string;
    email: string;
}

/* Context Type */
export interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (user: User, token: string) => void;
    logout: () => void;
}

/* Create Context */
export const UserContext = createContext<AuthContextType | undefined>(
    undefined
);
