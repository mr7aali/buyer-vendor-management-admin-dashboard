import React, { useState } from 'react';
import { Header } from '../components/dashboard/Header';
import { DocumentViewer } from '../components/verification/DocumentViewer';
import { Users, Store, Filter, Search } from 'lucide-react';
export function VerificationPage() {
  const [activeTab, setActiveTab] = useState<'users' | 'vendors'>('users');
  // Mock data
  const userDocs = [{
    id: '1',
    name: 'Passport.jpg',
    type: 'ID Proof',
    uploadDate: 'Oct 24, 2023',
    status: 'pending' as const,
    url: '#'
  }, {
    id: '2',
    name: 'Utility Bill.pdf',
    type: 'Address Proof',
    uploadDate: 'Oct 23, 2023',
    status: 'pending' as const,
    url: '#'
  }, {
    id: '3',
    name: 'Driving License.jpg',
    type: 'ID Proof',
    uploadDate: 'Oct 22, 2023',
    status: 'approved' as const,
    url: '#'
  }];
  const vendorDocs = [{
    id: '4',
    name: 'Business Registration.pdf',
    type: 'License',
    uploadDate: 'Oct 24, 2023',
    status: 'pending' as const,
    url: '#'
  }, {
    id: '5',
    name: 'Tax Certificate.pdf',
    type: 'Tax',
    uploadDate: 'Oct 23, 2023',
    status: 'rejected' as const,
    url: '#'
  }, {
    id: '6',
    name: 'Bank Statement.pdf',
    type: 'Financial',
    uploadDate: 'Oct 21, 2023',
    status: 'approved' as const,
    url: '#'
  }];
  const handleApprove = (id: string) => {
    console.log('Approved document:', id);
    // In real app: API call to approve
  };
  const handleReject = (id: string, reason: string) => {
    console.log('Rejected document:', id, 'Reason:', reason);
    // In real app: API call to reject
  };
  return <div className="min-h-screen bg-[#E8F3F1] font-sans text-gray-900 pb-12">
      <Header />

      <main className="max-w-[1600px] mx-auto px-6 pt-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Verification Queue
            </h1>
            <p className="text-gray-500">
              Review and approve KYC documents for users and vendors.
            </p>
          </div>

          <div className="flex bg-white p-1 rounded-xl border border-gray-200">
            <button onClick={() => setActiveTab('users')} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'users' ? 'bg-[#E8F3F1] text-[#278687]' : 'text-gray-600 hover:bg-gray-50'}`}>
              <Users className="w-4 h-4" />
              User Verification
            </button>
            <button onClick={() => setActiveTab('vendors')} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'vendors' ? 'bg-[#E8F3F1] text-[#278687]' : 'text-gray-600 hover:bg-gray-50'}`}>
              <Store className="w-4 h-4" />
              Vendor KYC
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder={`Search ${activeTab === 'users' ? 'users' : 'vendors'}...`} className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#278687]/20 focus:border-[#278687]" />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              Status: All
            </button>
          </div>
        </div>

        {/* Document Viewer */}
        <DocumentViewer documents={activeTab === 'users' ? userDocs : vendorDocs} onApprove={handleApprove} onReject={handleReject} />
      </main>
    </div>;
}