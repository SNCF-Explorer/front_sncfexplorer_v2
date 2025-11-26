import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/Navbar.css";

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="logo ">
                <img src={logo} alt="Logo" />
            </div>
            {user && (
                <button onClick={handleLogout} className="logoff_button">
                    Déconnexion
                </button>
            )}
        </nav>
    );
}
