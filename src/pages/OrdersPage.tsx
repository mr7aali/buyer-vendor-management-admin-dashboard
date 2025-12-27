import React, { useState } from 'react';
import { Header } from '../components/dashboard/Header';
import { StatusBadge, StatusType } from '../components/ui/StatusBadge';
import { Search, Filter, Download, Eye, MoreHorizontal, Calendar, Plane, Truck, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

type Order = {
  id: string;
  customer: string;
  date: string;
  items: number;
  total: string;
  status: 'Completed' | 'Processing' | 'Pending' | 'Cancelled' | 'Shipped' | 'Delivered';
  payment: 'Paid' | 'Unpaid' | 'Refunded';
  origin: string;
  destination: string;
  type: 'Domestic' | 'International';
};

export function OrdersPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [routeFilter, setRouteFilter] = useState('all');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Expanded Mock Data
  const orders: Order[] = [
    { id: 'ORD-7829', customer: 'Alice Johnson', date: 'Oct 24, 2023', items: 3, total: '$156.00', status: 'Processing', payment: 'Paid', origin: 'USA', destination: 'USA', type: 'Domestic' },
    { id: 'ORD-7828', customer: 'Michael Smith', date: 'Oct 24, 2023', items: 1, total: '$45.50', status: 'Shipped', payment: 'Paid', origin: 'China', destination: 'USA', type: 'International' },
    { id: 'ORD-7827', customer: 'Emma Wilson', date: 'Oct 23, 2023', items: 2, total: '$89.99', status: 'Delivered', payment: 'Paid', origin: 'UK', destination: 'France', type: 'International' },
    { id: 'ORD-7826', customer: 'James Brown', date: 'Oct 23, 2023', items: 4, total: '$230.00', status: 'Pending', payment: 'Pending', origin: 'Canada', destination: 'Canada', type: 'Domestic' },
    { id: 'ORD-7825', customer: 'Sophia Lee', date: 'Oct 22, 2023', items: 1, total: '$120.00', status: 'Cancelled', payment: 'Refunded', origin: 'USA', destination: 'USA', type: 'Domestic' },
    { id: 'ORD-7824', customer: 'Liam Garcia', date: 'Oct 22, 2023', items: 5, total: '$540.00', status: 'Processing', payment: 'Paid', origin: 'Germany', destination: 'Spain', type: 'International' },
    { id: 'ORD-7823', customer: 'Olivia Martinez', date: 'Oct 21, 2023', items: 2, total: '$65.00', status: 'Delivered', payment: 'Paid', origin: 'Mexico', destination: 'USA', type: 'International' },
    { id: 'ORD-7822', customer: 'Noah Rodriguez', date: 'Oct 21, 2023', items: 1, total: '$25.00', status: 'Pending', payment: 'Unpaid', origin: 'USA', destination: 'USA', type: 'Domestic' },
    { id: 'ORD-7821', customer: 'Ava Hernandez', date: 'Oct 20, 2023', items: 3, total: '$210.00', status: 'Shipped', payment: 'Paid', origin: 'USA', destination: 'Canada', type: 'International' },
    { id: 'ORD-7820', customer: 'William Lopez', date: 'Oct 20, 2023', items: 2, total: '$95.00', status: 'Completed', payment: 'Paid', origin: 'USA', destination: 'USA', type: 'Domestic' },
    { id: 'ORD-7819', customer: 'Isabella Gonzalez', date: 'Oct 19, 2023', items: 1, total: '$40.00', status: 'Processing', payment: 'Paid', origin: 'Italy', destination: 'France', type: 'International' },
    { id: 'ORD-7818', customer: 'Mason Wilson', date: 'Oct 19, 2023', items: 4, total: '$320.00', status: 'Delivered', payment: 'Paid', origin: 'USA', destination: 'USA', type: 'Domestic' },
    { id: 'ORD-7817', customer: 'Mia Anderson', date: 'Oct 18, 2023', items: 2, total: '$75.00', status: 'Pending', payment: 'Pending', origin: 'Japan', destination: 'USA', type: 'International' },
    { id: 'ORD-7816', customer: 'Benjamin Thomas', date: 'Oct 18, 2023', items: 3, total: '$180.00', status: 'Shipped', payment: 'Paid', origin: 'USA', destination: 'UK', type: 'International' },
    { id: 'ORD-7815', customer: 'Charlotte Taylor', date: 'Oct 17, 2023', items: 1, total: '$50.00', status: 'Deleted', payment: 'Refunded', origin: 'USA', destination: 'USA', type: 'Domestic' } as any, // Using as any for 'Deleted' status testing fallback
  ];

  // Helper to map order status to StatusBadge supported types
  const mapStatus = (status: string): StatusType => {
    switch (status.toLowerCase()) {
      case 'processing': return 'in-progress';
      case 'shipped': return 'in-progress'; // Or 'active' depending on preference
      case 'delivered': return 'completed';
      case 'completed': return 'completed';
      case 'pending': return 'pending';
      case 'cancelled': return 'cancelled';
      case 'deleted': return 'failed';
      default: return 'in-progress';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesRoute = routeFilter === 'all' || order.type.toLowerCase() === routeFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesRoute;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen bg-[#E8F3F1] font-sans text-gray-900 pb-12" >
      <Header />

      <main className="max-w-[1600px] mx-auto px-6 pt-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Management</h1>
          <p className="text-gray-500">Track and manage all customer orders.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="text-gray-500 text-sm mb-1">Total Orders</div>
            <div className="text-2xl font-bold text-gray-900">1,245</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="text-gray-500 text-sm mb-1">Pending</div>
            <div className="text-2xl font-bold text-amber-600">45</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="text-gray-500 text-sm mb-1">Processing</div>
            <div className="text-2xl font-bold text-blue-600">128</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="text-gray-500 text-sm mb-1">Completed</div>
            <div className="text-2xl font-bold text-green-600">1,072</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col min-h-[600px]">
          <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} // Reset to page 1 on search
                className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
              className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <select
              value={routeFilter}
              onChange={(e) => { setRouteFilter(e.target.value); setCurrentPage(1); }}
              className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="all">All Routes</option>
              <option value="domestic">Domestic</option>
              <option value="international">International</option>
            </select>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Tracking Details</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedOrders.length > 0 ? (
                  paginatedOrders.map(order => (
                    <tr
                      key={order.id}
                      className="hover:bg-gray-50 transition-colors cursor-pointer group"
                      onClick={() => navigate(`/orders/${order.id}`)}
                    >
                      <td className="px-6 py-4 text-sm font-medium text-primary group-hover:underline">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {order.customer}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {order.date}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {order.items}
                        <span className="text-gray-400 mx-1">•</span>
                        {order.total}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                            {order.type === 'International' ? <Plane className="w-4 h-4 text-blue-500" /> : <Truck className="w-4 h-4 text-green-500" />}
                            {order.origin}
                            <ArrowRight className="w-3 h-3 text-gray-400" />
                            {order.destination}
                          </div>
                          <span className="text-xs text-gray-400 mt-1">{order.type} Shipping</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={mapStatus(order.status)} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500 hover:text-primary transition-colors">
                          <Eye className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                      No orders found matching your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {filteredOrders.length > 0 && (
            <div className="p-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>Rows per page:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                  className="border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                <span>
                  Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredOrders.length)} of {filteredOrders.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${currentPage === page
                          ? 'bg-primary text-white'
                          : 'text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}