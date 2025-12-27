import React from 'react';
import { Link } from 'react-router-dom';
import { User, LogOut, Settings, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}
export function ProfileDropdown({
  isOpen,
  onClose
}: ProfileDropdownProps) {
  const {
    user,
    logout
  } = useAuth();
  if (!isOpen || !user) return null;
  return <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-in slide-in-from-top-2 duration-200">
      <div className="p-4 border-b border-gray-100">
        <div className="font-semibold text-gray-900">{user.name}</div>
        <div className="text-xs text-gray-500">{user.email}</div>
        <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#278687]/10 text-[#278687]">
          {user.role}
        </div>
      </div>

      <div className="p-2">
        <Link to="/account" onClick={onClose} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
          <User className="w-4 h-4" />
          My Account
        </Link>
        <Link to="/settings" onClick={onClose} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
          <Settings className="w-4 h-4" />
          Settings
        </Link>
        {user.role === 'Admin' && <Link to="/permissions" onClick={onClose} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
            <Shield className="w-4 h-4" />
            Permissions
          </Link>}
      </div>

      <div className="p-2 border-t border-gray-100">
        <button onClick={() => {
        logout();
        onClose();
      }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>;
}