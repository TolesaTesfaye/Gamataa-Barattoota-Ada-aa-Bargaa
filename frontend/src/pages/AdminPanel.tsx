import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function AdminPanel() {
  const { user } = useAuthStore();

  if (user?.role === "superadmin" || user?.role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Navigate to="/dashboard" replace />;
}
