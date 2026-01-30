import { useState } from "react";
import { Header } from "../components/dashboard/Header";

import {
  Search,
  Star,
  ExternalLink,
  ShieldCheck,
  Download,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ExportReportModal } from "../components/transactions/ExportReportModal";
import { useGetAllVendorsQuery } from "@/redux/features/api/baseApi";
import { cn } from "@/lib/utils";

export function VendorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [countryFilter, setCountryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const vendors = [
    {
      id: "1",
      name: "TechGiant Solutions",
      category: "Electronics",
      products: 145,
      revenue: "$45,230",
      rating: 4.8,
      status: "Active",
      verified: true,
      country: "USA",
      logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    },
    {
      id: "2",
      name: "Fashion Forward",
      category: "Clothing",
      products: 320,
      revenue: "$28,450",
      rating: 4.5,
      status: "Active",
      verified: true,
      country: "UK",
      logo: "https://images.unsplash.com/photo-1554774853-719586f8c277?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    },
    {
      id: "3",
      name: "Home & Living Co.",
      category: "Home Decor",
      products: 85,
      revenue: "$12,100",
      rating: 4.2,
      status: "Pending",
      verified: false,
      country: "Canada",
      logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    },
  ];
  const { data } = useGetAllVendorsQuery({});
  const vendorsData = data?.data?.items;

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch = vendor.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || vendor.category === categoryFilter;
    const matchesCountry =
      countryFilter === "all" || vendor.country === countryFilter;
    const matchesStatus =
      statusFilter === "all" || vendor.status === statusFilter;
    return matchesSearch && matchesCategory && matchesCountry && matchesStatus;
  });

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
              placeholder="Search vendors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3 pl-12 pr-4 text-sm bg-white border border-gray-200 shadow-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-3 text-sm bg-white border border-gray-200 shadow-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="all">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Home Decor">Home Decor</option>
          </select>
          <select
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
            className="px-4 py-3 text-sm bg-white border border-gray-200 shadow-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="all">All Countries</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
            <option value="Canada">Canada</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 text-sm bg-white border border-gray-200 shadow-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {vendorsData &&
            vendorsData.map((vendor) => (
              <div
                key={vendor.id}
                className="relative p-6 transition-shadow bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-md group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 p-1 border border-gray-100 rounded-xl bg-gray-50">
                    <img
                      src={vendor.logoUrl}
                      alt={vendor.businessName || vendor.logoUrl}
                      className="object-cover w-full h-full rounded-lg"
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
                      {vendor.isActive ? "Active" : "Pending"}
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="flex items-center gap-1 mb-1 text-lg font-bold text-gray-900">
                    {vendor.fulllName}
                    {vendor.isActive && (
                      <ShieldCheck
                        className="w-4 h-4 text-green-500"
                        // title="Verified"
                      />
                    )}
                  </h3>
                  <p className="text-sm text-gray-500 mb -4">
                    {/* {vendor.category} • {vendor.country}
                     */}
                    {vendor.vendorCode}
                  </p>
                  <p className="mb-2 text-[12px] text-gray-500">
                    {/* {vendor.category} • {vendor.country}
                     */}
                    Dhaka • Bangladesh
                  </p>
                </div>{" "}
                <i>
                  <p className="pb-4">{vendor.storeDescription}</p>
                </i>
                <div className="grid grid-cols-2 gap-4 py-4 mb-4 border-t border-b border-gray-50">
                  <div>
                    <div className="mb-1 text-xs text-gray-500">Revenue</div>
                    <div className="font-bold text-gray-900">
                      {vendor.revenue}
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 text-xs text-gray-500">Products</div>
                    <div className="font-bold text-gray-900">
                      {vendor.counts.products}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm font-bold text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    {vendor.rating}
                  </div>
                  <Link
                    to={`/vendors/${vendor.id}`}
                    className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    View Profile <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          {filteredVendors.length === 0 && (
            <div className="py-12 text-center text-gray-500 col-span-full">
              No vendors found matching your filters.
            </div>
          )}
        </div>

        <ExportReportModal
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
          data={filteredVendors}
          reportType="vendors"
        />
      </main>
    </div>
  );
}
