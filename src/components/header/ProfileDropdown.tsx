import React from "react";
import { Link } from "react-router-dom";
import { User, LogOut, Settings, Shield } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useGetAdminMeQuery } from "../../redux/features/api/baseApi";
interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}
export function ProfileDropdown({ isOpen, onClose }: ProfileDropdownProps) {
  const { admin: authAdmin, logout } = useAuth();
  const { data } = useGetAdminMeQuery(undefined, { skip: !isOpen });
  const user = data?.data || authAdmin;
  if (!isOpen || !user) return null;
  return (
    <div className="animate-in slide-in-from-top-2 absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl duration-200">
      <div className="border-b border-gray-100 p-4">
        <div className="font-semibold text-gray-900">{user.fullName}</div>
        <div className="text-xs text-gray-500">{user.email}</div>
        <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#278687]/10 text-[#278687]">
          {user.role}
        </div>
      </div>

      <div className="p-2">
        <Link
          to="/account"
          onClick={onClose}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
        >
          <User className="h-4 w-4" />
          My Account
        </Link>
        <Link
          to="/settings"
          onClick={onClose}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>
        {user.role === "SUPER_ADMIN" && (
          <Link
            to="/permissions"
            onClick={onClose}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
          >
            <Shield className="h-4 w-4" />
            Permissions
          </Link>
        )}
      </div>

      <div className="border-t border-gray-100 p-2">
        <button
          onClick={() => {
            logout();
            onClose();
          }}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
}
