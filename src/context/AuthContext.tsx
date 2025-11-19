import { createContext, useContext, useState, ReactNode } from "react";
import jwtDecode from "jwt-decode";

type User = { id: string; role: string };
type AuthContextType = {
    user: User | null;
    login: (token: string) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(() => {
        const token = localStorage.getItem("token");
        if (token) return jwtDecode<User>(token);
        return null;
    });

    const login = (token: string) => {
        localStorage.setItem("token", token);
        setUser(jwtDecode<User>(token));
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};
