import React, { useEffect, useState, createContext, useContext } from 'react';
import { Role, ROLE_PERMISSIONS } from '../utils/permissions';
interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
}
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, role?: Role) => Promise<void>;
  logout: () => void;
  checkPermission: (path: string) => boolean;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export function AuthProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('scan2trade_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);
  const login = async (email: string, role: Role = 'Admin') => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mockUser: User = {
      id: '1',
      name: 'Steve Rogers',
      email,
      role,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    };
    setUser(mockUser);
    localStorage.setItem('scan2trade_user', JSON.stringify(mockUser));
    setIsLoading(false);
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('scan2trade_user');
  };
  const checkPermission = (path: string): boolean => {
    if (!user) return false;
    const allowedPaths = ROLE_PERMISSIONS[user.role] || [];
    if (path === '/') return allowedPaths.includes('/');
    // Allow access to sub-routes (e.g., /orders/123) if parent (/orders) is allowed
    return allowedPaths.some(allowed => allowed !== '/' && path.startsWith(allowed));
  };
  return <AuthContext.Provider value={{
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    checkPermission
  }}>
      {children}
    </AuthContext.Provider>;
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}