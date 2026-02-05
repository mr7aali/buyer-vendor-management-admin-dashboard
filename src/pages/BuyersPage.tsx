import { useState } from "react";
import { Header } from "../components/dashboard/Header";

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

  // Build query parameters - only include valid sortBy values
  const queryParams = {
    userType: "buyer",
    page: currentPage.toString(),
    limit: itemsPerPage.toString(),
    ...(searchTerm && { search: searchTerm }),
    ...(genderFilter !== "all" && { gender: genderFilter }),
    ...(statusFilter !== "all" && {
      isActive: statusFilter === "active" ? "true" : "false",
    }),
    // Only include sortBy if it's createdAt or email (known valid values)
    ...(["createdAt", "email"].includes(sortBy) && { sortBy }),
    sortOrder,
  };

  const {
    data: rawResponse,
    error,
    isLoading,
    isFetching,
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

  const isBusy = isFetching || isLoading;
  return (
    <div className="min-h-screen bg-[#E8F3F1] font-sans text-gray-900 pb-12">
      <Header />

      <main className="max-w-[1600px] mx-auto px-6 pt-8">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
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
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
          >
            <Download className="h-4 w-4" />
            Export Report
          </button>
        </div>

        {/* Filters and Search */}
        <div className="mb-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm md:flex-row">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or ID..."
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <select
              value={genderFilter}
              onChange={(e) => {
                setGenderFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
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
              className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="createdAt">Sort by Date</option>
              <option value="email">Sort by Email</option>
              {/* Removed name sorting - add back when you know the correct field name */}
            </select>
            <button
              onClick={() => {
                setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                setCurrentPage(1);
              }}
              className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <ArrowUpDown className="h-4 w-4" />
              {sortOrder === "asc" ? "Asc" : "Desc"}
            </button>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="10">10 per page</option>
              <option value="20">20 per page</option>
              <option value="50">50 per page</option>
              <option value="100">100 per page</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          {isBusy ? (
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
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Buyer
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Contact Info
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Gender
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Stats
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {buyers.map((buyer) => (
                      <tr
                        key={buyer.id}
                        onClick={() => navigate(`/buyers/${buyer.id}`)}
                        className="group cursor-pointer transition-colors hover:bg-gray-50"
                      >
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10">
                              <img
                                className="h-full w-full rounded-full border border-gray-200 object-cover"
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
                                {/* {buyer.isVerified && ( */}
                                <ShieldCheck className="h-3 w-3 text-green-500" />
                                {/* // )} */}
                              </div>
                              <div className="text-xs text-gray-500">
                                ID: #{buyer.index}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <Mail className="h-3 w-3 text-gray-400" />
                              {buyer.email ?? "---"}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <Phone className="h-3 w-3 text-gray-400" />
                              {buyer.buyer?.phone ?? "N/A"}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <MapPin className="h-3 w-3 text-gray-400" />
                              {buyer?.evanAddress ? buyer.evanAddress : "N/A"}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                              <Calendar className="h-3 w-3" />
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
                        <td className="whitespace-nowrap px-6 py-4">
                          <span
                            className={cn(
                              "inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium border",
                              buyer?.buyer?._count?.orders &&
                                buyer?.buyer?._count?.orders > 0
                                ? "bg-[#E6F4EA] text-[#1E7E34] border-[#1E7E34]/20"
                                : "bg-gray-100 text-gray-600 border-gray-300/20",
                            )}
                          >
                            {buyer?.buyer?._count?.orders &&
                            buyer?.buyer?._count?.orders > 0
                              ? "Active"
                              : "Inactive"}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          {buyer.buyer?.gender || "N/A"}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="text-sm font-bold text-gray-900">
                            ${buyer.buyer?.orderStats?.totalAmount || 0}
                          </div>
                          <div className="text-xs text-gray-500">
                            {buyer.buyer?._count?.orders ?? 0} Orders
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                          <div className="flex items-center justify-end gap-2">
                            {buyer?.buyer && (
                              <Link
                                to={`/buyers/${buyer?.buyer.id}`}
                                className="p-2 text-gray-400 hover:text-primary hover:bg-[#E8F3F1] rounded-lg transition-colors"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Eye className="h-4 w-4" />
                              </Link>
                            )}

                            <Link
                              to="/chats"
                              className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-600"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MessageCircle className="h-4 w-4" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              <div className="flex items-center justify-between border-t border-gray-100 p-4">
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
                    className="rounded-lg border border-gray-200 p-2 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <ChevronLeft className="h-4 w-4" />
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
                    className="rounded-lg border border-gray-200 p-2 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <ChevronRight className="h-4 w-4" />
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
