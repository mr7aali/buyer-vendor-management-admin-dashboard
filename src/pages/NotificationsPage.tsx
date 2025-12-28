import React, { useState } from 'react';
import { Header } from '../components/dashboard/Header';
import { Search, Bell, Megaphone, Check, Trash2, Info, AlertTriangle, CheckCircle, XCircle, X, Send } from 'lucide-react';

type Notification = {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  category: 'system' | 'buyer' | 'vendor' | 'broadcast';
  date: string;
  read: boolean;
};

const initialNotifications: Notification[] = [{
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
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [activeTab, setActiveTab] = useState<'all' | 'system' | 'buyer' | 'vendor' | 'broadcast'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Broadcast Modal State
  const [isBroadcastOpen, setIsBroadcastOpen] = useState(false);
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastTarget, setBroadcastTarget] = useState('all');

  const getIcon = (type: string) => {
    switch (type) {
      case 'info': return <Info className="w-5 h-5 text-blue-500" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'info': return 'bg-blue-50 border-blue-100';
      case 'warning': return 'bg-orange-50 border-orange-100';
      case 'success': return 'bg-green-50 border-green-100';
      case 'error': return 'bg-red-50 border-red-100';
      default: return 'bg-gray-50 border-gray-100';
    }
  };

  // Actions
  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleMarkRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const handleCreateBroadcast = () => {
    const newBroadcast: Notification = {
      id: Date.now().toString(),
      title: broadcastTitle,
      message: broadcastMessage,
      type: 'info',
      category: 'broadcast',
      date: 'Just now',
      read: true
    };
    setNotifications([newBroadcast, ...notifications]);
    setIsBroadcastOpen(false);
    setBroadcastTitle('');
    setBroadcastMessage('');
  };

  // Filtering
  const filteredNotifications = notifications.filter(notification => {
    const matchesTab = activeTab === 'all' || notification.category === activeTab;
    const matchesSearch =
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#E8F3F1] font-sans text-gray-900 pb-12">
      <Header />

      <main className="max-w-[1600px] mx-auto px-6 pt-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Notifications Center</h1>
            <p className="text-gray-500">Manage system alerts and broadcast messages to users.</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleMarkAllRead}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <Check className="w-4 h-4" />
              Mark all read
            </button>
            <button
              onClick={() => setIsBroadcastOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#278687] text-white rounded-lg text-sm font-medium hover:bg-[#1e6b6c] transition-colors shadow-sm"
            >
              <Megaphone className="w-4 h-4" />
              Create Broadcast
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar / Filters */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <h3 className="font-semibold text-gray-900 mb-4 px-2">Categories</h3>
              <nav className="space-y-1">
                {[
                  { id: 'all', label: 'All Notifications', icon: Bell },
                  { id: 'system', label: 'System Alerts', icon: Info },
                  { id: 'buyer', label: 'Buyer Updates', icon: CheckCircle },
                  { id: 'vendor', label: 'Vendor Updates', icon: CheckCircle },
                  { id: 'broadcast', label: 'Broadcasts', icon: Megaphone }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === item.id ? 'bg-[#E8F3F1] text-[#278687]' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Notifications List */}
          <div className="lg:col-span-9">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search notifications..."
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#278687]/20 focus:border-[#278687]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="text-sm text-gray-500">
                  Showing {filteredNotifications.length} notifications
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {filteredNotifications.length > 0 ? filteredNotifications.map(notification => (
                  <div key={notification.id} className={`p-4 hover:bg-gray-50 transition-colors flex gap-4 ${!notification.read ? 'bg-blue-50/30' : ''}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border ${getTypeStyles(notification.type)}`}>
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className={`text-sm font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                          {notification.title}
                        </h4>
                        <span className="text-xs text-gray-400 whitespace-nowrap ml-2">{notification.date}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600 uppercase tracking-wide">
                          {notification.category}
                        </span>
                        {!notification.read && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-blue-100 text-blue-700">New</span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 justify-center ml-2">
                      <button
                        onClick={() => handleMarkRead(notification.id)}
                        className="p-1.5 text-gray-400 hover:text-[#278687] rounded-md hover:bg-[#E8F3F1] transition-colors"
                        title="Mark as read"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(notification.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )) : (
                  <div className="p-12 text-center text-gray-500">
                    <Bell className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No notifications found matching your criteria.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Broadcast Modal */}
      {isBroadcastOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="text-lg font-bold text-gray-900">Create Broadcast</h3>
              <button
                onClick={() => setIsBroadcastOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Target Audience</label>
                <select
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#278687]"
                  value={broadcastTarget}
                  onChange={(e) => setBroadcastTarget(e.target.value)}
                >
                  <option value="all">All Users</option>
                  <option value="buyers">All Buyers</option>
                  <option value="vendors">All Vendors</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#278687]"
                  placeholder="e.g. System Maintenance"
                  value={broadcastTitle}
                  onChange={(e) => setBroadcastTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                <textarea
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#278687]"
                  rows={4}
                  placeholder="Type your message here..."
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                />
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 flex gap-3 bg-gray-50/30">
              <button
                onClick={() => setIsBroadcastOpen(false)}
                className="flex-1 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateBroadcast}
                className="flex-1 px-4 py-2.5 bg-[#278687] text-white font-bold rounded-xl hover:bg-[#206e6f] transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Broadcast
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}