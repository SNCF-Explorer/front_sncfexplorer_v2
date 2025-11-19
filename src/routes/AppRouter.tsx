import React, { JSX } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useLocation,
} from "react-router-dom";
import Navbar from "../components/Navbar";

import Login from "../pages/Login";
import AdminDashboard from "../pages/Admin/Dashboard";
import AgentDashboard from "../pages/Agent/Dashboard";
import UserDashboard from "../pages/User/Dashboard";
import { useAuth } from "../context/AuthContext";

// Optionnel : route protégée
function ProtectedRoute({
    children,
    roles,
}: {
    children: JSX.Element;
    roles: string[];
}) {
    const { user } = useAuth();
    if (!user || (roles && !roles.includes(user.role)))
        return <Navigate to="/login" />;
    return children;
}
export default function AppRouter() {
    return (
        <Router>
            <Content />
        </Router>
    );
}

function Content() {
    const location = useLocation();

    return (
        <>
            {location.pathname !== "/login" && <Navbar />}
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute roles={["admin"]}>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/agent/dashboard"
                    element={
                        <ProtectedRoute roles={["agent"]}>
                            <AgentDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/user/dashboard"
                    element={
                        <ProtectedRoute roles={["user"]}>
                            <UserDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </>
    );
}
