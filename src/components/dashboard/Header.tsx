import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Bell, Settings, ChevronDown, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { FullWidthMenu } from '../header/FullWidthMenu';
import { GlobalSearchDropdown } from '../header/GlobalSearchDropdown';
import { NotificationsPanel } from '../header/NotificationsPanel';
import { ProfileDropdown } from '../header/ProfileDropdown';
export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const {
    user
  } = useAuth();
  const searchRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  // Mock search results
  const searchResults = [{
    id: '1',
    type: 'user' as const,
    title: 'Alice Johnson',
    subtitle: 'Buyer • Active',
    link: '/buyers'
  }, {
    id: '2',
    type: 'vendor' as const,
    title: 'TechGiant Solutions',
    subtitle: 'Electronics • Verified',
    link: '/vendors'
  }, {
    id: '3',
    type: 'order' as const,
    title: '#ORD-7829',
    subtitle: '$245.00 • Completed',
    link: '/orders'
  }];
  // Mock notifications
  const [notifications, setNotifications] = useState([{
    id: '1',
    title: 'New Order Received',
    message: 'Order #ORD-7834 received from Michael Smith',
    time: '2m ago',
    type: 'success' as const,
    read: false
  }, {
    id: '2',
    title: 'Verification Request',
    message: 'New vendor "Green Earth" submitted KYC documents',
    time: '1h ago',
    type: 'info' as const,
    read: false
  }, {
    id: '3',
    title: 'Payment Failed',
    message: 'Transaction #TRX-9925 failed for $89.99',
    time: '3h ago',
    type: 'error' as const,
    read: true
  }]);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // Click outside handlers
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? {
      ...n,
      read: true
    } : n));
  };
  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({
      ...n,
      read: true
    })));
  };
  const unreadCount = notifications.filter(n => !n.read).length;
  return <>
    <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm' : 'bg-transparent border-b border-transparent'}`}>
      <div className="px-6 h-16 flex items-center justify-between relative">
        {/* Left: Menu & Search */}
        <div className="flex items-center gap-4 flex-1">
          <button onClick={() => setIsMenuOpen(true)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600">
            <Menu className="w-6 h-6" />
          </button>

          {/* Global Search */}
          <div className="max-w-md w-full hidden md:block" ref={searchRef}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                className="w-full pl-10 pr-12 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1 text-[10px] font-bold text-gray-400 bg-white px-1.5 py-0.5 rounded border border-gray-200">
                ⌘K
              </div>

              <GlobalSearchDropdown results={searchResults} isVisible={isSearchOpen && searchQuery.length > 0} onClose={() => setIsSearchOpen(false)} />
            </div>
          </div>
        </div>

        {/* Center: Logo */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center shadow-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#278687" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 17L12 22L22 17" stroke="#278687" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12L12 17L22 12" stroke="#278687" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight hidden md:block">
              Scan2Trade
            </span>
          </Link>
        </div>

        {/* Right: Actions & Profile */}
        <div className="flex items-center gap-4 flex-1 justify-end">
          <div className="flex items-center gap-2">
            <div className="relative" ref={notificationsRef}>
              <button onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-colors relative">
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>}
              </button>
              <NotificationsPanel isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} notifications={notifications} onMarkAsRead={handleMarkAsRead} onMarkAllAsRead={handleMarkAllAsRead} />
            </div>

            <Link to="/settings" className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-colors">
              <Settings className="w-5 h-5" />
            </Link>

            <div className="h-6 w-px bg-gray-200 mx-2 hidden sm:block"></div>

            <div className="relative" ref={profileRef}>
              <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-3 pl-2 group">
                <img src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'} alt="Profile" className="w-9 h-9 rounded-full border border-gray-200 group-hover:border-primary transition-colors" />
                <div className="hidden lg:block text-left">
                  <div className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors">
                    {user?.name || 'Guest'}
                  </div>
                  <div className="text-xs text-gray-500">
                    {user?.role || 'Admin'}
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400 hidden lg:block group-hover:text-primary transition-colors" />
              </button>
              <ProfileDropdown isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
            </div>
          </div>
        </div>
      </div>
    </header>

    <FullWidthMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
  </>;
}