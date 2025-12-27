import React from 'react';
import { Link } from 'react-router-dom';
import { User, Store, ShoppingCart, CreditCard, Search } from 'lucide-react';
interface SearchResult {
  id: string;
  type: 'user' | 'vendor' | 'order' | 'transaction';
  title: string;
  subtitle: string;
  link: string;
}
interface GlobalSearchDropdownProps {
  results: SearchResult[];
  isVisible: boolean;
  onClose: () => void;
}
export function GlobalSearchDropdown({
  results,
  isVisible,
  onClose
}: GlobalSearchDropdownProps) {
  if (!isVisible || results.length === 0) return null;
  const getIcon = (type: string) => {
    switch (type) {
      case 'user':
        return User;
      case 'vendor':
        return Store;
      case 'order':
        return ShoppingCart;
      case 'transaction':
        return CreditCard;
      default:
        return Search;
    }
  };
  return <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 max-h-96 overflow-y-auto">
      <div className="p-2">
        <div className="text-xs font-semibold text-gray-400 uppercase px-3 py-2">
          Search Results
        </div>
        {results.map(result => {
        const Icon = getIcon(result.type);
        return <Link key={result.id} to={result.link} onClick={onClose} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors group">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all">
                <Icon className="w-4 h-4 text-gray-500 group-hover:text-[#278687]" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {result.title}
                </div>
                <div className="text-xs text-gray-500">{result.subtitle}</div>
              </div>
            </Link>;
      })}
      </div>
      <div className="bg-gray-50 p-2 text-center border-t border-gray-100">
        <Link to="/search" className="text-xs font-medium text-[#278687] hover:underline">
          View all results
        </Link>
      </div>
    </div>;
}