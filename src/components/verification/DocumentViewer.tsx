import React, { useState } from 'react';
import { FileText, Download, Check, X, Eye } from 'lucide-react';
interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  status: 'pending' | 'approved' | 'rejected';
  url: string;
}
interface DocumentViewerProps {
  documents: Document[];
  onApprove: (id: string) => void;
  onReject: (id: string, reason: string) => void;
}
export function DocumentViewer({
  documents,
  onApprove,
  onReject
}: DocumentViewerProps) {
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [rejectReason, setRejectReason] = useState('');
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
      setRejectReason('');
      setDocToReject(null);
    }
  };
  return <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
      {/* Document List */}
      <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-100 bg-gray-50">
          <h3 className="font-semibold text-gray-900">Submitted Documents</h3>
        </div>
        <div className="overflow-y-auto flex-1 p-2 space-y-2">
          {documents.map(doc => <div key={doc.id} onClick={() => setSelectedDoc(doc)} className={`p-3 rounded-xl border cursor-pointer transition-all ${selectedDoc?.id === doc.id ? 'border-[#278687] bg-[#E8F3F1]/50 shadow-sm' : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'}`}>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white rounded-lg border border-gray-100">
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
                <div className={`w-2 h-2 rounded-full mt-2 ${doc.status === 'approved' ? 'bg-green-500' : doc.status === 'rejected' ? 'bg-red-500' : 'bg-yellow-500'}`} />
              </div>
            </div>)}
        </div>
      </div>

      {/* Preview Area */}
      <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
        {selectedDoc ? <>
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-gray-900">
                  {selectedDoc.name}
                </h3>
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${selectedDoc.status === 'approved' ? 'bg-green-100 text-green-800' : selectedDoc.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {selectedDoc.status.charAt(0).toUpperCase() + selectedDoc.status.slice(1)}
                </span>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                  <Download className="w-5 h-5" />
                </button>
                {selectedDoc.status === 'pending' && <>
                    <button onClick={() => handleRejectClick(selectedDoc.id)} className="flex items-center gap-2 px-3 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-sm font-medium transition-colors">
                      <X className="w-4 h-4" />
                      Reject
                    </button>
                    <button onClick={() => onApprove(selectedDoc.id)} className="flex items-center gap-2 px-3 py-2 bg-[#278687] text-white hover:bg-[#1e6b6c] rounded-lg text-sm font-medium transition-colors shadow-sm">
                      <Check className="w-4 h-4" />
                      Approve
                    </button>
                  </>}
              </div>
            </div>
            <div className="flex-1 bg-gray-50 flex items-center justify-center p-8">
              {/* Placeholder for actual document preview */}
              <div className="text-center">
                <FileText className="w-24 h-24 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Document Preview</p>
                <button className="mt-4 flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 mx-auto">
                  <Eye className="w-4 h-4" />
                  Open in New Tab
                </button>
              </div>
            </div>
          </> : <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a document to view details
          </div>}
      </div>

      {/* Reject Modal */}
      {isRejectModalOpen && <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Reject Document
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Please provide a reason for rejecting this document. This will be
              sent to the user.
            </p>
            <textarea value={rejectReason} onChange={e => setRejectReason(e.target.value)} className="w-full h-32 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#278687]/20 focus:border-[#278687] resize-none mb-6" placeholder="Enter rejection reason..." />
            <div className="flex justify-end gap-3">
              <button onClick={() => setIsRejectModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-sm font-medium">
                Cancel
              </button>
              <button onClick={confirmReject} disabled={!rejectReason} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 disabled:opacity-50">
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>}
    </div>;
}