
import { Link } from 'react-router-dom';
import { X, LayoutDashboard, BarChart2, Users, Store, ShoppingCart, MessageSquare, Bell, Shield, Settings, User, CreditCard } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { APP_PAGES } from '../../utils/permissions';
interface FullWidthMenuProps {
  isOpen: boolean;
  onClose: () => void;
}
const PAGE_ICONS: Record<string, any> = {
  '/': LayoutDashboard,
  '/analytics': BarChart2,
  '/buyers': Users,
  '/vendors': Store,
  '/orders': ShoppingCart,
  '/chats': MessageSquare,
  '/notifications': Bell,
  '/permissions': Shield,
  '/settings': Settings,
  '/account': User,
  '/verification': Shield,
  '/transactions': CreditCard
};
const PAGE_DESCRIPTIONS: Record<string, string> = {
  '/': 'Overview of platform performance',
  '/analytics': 'Detailed reports and metrics',
  '/buyers': 'Manage customer accounts',
  '/vendors': 'Manage vendor partnerships',
  '/orders': 'Track and manage orders',
  '/chats': 'Messages and complaints',
  '/notifications': 'System alerts and updates',
  '/permissions': 'Role and access control',
  '/settings': 'Platform configuration',

  '/account': 'Your profile settings',
  '/verification': 'KYC and user verification',
  '/transactions': 'Escrow and installments'
};
export function FullWidthMenu({
  isOpen,
  onClose
}: FullWidthMenuProps) {
  const {
    checkPermission
  } = useAuth();
  if (!isOpen) return null;
  // Filter pages based on permissions
  const allowedPages = APP_PAGES.filter(page => checkPermission(page.path));
  return <div className="fixed inset-0 z-50 flex flex-col">
    {/* Backdrop */}
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

    {/* Menu Content */}
    <div className="relative bg-white w-full max-h-[85vh] overflow-y-auto shadow-2xl animate-in slide-in-from-top duration-300">
      <div className="max-w-[1600px] mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <img src="/images/Logo.svg" alt="lINKOOTO" className="h-12 w-auto" />
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {allowedPages.map(page => {
            const Icon = PAGE_ICONS[page.path] || LayoutDashboard;
            return <Link key={page.path} to={page.path} onClick={onClose} className="group p-4 rounded-xl border border-gray-100 hover:border-primary/30 hover:shadow-md hover:bg-primary/5 transition-all flex items-start gap-4">
              <div className="p-3 bg-gray-50 rounded-lg group-hover:bg-white group-hover:text-primary transition-colors">
                <Icon className="w-6 h-6 text-gray-600 group-hover:text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                  {page.label}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {PAGE_DESCRIPTIONS[page.path] || 'Manage this section'}
                </p>
              </div>
            </Link>;
          })}
        </div>
      </div>
    </div>
  </div>;
}