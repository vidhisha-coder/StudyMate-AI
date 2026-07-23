import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Loader2 } from "lucide-react";

export default function ProtectedRoutes() {
  const { isAuthenticated, loading } = useAuth(); // 👈 Use isAuthenticated (not user)

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  // Agar authenticated hai toh Child Layout/Routes show honge (<Outlet />)
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}