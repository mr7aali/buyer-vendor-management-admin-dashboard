import React, { useEffect, useState } from "react";
import { Header } from "../components/dashboard/Header";
import { Shield, Plus, Trash2, Check, X, Loader2 } from "lucide-react";
import {
  useCreateAdminEmployeeMutation,
  useDeleteAdminEmployeeMutation,
  useGetAdminEmployeesQuery,
  useUpdateAdminEmployeePermissionsMutation,
} from "@/redux/features/api/baseApi";
import { AdminEmployee } from "@/@types/admin_employee";
export function PermissionsPage() {
  const {
    data,
    isLoading: isEmployeesLoading,
    isFetching: isEmployeesFetching,
    isError: isEmployeesError,
  } = useGetAdminEmployeesQuery();
  const [createEmployee, { isLoading: isCreating }] =
    useCreateAdminEmployeeMutation();
  const [updatePermissions, { isLoading: isUpdatingPermissions }] =
    useUpdateAdminEmployeePermissionsMutation();
  const [deleteEmployee, { isLoading: isDeleting }] =
    useDeleteAdminEmployeeMutation();

  const [users, setUsers] = useState<AdminEmployee[]>([]);
  const [deletingUserId, setDeletingUserId] = useState<string | number | null>(
    null,
  );
  const [updatingUserId, setUpdatingUserId] = useState<string | number | null>(
    null,
  );
  const [isAdding, setIsAdding] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<
    string | number | null
  >(null);
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
  });

  const permissions = [
    { key: "dashboard.view", name: "View Dashboard", description: "" },
    { key: "analytics.view", name: "View Analytics", description: "" },
    { key: "buyers.view", name: "View Buyers", description: "" },
    { key: "buyers.create", name: "Create Buyer", description: "" },
    { key: "buyers.edit", name: "Edit Buyer", description: "" },
    { key: "buyers.delete", name: "Delete Buyer", description: "" },
    { key: "vendors.view", name: "View Vendors", description: "" },
    { key: "vendors.create", name: "Create Vendor", description: "" },
    { key: "vendors.edit", name: "Edit Vendor", description: "" },
    { key: "vendors.delete", name: "Delete Vendor", description: "" },
    { key: "orders.view", name: "View Orders", description: "" },
    { key: "orders.edit", name: "Edit Orders", description: "" },
    { key: "orders.cancel", name: "Cancel Orders", description: "" },
    { key: "transactions.view", name: "View Transactions", description: "" },
    {
      key: "transactions.refund",
      name: "Refund Transactions",
      description: "",
    },
    { key: "verification.view", name: "View Verifications", description: "" },
    {
      key: "verification.approve",
      name: "Approve Verification",
      description: "",
    },
    {
      key: "verification.reject",
      name: "Reject Verification",
      description: "",
    },
    { key: "permissions.view", name: "View Permissions", description: "" },
    { key: "permissions.assign", name: "Assign Permissions", description: "" },
    { key: "permissions.manage", name: "Manage Permissions", description: "" },
    { key: "settings.view", name: "View Settings", description: "" },
    { key: "settings.update", name: "Update Settings", description: "" },
    { key: "chats.view", name: "View Chats", description: "" },
    { key: "chats.send", name: "Send Messages", description: "" },
    { key: "chats.moderate", name: "Moderate Chats", description: "" },
    { key: "notifications.view", name: "View Notifications", description: "" },
    { key: "notifications.send", name: "Send Notifications", description: "" },
    { key: "account.view", name: "View Account", description: "" },
    { key: "account.update", name: "Update Account", description: "" },
    {
      key: "account.password.change",
      name: "Change Password",
      description: "",
    },
  ];

  const viewPermissions = permissions.filter((permission) =>
    permission.key.endsWith(".view"),
  );

  useEffect(() => {
    if (!data?.data) return;
    setUsers(data.data);
  }, [data]);

  const normalizePermissions = (user: AdminEmployee) => {
    if (!user.permissions) return [];
    if (typeof user.permissions[0] === "string") {
      return user.permissions as string[];
    }
    return (user.permissions as { key: string }[]).map((perm) => perm.key);
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createEmployee({
        email: newUser.email,
        password: newUser.password,
      }).unwrap();
      setIsAdding(false);
      setNewUser({
        email: "",
        password: "",
      });
    } catch (error) {
      // Keep form values so user can adjust and retry
    }
  };
  const togglePermission = async (userId: string | number, key: string) => {
    if (isUpdatingPermissions) return;

    const previousUsers = users;
    const nextUsers = users.map((u) => {
      if (String(u.id) !== String(userId)) return u;
      const currentPermissions = normalizePermissions(u);
      const hasPerm = currentPermissions.includes(key);
      const nextPermissions = hasPerm
        ? currentPermissions.filter((perm) => perm !== key)
        : [...currentPermissions, key];
      return {
        ...u,
        permissions: nextPermissions,
      };
    });

    setUsers(nextUsers);
    setUpdatingUserId(userId);
    try {
      const target = nextUsers.find((u) => String(u.id) === String(userId));
      if (!target) return;
      await updatePermissions({
        id: userId,
        permissions: normalizePermissions(target),
      }).unwrap();
    } catch (error) {
      setUsers(previousUsers);
    } finally {
      setUpdatingUserId(null);
    }
  };
  const deleteUser = (id: string | number) => {
    setConfirmDeleteId(id);
  };

  const cancelDelete = () => {
    setConfirmDeleteId(null);
  };

  const confirmDelete = async (id: string | number) => {
    const previousUsers = users;
    setUsers(users.filter((u) => String(u.id) !== String(id)));
    setDeletingUserId(id);
    try {
      await deleteEmployee(id).unwrap();
      setConfirmDeleteId(null);
    } catch (error) {
      setUsers(previousUsers);
    } finally {
      setDeletingUserId(null);
    }
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
          <div className="flex items-center gap-3">
            {isEmployeesFetching && (
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Refreshing...
              </div>
            )}
            <button
              onClick={() => setIsAdding(true)}
              disabled={isCreating}
              className="flex items-center gap-2 px-4 py-2 bg-[#278687] text-white rounded-lg text-sm font-medium hover:bg-[#1e6b6c] transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <Plus className="h-4 w-4" />
              Add User
            </button>
          </div>
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
                  disabled={isCreating}
                  className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating}
                  className="px-4 py-2 bg-[#278687] text-white rounded-lg text-sm font-medium hover:bg-[#1e6b6c] disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isCreating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Users List */}
        <div className="space-y-6">
          {isEmployeesLoading &&
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm animate-pulse"
              >
                <div className="h-16 border-b border-gray-100 bg-gray-50" />
                <div className="p-6">
                  <div className="mb-4 h-4 w-32 rounded bg-gray-100" />
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
                    {Array.from({ length: 6 }).map((__, permissionIndex) => (
                      <div
                        key={`permission-skeleton-${permissionIndex}`}
                        className="h-5 rounded bg-gray-100"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}

          {!isEmployeesLoading && isEmployeesError && (
            <div className="rounded-2xl border border-red-100 bg-white p-6 text-sm text-red-600 shadow-sm">
              Failed to load users. Please refresh and try again.
            </div>
          )}

          {!isEmployeesLoading && !isEmployeesError && users.length === 0 && (
            <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center text-sm text-gray-500 shadow-sm">
              No users found. Add a user to assign permissions.
            </div>
          )}

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
                  <div className="flex items-center gap-2">
                    {confirmDeleteId === user.id ? (
                      <>
                        <button
                          onClick={() => confirmDelete(user.id)}
                          disabled={
                            isDeleting &&
                            String(deletingUserId) === String(user.id)
                          }
                          className="rounded-lg p-2 text-emerald-600 transition-colors hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-60"
                          title="Confirm delete"
                        >
                          {isDeleting &&
                          String(deletingUserId) === String(user.id) ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                          ) : (
                            <Check className="h-5 w-5" />
                          )}
                        </button>
                        <button
                          onClick={cancelDelete}
                          disabled={
                            isDeleting &&
                            String(deletingUserId) === String(user.id)
                          }
                          className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                          title="Cancel"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => deleteUser(user.id)}
                        disabled={isDeleting}
                        className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                        title="Delete"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                )}
              </div>

              <div className="p-6">
                <h4 className="mb-4 flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Shield className="h-4 w-4" />
                  Page Permissions
                  {isUpdatingPermissions &&
                    String(updatingUserId) === String(user.id) && (
                      <span className="text-xs text-[#278687]">
                        Updating...
                      </span>
                    )}
                </h4>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
                  {viewPermissions.map((permission) => (
                    <label
                      key={permission.key}
                      className="group flex cursor-pointer items-center gap-2"
                    >
                      <div
                        className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${normalizePermissions(user).includes(permission.key) ? "bg-[#278687] border-[#278687]" : "bg-white border-gray-300 group-hover:border-[#278687]"}`}
                      >
                        {normalizePermissions(user).includes(
                          permission.key,
                        ) && <Check className="h-3 w-3 text-white" />}
                      </div>
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={normalizePermissions(user).includes(
                          permission.key,
                        )}
                        // onChange={() =>
                        //   togglePermission(user.id, permission.key)
                        // }
                        onClick={() =>
                          togglePermission(user.id, permission.key)
                        }
                        disabled={
                          user.role === "Admin" ||
                          (isUpdatingPermissions &&
                            String(updatingUserId) === String(user.id)) ||
                          isUpdatingPermissions
                        }
                      />
                      <span
                        className={`text-sm font-semibold ${normalizePermissions(user).includes(permission.key) ? "text-gray-900" : "text-gray-500"}`}
                      >
                        <i> {permission.name.replace("View", "")}</i>
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
