import React, { useState } from 'react';
import { X, FileText, Download, Loader2 } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

type ReportType = 'transactions' | 'buyers' | 'vendors' | 'orders';

interface ExportReportModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: any[];
    reportType: ReportType;
}

export function ExportReportModal({ isOpen, onClose, data, reportType }: ExportReportModalProps) {
    const [isGenerating, setIsGenerating] = useState(false);

    if (!isOpen) return null;

    // Configuration for each report type
    const config = {
        transactions: {
            title: 'Transactions Report',
            stats: [
                { label: 'Total Volume', value: `$${data.reduce((sum, t) => sum + (t.amount || 0), 0).toFixed(2)}` },
                { label: 'Payout Volume', value: `$${data.reduce((sum, t) => sum + (t.payout || 0), 0).toFixed(2)}` },
                { label: 'Count', value: data.length }
            ],
            columns: ["ID", "Date", "Buyer", "Vendor", "Amount", "Status"],
            mapRow: (t: any) => [
                t.id,
                t.date,
                t.buyer,
                t.vendor,
                `$${t.amount?.toFixed(2)}`,
                t.status
            ]
        },
        buyers: {
            title: 'Buyers Directory Report',
            stats: [
                { label: 'Total Buyers', value: data.length },
                { label: 'Active Buyers', value: data.filter(b => b.status?.toLowerCase() === 'active').length },
                { label: 'Total Spent', value: 'N/A' }
            ],
            columns: ["ID", "Name", "Email", "Country", "Status", "Total Spent"],
            mapRow: (b: any) => [
                b.id,
                b.name,
                b.email,
                b.country,
                b.status,
                b.totalSpent
            ]
        },
        vendors: {
            title: 'Vendor Directory Report',
            stats: [
                { label: 'Total Vendors', value: data.length },
                { label: 'Active Vendors', value: data.filter(v => v.status?.toLowerCase() === 'active').length },
                { label: 'Total Products', value: data.reduce((sum, v) => sum + (v.products || 0), 0) }
            ],
            columns: ["ID", "Name", "Category", "Country", "Status", "Revenue"],
            mapRow: (v: any) => [
                v.id,
                v.name,
                v.category,
                v.country,
                v.status,
                v.revenue
            ]
        },
        orders: {
            title: 'Orders Management Report',
            stats: [
                { label: 'Total Orders', value: data.length },
                { label: 'Completed', value: data.filter(o => o.status?.toLowerCase() === 'completed').length },
                { label: 'Pending', value: data.filter(o => o.status?.toLowerCase() === 'pending').length }
            ],
            columns: ["Order ID", "Date", "Customer", "Total", "Status", "Payment"],
            mapRow: (o: any) => [
                o.id,
                o.date,
                o.customer,
                o.total,
                o.status,
                o.payment
            ]
        }
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
            doc.text(`Generated on: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, 14, 30);

            // Summary Stats
            let yPos = 38;
            currentConfig.stats.forEach(stat => {
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
            <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">

                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-[#278687]" />
                        Export Report
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Download className="w-8 h-8" />
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">Ready to Export</h4>
                        <p className="text-gray-500 text-sm">
                            You are about to export a
                            <span className="font-bold text-gray-900 mx-1">{reportType}</span>
                            report containing
                            <span className="font-bold text-gray-900 mx-1">{data.length}</span>
                            records.
                        </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4 space-y-3 text-sm">
                        {currentConfig.stats.map((stat, idx) => (
                            <div key={idx} className="flex justify-between items-center">
                                <span className="text-gray-500">{stat.label}</span>
                                <span className="font-bold text-gray-900">{stat.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-100 flex gap-3 bg-gray-50/30">
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
