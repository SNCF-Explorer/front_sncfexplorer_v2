import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="p-4 flex justify-between items-center bg-gray-200">
            <div className="logo font-bold">LOGO</div>
            {user && (
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                >
                    Déconnexion
                </button>
            )}
        </nav>
    );
}
