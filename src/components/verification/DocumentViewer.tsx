import React, { useState } from "react";
import { FileText, Check, X, Eye } from "lucide-react";

type DocumentStatus = "pending" | "approved" | "rejected";

interface DocumentImage {
  label: string;
  url: string;
}

export interface VerificationDocument {
  id: string;
  title: string;
  subtitle: string;
  createdAt: string;
  status: DocumentStatus;
  images: DocumentImage[];
}

interface DocumentViewerProps {
  documents: VerificationDocument[];
  onApprove: (id: string) => void;
  onReject: (id: string, reason: string) => void;
}

export function DocumentViewer({
  documents,
  onApprove,
  onReject,
}: DocumentViewerProps) {
  const [selectedDoc, setSelectedDoc] = useState<VerificationDocument | null>(
    null
  );
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

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:h-[600px]">
      {/* Document List */}
      <div className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm lg:col-span-1">
        <div className="border-b border-gray-100 bg-gray-50 p-4">
          <h3 className="font-semibold text-gray-900">Submitted Documents</h3>
        </div>
        <div className="flex-1 space-y-2 overflow-y-auto p-2">
          {documents.map((doc) => (
            <div
              key={doc.id}
              onClick={() => setSelectedDoc(doc)}
              className={`cursor-pointer rounded-xl border p-3 transition-all ${
                selectedDoc?.id === doc.id
                  ? "border-[#278687] bg-[#E8F3F1]/50 shadow-sm"
                  : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="rounded-lg border border-gray-100 bg-white p-2">
                  <FileText className="h-5 w-5 text-gray-500" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900">
                    {doc.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {doc.subtitle} • {doc.createdAt}
                  </p>
                </div>
                <div
                  className={`mt-2 h-2 w-2 rounded-full ${
                    doc.status === "approved"
                      ? "bg-green-500"
                      : doc.status === "rejected"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                  }`}
                />
              </div>
            </div>
          ))}
          {documents.length === 0 && (
            <div className="py-8 text-center text-sm text-gray-500">
              No pending documents found.
            </div>
          )}
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm lg:col-span-2">
        {selectedDoc ? (
          <>
            <div className="flex items-center justify-between border-b border-gray-100 p-4">
              <div>
                <h3 className="font-semibold text-gray-900">
                  {selectedDoc.title}
                </h3>
                <span
                  className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${
                    selectedDoc.status === "approved"
                      ? "bg-green-100 text-green-800"
                      : selectedDoc.status === "rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {selectedDoc.status === "approved"
                    ? "Approved"
                    : selectedDoc.status === "rejected"
                      ? "Rejected"
                      : "Pending"}
                </span>
              </div>
              {selectedDoc.status === "pending" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleRejectClick(selectedDoc.id)}
                    className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
                  >
                    <X className="h-4 w-4" />
                    Reject
                  </button>
                  <button
                    onClick={() => onApprove(selectedDoc.id)}
                    className="flex items-center gap-2 rounded-lg bg-[#278687] px-3 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#1e6b6c]"
                  >
                    <Check className="h-4 w-4" />
                    Approve
                  </button>
                </div>
              )}
            </div>
            <div className="flex-1 overflow-hidden bg-gray-50 p-4">
              {selectedDoc.images.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {selectedDoc.images.map((image) => (
                    <div
                      key={image.label}
                      className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm"
                    >
                      <div className="mb-2 text-xs font-medium text-gray-500">
                        {image.label}
                      </div>
                      {image.url.match(/\.(jpg|jpeg|png|webp)$/i) ? (
                        <img
                          src={image.url}
                          alt={image.label}
                          className="h-48 w-full rounded-lg object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-200 p-6 text-sm text-gray-500">
                          <FileText className="mb-2 h-6 w-6 text-gray-400" />
                          Preview not available
                          <a
                            href={image.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
                          >
                            <Eye className="h-3.5 w-3.5" />
                            Open
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex h-full items-center justify-center text-gray-400">
                  No document uploaded
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center text-gray-500">
            Select a document to view details
          </div>
        )}
      </div>

      {/* Reject Modal */}
      {isRejectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
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
              className="mb-6 h-32 w-full resize-none rounded-xl border border-gray-200 bg-gray-50 p-3 focus:border-[#278687] focus:outline-none focus:ring-2 focus:ring-[#278687]/20"
              placeholder="Enter rejection reason..."
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsRejectModalOpen(false)}
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmReject}
                disabled={!rejectReason}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
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
