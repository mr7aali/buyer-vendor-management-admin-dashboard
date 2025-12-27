import React, { useState } from 'react';
import { Header } from '../components/dashboard/Header';
import { User, Lock, Bell, CreditCard, Shield, Save, Download } from 'lucide-react';
export function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const tabs = [{
    id: 'general',
    label: 'General',
    icon: User
  }, {
    id: 'notifications',
    label: 'Notifications',
    icon: Bell
  }, {
    id: 'security',
    label: 'Security',
    icon: Lock
  }, {
    id: 'billing',
    label: 'Billing',
    icon: CreditCard
  }];
  return <div className="min-h-screen bg-[#E8F3F1] font-sans text-gray-900 pb-12">
    <Header />

    <main className="max-w-[1600px] mx-auto px-6 pt-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-500">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <nav className="flex flex-col p-2">
              {tabs.map(tab => <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === tab.id ? 'bg-[#E8F3F1] text-[#278687]' : 'text-gray-600 hover:bg-gray-50'}`}>
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>)}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            {activeTab === 'general' && <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-1">
                  Profile Information
                </h2>
                <p className="text-sm text-gray-500">
                  Update your photo and personal details.
                </p>
              </div>

              <div className="flex items-center gap-6 pb-6 border-b border-gray-100">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Profile" className="w-20 h-20 rounded-full border border-gray-200" />
                <div>
                  <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors mr-3">
                    Change Photo
                  </button>
                  <button className="text-sm text-red-600 hover:underline">
                    Remove
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input type="text" defaultValue="Steve" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#278687]/20 focus:border-[#278687]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input type="text" defaultValue="Rogers" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#278687]/20 focus:border-[#278687]" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input type="email" defaultValue="steve.rogers@scan2trade.com" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#278687]/20 focus:border-[#278687]" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea rows={4} defaultValue="Super Admin managing the Scan2Trade platform." className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#278687]/20 focus:border-[#278687]" />
                </div>
              </div>
            </div>}

            {activeTab === 'notifications' && <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-1">
                  Notification Preferences
                </h2>
                <p className="text-sm text-gray-500">
                  Choose what you want to be notified about.
                </p>
              </div>

              <div className="space-y-4">
                {['New Order Received', 'New Vendor Registration', 'Product Low Stock Alert', 'Weekly Analytics Report', 'System Updates'].map((item, i) => <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {item}
                    </div>
                    <div className="text-xs text-gray-500">
                      Receive notifications via email and push
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked={i < 3} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#278687]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#278687]"></div>
                  </label>
                </div>)}
              </div>
            </div>}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-1">Security Settings</h2>
                  <p className="text-sm text-gray-500">Manage your password and security preferences.</p>
                </div>

                <div className="border-b border-gray-100 pb-6 mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-4">Change Password</h3>
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
                      <button className="text-sm text-[#278687] font-medium hover:underline">+ Add New</button>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-6 bg-white border border-gray-200 rounded flex items-center justify-center">
                            <span className="text-xs font-bold text-blue-800">VISA</span>
                          </div>
                          <div className="text-sm text-gray-700">•••• 4242</div>
                        </div>
                        <span className="text-xs font-medium text-gray-500">Default</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-6 bg-white border border-gray-200 rounded flex items-center justify-center">
                            <span className="text-xs font-bold text-gray-800">MC</span>
                          </div>
                          <div className="text-sm text-gray-700">•••• 8821</div>
                        </div>
                      </div>
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
                            <button className="text-gray-400 hover:text-[#278687]">
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
  </div>;
}