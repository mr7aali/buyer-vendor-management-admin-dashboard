import { useParams, Link, useNavigate } from 'react-router-dom';
import { Header } from '../components/dashboard/Header';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Mail, Phone, MapPin, Calendar, ShieldCheck, ArrowLeft, MessageSquare } from 'lucide-react';
import { MOCK_BUYERS } from '../data/mockBuyers';

export function UserDetailPage() {
  const {
    id
  } = useParams();
  const navigate = useNavigate();

  const buyerId = id;
  const foundUser = MOCK_BUYERS.find(b => b.id === buyerId);

  // Fallback if not found (though handling it gracefully is better, for now use default or first)
  const user = foundUser ? {
    ...foundUser,
    stats: {
      totalSpent: foundUser.totalSpent,
      totalOrders: foundUser.totalOrders,
      avgOrderValue: '$82.70', // Retain some mock logic if not in shared data yet
      lastOrder: '2 days ago'
    }
  } : {
    name: 'User Not Found',
    email: 'N/A',
    phone: 'N/A',
    country: 'N/A',
    joinDate: 'N/A',
    verified: false,
    avatar: '',
    id: buyerId,
    stats: {
      totalSpent: '$0.00',
      totalOrders: 0,
      avgOrderValue: '$0.00',
      lastOrder: 'N/A'
    }
  };

  return <div className="min-h-screen bg-[#E8F3F1] font-sans text-gray-900 pb-12">
    <Header />

    <main className="max-w-[1600px] mx-auto px-6 pt-8">
      <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Go back
      </button>

      <div className="grid grid-cols-12 gap-6">
        {/* Left Column: Profile & Stats */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="relative mb-4">
                <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full object-cover border-4 border-gray-50" />
                {user.verified && <div className="absolute bottom-0 right-0 bg-green-500 text-white p-1.5 rounded-full border-2 border-white" title="Verified User">
                  <ShieldCheck className="w-4 h-4" />
                </div>}
              </div>
              <h1 className="text-xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-sm text-gray-500">
                Customer ID: #{id || '1234'}
              </p>
            </div>

            <div className="space-y-4 pt-6 border-t border-gray-50">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Mail className="w-4 h-4 text-gray-400" />
                {user.email}
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Phone className="w-4 h-4 text-gray-400" />
                {user.phone}
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-gray-400" />
                {user.country}
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Calendar className="w-4 h-4 text-gray-400" />
                Joined {user.joinDate}
              </div>
            </div>

            <div className="mt-8">
              <Link
                to="/chats"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                Message User
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="text-gray-500 text-xs mb-1">Total Spent</div>
              <div className="text-xl font-bold text-gray-900">
                {user.stats.totalSpent}
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="text-gray-500 text-xs mb-1">Total Orders</div>
              <div className="text-xl font-bold text-gray-900">
                {user.stats.totalOrders}
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="text-gray-500 text-xs mb-1">Avg. Order</div>
              <div className="text-xl font-bold text-gray-900">
                {user.stats.avgOrderValue}
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="text-gray-500 text-xs mb-1">Last Active</div>
              <div className="text-xl font-bold text-gray-900">
                {user.stats.lastOrder}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Orders & History */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {/* Orders Section with Tabs */}


          {/* Chat Section */}

          {/* Active Orders Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">Active Orders</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Items</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr onClick={() => navigate('/orders/ORD-7821')} className="hover:bg-gray-50 cursor-pointer group transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">#ORD-7821</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Oct 24, 2023</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2 items</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">$120.50</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status="in-progress" />
                    </td>
                  </tr>
                  <tr onClick={() => navigate('/orders/ORD-7822')} className="hover:bg-gray-50 cursor-pointer group transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">#ORD-7822</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Oct 25, 2023</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1 item</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">$45.00</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status="waiting" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Order History Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">Order History</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Items</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr onClick={() => navigate('/orders/ORD-7820')} className="hover:bg-gray-50 cursor-pointer group transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">#ORD-7820</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Oct 20, 2023</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1 item</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">$85.00</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status="completed" />
                    </td>
                  </tr>
                  <tr onClick={() => navigate('/orders/ORD-7815')} className="hover:bg-gray-50 cursor-pointer group transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">#ORD-7815</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Sep 15, 2023</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">3 items</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">$240.00</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status="completed" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>;
}