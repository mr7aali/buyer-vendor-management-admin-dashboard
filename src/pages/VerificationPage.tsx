import React, { useMemo, useState } from "react";
import { Header } from "../components/dashboard/Header";
import {
  DocumentViewer,
  VerificationDocument,
} from "../components/verification/DocumentViewer";
import { Users, Store, Filter, Search } from "lucide-react";
import {
  useGetPendingBuyersQuery,
  useGetPendingVendorsQuery,
  useVerifyBuyerDocumentsMutation,
  useVerifyVendorDocumentsMutation,
} from "@/redux/features/api/baseApi";
export function VerificationPage() {
  const [activeTab, setActiveTab] = useState<"users" | "vendors">("users");
  const [searchQuery, setSearchQuery] = useState("");
  const { data: buyerData, isLoading: isLoadingBuyers } =
    useGetPendingBuyersQuery();
  const { data: vendorData, isLoading: isLoadingVendors } =
    useGetPendingVendorsQuery();
  const [verifyBuyerDocuments] = useVerifyBuyerDocumentsMutation();
  const [verifyVendorDocuments] = useVerifyVendorDocumentsMutation();

  const formatDate = (value: string) =>
    new Date(value).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const buyerDocs = useMemo<VerificationDocument[]>(() => {
    const items = buyerData?.data ?? [];
    return items.map((buyer) => ({
      id: buyer.id,
      title: buyer.fulllName,
      subtitle: buyer.user?.email || "No email",
      createdAt: formatDate(buyer.createdAt),
      status: "pending",
      images: [
        { label: "Profile Photo", url: buyer.profilePhotoUrl },
        { label: "NID Front", url: buyer.nidFontPhotoUrl },
        { label: "NID Back", url: buyer.nidBackPhotoUrl },
      ].filter((image) => !!image.url),
    }));
  }, [buyerData]);

  const vendorDocs = useMemo<VerificationDocument[]>(() => {
    const items = vendorData?.data ?? [];
    return items.map((vendor) => ({
      id: vendor.id,
      title: vendor.storename || vendor.fulllName,
      subtitle: vendor.user?.email || "No email",
      createdAt: formatDate(vendor.createdAt),
      status: "pending",
      images: [
        { label: "Logo", url: vendor.logoUrl },
        { label: "NID Front", url: vendor.nidFontPhotoUrl },
        { label: "NID Back", url: vendor.nidBackPhotoUrl },
        { label: "Business ID", url: vendor.bussinessIdPhotoUrl },
      ].filter((image) => !!image.url),
    }));
  }, [vendorData]);

  const filteredDocs = useMemo(() => {
    const list = activeTab === "users" ? buyerDocs : vendorDocs;
    if (!searchQuery.trim()) return list;
    const query = searchQuery.toLowerCase();
    return list.filter(
      (doc) =>
        doc.title.toLowerCase().includes(query) ||
        doc.subtitle.toLowerCase().includes(query),
    );
  }, [activeTab, buyerDocs, vendorDocs, searchQuery]);
  const handleApprove = (id: string) => {
    if (activeTab === "users") {
      verifyBuyerDocuments({ id, isNidVerify: true });
    } else {
      verifyVendorDocuments({
        id,
        isNidVerify: true,
        isBussinessIdVerified: true,
      });
    }
  };
  const handleReject = (id: string, reason: string) => {
    if (activeTab === "users") {
      verifyBuyerDocuments({ id, isNidVerify: false });
    } else {
      verifyVendorDocuments({
        id,
        isNidVerify: false,
        isBussinessIdVerified: false,
      });
    }
  };
  return (
    <div className="min-h-screen bg-[#E8F3F1] font-sans text-gray-900 pb-12">
      <Header />

      <main className="max-w-[1600px] mx-auto px-6 pt-8">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="mb-2 text-2xl font-bold text-gray-900">
              Verification Queue
            </h1>
            <p className="text-gray-500">
              Review and approve KYC documents for users and vendors.
            </p>
          </div>

          <div className="flex rounded-xl border border-gray-200 bg-white p-1">
            <button
              onClick={() => setActiveTab("users")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "users" ? "bg-[#E8F3F1] text-[#278687]" : "text-gray-600 hover:bg-gray-50"}`}
            >
              <Users className="h-4 w-4" />
              User Verification
            </button>
            <button
              onClick={() => setActiveTab("vendors")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "vendors" ? "bg-[#E8F3F1] text-[#278687]" : "text-gray-600 hover:bg-gray-50"}`}
            >
              <Store className="h-4 w-4" />
              Vendor KYC
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col justify-between gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm md:flex-row">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            <input
              type="text"
              placeholder={`Search ${activeTab === "users" ? "users" : "vendors"}...`}
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#278687]/20 focus:border-[#278687]"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
              <Filter className="h-4 w-4" />
              Status: All
            </button>
          </div>
        </div>

        {/* Document Viewer */}
        {activeTab === "users" && isLoadingBuyers ? (
          <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center text-sm text-gray-500 shadow-sm">
            Loading pending buyers...
          </div>
        ) : activeTab === "vendors" && isLoadingVendors ? (
          <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center text-sm text-gray-500 shadow-sm">
            Loading pending vendors...
          </div>
        ) : (
          <DocumentViewer
            documents={filteredDocs}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        )}
      </main>
    </div>
  );
}
