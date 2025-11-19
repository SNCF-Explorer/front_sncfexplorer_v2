import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:4000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (!res.ok) {
                setError("Identifiants invalides");
                return;
            }

            const data = await res.json();
            login(data.token);

            switch (data.role) {
                case "admin":
                    navigate("/admin/dashboard");
                    break;
                case "agent":
                    navigate("/agent/dashboard");
                    break;
                case "user":
                    navigate("/user/dashboard");
                    break;
            }
        } catch {
            setError("Erreur serveur");
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2 className="login-title">Connexion</h2>

                <input
                    type="text"
                    placeholder="Nom d'utilisateur"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="login-input"
                />

                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                />

                <button type="submit" className="login-button">
                    Se connecter
                </button>

                {error && <p className="login-error">{error}</p>}
            </form>
        </div>
    );
}
