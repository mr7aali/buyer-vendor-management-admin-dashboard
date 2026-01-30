import { useState } from "react";
import { Header } from "../components/dashboard/Header";
import { StatusBadge } from "../components/ui/StatusBadge";
import {
  Search,
  MessageCircle,
  Eye,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Phone,
  MapPin,
  Calendar,
  Mail,
  Download,
  ArrowUpDown,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { ExportReportModal } from "../components/transactions/ExportReportModal";

import { useGetAllUsersQuery } from "@/redux/features/api/baseApi";
import { cn } from "@/lib/utils";

export function BuyersPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Build query parameters
  const queryParams = {
    userType: "buyer",
    page: currentPage.toString(),
    limit: itemsPerPage.toString(),
    ...(searchTerm && { search: searchTerm }),
    ...(genderFilter !== "all" && { gender: genderFilter }),
    ...(statusFilter !== "all" && {
      isActive: statusFilter === "active" ? "true" : "false",
    }),
    sortBy,
    sortOrder,
  };

  const {
    data: rawResponse,
    error,
    isLoading,
  } = useGetAllUsersQuery(queryParams, {
    refetchOnMountOrArgChange: true,
  });

  const buyers = rawResponse?.data.data || [];
  const meta = rawResponse?.data.meta as
    | {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
      }
    | undefined;

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#E8F3F1] font-sans text-gray-900 pb-12">
      <Header />

      <main className="max-w-[1600px] mx-auto px-6 pt-8">
        <div className="flex flex-col justify-between gap-4 mb-8 md:flex-row md:items-center">
          <div>
            <h1 className="mb-2 text-2xl font-bold text-gray-900">
              Buyers Management
            </h1>
            <p className="text-gray-500">
              Manage your customer base, view history, and handle accounts.
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

        {/* Filters and Search */}
        <div className="flex flex-col items-center justify-between gap-4 p-4 mb-6 bg-white border border-gray-100 shadow-sm rounded-2xl md:flex-row">
          <div className="relative w-full md:w-96">
            <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
            <input
              type="text"
              placeholder="Search by name, email, or ID..."
              className="w-full py-2 pl-10 pr-4 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <select
              value={genderFilter}
              onChange={(e) => {
                setGenderFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="all">All Genders</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="createdAt">Sort by Date</option>
              <option value="email">Sort by Email</option>
              <option value="fulllName">Sort by Name</option>
            </select>
            <button
              onClick={() => {
                setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                setCurrentPage(1);
              }}
              className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <ArrowUpDown className="w-4 h-4" />
              {sortOrder === "asc" ? "Asc" : "Desc"}
            </button>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="10">10 per page</option>
              <option value="20">20 per page</option>
              <option value="50">50 per page</option>
              <option value="100">100 per page</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl">
          {isLoading ? (
            <div className="flex items-center justify-center p-12">
              <div className="text-gray-500">Loading buyers...</div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center p-12">
              <div className="text-red-500">Error loading buyers</div>
            </div>
          ) : buyers.length === 0 ? (
            <div className="flex items-center justify-center p-12">
              <div className="text-gray-500">No buyers found</div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-500 uppercase">
                        Buyer
                      </th>
                      <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-500 uppercase">
                        Contact Info
                      </th>
                      <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-500 uppercase">
                        Status
                      </th>
                      <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-500 uppercase">
                        Gender
                      </th>
                      <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-500 uppercase">
                        Stats
                      </th>
                      <th className="px-6 py-4 text-xs font-semibold tracking-wider text-right text-gray-500 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {buyers.map((buyer) => (
                      <tr
                        key={buyer.id}
                        onClick={() => navigate(`/buyers/${buyer.id}`)}
                        className="transition-colors cursor-pointer hover:bg-gray-50 group"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10">
                              <img
                                className="object-cover w-full h-full border border-gray-200 rounded-full"
                                src={
                                  buyer.buyer?.profilePhotoUrl ||
                                  "/default-avatar.png"
                                }
                                alt=""
                              />
                            </div>

                            <div>
                              <div className="flex items-center gap-1 text-sm font-medium text-gray-900">
                                {buyer.buyer?.fulllName ?? "-- --"}
                                {buyer.isVerified && (
                                  <ShieldCheck className="w-3 h-3 text-green-500" />
                                )}
                              </div>
                              <div className="text-xs text-gray-500">
                                ID: #{buyer.index}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <Mail className="w-3 h-3 text-gray-400" />
                              {buyer.email ?? "---"}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <Phone className="w-3 h-3 text-gray-400" />
                              {buyer.buyer?.phone ?? "N/A"}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <MapPin className="w-3 h-3 text-gray-400" />
                              {buyer?.evanAddress ? buyer.evanAddress : "N/A"}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                              <Calendar className="w-3 h-3" />
                              Joined{" "}
                              {new Date(buyer.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                },
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={cn(
                              "inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium border",
                              buyer?.buyer?._count?.orders &&
                                buyer?.buyer?._count?.orders > 20
                                ? "bg-[#E6F4EA] text-[#1E7E34] border-[#1E7E34]/20"
                                : "bg-gray-100 text-gray-600 border-gray-300/20",
                            )}
                          >
                            {buyer?.buyer?._count?.orders &&
                            buyer?.buyer?._count?.orders
                              ? "Active"
                              : "Inactive"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {buyer.buyer?.gender || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-gray-900">
                            ${buyer.buyer?.orderStats?.totalAmount || 0}
                          </div>
                          <div className="text-xs text-gray-500">
                            {buyer.buyer?._count?.orders ?? 0} Orders
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              to={`/buyers/${buyer.id}`}
                              className="p-2 text-gray-400 hover:text-primary hover:bg-[#E8F3F1] rounded-lg transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                            <Link
                              to="/chats"
                              className="p-2 text-gray-400 transition-colors rounded-lg hover:text-blue-600 hover:bg-blue-50"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MessageCircle className="w-4 h-4" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              <div className="flex items-center justify-between p-4 border-t border-gray-100">
                <div className="text-sm text-gray-500">
                  Showing{" "}
                  <span className="font-medium">
                    {(currentPage - 1) * itemsPerPage + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(currentPage * itemsPerPage, meta?.total || 0)}
                  </span>{" "}
                  of <span className="font-medium">{meta?.total || 0}</span>{" "}
                  results
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={!meta?.hasPrevPage || currentPage === 1}
                    className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  {Array.from({ length: Number(meta?.totalPages) || 0 }).map(
                    (_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                          currentPage === i + 1
                            ? "bg-primary text-white"
                            : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ),
                  )}
                  <button
                    onClick={() =>
                      setCurrentPage((prev) =>
                        Math.min(prev + 1, Number(meta?.totalPages) || 1),
                      )
                    }
                    disabled={
                      !meta?.hasNextPage ||
                      currentPage === Number(meta?.totalPages)
                    }
                    className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <ExportReportModal
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
          data={buyers}
          reportType="buyers"
        />
      </main>
    </div>
  );
}
