import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useLocation,
} from "react-router-dom";

import { routes } from "./routeConfig";
import { useAuth } from "../context/AuthContext";
import Login from "../pages/Login";
import Navbar from "../components/Navbar";
import { JSX } from "react";

function ProtectedRoute({
    children,
    roles,
}: {
    children: JSX.Element;
    roles?: string[];
}) {
    const { user } = useAuth();

    if (!user) return <Navigate to="/login" />;

    // Si la route nécessite un rôle
    if (roles && !roles.includes(user.role)) {
        return <Navigate to="/login" />;
    }

    return children;
}

function Layout() {
    const location = useLocation();
    const hideNavbar = location.pathname === "/login";

    return <>{!hideNavbar && <Navbar />}</>;
}

export default function AppRouter() {
    return (
        <Router>
            <Layout />
            <Routes>
                {/* Route publique */}
                <Route path="/login" element={<Login />} />

                {/* Toutes les routes protégées AUTOMATIQUEMENT */}
                {routes.map((r) => (
                    <Route
                        key={r.path}
                        path={r.path}
                        element={
                            <ProtectedRoute roles={r.roles}>
                                <r.element />
                            </ProtectedRoute>
                        }
                    />
                ))}

                {/* Default */}
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}
