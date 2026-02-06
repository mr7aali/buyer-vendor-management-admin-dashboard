import React, { useEffect, useMemo, useState } from "react";
import { Header } from "../components/dashboard/Header";
import { useAuth } from "../contexts/AuthContext";
import { User, Mail, Shield, Save, Lock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import {
  useChangeAdminPasswordMutation,
  useUpdateAdminProfileMutation,
} from "@/redux/features/api/baseApi";
export function AccountPage() {
  const { admin: user, updateAdmin } = useAuth();
  const [updateAdminProfile, { isLoading: isUpdating }] =
    useUpdateAdminProfileMutation();
  const [changeAdminPassword, { isLoading: isPasswordUpdating }] =
    useChangeAdminPasswordMutation();
  const lastUpdated = user?.updatedAt
    ? formatDistanceToNow(new Date(user.updatedAt), { addSuffix: true })
    : "N/A";
  const isAdmin = user?.role !== "Admin";
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState(
    user?.avatar ||
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isPasswordEditing, setIsPasswordEditing] = useState(false);
  const [passwordValues, setPasswordValues] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    setFormValues({
      fullName: user.fullName || "",
      email: user.email || "",
    });
    setAvatarPreview(
      user.avatar ||
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    );
  }, [user]);

  useEffect(() => {
    if (!avatarFile) return;
    const objectUrl = URL.createObjectURL(avatarFile);
    setAvatarPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [avatarFile]);

  const canSave = useMemo(() => {
    const nameChanged = formValues.fullName !== (user?.fullName || "");
    const emailChanged = formValues.email !== (user?.email || "");
    return (nameChanged || emailChanged || !!avatarFile) && !isUpdating;
  }, [formValues, user, avatarFile, isUpdating]);

  const handleSave = async () => {
    if (!user) return;
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      const response = await updateAdminProfile({
        fullName: formValues.fullName.trim(),
        email: formValues.email.trim(),
        avatar: avatarFile,
      }).unwrap();

      const updated = response.data;
      updateAdmin({
        fullName: updated.fullName,
        email: updated.email,
        avatar: updated.avatar,
        updatedAt: updated.updatedAt,
      });
      setFormValues({
        fullName: updated.fullName || "",
        email: updated.email || "",
      });
      setAvatarFile(null);
      setAvatarPreview(
        updated.avatar ||
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      );
      setIsEditing(false);
      setSuccessMessage("Profile updated successfully.");
    } catch (error) {
      setErrorMessage("Failed to update profile. Please try again.");
    }
  };

  const handlePasswordSave = async () => {
    setPasswordError(null);
    setPasswordSuccess(null);

    if (!passwordValues.currentPassword || !passwordValues.newPassword) {
      setPasswordError("Please fill out all password fields.");
      return;
    }

    if (passwordValues.newPassword !== passwordValues.confirmPassword) {
      setPasswordError("New password and confirmation do not match.");
      return;
    }

    try {
      await changeAdminPassword({
        currentPassword: passwordValues.currentPassword,
        newPassword: passwordValues.newPassword,
        confirmPassword: passwordValues.confirmPassword,
      }).unwrap();
      setPasswordValues({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setIsPasswordEditing(false);
      setPasswordSuccess("Password updated successfully.");
    } catch (error) {
      setPasswordError("Failed to update password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#E8F3F1] font-sans text-gray-900 pb-12">
      <Header />

      <main className="max-w-[1600px] mx-auto px-6 pt-8">
        <div className="mb-8">
          <h1 className="mb-2 text-2xl font-bold text-gray-900">My Account</h1>
          <p className="text-gray-500">
            Manage your personal information and security.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-100 p-6">
                <h3 className="font-bold text-gray-900">Profile Information</h3>
                {isAdmin && !isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-sm font-medium text-[#278687] hover:underline"
                  >
                    Edit Profile
                  </button>
                )}
              </div>

              <div className="p-8">
                <div className="mb-8 flex items-center gap-6">
                  <div className="relative">
                    <img
                      src={avatarPreview}
                      alt="Profile"
                      className="h-24 w-24 rounded-full border-4 border-gray-50"
                    />
                    {isEditing && (
                      <label className="absolute bottom-0 right-0 cursor-pointer bg-white border border-gray-200 p-1.5 rounded-full shadow-sm hover:bg-gray-50">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(event) => {
                            const file = event.target.files?.[0] || null;
                            setAvatarFile(file);
                          }}
                        />
                        <User className="h-4 w-4 text-gray-600" />
                      </label>
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {formValues.fullName || "N/A"}
                    </h2>
                    <p className="text-gray-500">{user?.role}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                      <input
                        type="text"
                        value={formValues.fullName}
                        onChange={(event) =>
                          setFormValues((prev) => ({
                            ...prev,
                            fullName: event.target.value,
                          }))
                        }
                        disabled={!isEditing}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#278687]/20 focus:border-[#278687] disabled:opacity-60 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                      <input
                        type="email"
                        value={formValues.email}
                        onChange={(event) =>
                          setFormValues((prev) => ({
                            ...prev,
                            email: event.target.value,
                          }))
                        }
                        disabled={!isEditing}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#278687]/20 focus:border-[#278687] disabled:opacity-60 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Role
                    </label>
                    <div className="relative">
                      <Shield className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                      <input
                        type="text"
                        defaultValue={user?.role}
                        disabled
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#278687]/20 focus:border-[#278687] disabled:opacity-60 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <div className="mt-8 flex justify-end gap-3">
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setFormValues({
                          fullName: user?.fullName || "",
                          email: user?.email || "",
                        });
                        setAvatarFile(null);
                        setAvatarPreview(
                          user?.avatar ||
                            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                        );
                        setErrorMessage(null);
                        setSuccessMessage(null);
                      }}
                      className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={!canSave}
                      className="flex items-center gap-2 px-4 py-2 bg-[#278687] text-white rounded-lg text-sm font-medium hover:bg-[#1e6b6c] disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <Save className="h-4 w-4" />
                      {isUpdating ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                )}
                {errorMessage && (
                  <p className="mt-4 text-sm text-red-600">{errorMessage}</p>
                )}
                {successMessage && (
                  <p className="mt-4 text-sm text-green-600">
                    {successMessage}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Security Card */}
          <div className="lg:col-span-1">
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
              <div className="border-b border-gray-100 p-6">
                <h3 className="font-bold text-gray-900">Security</h3>
              </div>
              <div className="p-6">
                {isAdmin ? (
                  <div className="space-y-6">
                    <div>
                      <h4 className="mb-2 text-sm font-medium text-gray-900">
                        Password
                      </h4>
                      <p className="mb-4 text-xs text-gray-500">
                        <p>Last profile changed {lastUpdated}</p>
                      </p>
                      {!isPasswordEditing ? (
                        <button
                          onClick={() => {
                            setIsPasswordEditing(true);
                            setPasswordError(null);
                            setPasswordSuccess(null);
                          }}
                          className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
                        >
                          <Lock className="h-4 w-4" />
                          Change Password
                        </button>
                      ) : (
                        <div className="space-y-4">
                          <div>
                            <label className="mb-2 block text-xs font-medium text-gray-700">
                              Current Password
                            </label>
                            <input
                              type="password"
                              value={passwordValues.currentPassword}
                              onChange={(event) =>
                                setPasswordValues((prev) => ({
                                  ...prev,
                                  currentPassword: event.target.value,
                                }))
                              }
                              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#278687] focus:outline-none focus:ring-2 focus:ring-[#278687]/20"
                            />
                          </div>
                          <div>
                            <label className="mb-2 block text-xs font-medium text-gray-700">
                              New Password
                            </label>
                            <input
                              type="password"
                              value={passwordValues.newPassword}
                              onChange={(event) =>
                                setPasswordValues((prev) => ({
                                  ...prev,
                                  newPassword: event.target.value,
                                }))
                              }
                              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#278687] focus:outline-none focus:ring-2 focus:ring-[#278687]/20"
                            />
                          </div>
                          <div>
                            <label className="mb-2 block text-xs font-medium text-gray-700">
                              Confirm Password
                            </label>
                            <input
                              type="password"
                              value={passwordValues.confirmPassword}
                              onChange={(event) =>
                                setPasswordValues((prev) => ({
                                  ...prev,
                                  confirmPassword: event.target.value,
                                }))
                              }
                              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#278687] focus:outline-none focus:ring-2 focus:ring-[#278687]/20"
                            />
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setIsPasswordEditing(false);
                                setPasswordValues({
                                  currentPassword: "",
                                  newPassword: "",
                                  confirmPassword: "",
                                });
                                setPasswordError(null);
                                setPasswordSuccess(null);
                              }}
                              className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handlePasswordSave}
                              disabled={isPasswordUpdating}
                              className="flex-1 rounded-lg bg-[#278687] px-3 py-2 text-xs font-medium text-white hover:bg-[#1e6b6c] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {isPasswordUpdating ? "Saving..." : "Update"}
                            </button>
                          </div>
                          {passwordError && (
                            <p className="text-xs text-red-600">
                              {passwordError}
                            </p>
                          )}
                          {passwordSuccess && (
                            <p className="text-xs text-green-600">
                              {passwordSuccess}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <Lock className="mx-auto mb-3 h-12 w-12 text-gray-300" />
                    <p className="text-sm text-gray-500">
                      Security settings are managed by your administrator.
                      Contact support for changes.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
