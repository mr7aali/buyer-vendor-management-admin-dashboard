import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Bell, Settings, ChevronDown, Menu } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { FullWidthMenu } from "../header/FullWidthMenu";
import { GlobalSearchDropdown } from "../header/GlobalSearchDropdown";
import { NotificationsPanel } from "../header/NotificationsPanel";
import { ProfileDropdown } from "../header/ProfileDropdown";
export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();
  const searchRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  // Mock search results
  const searchResults = [
    {
      id: "1",
      type: "user" as const,
      title: "Alice Johnson",
      subtitle: "Buyer • Active",
      link: "/buyers",
    },
    {
      id: "2",
      type: "vendor" as const,
      title: "TechGiant Solutions",
      subtitle: "Electronics • Verified",
      link: "/vendors",
    },
    {
      id: "3",
      type: "order" as const,
      title: "#ORD-7829",
      subtitle: "$245.00 • Completed",
      link: "/orders",
    },
  ];
  // Mock notifications
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "New Order Received",
      message: "Order #ORD-7834 received from Michael Smith",
      time: "2m ago",
      type: "success" as const,
      read: false,
    },
    {
      id: "2",
      title: "Verification Request",
      message: 'New vendor "Green Earth" submitted KYC documents',
      time: "1h ago",
      type: "info" as const,
      read: false,
    },
    {
      id: "3",
      title: "Payment Failed",
      message: "Transaction #TRX-9925 failed for $89.99",
      time: "3h ago",
      type: "error" as const,
      read: true,
    },
  ]);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // Click outside handlers
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setIsNotificationsOpen(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id
          ? {
              ...n,
              read: true,
            }
          : n,
      ),
    );
  };
  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({
        ...n,
        read: true,
      })),
    );
  };
  const unreadCount = notifications.filter((n) => !n.read).length;
  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm" : "bg-transparent border-b border-transparent"}`}
        style={{ border: "1px solid red" }}
      >
        <div className="relative flex h-16 items-center justify-between px-6">
          {/* Left: Menu & Search */}
          <div className="flex flex-1 items-center gap-4">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100"
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Global Search */}
            <div className="hidden w-full max-w-md md:block" ref={searchRef}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  onFocus={() => setIsSearchOpen(true)}
                  className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-10 pr-12 text-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1 text-[10px] font-bold text-gray-400 bg-white px-1.5 py-0.5 rounded border border-gray-200">
                  ⌘K
                </div>

                <GlobalSearchDropdown
                  results={searchResults}
                  isVisible={isSearchOpen && searchQuery.length > 0}
                  onClose={() => setIsSearchOpen(false)}
                />
              </div>
            </div>
          </div>

          {/* Center: Logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/images/Logo.svg"
                alt="lINKOOTO"
                className="h-10 w-auto"
              />
            </Link>
          </div>

          {/* Right: Actions & Profile */}
          <div className="flex flex-1 items-center justify-end gap-4">
            <div className="flex items-center gap-2">
              <div className="relative" ref={notificationsRef}>
                <button
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="relative rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900"
                >
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-red-500"></span>
                  )}
                </button>
                <NotificationsPanel
                  isOpen={isNotificationsOpen}
                  onClose={() => setIsNotificationsOpen(false)}
                  notifications={notifications}
                  onMarkAsRead={handleMarkAsRead}
                  onMarkAllAsRead={handleMarkAllAsRead}
                />
              </div>

              <Link
                to="/settings"
                className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900"
              >
                <Settings className="h-5 w-5" />
              </Link>

              <div className="mx-2 hidden h-6 w-px bg-gray-200 sm:block"></div>

              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="group flex items-center gap-3 pl-2"
                >
                  <img
                    src={
                      user?.avatar ||
                      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    }
                    alt="Profile"
                    className="h-9 w-9 rounded-full border border-gray-200 transition-colors group-hover:border-primary"
                  />
                  <div className="hidden text-left lg:block">
                    <div className="text-sm font-semibold text-gray-900 transition-colors group-hover:text-primary">
                      {user?.name || "Guest"}
                    </div>
                    <div className="text-xs text-gray-500">
                      {user?.role || "Admin"}
                    </div>
                  </div>
                  <ChevronDown className="hidden h-4 w-4 text-gray-400 transition-colors group-hover:text-primary lg:block" />
                </button>
                <ProfileDropdown
                  isOpen={isProfileOpen}
                  onClose={() => setIsProfileOpen(false)}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <FullWidthMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
