import React, { useState } from "react";
import { Header } from "../components/dashboard/Header";
import { Shield, Plus, Trash2, Edit2, Check } from "lucide-react";
import { APP_PAGES } from "../utils/permissions";
export function PermissionsPage() {
  const [users, setUsers] = useState([
    {
      id: "1",
      email: "steve.r@scan2trade.com",
      role: "Admin",
      permissions: APP_PAGES.map((p) => p.path),
    },
    {
      id: "2",
      email: "natasha.r@scan2trade.com",
      role: "SubAdmin",
      permissions: ["/", "/orders", "/products"],
    },
    {
      id: "3",
      email: "bruce.b@scan2trade.com",
      role: "Staff",
      permissions: ["/orders", "/chats"],
    },
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    role: "Staff",
  });
  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock add
    setUsers([
      ...users,
      {
        id: Date.now().toString(),
        email: newUser.email,
        role: newUser.role,
        permissions: [],
      },
    ]);
    setIsAdding(false);
    setNewUser({
      email: "",
      password: "",
      role: "Staff",
    });
  };
  const togglePermission = (userId: string, path: string) => {
    setUsers(
      users.map((u) => {
        if (u.id !== userId) return u;
        const hasPerm = u.permissions.includes(path);
        return {
          ...u,
          permissions: hasPerm
            ? u.permissions.filter((p) => p !== path)
            : [...u.permissions, path],
        };
      }),
    );
  };
  const deleteUser = (id: string) => {
    setUsers(users.filter((u) => u.id !== id));
  };
  return (
    <div className="min-h-screen bg-[#E8F3F1] font-sans text-gray-900 pb-12">
      <Header />

      <main className="max-w-[1600px] mx-auto px-6 pt-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-2xl font-bold text-gray-900">
              Access Control
            </h1>
            <p className="text-gray-500">
              Manage dashboard users and their permissions.
            </p>
          </div>
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#278687] text-white rounded-lg text-sm font-medium hover:bg-[#1e6b6c] transition-colors shadow-sm"
          >
            <Plus className="h-4 w-4" />
            Add User
          </button>
        </div>

        {/* Add User Form */}
        {isAdding && (
          <div className="animate-in slide-in-from-top-2 mb-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="mb-4 font-bold text-gray-900">New User Details</h3>
            <form
              onSubmit={handleAddUser}
              className="grid grid-cols-1 items-end gap-4 md:grid-cols-4"
            >
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      email: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#278687]/20 focus:border-[#278687]"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      password: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#278687]/20 focus:border-[#278687]"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#278687] text-white rounded-lg text-sm font-medium hover:bg-[#1e6b6c]"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Users List */}
        <div className="space-y-6">
          {users.map((user) => (
            <div
              key={user.id}
              className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
            >
              <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 p-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#278687]/10 flex items-center justify-center text-[#278687] font-bold">
                    {user.email[0].toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {user.email}
                    </h3>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
                      {user.role}
                    </span>
                  </div>
                </div>
                {user.role !== "Admin" && (
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                )}
              </div>

              <div className="p-6">
                <h4 className="mb-4 flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Shield className="h-4 w-4" />
                  Page Permissions
                </h4>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
                  {APP_PAGES.map((page) => (
                    <label
                      key={page.path}
                      className="group flex cursor-pointer items-center gap-2"
                    >
                      <div
                        className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${user.permissions.includes(page.path) ? "bg-[#278687] border-[#278687]" : "bg-white border-gray-300 group-hover:border-[#278687]"}`}
                      >
                        {user.permissions.includes(page.path) && (
                          <Check className="h-3 w-3 text-white" />
                        )}
                      </div>
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={user.permissions.includes(page.path)}
                        onChange={() => togglePermission(user.id, page.path)}
                        disabled={user.role === "Admin"}
                      />
                      <span
                        className={`text-sm ${user.permissions.includes(page.path) ? "text-gray-900" : "text-gray-500"}`}
                      >
                        {page.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
