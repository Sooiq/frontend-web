// src/components/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show a loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-primary">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-purple"></div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to welcome page if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/welcome" replace />;
  }

  // Render protected content if authenticated
  return <>{children}</>;
};

export default ProtectedRoute;
