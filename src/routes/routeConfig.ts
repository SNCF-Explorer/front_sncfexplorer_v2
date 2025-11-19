// Admin
import AdminDashboard from "../pages/Admin/Dashboard";

// Agent
import AgentDashboard from "../pages/Agent/Dashboard";
import AgentMap from "../pages/Agent/Map";

// User
import UserDashboard from "../pages/User/Dashboard";

// Définition ultra simple
export const routes = [
    {
        path: "/admin/dashboard",
        element: AdminDashboard,
        roles: ["admin"],
    },
    {
        path: "/agent/dashboard",
        element: AgentDashboard,
        roles: ["agent"],
    },
    {
        path: "/agent/map",
        element: AgentMap,
        roles: ["agent"],
    },
    {
        path: "/user/dashboard",
        element: UserDashboard,
        roles: ["user"],
    },
];
