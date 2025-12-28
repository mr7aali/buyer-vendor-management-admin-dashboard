import React, { useState, useRef } from 'react';
import { Header } from '../components/dashboard/Header';
import { User, Lock, Bell, CreditCard, Shield, Save, Download, Trash2, Plus, Monitor, Smartphone, Globe } from 'lucide-react';
import jsPDF from 'jspdf';

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Profile State
  const [profileImage, setProfileImage] = useState("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80");

  // Payment Methods State (Stripe Only)
  const [paymentMethods, setPaymentMethods] = useState([
    { id: '1', type: 'VISA', last4: '4242', isDefault: true },
    { id: '2', type: 'VISA', last4: '8821', isDefault: false }
  ]);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardLast4, setNewCardLast4] = useState('');

  // Active Sessions State (Replacing 2FA)
  const [sessions] = useState([
    { id: '1', device: 'Windows PC', browser: 'Chrome', location: 'New York, USA', time: 'Active now', icon: Monitor, current: true },
    { id: '2', device: 'iPhone 13', browser: 'Safari', location: 'New York, USA', time: '2 hours ago', icon: Smartphone, current: false },
  ]);

  const tabs = [
    { id: 'general', label: 'General', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'billing', label: 'Billing', icon: CreditCard }
  ];

  // Profile Handlers
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage("https://via.placeholder.com/150?text=No+Image");
  };

  // Payment Handlers
  const handleAddCard = () => {
    if (newCardLast4.length === 4) {
      setPaymentMethods([...paymentMethods, {
        id: Date.now().toString(),
        type: 'VISA',
        last4: newCardLast4,
        isDefault: false
      }]);
      setIsAddingCard(false);
      setNewCardLast4('');
    }
  };

  const handleSetDefaultPayment = (id: string) => {
    setPaymentMethods(paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id
    })));
  };

  const handleDeletePayment = (id: string) => {
    setPaymentMethods(paymentMethods.filter(method => method.id !== id));
  };

  const handleDownloadInvoice = (invoice: any) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('INVOICE', 14, 22);
    doc.setFontSize(12);
    doc.text(`Date: ${invoice.date}`, 14, 32);
    doc.text(`Amount: ${invoice.amount}`, 14, 38);
    doc.text(`Status: ${invoice.status}`, 14, 44);
    doc.text('Thank you for your business!', 14, 54);
    doc.save(`invoice_${invoice.date}.pdf`);
  };

  return (
    <div className="min-h-screen bg-[#E8F3F1] font-sans text-gray-900 pb-12">
      <Header />

      <main className="max-w-[1600px] mx-auto px-6 pt-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-500">Manage your account settings and preferences.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <nav className="flex flex-col p-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === tab.id ? 'bg-[#E8F3F1] text-[#278687]' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

              {/* General Tab */}
              {activeTab === 'general' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-1">Profile Information</h2>
                    <p className="text-sm text-gray-500">Update your photo and personal details.</p>
                  </div>

                  <div className="flex items-center gap-6 pb-6 border-b border-gray-100">
                    <img src={profileImage} alt="Profile" className="w-20 h-20 rounded-full border border-gray-200 object-cover" />
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
                        className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors mr-3"
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <input type="text" defaultValue="Steve" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#278687]/20 focus:border-[#278687]" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input type="text" defaultValue="Rogers" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#278687]/20 focus:border-[#278687]" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input type="email" defaultValue="steve.rogers@scan2trade.com" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#278687]/20 focus:border-[#278687]" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                      <textarea rows={4} defaultValue="Super Admin managing the Scan2Trade platform." className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#278687]/20 focus:border-[#278687]" />
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-1">Notification Preferences</h2>
                    <p className="text-sm text-gray-500">Choose what you want to be notified about.</p>
                  </div>

                  <div className="space-y-4">
                    {['New Order Received', 'New Vendor Registration', 'Product Low Stock Alert', 'Weekly Analytics Report', 'System Updates'].map((item, i) => (
                      <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{item}</div>
                          <div className="text-xs text-gray-500">Receive notifications via email and push</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked={i < 3} />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#278687]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#278687]"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-1">Security Settings</h2>
                    <p className="text-sm text-gray-500">Manage your password and security preferences.</p>
                  </div>

                  <div className="border-b border-gray-100 pb-6 mb-6">
                    <div className="space-y-4 max-w-md">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                        <input type="password" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#278687]/20 focus:border-[#278687]" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                        <input type="password" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#278687]/20 focus:border-[#278687]" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                        <input type="password" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#278687]/20 focus:border-[#278687]" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900 mb-4">Active Sessions</h3>
                    <div className="space-y-3">
                      {sessions.map((session) => (
                        <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-200 text-gray-500">
                              <session.icon className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {session.device} <span className="text-gray-400 mx-1">•</span> {session.browser}
                              </div>
                              <div className="text-xs text-gray-500">
                                {session.location} <span className="text-gray-300 mx-1">•</span> {session.time}
                              </div>
                            </div>
                          </div>
                          {session.current ? (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Current</span>
                          ) : (
                            <button className="text-red-600 text-xs font-medium hover:underline">Revoke</button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Billing Tab */}
              {activeTab === 'billing' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-1">Billing & Plans</h2>
                    <p className="text-sm text-gray-500">Manage your subscription and payment methods.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-gray-100 rounded-xl p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-gray-900">Payment Methods</h3>
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
                        {paymentMethods.map(method => (
                          <div key={method.id} className={`flex items-center justify-between p-3 rounded-lg border ${method.isDefault ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-100'}`}>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-6 bg-white border border-gray-200 rounded flex items-center justify-center">
                                <span className="text-xs font-bold text-blue-800">{method.type}</span>
                              </div>
                              <div className="text-sm text-gray-700">•••• {method.last4}</div>
                            </div>
                            <div className="flex items-center gap-2">
                              {method.isDefault ? (
                                <span className="text-xs font-medium text-gray-500">Default</span>
                              ) : (
                                <>
                                  <button onClick={() => handleSetDefaultPayment(method.id)} className="text-xs text-[#278687] hover:underline">Set Default</button>
                                  <button onClick={() => handleDeletePayment(method.id)} className="text-gray-400 hover:text-red-500">
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        ))}

                        {isAddingCard && (
                          <div className="p-4 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                            <h4 className="text-sm font-bold text-gray-900 mb-3">Add New Card (Stripe)</h4>
                            <input
                              type="text"
                              placeholder="Last 4 digits (Mock)"
                              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-[#278687]"
                              value={newCardLast4}
                              onChange={(e) => setNewCardLast4(e.target.value)}
                              maxLength={4}
                            />
                            <div className="flex gap-2 justify-end">
                              <button onClick={() => setIsAddingCard(false)} className="text-xs text-gray-500 hover:text-gray-700">Cancel</button>
                              <button onClick={handleAddCard} className="px-3 py-1 bg-[#278687] text-white text-xs rounded-lg hover:bg-[#1f6b6c]">Add Card</button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="border border-gray-100 rounded-xl p-6">
                      <h3 className="font-bold text-gray-900 mb-4">Billing History</h3>
                      <div className="space-y-1">
                        {[
                          { date: 'Oct 1, 2023', amount: '$29.00', status: 'Paid' },
                          { date: 'Sep 1, 2023', amount: '$29.00', status: 'Paid' },
                          { date: 'Aug 1, 2023', amount: '$29.00', status: 'Paid' },
                        ].map((inv, i) => (
                          <div key={i} className="flex items-center justify-between py-2 text-sm">
                            <div className="text-gray-600">{inv.date}</div>
                            <div className="flex items-center gap-4">
                              <span className="font-medium text-gray-900">{inv.amount}</span>
                              <button onClick={() => handleDownloadInvoice(inv)} className="text-gray-400 hover:text-[#278687]">
                                <Download className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end gap-3">
                <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button className="flex items-center gap-2 px-6 py-2 bg-[#278687] text-white rounded-lg text-sm font-medium hover:bg-[#1e6b6c] transition-colors shadow-sm">
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}