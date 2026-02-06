import React, { useState, useRef, useEffect } from "react";
import { Header } from "../components/dashboard/Header";
import {
  User,
  Lock,
  Bell,
  CreditCard,
  Shield,
  Save,
  Download,
  Trash2,
  Plus,
  Monitor,
  Smartphone,
  Globe,
} from "lucide-react";
import jsPDF from "jspdf";
import {
  useChangeAdminPasswordMutation,
  useGetAdminMeQuery,
  useUpdateAdminProfileMutation,
} from "../redux/features/api/baseApi";

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: adminMeData } = useGetAdminMeQuery();
  const [updateAdminProfile, { isLoading: isUpdatingProfile }] =
    useUpdateAdminProfileMutation();
  const [changeAdminPassword, { isLoading: isUpdatingPassword }] =
    useChangeAdminPasswordMutation();

  // Profile State
  const [profileImage, setProfileImage] = useState(
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  );
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [firstName, setFirstName] = useState("Steve");
  const [lastName, setLastName] = useState("Rogers");
  const [email, setEmail] = useState("steve.rogers@scan2trade.com");
  const [bio, setBio] = useState(
    "Super Admin managing the Scan2Trade platform.",
  );

  useEffect(() => {
    const profile = adminMeData?.data;
    if (!profile) return;

    const nameParts = profile.fullName?.trim().split(/\s+/) ?? [];
    setFirstName(nameParts[0] ?? "");
    setLastName(nameParts.slice(1).join(" "));
    setEmail(profile.email ?? "");
    if (profile.avatar) {
      setProfileImage(profile.avatar);
    }
  }, [adminMeData]);

  // Payment Methods State (Stripe Only)
  const [paymentMethods, setPaymentMethods] = useState([
    { id: "1", type: "VISA", last4: "4242", isDefault: true },
    { id: "2", type: "VISA", last4: "8821", isDefault: false },
  ]);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardLast4, setNewCardLast4] = useState("");

  // Active Sessions State (Replacing 2FA)
  const [sessions] = useState([
    {
      id: "1",
      device: "Windows PC",
      browser: "Chrome",
      location: "New York, USA",
      time: "Active now",
      icon: Monitor,
      current: true,
    },
    {
      id: "2",
      device: "iPhone 13",
      browser: "Safari",
      location: "New York, USA",
      time: "2 hours ago",
      icon: Smartphone,
      current: false,
    },
  ]);

  const tabs = [
    { id: "general", label: "General", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Lock },
    { id: "billing", label: "Billing", icon: CreditCard },
  ];

  // Security State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  // Profile Handlers
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage("https://via.placeholder.com/150?text=No+Image");
    setAvatarFile(null);
  };

  // Payment Handlers
  const handleAddCard = () => {
    if (newCardLast4.length === 4) {
      setPaymentMethods([
        ...paymentMethods,
        {
          id: Date.now().toString(),
          type: "VISA",
          last4: newCardLast4,
          isDefault: false,
        },
      ]);
      setIsAddingCard(false);
      setNewCardLast4("");
    }
  };

  const handleSetDefaultPayment = (id: string) => {
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      })),
    );
  };

  const handleDeletePayment = (id: string) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id));
  };

  const handleDownloadInvoice = (invoice: any) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("INVOICE", 14, 22);
    doc.setFontSize(12);
    doc.text(`Date: ${invoice.date}`, 14, 32);
    doc.text(`Amount: ${invoice.amount}`, 14, 38);
    doc.text(`Status: ${invoice.status}`, 14, 44);
    doc.text("Thank you for your business!", 14, 54);
    doc.save(`invoice_${invoice.date}.pdf`);
  };

  const handleSaveChanges = async () => {
    if (activeTab !== "general") return;

    const fullName = `${firstName} ${lastName}`.trim();
    console.log(bio);
    await updateAdminProfile({
      fullName,
      email,
      avatar: avatarFile ?? undefined,
      bio,
    });
  };

  const handleChangePassword = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("Please fill in all password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirmation do not match.");
      return;
    }

    try {
      await changeAdminPassword({
        currentPassword,
        newPassword,
        confirmPassword,
      }).unwrap();

      setPasswordSuccess("Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setPasswordError("Unable to update password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#E8F3F1] font-sans text-gray-900 pb-12">
      <Header />

      <main className="max-w-[1600px] mx-auto px-6 pt-8">
        <div className="mb-8">
          <h1 className="mb-2 text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-500">
            Manage your account settings and preferences.
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar */}
          <div className="w-full flex-shrink-0 lg:w-64">
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
              <nav className="flex flex-col p-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === tab.id ? "bg-[#E8F3F1] text-[#278687]" : "text-gray-600 hover:bg-gray-50"}`}
                  >
                    <tab.icon className="h-5 w-5" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
              {/* General Tab */}
              {activeTab === "general" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="mb-1 text-lg font-bold text-gray-900">
                      Profile Information
                    </h2>
                    <p className="text-sm text-gray-500">
                      Update your photo and personal details.
                    </p>
                  </div>

                  <div className="flex items-center gap-6 border-b border-gray-100 pb-6">
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="h-20 w-20 rounded-full border border-gray-200 object-cover"
                    />
                    <div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        className="hidden"
                        accept="image/*"
                      />
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="mr-3 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                      >
                        Change Photo
                      </button>
                      <button
                        onClick={handleRemoveImage}
                        className="text-sm text-red-600 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#278687]/20 focus:border-[#278687]"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#278687]/20 focus:border-[#278687]"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#278687]/20 focus:border-[#278687]"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Bio
                      </label>
                      <textarea
                        rows={4}
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#278687]/20 focus:border-[#278687]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === "notifications" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="mb-1 text-lg font-bold text-gray-900">
                      Notification Preferences
                    </h2>
                    <p className="text-sm text-gray-500">
                      Choose what you want to be notified about.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {[
                      "New Order Received",
                      "New Vendor Registration",
                      "Product Low Stock Alert",
                      "Weekly Analytics Report",
                      "System Updates",
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between border-b border-gray-50 py-3 last:border-0"
                      >
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {item}
                          </div>
                          <div className="text-xs text-gray-500">
                            Receive notifications via email and push
                          </div>
                        </div>
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input
                            type="checkbox"
                            className="peer sr-only"
                            defaultChecked={i < 3}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#278687]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#278687]"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === "security" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="mb-1 text-lg font-bold text-gray-900">
                      Security Settings
                    </h2>
                    <p className="text-sm text-gray-500">
                      Manage your password and security preferences.
                    </p>
                  </div>

                  <form
                    onSubmit={handleChangePassword}
                    className="mb-6 border-b border-gray-100 pb-6"
                  >
                    <div className="max-w-md space-y-4">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Current Password
                        </label>
                        <input
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#278687]/20 focus:border-[#278687]"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          New Password
                        </label>
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#278687]/20 focus:border-[#278687]"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#278687]/20 focus:border-[#278687]"
                        />
                      </div>

                      {passwordError && (
                        <div className="text-sm text-red-600">
                          {passwordError}
                        </div>
                      )}

                      {passwordSuccess && (
                        <div className="text-sm text-green-600">
                          {passwordSuccess}
                        </div>
                      )}

                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isUpdatingPassword}
                          className="inline-flex items-center gap-2 rounded-lg bg-[#278687] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1e6b6c] disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          <Shield className="h-4 w-4" />
                          {isUpdatingPassword
                            ? "Updating..."
                            : "Update Password"}
                        </button>
                      </div>
                    </div>
                  </form>

                  <div>
                    <h3 className="mb-4 font-bold text-gray-900">
                      Active Sessions
                    </h3>
                    <div className="space-y-3">
                      {sessions.map((session) => (
                        <div
                          key={session.id}
                          className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4"
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500">
                              <session.icon className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {session.device}{" "}
                                <span className="mx-1 text-gray-400">•</span>{" "}
                                {session.browser}
                              </div>
                              <div className="text-xs text-gray-500">
                                {session.location}{" "}
                                <span className="mx-1 text-gray-300">•</span>{" "}
                                {session.time}
                              </div>
                            </div>
                          </div>
                          {session.current ? (
                            <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-bold text-green-700">
                              Current
                            </span>
                          ) : (
                            <button className="text-xs font-medium text-red-600 hover:underline">
                              Revoke
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Billing Tab */}
              {activeTab === "billing" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="mb-1 text-lg font-bold text-gray-900">
                      Billing & Plans
                    </h2>
                    <p className="text-sm text-gray-500">
                      Manage your subscription and payment methods.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="rounded-xl border border-gray-100 p-6">
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="font-bold text-gray-900">
                          Payment Methods
                        </h3>
                        {!isAddingCard && (
                          <button
                            onClick={() => setIsAddingCard(true)}
                            className="text-sm text-[#278687] font-medium hover:underline"
                          >
                            + Add New
                          </button>
                        )}
                      </div>

                      <div className="space-y-3">
                        {paymentMethods.map((method) => (
                          <div
                            key={method.id}
                            className={`flex items-center justify-between p-3 rounded-lg border ${method.isDefault ? "bg-gray-50 border-gray-200" : "bg-white border-gray-100"}`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex h-6 w-10 items-center justify-center rounded border border-gray-200 bg-white">
                                <span className="text-xs font-bold text-blue-800">
                                  {method.type}
                                </span>
                              </div>
                              <div className="text-sm text-gray-700">
                                •••• {method.last4}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {method.isDefault ? (
                                <span className="text-xs font-medium text-gray-500">
                                  Default
                                </span>
                              ) : (
                                <>
                                  <button
                                    onClick={() =>
                                      handleSetDefaultPayment(method.id)
                                    }
                                    className="text-xs text-[#278687] hover:underline"
                                  >
                                    Set Default
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleDeletePayment(method.id)
                                    }
                                    className="text-gray-400 hover:text-red-500"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        ))}

                        {isAddingCard && (
                          <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4">
                            <h4 className="mb-3 text-sm font-bold text-gray-900">
                              Add New Card (Stripe)
                            </h4>
                            <input
                              type="text"
                              placeholder="Last 4 digits (Mock)"
                              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-[#278687]"
                              value={newCardLast4}
                              onChange={(e) => setNewCardLast4(e.target.value)}
                              maxLength={4}
                            />
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => setIsAddingCard(false)}
                                className="text-xs text-gray-500 hover:text-gray-700"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={handleAddCard}
                                className="px-3 py-1 bg-[#278687] text-white text-xs rounded-lg hover:bg-[#1f6b6c]"
                              >
                                Add Card
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="rounded-xl border border-gray-100 p-6">
                      <h3 className="mb-4 font-bold text-gray-900">
                        Billing History
                      </h3>
                      <div className="space-y-1">
                        {[
                          {
                            date: "Oct 1, 2023",
                            amount: "$29.00",
                            status: "Paid",
                          },
                          {
                            date: "Sep 1, 2023",
                            amount: "$29.00",
                            status: "Paid",
                          },
                          {
                            date: "Aug 1, 2023",
                            amount: "$29.00",
                            status: "Paid",
                          },
                        ].map((inv, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between py-2 text-sm"
                          >
                            <div className="text-gray-600">{inv.date}</div>
                            <div className="flex items-center gap-4">
                              <span className="font-medium text-gray-900">
                                {inv.amount}
                              </span>
                              <button
                                onClick={() => handleDownloadInvoice(inv)}
                                className="text-gray-400 hover:text-[#278687]"
                              >
                                <Download className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 flex justify-end gap-3 border-t border-gray-100 pt-6">
                <button className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                  Cancel
                </button>
                <button
                  onClick={handleSaveChanges}
                  disabled={activeTab !== "general" || isUpdatingProfile}
                  className="flex items-center gap-2 px-6 py-2 bg-[#278687] text-white rounded-lg text-sm font-medium hover:bg-[#1e6b6c] transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Save className="h-4 w-4" />
                  {isUpdatingProfile ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
