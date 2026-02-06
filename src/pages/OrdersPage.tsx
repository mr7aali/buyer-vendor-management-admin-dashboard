import React, { useState } from "react";
import { Header } from "../components/dashboard/Header";
import { StatusBadge, StatusType } from "../components/ui/StatusBadge";
import {
  Search,
  Download,
  Eye,
  Truck,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { ExportReportModal } from "../components/transactions/ExportReportModal";
import { useGetAllOrdersQuery } from "@/redux/features/api/baseApi";
import { OrderStatus } from "@/@types/oder";

export function OrdersPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [routeFilter, setRouteFilter] = useState("all");
  const { data } = useGetAllOrdersQuery({});
  const orders = data?.data.data || [];

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const mapStatus = (status: OrderStatus | string): StatusType => {
    switch (status.toLowerCase()) {
      case OrderStatus.PROCESSING: // "processing"
      case OrderStatus.SHIPPED: // "shipped"
      case OrderStatus.OUT_FOR_DELIVERED: // "out_for_delivered"
        return "in-progress";

      case OrderStatus.DELIVERED: // "delivered"
        return "completed";

      case OrderStatus.PENDING: // "pending"
        return "pending";

      case OrderStatus.CANCELLED: // "cancelled"
        return "cancelled";

      // Optional: if you have "deleted" or other unexpected statuses
      case "deleted":
        return "failed";

      default:
        return "in-progress"; // fallback for any unknown status
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.buyer.fulllName.includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      order.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesRoute =
      routeFilter === "all" ||
      order.status.toLowerCase() === routeFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesRoute;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen bg-[#E8F3F1] font-sans text-gray-900 pb-12">
      <Header />

      <main className="max-w-[1600px] mx-auto px-6 pt-8">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="mb-2 text-2xl font-bold text-gray-900">
              Order Management
            </h1>
            <p className="text-gray-500">
              Track and manage all customer orders.
            </p>
          </div>
          <button
            onClick={() => setIsExportModalOpen(true)}
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
          >
            <Download className="h-4 w-4" />
            Export Report
          </button>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-1 text-sm text-gray-500">Total Orders</div>
            <div className="text-2xl font-bold text-gray-900">1,245</div>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-1 text-sm text-gray-500">Pending</div>
            <div className="text-2xl font-bold text-amber-600">45</div>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-1 text-sm text-gray-500">Processing</div>
            <div className="text-2xl font-bold text-blue-600">128</div>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-1 text-sm text-gray-500">Completed</div>
            <div className="text-2xl font-bold text-green-600">1,072</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col min-h-[600px]">
          <div className="flex flex-col gap-4 border-b border-gray-100 p-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }} // Reset to page 1 on search
                className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
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
              onChange={(e) => {
                setRouteFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="all">All Routes</option>
              <option value="domestic">Domestic</option>
              <option value="international">International</option>
            </select>
          </div>

          <div className="flex-1 overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase text-gray-500">
                    Order ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase text-gray-500">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase text-gray-500">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase text-gray-500">
                    Items
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase text-gray-500">
                    Tracking Details
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase text-gray-500">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium uppercase text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedOrders.length > 0 ? (
                  paginatedOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="group cursor-pointer transition-colors hover:bg-gray-50"
                      onClick={() => navigate(`/orders/${order.id}`)}
                    >
                      <td className="px-6 py-4 text-sm font-medium text-primary group-hover:underline">
                        {order.orderNumber}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {order.buyer.fulllName}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {order.createdAt}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {order._count.items}
                        <span className="mx-1 text-gray-400">•</span>$
                        {order.totalAmount}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                            {/* {order.status === "" ? (
                              <Plane className="h-4 w-4 text-blue-500" />
                            ) : (
                              <Truck className="h-4 w-4 text-green-500" />
                            )} */}
                            <Truck className="h-4 w-4 text-green-500" />
                            order.origin
                            <ArrowRight className="h-3 w-3 text-gray-400" />
                            order.destination
                          </div>
                          <span className="mt-1 text-xs text-gray-400">
                            {order.status} Shipping
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={mapStatus(order.status)} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-primary">
                          <Eye className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No orders found matching your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {filteredOrders.length > 0 && (
            <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-100 bg-white p-4 sm:flex-row">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>Rows per page:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="rounded-lg border border-gray-200 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                <span>
                  Showing {startIndex + 1}-
                  {Math.min(startIndex + itemsPerPage, filteredOrders.length)}{" "}
                  of {filteredOrders.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="rounded-lg border border-gray-200 p-2 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                          currentPage === page
                            ? "bg-primary text-white"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {page}
                      </button>
                    ),
                  )}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="rounded-lg border border-gray-200 p-2 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        <ExportReportModal
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
          data={filteredOrders}
          reportType="orders"
        />
      </main>
    </div>
  );
}
