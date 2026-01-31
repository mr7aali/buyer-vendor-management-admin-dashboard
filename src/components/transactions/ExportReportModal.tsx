import React, { useState } from "react";
import { X, FileText, Download, Loader2 } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type ReportType = "transactions" | "buyers" | "vendors" | "orders";

interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any[];
  reportType: ReportType;
}

export function ExportReportModal({
  isOpen,
  onClose,
  data,
  reportType,
}: ExportReportModalProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  console.log(data, "export report");
  if (!isOpen) return null;

  // Configuration for each report type
  const config = {
    transactions: {
      title: "Transactions Report",
      stats: [
        {
          label: "Total Volume",
          value: `$${data.reduce((sum, t) => sum + (t.amount || 0), 0).toFixed(2)}`,
        },
        {
          label: "Payout Volume",
          value: `$${data.reduce((sum, t) => sum + (t.payout || 0), 0).toFixed(2)}`,
        },
        { label: "Count", value: data.length },
      ],
      columns: ["ID", "Date", "Buyer", "Vendor", "Amount", "Status"],
      mapRow: (t: any) => [
        t.id,
        t.date,
        t.buyer,
        t.vendor,
        `$${t.amount?.toFixed(2)}`,
        t.status,
      ],
    },
    buyers: {
      title: "Buyers Directory Report",
      stats: [
        { label: "Total Buyers", value: data.length },
        {
          label: "Active Buyers",
          value: data.filter((b) => b?.buyer?.orderStats?.totalAmount > 1000)
            .length,
        },
      ],
      columns: ["ID", "Name", "Email", "Nid Number", "Total Spent"],
      mapRow: (b: any) => [
        b.index,
        b.fulllName,
        b.email,
        b.buyer.nidNumber,
        b.buyer.orderStats.totalAmount,
      ],
    },
    vendors: {
      title: "Vendor Directory Report",
      stats: [
        { label: "Total Vendors", value: data?.length || 0 },
        {
          label: "Active Vendors",
          value: data.filter((v) => v.isActive === true).length,
        },
        {
          label: "Total Products",
          value: data.reduce((sum, v) => sum + (v?.counts?.products || 0), 0),
        },
      ],
      columns: ["ID", "Name", "phone", "storename", "address", "Status"],
      mapRow: (v: any) => [
        v.id,
        v.fulllName,
        v.phone,
        v.storename,
        v.address,
        v.isActive ? "Active" : "Pending",
      ],
    },
    orders: {
      title: "Orders Management Report",
      stats: [
        { label: "Total Orders", value: data.length },
        {
          label: "Completed",
          value: 11,
        },
        {
          label: "Pending",
          value: 11,
        },
      ],
      columns: ["Order ID", "Date", "Customer", "Total", "Status", "Payment"],
      mapRow: (o: any) => [
        o.id,
        o.date,
        o.customer,
        o.total,
        o.status,
        o.payment,
      ],
    },
  };

  const currentConfig = config[reportType];

  const handleDownload = () => {
    setIsGenerating(true);

    setTimeout(() => {
      const doc = new jsPDF();

      // Title
      doc.setFontSize(20);
      doc.text(currentConfig.title, 14, 22);

      // Metadata
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(
        `Generated on: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
        14,
        30,
      );

      // Summary Stats
      let yPos = 38;
      currentConfig.stats.forEach((stat) => {
        doc.text(`${stat.label}: ${stat.value}`, 14, yPos);
        yPos += 6;
      });

      // Table
      const tableRows = data.map(currentConfig.mapRow);

      autoTable(doc, {
        startY: yPos + 5,
        head: [currentConfig.columns],
        body: tableRows,
        headStyles: { fillColor: [39, 134, 135] },
        alternateRowStyles: { fillColor: [245, 245, 245] },
        styles: { fontSize: 9 },
      });

      doc.save(`${reportType}_report_${new Date().getTime()}.pdf`);

      setIsGenerating(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden duration-200 bg-white shadow-xl rounded-2xl animate-in fade-in zoom-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900">
            <FileText className="w-5 h-5 text-[#278687]" />
            Export Report
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 transition-colors rounded-full hover:text-gray-600 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-blue-600 rounded-full bg-blue-50">
              <Download className="w-8 h-8" />
            </div>
            <h4 className="mb-2 text-xl font-bold text-gray-900">
              Ready to Export
            </h4>
            <p className="text-sm text-gray-500">
              You are about to export a
              <span className="mx-1 font-bold text-gray-900">{reportType}</span>
              report containing
              <span className="mx-1 font-bold text-gray-900">
                {data.length}
              </span>
              records.
            </p>
          </div>

          <div className="p-4 space-y-3 text-sm bg-gray-50 rounded-xl">
            {currentConfig.stats.map((stat, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="text-gray-500">{stat.label}</span>
                <span className="font-bold text-gray-900">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/30">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="flex-1 px-4 py-2.5 bg-[#278687] text-white font-bold rounded-xl hover:bg-[#206e6f] transition-colors flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Download PDF
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
