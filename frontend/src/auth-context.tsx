import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

// Define a type for the user data (adjust based on your actual user structure)
interface User {
    id: number;
    username: string;
    email: string;
    // Add any other user properties here
}

interface AuthContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getUser = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/user/", {
                withCredentials: true,
            });

            if (response.data && Object.keys(response.data).length > 0) {
                setUser(response.data);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error("Error fetching user:", error);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
