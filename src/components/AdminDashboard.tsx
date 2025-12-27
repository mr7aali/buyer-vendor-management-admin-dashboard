import React from 'react';
import { Users, DollarSign, Package, AlertCircle, ShoppingBag, Truck } from 'lucide-react';
import { Header } from './dashboard/Header';
import { KPICard } from './ui/KPICard';
import { Link } from 'react-router-dom';
import { RevenueChart } from './charts/RevenueChart';
import { UserGrowthChart } from './charts/UserGrowthChart';

// Dashboard-specific mock data
const WEEKLY_REVENUE_DATA = [
  { name: 'Mon', revenue: 4000, profit: 2400 },
  { name: 'Tue', revenue: 3000, profit: 1398 },
  { name: 'Wed', revenue: 2000, profit: 9800 },
  { name: 'Thu', revenue: 2780, profit: 3908 },
  { name: 'Fri', revenue: 1890, profit: 4800 },
  { name: 'Sat', revenue: 2390, profit: 3800 },
  { name: 'Sun', revenue: 3490, profit: 4300 },
];

const WEEKLY_USER_DATA = [
  { name: 'Mon', buyers: 400, vendors: 240 },
  { name: 'Tue', buyers: 300, vendors: 139 },
  { name: 'Wed', buyers: 200, vendors: 980 },
  { name: 'Thu', buyers: 278, vendors: 390 },
  { name: 'Fri', buyers: 189, vendors: 480 },
  { name: 'Sat', buyers: 239, vendors: 380 },
  { name: 'Sun', buyers: 349, vendors: 430 },
];

export function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#E8F3F1] font-sans text-gray-900 pb-12">
      <Header />

      <main className="max-w-[1600px] mx-auto px-6 pt-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
          <p className="text-gray-500">
            Welcome back. Here's a summary of what's happening today.
          </p>
        </div>

        {/* Top Section: High-level KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            title="Total Users"
            value="12,450"
            change={24}
            icon={Users}
            linkText="View Users"
            linkTo="/buyers"
          />
          <KPICard
            title="Total Revenue"
            value="$1,248,590"
            change={15}
            icon={DollarSign}
            linkText="View Financials"
            linkTo="/analytics"
          />
          <KPICard
            title="Pending Orders"
            value="45"
            change={-5}
            icon={ShoppingBag}
            linkText="View Orders"
            linkTo="/orders"
          />
          <KPICard
            title="Active Vendors"
            value="892"
            change={8}
            icon={Package}
            linkText="View Vendors"
            linkTo="/vendors"
          />
        </div>

        {/* Platform Health & Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/10 h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <AlertCircle className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold text-gray-900">System Health</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">All systems operational. No reported outages in the last 24h.</p>
            <div className="flex items-center gap-2 text-xs font-medium text-green-600 bg-white/50 px-3 py-1.5 rounded-lg w-fit">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              99.9% Uptime
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-full">
            <h3 className="font-bold text-gray-900 mb-4">Order Fulfillment</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">Delivered</span>
                  <span className="font-medium text-gray-900">85%</span>
                </div>
                <div className="relative group w-full">
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden cursor-pointer hover:ring-2 hover:ring-green-500/20 transition-all">
                    <div className="h-full bg-green-500 w-[85%]"></div>
                  </div>
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-[85%] mb-3 hidden group-hover:block -translate-x-1/2 z-10 transition-all duration-200">
                    <div className="bg-white border border-gray-100 shadow-2xl rounded-xl p-3 min-w-[150px]">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Success</span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-bold text-gray-900">1,245</span>
                        <span className="text-[10px] text-green-600 font-bold">+12%</span>
                      </div>
                      <div className="text-[10px] text-gray-500 font-medium">Orders delivered safely</div>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">In Transit</span>
                  <span className="font-medium text-gray-900">12%</span>
                </div>
                <div className="relative group w-full">
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500/20 transition-all">
                    <div className="h-full bg-blue-500 w-[12%]"></div>
                  </div>
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-[12%] mb-3 hidden group-hover:block -translate-x-1/2 z-10 transition-all duration-200">
                    <div className="bg-white border border-gray-100 shadow-2xl rounded-xl p-3 min-w-[150px]">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">On Road</span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-bold text-gray-900">148</span>
                        <span className="text-[10px] text-primary font-bold">Active</span>
                      </div>
                      <div className="text-[10px] text-gray-500 font-medium">Currently with courier</div>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-full">
            <h3 className="font-bold text-gray-900 mb-4">Support Volume</h3>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-2xl font-bold text-gray-900">128</span>
              <span className="text-xs text-gray-500 mb-1">tickets today</span>
            </div>
            <div className="text-xs text-gray-500">
              Avg. response time: <span className="font-medium text-gray-900">24m</span>
            </div>
            <div className="mt-4 flex gap-2">
              <span className="px-2 py-1 bg-red-50 text-red-700 text-[10px] font-bold rounded-md">8 Critical</span>
              <span className="px-2 py-1 bg-amber-50 text-amber-700 text-[10px] font-bold rounded-md">15 High</span>
            </div>
          </div>
        </div>

        {/* Mid Section: Weekly Charts */}
        <div className="grid grid-cols-12 gap-6 mb-8">
          <div className="col-span-12 lg:col-span-6">
            <RevenueChart data={WEEKLY_REVENUE_DATA} />
          </div>
          <div className="col-span-12 lg:col-span-6">
            <UserGrowthChart data={WEEKLY_USER_DATA} />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Recent Activity Feed */}
          <div className="col-span-12 lg:col-span-8 flex">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 w-full h-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
              </div>
              <div className="space-y-6">
                {[
                  { text: 'New order #ORD-7829 placed by Alice Johnson', time: '2 mins ago', icon: ShoppingBag, color: 'text-blue-500 bg-blue-50' },
                  { text: 'Vendor "TechGiant" submitted KYC documents', time: '1 hour ago', icon: AlertCircle, color: 'text-amber-500 bg-amber-50' },
                  { text: 'Order #ORD-7712 delivered to UK', time: '3 hours ago', icon: Truck, color: 'text-green-500 bg-green-50' },
                  { text: 'New User "Michael Smith" registered', time: '5 hours ago', icon: Users, color: 'text-purple-500 bg-purple-50' },
                  { text: 'Payment received from "ElectroWorld"', time: '6 hours ago', icon: DollarSign, color: 'text-green-500 bg-green-50' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${item.color}`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.text}</p>
                      <p className="text-xs text-gray-500">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actions Needed */}
          <div className="col-span-12 lg:col-span-4 flex">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 w-full h-full">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Actions Needed</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-red-50 border border-red-100 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-red-700">5 Pending Verifications</div>
                    <div className="text-xs text-red-600/80">Vendor KYC Requests</div>
                  </div>
                  <Link to="/verification" className="px-3 py-1.5 bg-red-100 text-red-700 text-xs font-bold rounded-lg hover:bg-red-200">
                    Review
                  </Link>
                </div>

                <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-amber-700">12 Unshipped Orders</div>
                    <div className="text-xs text-amber-600/80">Exceeding 24h limit</div>
                  </div>
                  <Link to="/orders" className="px-3 py-1.5 bg-amber-100 text-amber-700 text-xs font-bold rounded-lg hover:bg-amber-200">
                    Manage
                  </Link>
                </div>

                <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-blue-700">3 New Support Messages</div>
                    <div className="text-xs text-blue-600/80">High Priority</div>
                  </div>
                  <Link to="/chats" className="px-3 py-1.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-lg hover:bg-blue-200">
                    Reply
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}