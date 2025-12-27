import React, { useState } from 'react';
import { Header } from '../components/dashboard/Header';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Shield, Save, Lock } from 'lucide-react';
export function AccountPage() {
  const {
    user
  } = useAuth();
  const isAdmin = user?.role === 'Admin';
  const [isEditing, setIsEditing] = useState(false);
  return <div className="min-h-screen bg-[#E8F3F1] font-sans text-gray-900 pb-12">
      <Header />

      <main className="max-w-[1600px] mx-auto px-6 pt-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">My Account</h1>
          <p className="text-gray-500">
            Manage your personal information and security.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-gray-900">Profile Information</h3>
                {isAdmin && !isEditing && <button onClick={() => setIsEditing(true)} className="text-sm font-medium text-[#278687] hover:underline">
                    Edit Profile
                  </button>}
              </div>

              <div className="p-8">
                <div className="flex items-center gap-6 mb-8">
                  <div className="relative">
                    <img src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'} alt="Profile" className="w-24 h-24 rounded-full border-4 border-gray-50" />
                    {isEditing && <button className="absolute bottom-0 right-0 bg-white border border-gray-200 p-1.5 rounded-full shadow-sm hover:bg-gray-50">
                        <User className="w-4 h-4 text-gray-600" />
                      </button>}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {user?.name}
                    </h2>
                    <p className="text-gray-500">{user?.role}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input type="text" defaultValue={user?.name} disabled={!isEditing} className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#278687]/20 focus:border-[#278687] disabled:opacity-60 disabled:cursor-not-allowed" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input type="email" defaultValue={user?.email} disabled={!isEditing} className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#278687]/20 focus:border-[#278687] disabled:opacity-60 disabled:cursor-not-allowed" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role
                    </label>
                    <div className="relative">
                      <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input type="text" defaultValue={user?.role} disabled className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#278687]/20 focus:border-[#278687] disabled:opacity-60 disabled:cursor-not-allowed" />
                    </div>
                  </div>
                </div>

                {isEditing && <div className="mt-8 flex justify-end gap-3">
                    <button onClick={() => setIsEditing(false)} className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
                      Cancel
                    </button>
                    <button onClick={() => setIsEditing(false)} className="flex items-center gap-2 px-4 py-2 bg-[#278687] text-white rounded-lg text-sm font-medium hover:bg-[#1e6b6c]">
                      <Save className="w-4 h-4" />
                      Save Changes
                    </button>
                  </div>}
              </div>
            </div>
          </div>

          {/* Security Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h3 className="font-bold text-gray-900">Security</h3>
              </div>
              <div className="p-6">
                {isAdmin ? <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">
                        Password
                      </h4>
                      <p className="text-xs text-gray-500 mb-4">
                        Last changed 3 months ago
                      </p>
                      <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                        <Lock className="w-4 h-4" />
                        Change Password
                      </button>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">
                        Two-Factor Auth
                      </h4>
                      <p className="text-xs text-gray-500 mb-4">
                        Add an extra layer of security
                      </p>
                      <button className="w-full px-4 py-2 bg-[#278687]/10 text-[#278687] rounded-lg text-sm font-medium hover:bg-[#278687]/20 transition-colors">
                        Enable 2FA
                      </button>
                    </div>
                  </div> : <div className="text-center py-8">
                    <Lock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-sm text-gray-500">
                      Security settings are managed by your administrator.
                      Contact support for changes.
                    </p>
                  </div>}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>;
}