import { useAdminLoginMutation } from "@/redux/features/api/baseApi";
import React, { createContext, useContext, useEffect, useState } from "react";
// import { useAdminLoginMutation } from "@/store/api/baseApi";

/* ---------- Types ---------- */

export interface Admin {
  id: number;
  email: string;
  role: string; // SUPER_ADMIN | STAFF | SUB_ADMIN
  permissions: string[]; // route-based permissions
}

interface AuthContextType {
  admin: Admin | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkPermission: (path: string) => boolean;
}

/* ---------- Context ---------- */

const AuthContext = createContext<AuthContextType | null>(null);

/* ---------- Provider ---------- */

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [adminLogin] = useAdminLoginMutation();

  /* ---------- Restore Session ---------- */
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    const storedAdmin = localStorage.getItem("admin");

    if (storedToken && storedAdmin) {
      setToken(storedToken);
      setAdmin(JSON.parse(storedAdmin));
    }

    setIsLoading(false);
  }, []);

  /* ---------- LOGIN ---------- */
  const login = async (email: string, password: string) => {
    const response = await adminLogin({ email, password }).unwrap();

    const { accessToken, admin } = response.data;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("admin", JSON.stringify(admin));

    setToken(accessToken);
    setAdmin(admin);
  };

  /* ---------- LOGOUT ---------- */
  const logout = () => {
    localStorage.clear();
    setAdmin(null);
    setToken(null);
  };

  /* ---------- PERMISSION CHECK ---------- */
  const checkPermission = (path: string): boolean => {
    if (!admin) return false;

    // SUPER_ADMIN can access everything
    if (admin.role === "SUPER_ADMIN") return true;

    // Normalize path (remove trailing slash)
    const normalizedPath = path.replace(/\/$/, "");

    /**
     * Example permissions:
     * [
     *   "/dashboard",
     *   "/orders",
     *   "/orders/:id",
     *   "/vendors"
     * ]
     */
    return admin.permissions.some((permission) => {
      // Convert route param to regex
      const regex = new RegExp(
        "^" + permission.replace(/:\w+/g, "[^/]+") + "$",
      );
      return regex.test(normalizedPath);
    });
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        token,
        isAuthenticated: !!token,
        isLoading,
        login,
        logout,
        checkPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* ---------- Hook ---------- */

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
