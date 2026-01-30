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
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { ExportReportModal } from "../components/transactions/ExportReportModal";

import { useGetAllUsersQuery } from "@/redux/features/api/baseApi";
import { cn } from "@/lib/utils";

export function BuyersPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [countryFilter, setCountryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const {
    data: rawResponse,
    error,
    isLoading,
  } = useGetAllUsersQuery(
    { userType: "buyer" },
    {
      refetchOnMountOrArgChange: true,
    },
  );
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

  // console.log(buyers?.map((i) => console.log(i)));

  // Filtering Logic
  // const filteredBuyers = buyers.filter((buyer) => {
  //   const matchesSearch =
  //     buyer.buyer?.fulllName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     buyer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     buyer.id.toLowerCase().includes(searchTerm.toLowerCase());

  //   // const matchesStatus =
  //   //   statusFilter === "all" ||
  //   //   buyer.status.toLowerCase() === statusFilter.toLowerCase();
  //   // const matchesCountry =
  //   //   countryFilter === "all" ||
  //   //   buyer.country.toLowerCase() === countryFilter.toLowerCase();

  //   return matchesSearch && matchesStatus && matchesCountry;
  // });

  // Pagination Logic
  // const totalPages = Math.ceil(meta?.total / itemsPerPage);
  // const paginatedBuyers = filteredBuyers.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage,
  // );

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
                setCurrentPage(1); // Reset to page 1 on search
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
              <option value="blocked">Blocked</option>
            </select>
            <select
              value={countryFilter}
              onChange={(e) => {
                setCountryFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="all">All Countries</option>
              <option value="usa">USA</option>
              <option value="canada">Canada</option>
              <option value="uk">UK</option>
              <option value="germany">Germany</option>
              <option value="australia">Australia</option>
            </select>
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

        <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl">
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
                    Country
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
                {!isLoading &&
                  buyers &&
                  buyers?.length > 0 &&
                  buyers?.map((buyer) => (
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
                              src={buyer.buyer?.profilePhotoUrl}
                              alt=""
                            />
                          </div>

                          <div>
                            <div className="flex items-center gap-1 text-sm font-medium text-gray-900">
                              {buyer.buyer?.fulllName ?? "-- --"}
                              {1 && (
                                <ShieldCheck className="w-3 h-3 text-green-500" />
                              )}
                            </div>
                            <div className="text-xs text-gray-500">
                              ID: #{buyer.id}
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
                        {/* <StatusBadge
                          status={buyer.userType.toLowerCase() as any}
                        /> */}
                        <span
                          className={cn(
                            "inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium border",
                            "bg-[#E6F4EA] text-[#1E7E34] border-[#1E7E34]/20",
                          )}
                        >
                          {buyer.userType.toLowerCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        N/A
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-gray-900">
                          {buyer.buyer?.orderStats.totalAmount || 0}
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
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <Link
                            to="/chats"
                            className="p-2 text-gray-400 transition-colors rounded-lg hover:text-blue-600 hover:bg-blue-50"
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
              of <span className="font-medium">{meta?.total}</span> results
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: Number(meta?.totalPages) }).map((_, i) => (
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
              ))}
              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(prev + 1, Number(meta?.totalPages)),
                  )
                }
                disabled={currentPage === Number(meta?.totalPages)}
                className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
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
