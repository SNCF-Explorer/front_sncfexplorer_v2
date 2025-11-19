import { JSX } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Login from "../pages/Login";
import AdminDashboard from "../pages/Admin/Dashboard";
import AgentDashboard from "../pages/Agent/Dashboard";
import UserDashboard from "../pages/User/Dashboard";

const ProtectedRoute = ({
    children,
    roles,
}: {
    children: JSX.Element;
    roles: string[];
}) => {
    const { user } = useAuth();
    if (!user) return <Navigate to="/login" />;
    if (!roles.includes(user.role)) return <Navigate to="/login" />;
    return children;
};

export default function AppRouter() {
    return (
        <Router>
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
        </Router>
    );
}
