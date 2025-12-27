import React, { useState } from 'react';
import { Header } from '../components/dashboard/Header';
import { Search, Bell, Megaphone, Check, Trash2, Info, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
type Notification = {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  category: 'system' | 'buyer' | 'vendor' | 'broadcast';
  date: string;
  read: boolean;
};
const notifications: Notification[] = [{
  id: '1',
  title: 'System Maintenance Scheduled',
  message: 'The platform will undergo maintenance on Oct 30th from 2:00 AM to 4:00 AM UTC.',
  type: 'info',
  category: 'system',
  date: '2 hours ago',
  read: false
}, {
  id: '2',
  title: 'High Dispute Volume',
  message: 'Unusual spike in dispute cases detected in Electronics category.',
  type: 'warning',
  category: 'system',
  date: '5 hours ago',
  read: false
}, {
  id: '3',
  title: 'New Vendor Registration',
  message: 'TechWorld Ltd. has completed verification and is ready for approval.',
  type: 'success',
  category: 'vendor',
  date: '1 day ago',
  read: true
}, {
  id: '4',
  title: 'Payment Gateway Error',
  message: 'Failed transaction rate exceeded 5% threshold in the last hour.',
  type: 'error',
  category: 'system',
  date: '1 day ago',
  read: true
}, {
  id: '5',
  title: 'Holiday Sale Broadcast',
  message: 'Promotional message sent to all active buyers regarding upcoming holiday sales.',
  type: 'info',
  category: 'broadcast',
  date: '2 days ago',
  read: true
}];
export function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'system' | 'buyer' | 'vendor' | 'broadcast'>('all');
  const getIcon = (type: string) => {
    switch (type) {
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };
  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'info':
        return 'bg-blue-50 border-blue-100';
      case 'warning':
        return 'bg-orange-50 border-orange-100';
      case 'success':
        return 'bg-green-50 border-green-100';
      case 'error':
        return 'bg-red-50 border-red-100';
      default:
        return 'bg-gray-50 border-gray-100';
    }
  };
  return <div className="min-h-screen bg-[#E8F3F1] font-sans text-gray-900 pb-12">
      <Header />

      <main className="max-w-[1600px] mx-auto px-6 pt-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Notifications Center
            </h1>
            <p className="text-gray-500">
              Manage system alerts and broadcast messages to users.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
              <Check className="w-4 h-4" />
              Mark all read
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#278687] text-white rounded-lg text-sm font-medium hover:bg-[#1e6b6c] transition-colors shadow-sm">
              <Megaphone className="w-4 h-4" />
              Create Broadcast
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar / Filters */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <h3 className="font-semibold text-gray-900 mb-4 px-2">
                Categories
              </h3>
              <nav className="space-y-1">
                {[{
                id: 'all',
                label: 'All Notifications',
                icon: Bell
              }, {
                id: 'system',
                label: 'System Alerts',
                icon: Info
              }, {
                id: 'buyer',
                label: 'Buyer Updates',
                icon: CheckCircle
              }, {
                id: 'vendor',
                label: 'Vendor Updates',
                icon: CheckCircle
              }, {
                id: 'broadcast',
                label: 'Broadcasts',
                icon: Megaphone
              }].map(item => <button key={item.id} onClick={() => setActiveTab(item.id as any)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === item.id ? 'bg-[#E8F3F1] text-[#278687]' : 'text-gray-600 hover:bg-gray-50'}`}>
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </button>)}
              </nav>
            </div>
          </div>

          {/* Notifications List */}
          <div className="lg:col-span-9">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" placeholder="Search notifications..." className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#278687]/20 focus:border-[#278687]" />
                </div>
                <div className="text-sm text-gray-500">
                  Showing 5 notifications
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {notifications.map(notification => <div key={notification.id} className={`p-4 hover:bg-gray-50 transition-colors flex gap-4 ${!notification.read ? 'bg-blue-50/30' : ''}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border ${getTypeStyles(notification.type)}`}>
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className={`text-sm font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                          {notification.title}
                        </h4>
                        <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                          {notification.date}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600 uppercase tracking-wide">
                          {notification.category}
                        </span>
                        {!notification.read && <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-blue-100 text-blue-700">
                            New
                          </span>}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 justify-center ml-2">
                      <button className="p-1.5 text-gray-400 hover:text-[#278687] rounded-md hover:bg-[#E8F3F1] transition-colors" title="Mark as read">
                        <Check className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>)}
              </div>

              <div className="p-4 border-t border-gray-100 text-center">
                <button className="text-sm font-medium text-[#278687] hover:text-[#1e6b6c] transition-colors">
                  View All Notifications
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>;
}