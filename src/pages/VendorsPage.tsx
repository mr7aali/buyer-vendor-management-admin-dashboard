import { useState } from "react";
import { Header } from "../components/dashboard/Header";

import {
  Search,
  Star,
  ExternalLink,
  ShieldCheck,
  Download,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ExportReportModal } from "../components/transactions/ExportReportModal";
import { useGetAllVendorsQuery } from "@/redux/features/api/baseApi";
import { cn } from "@/lib/utils";

export function VendorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState<
    | "createdAt"
    | "fulllName"
    | "storename"
    | "revenue"
    | "rating"
    | "totalOrders"
  >("createdAt");

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Fetch vendors with API filters
  const { data, isLoading, isError } = useGetAllVendorsQuery({
    page: page.toString(),
    limit: "12",
    search: searchQuery || undefined,
    gender: genderFilter || undefined,
    isActive: statusFilter || undefined,
    sortBy,
    sortOrder,
  });

  const vendorsData = data?.data.items;
  const meta = data?.data.meta;

  return (
    <div className="min-h-screen bg-[#E8F3F1] font-sans text-gray-900 pb-12">
      <Header />

      <main className="max-w-[1600px] mx-auto px-6 pt-8">
        <div className="flex flex-col justify-between gap-4 mb-8 md:flex-row md:items-center">
          <div>
            <h1 className="mb-2 text-2xl font-bold text-gray-900">
              Vendor Directory
            </h1>
            <p className="text-gray-500">
              Monitor vendor performance, approvals, and compliance.
            </p>
          </div>
          <button
            onClick={() => setIsExportModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 transition-colors bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 mb-6 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
            <input
              type="text"
              placeholder="Search vendors by name, store, business..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1); // Reset to first page on search
              }}
              className="w-full py-3 pl-12 pr-4 text-sm bg-white border border-gray-200 shadow-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value as any);
              setPage(1);
            }}
            className="px-4 py-3 text-sm bg-white border border-gray-200 shadow-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="createdAt">Sort by Date</option>
            <option value="fulllName">Sort by Name</option>
            <option value="storename">Sort by Store Name</option>
            <option value="revenue">Sort by Revenue</option>
            <option value="rating">Sort by Rating</option>
            <option value="totalOrders">Sort by Orders</option>
          </select>

          {/* Sort Order */}
          <select
            value={sortOrder}
            onChange={(e) => {
              setSortOrder(e.target.value as "asc" | "desc");
              setPage(1);
            }}
            className="px-4 py-3 text-sm bg-white border border-gray-200 shadow-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>

          {/* Gender Filter */}
          <select
            value={genderFilter}
            onChange={(e) => {
              setGenderFilter(e.target.value);
              setPage(1);
            }}
            className="px-4 py-3 text-sm bg-white border border-gray-200 shadow-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="">All Genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="px-4 py-3 text-sm bg-white border border-gray-200 shadow-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="">All Status</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="py-12 text-center">
            <p className="text-red-500">
              Failed to load vendors. Please try again.
            </p>
          </div>
        )}

        {/* Vendors Grid */}
        {!isLoading && !isError && (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {vendorsData && vendorsData.length > 0 ? (
                vendorsData.map((vendor) => (
                  <div
                    key={vendor.id}
                    className="relative p-6 transition-shadow bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-md group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-16 h-16 p-1 border border-gray-100 rounded-xl bg-gray-50">
                        <img
                          src={vendor.logoUrl}
                          alt={vendor.businessName || vendor.storename}
                          className="object-cover w-full h-full rounded-lg"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://via.placeholder.com/100?text=No+Logo";
                          }}
                        />
                      </div>
                      <div className="flex gap-2">
                        <span
                          className={cn(
                            "inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium border",
                            vendor.isActive &&
                              "bg-[#E6F4EA] text-[#1E7E34] border-[#1E7E34]/20",
                            !vendor.isActive &&
                              "bg-[#FEF7E0] text-[#B06000] border-[#B06000]/20",
                          )}
                        >
                          {vendor.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h3 className="flex items-center gap-1 mb-1 text-lg font-bold text-gray-900">
                        {vendor.fulllName}
                        {vendor.isActive && (
                          <ShieldCheck className="w-4 h-4 text-green-500" />
                        )}
                      </h3>
                      <p className="mb-2 text-sm text-gray-500">
                        {vendor.vendorCode}
                      </p>
                      <p className="mb-2 text-[12px] text-gray-500">
                        {vendor.address || "Dhaka • Bangladesh"}
                      </p>
                    </div>

                    <i>
                      <p className="pb-4 text-sm text-gray-600 line-clamp-2">
                        {vendor.storeDescription}
                      </p>
                    </i>

                    <div className="grid grid-cols-2 gap-4 py-4 mb-4 border-t border-b border-gray-50">
                      <div>
                        <div className="mb-1 text-xs text-gray-500">
                          Revenue
                        </div>
                        <div className="font-bold text-gray-900">
                          ${vendor.revenue.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <div className="mb-1 text-xs text-gray-500">
                          Products
                        </div>
                        <div className="font-bold text-gray-900">
                          {vendor.counts.products}
                        </div>
                      </div>
                      <div>
                        <div className="mb-1 text-xs text-gray-500">Orders</div>
                        <div className="font-bold text-gray-900">
                          {vendor.totalOrders}
                        </div>
                      </div>
                      <div>
                        <div className="mb-1 text-xs text-gray-500">Rating</div>
                        <div className="flex items-center gap-1 font-bold text-amber-500">
                          <Star className="w-3 h-3 fill-current" />
                          {vendor.rating.toFixed(1)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        {vendor.counts.connections} connections
                      </div>
                      <Link
                        to={`/vendors/${vendor.id}`}
                        className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                      >
                        View Profile <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center text-gray-500 col-span-full">
                  No vendors found matching your filters.
                </div>
              )}
            </div>

            {/* Pagination */}
            {meta && meta.totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 mt-8 bg-white border border-gray-200 rounded-xl">
                <div className="text-sm text-gray-600">
                  Showing {vendorsData?.length || 0} of {meta.total} vendors
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage(page - 1)}
                    disabled={!meta.hasPrevPage}
                    className={cn(
                      "px-4 py-2 text-sm font-medium rounded-lg border transition-colors",
                      meta.hasPrevPage
                        ? "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                        : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed",
                    )}
                  >
                    Previous
                  </button>
                  <div className="flex items-center gap-2 px-4 text-sm text-gray-600">
                    Page {meta.page} of {meta.totalPages}
                  </div>
                  <button
                    onClick={() => setPage(page + 1)}
                    disabled={!meta.hasNextPage}
                    className={cn(
                      "px-4 py-2 text-sm font-medium rounded-lg border transition-colors",
                      meta.hasNextPage
                        ? "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                        : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed",
                    )}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        <ExportReportModal
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
          data={vendorsData || []}
          reportType="vendors"
        />
      </main>
    </div>
  );
}
