import {
  Users,
  DollarSign,
  Package,
  AlertCircle,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { Header } from "./dashboard/Header";
import { KPICard } from "./ui/KPICard";
import { Link } from "react-router-dom";
import { RevenueChart } from "./charts/RevenueChart";
import { UserGrowthChart } from "./charts/UserGrowthChart";
import { useGetDashboardOverviewQuery } from "@/redux/features/api/dashboardApi";

// Dashboard-specific mock data

export function AdminDashboard() {
  const { data, isLoading } = useGetDashboardOverviewQuery();

  const kpiMetrics = data?.data?.kpiMetrics;
  const systemHealth = data?.data.systemHealth;
  const orderFulfillment = data?.data.orderFulfillment;
  const supportVolume = data?.data?.supportVolume;
  const weeklyRevenue = data?.data.weeklyRevenue;
  const weeklyUsers = data?.data.weeklyUsers;

  return (
    <div className="min-h-screen bg-[#E8F3F1] font-sans text-gray-900 pb-12">
      <Header />

      <main className="max-w-[1600px] mx-auto px-6 pt-8">
        <div className="mb-8">
          <h1 className="mb-2 text-2xl font-bold text-gray-900">
            Dashboard Overview
          </h1>
          <p className="text-gray-500">
            Welcome back. Here's a summary of what's happening today.
          </p>
        </div>

        {/* Top Section: High-level KPIs */}
        {kpiMetrics && (
          <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <KPICard
              title="Total Users"
              value={kpiMetrics?.totalUsers}
              change={kpiMetrics.totalUsersChange}
              icon={Users}
              linkText="View Users"
              linkTo="/buyers"
            />
            <KPICard
              title="Total Revenue"
              value={kpiMetrics.totalRevenue}
              change={kpiMetrics.totalRevenueChange}
              icon={DollarSign}
              linkText="View Financials"
              linkTo="/analytics"
            />
            <KPICard
              title="Pending Orders"
              value={kpiMetrics.pendingOrders}
              change={kpiMetrics.pendingOrdersChange}
              icon={ShoppingBag}
              linkText="View Orders"
              linkTo="/orders"
            />
            <KPICard
              title="Active Vendors"
              value={kpiMetrics.activeVendors}
              change={kpiMetrics.activeVendorsChange}
              icon={Package}
              linkText="View Vendors"
              linkTo="/vendors"
            />
          </div>
        )}

        {/* Platform Health & Quick Stats */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {systemHealth && (
            <div className="h-full rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/10 to-primary/5 p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-white p-2 shadow-sm">
                  <AlertCircle className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-bold text-gray-900">System Health</h3>
              </div>
              <p className="mb-4 text-sm text-gray-600">
                {systemHealth.message}
              </p>
              <div className="flex items-center gap-2 text-xs font-medium text-green-600 bg-white/50 px-3 py-1.5 rounded-lg w-fit">
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-500"></span>
                {systemHealth.uptime} Uptime
              </div>
            </div>
          )}

          <div className="h-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="mb-4 font-bold text-gray-900">Order Fulfillment</h3>
            <div className="space-y-4">
              <div>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-gray-500">Delivered</span>
                  <span className="font-medium text-gray-900">
                    {orderFulfillment?.delivered.percentage}%
                  </span>
                </div>
                <div className="group relative w-full">
                  <div className="h-2 cursor-pointer overflow-hidden rounded-full bg-gray-100 transition-all hover:ring-2 hover:ring-green-500/20">
                    <div className="h-full bg-green-500 w-[85%]"></div>
                  </div>
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-[85%] mb-3 hidden group-hover:block -translate-x-1/2 z-10 transition-all duration-200">
                    <div className="bg-white border border-gray-100 shadow-2xl rounded-xl p-3 min-w-[150px]">
                      <div className="mb-1 flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                          Success
                        </span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-bold text-gray-900">
                          {orderFulfillment?.delivered.count}
                        </span>
                        <span className="text-[10px] text-green-600 font-bold">
                          {/* +12% */}+{orderFulfillment?.delivered.change}%
                        </span>
                      </div>
                      <div className="text-[10px] text-gray-500 font-medium">
                        Orders delivered safely
                      </div>
                      <div className="absolute left-1/2 top-full -translate-x-1/2 border-8 border-transparent border-t-white"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-gray-500">In Transit</span>
                  <span className="font-medium text-gray-900">
                    {orderFulfillment?.inTransit.percentage}%
                  </span>
                </div>
                <div className="group relative w-full">
                  <div className="h-2 cursor-pointer overflow-hidden rounded-full bg-gray-100 transition-all hover:ring-2 hover:ring-blue-500/20">
                    <div className="h-full bg-blue-500 w-[12%]"></div>
                  </div>
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-[12%] mb-3 hidden group-hover:block -translate-x-1/2 z-10 transition-all duration-200">
                    <div className="bg-white border border-gray-100 shadow-2xl rounded-xl p-3 min-w-[150px]">
                      <div className="mb-1 flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                          On Road
                        </span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-bold text-gray-900">
                          {orderFulfillment?.inTransit.count}
                        </span>
                        <span className="text-[10px] text-primary font-bold">
                          Active
                        </span>
                      </div>
                      <div className="text-[10px] text-gray-500 font-medium">
                        Currently with courier
                      </div>
                      <div className="absolute left-1/2 top-full -translate-x-1/2 border-8 border-transparent border-t-white"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="h-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="mb-4 font-bold text-gray-900">Support Volume</h3>
            <div className="mb-2 flex items-end gap-2">
              <span className="text-2xl font-bold text-gray-900">
                {supportVolume?.todayTickets}
              </span>
              <span className="mb-1 text-xs text-gray-500">tickets today</span>
            </div>
            <div className="text-xs text-gray-500">
              Avg. response time:{" "}
              <span className="font-medium text-gray-900">
                {supportVolume?.averageResponseMinutes}m
              </span>
            </div>
            <div className="mt-4 flex gap-2">
              <span className="px-2 py-1 bg-red-50 text-red-700 text-[10px] font-bold rounded-md">
                {supportVolume?.critical} Critical
              </span>
              <span className="px-2 py-1 bg-amber-50 text-amber-700 text-[10px] font-bold rounded-md">
                {supportVolume?.high} High
              </span>
            </div>
          </div>
        </div>

        {/* Mid Section: Weekly Charts */}
        <div className="mb-8 grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-6">
            <RevenueChart
              // data={WEEKLY_REVENUE_DATA}
              data={weeklyRevenue}
              totalRevenueChange={kpiMetrics?.totalRevenueChange || 0}
              totalRevenue={kpiMetrics?.totalRevenue || 0}
            />
          </div>
          <div className="col-span-12 lg:col-span-6">
            <UserGrowthChart
              //  data={WEEKLY_USER_DATA}
              totalUsers={kpiMetrics?.totalUsers || 0}
              totalUsersChange={kpiMetrics?.totalUsersChange || 0}
              data={weeklyUsers}
            />
          </div>
        </div>

        <div className="hidden">
          <div className="grid grid-cols-12 gap-8">
            {/* Recent Activity Feed */}
            <div className="col-span-12 flex lg:col-span-8">
              <div className="h-full w-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">
                    Recent Activity
                  </h3>
                </div>
                <div className="space-y-6">
                  {[
                    {
                      text: "New order #ORD-7829 placed by Alice Johnson",
                      time: "2 mins ago",
                      icon: ShoppingBag,
                      color: "text-blue-500 bg-blue-50",
                    },
                    {
                      text: 'Vendor "TechGiant" submitted KYC documents',
                      time: "1 hour ago",
                      icon: AlertCircle,
                      color: "text-amber-500 bg-amber-50",
                    },
                    {
                      text: "Order #ORD-7712 delivered to UK",
                      time: "3 hours ago",
                      icon: Truck,
                      color: "text-green-500 bg-green-50",
                    },
                    {
                      text: 'New User "Michael Smith" registered',
                      time: "5 hours ago",
                      icon: Users,
                      color: "text-purple-500 bg-purple-50",
                    },
                    {
                      text: 'Payment received from "ElectroWorld"',
                      time: "6 hours ago",
                      icon: DollarSign,
                      color: "text-green-500 bg-green-50",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg ${item.color}`}>
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {item.text}
                        </p>
                        <p className="text-xs text-gray-500">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions Needed */}
            <div className="col-span-12 flex lg:col-span-4">
              <div className="h-full w-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h3 className="mb-6 text-lg font-bold text-gray-900">
                  Actions Needed
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-xl border border-red-100 bg-red-50 p-4">
                    <div>
                      <div className="font-bold text-red-700">
                        5 Pending Verifications
                      </div>
                      <div className="text-xs text-red-600/80">
                        Vendor KYC Requests
                      </div>
                    </div>
                    <Link
                      to="/verification"
                      className="px-3 py-1.5 bg-red-100 text-red-700 text-xs font-bold rounded-lg hover:bg-red-200"
                    >
                      Review
                    </Link>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-amber-100 bg-amber-50 p-4">
                    <div>
                      <div className="font-bold text-amber-700">
                        12 Unshipped Orders
                      </div>
                      <div className="text-xs text-amber-600/80">
                        Exceeding 24h limit
                      </div>
                    </div>
                    <Link
                      to="/orders"
                      className="px-3 py-1.5 bg-amber-100 text-amber-700 text-xs font-bold rounded-lg hover:bg-amber-200"
                    >
                      Manage
                    </Link>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-blue-100 bg-blue-50 p-4">
                    <div>
                      <div className="font-bold text-blue-700">
                        3 New Support Messages
                      </div>
                      <div className="text-xs text-blue-600/80">
                        High Priority
                      </div>
                    </div>
                    <Link
                      to="/chats"
                      className="px-3 py-1.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-lg hover:bg-blue-200"
                    >
                      Reply
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
