import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
interface ProtectedRouteProps {
  children: React.ReactNode;
}
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, checkPermission } = useAuth();
  const location = useLocation();
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#E8F3F1]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#278687]"></div>
      </div>
    );
  }
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{
          from: location,
        }}
        replace
      />
    );
  }
  // Check if user has permission for the current route
  // We strip the trailing slash for consistency
  const currentPath = location.pathname;

  if (!checkPermission(currentPath)) {
    // If user is authenticated but doesn't have permission, redirect to their dashboard or show 403
    // For now, redirect to root which should handle their dashboard view

    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}

//===>> /, analytics,buyers,vendors,orders, transactions, verification,permissions ,settings,chats,notifications,account
