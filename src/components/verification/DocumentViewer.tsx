import React, { useState } from "react";
import { FileText, Download, Check, X, Eye } from "lucide-react";
interface Document {
  key: string;
  name: string;
  type: string;
  uploadDate: string;
  status: boolean;
  url: string | undefined;
}
interface DocumentViewerProps {
  documents: Document[];
  onApprove: (id: string) => void;
  onReject: (id: string, reason: string) => void;
}
export function DocumentViewer({
  documents,
  onApprove,
  onReject,
}: DocumentViewerProps) {
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [docToReject, setDocToReject] = useState<string | null>(null);
  const handleRejectClick = (id: string) => {
    setDocToReject(id);
    setIsRejectModalOpen(true);
  };
  const confirmReject = () => {
    if (docToReject && rejectReason) {
      onReject(docToReject, rejectReason);
      setIsRejectModalOpen(false);
      setRejectReason("");
      setDocToReject(null);
    }
  };
  // ;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
      {/* Document List */}
      <div className="flex flex-col overflow-hidden bg-white border border-gray-100 shadow-sm lg:col-span-1 rounded-2xl">
        <div className="p-4 border-b border-gray-100 bg-gray-50">
          <h3 className="font-semibold text-gray-900">Submitted Documents</h3>
        </div>
        <div className="flex-1 p-2 space-y-2 overflow-y-auto">
          {documents.map((doc) => (
            <div
              key={doc.key}
              onClick={() => setSelectedDoc(doc)}
              className={`p-3 rounded-xl border cursor-pointer transition-all ${selectedDoc?.key === doc.key ? "border-[#278687] bg-[#E8F3F1]/50 shadow-sm" : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"}`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white border border-gray-100 rounded-lg">
                  <FileText className="w-5 h-5 text-gray-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {doc.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {doc.type} • {doc.uploadDate}
                  </p>
                </div>
                <div
                  className={`w-2 h-2 rounded-full mt-2 ${doc.status === true ? "bg-green-500" : doc.status === false && doc.url && doc.url?.length > 3 ? "bg-red-500" : "bg-yellow-500"}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex flex-col overflow-hidden bg-white border border-gray-100 shadow-sm lg:col-span-2 rounded-2xl">
        {selectedDoc ? (
          <>
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div>
                <h3 className="font-semibold text-gray-900">
                  {selectedDoc.name}
                </h3>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${selectedDoc.status ? "bg-green-100 text-green-800" : selectedDoc.status === false && selectedDoc.url && selectedDoc.url?.length > 3 ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}`}
                >
                  {selectedDoc.status
                    ? "Active"
                    : selectedDoc.status === false &&
                        selectedDoc.url &&
                        selectedDoc.url?.length > 3
                      ? "Rejected"
                      : "Pending"}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    console.log(
                      selectedDoc.status === false &&
                        selectedDoc.url &&
                        selectedDoc.url?.length > 3,
                    )
                  }
                  className="p-2 text-gray-500 transition-colors rounded-lg hover:text-gray-900 hover:bg-gray-50"
                >
                  <Download className="w-5 h-5" />
                </button>
                {!selectedDoc.status && (
                  <>
                    <button
                      onClick={() => handleRejectClick(selectedDoc.key)}
                      className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 transition-colors rounded-lg bg-red-50 hover:bg-red-100"
                    >
                      <X className="w-4 h-4" />
                      Reject
                    </button>
                    <button
                      onClick={() => onApprove(selectedDoc.key)}
                      className="flex items-center gap-2 px-3 py-2 bg-[#278687] text-white hover:bg-[#1e6b6c] rounded-lg text-sm font-medium transition-colors shadow-sm"
                    >
                      <Check className="w-4 h-4" />
                      Approve
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="flex-1 overflow-hidden bg-gray-50">
              {selectedDoc.url ? (
                selectedDoc.url.endsWith(".pdf") ? (
                  // PDF Preview
                  <iframe
                    src={selectedDoc.url}
                    title="Document Preview"
                    className="w-full h-full border-0"
                  />
                ) : selectedDoc.url.match(/\.(jpg|jpeg|png|webp)$/i) ? (
                  // Image Preview
                  <div className="flex items-center justify-center h-full p-4">
                    <img
                      src={selectedDoc.url}
                      alt={selectedDoc.name}
                      className="max-w-full max-h-full rounded-lg shadow"
                    />
                  </div>
                ) : (
                  // Fallback
                  <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <FileText className="w-24 h-24 mb-4 text-gray-300" />
                    <p>Preview not available</p>
                    <a
                      href={selectedDoc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 mt-4 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      <Eye className="w-4 h-4" />
                      Open in New Tab
                    </a>
                  </div>
                )
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No document uploaded
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center flex-1 text-gray-500">
            Select a document to view details
          </div>
        )}
      </div>

      {/* Reject Modal */}
      {isRejectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 bg-white shadow-xl rounded-2xl">
            <h3 className="mb-4 text-lg font-bold text-gray-900">
              Reject Document
            </h3>
            <p className="mb-4 text-sm text-gray-500">
              Please provide a reason for rejecting this document. This will be
              sent to the user.
            </p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full h-32 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#278687]/20 focus:border-[#278687] resize-none mb-6"
              placeholder="Enter rejection reason..."
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsRejectModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmReject}
                disabled={!rejectReason}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
