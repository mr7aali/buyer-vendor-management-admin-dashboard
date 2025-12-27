import React, { useState } from 'react';
import { Header } from '../components/dashboard/Header';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Search, Filter, Download, ArrowRight, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
export function TransactionsPage() {
  const [filter, setFilter] = useState('all');
  const transactions = [{
    id: '#TRX-9921',
    orderId: '#ORD-7829',
    buyer: 'Alice Johnson',
    vendor: 'TechGiant',
    amount: '$1,200.00',
    commission: '$120.00',
    payout: '$1,080.00',
    status: 'completed',
    date: 'Oct 24, 2023',
    type: 'escrow'
  }, {
    id: '#TRX-9922',
    orderId: '#ORD-7830',
    buyer: 'Michael Smith',
    vendor: 'Fashion Hub',
    amount: '$450.00',
    commission: '$45.00',
    payout: '$405.00',
    status: 'pending',
    date: 'Oct 24, 2023',
    type: 'escrow'
  }, {
    id: '#TRX-9923',
    orderId: '#ORD-7831',
    buyer: 'Sarah Williams',
    vendor: 'Home Co.',
    amount: '$850.00',
    commission: '$85.00',
    payout: '$765.00',
    status: 'in-progress',
    date: 'Oct 23, 2023',
    type: 'installment'
  }];
  return <div className="min-h-screen bg-[#E8F3F1] font-sans text-gray-900 pb-12">
      <Header />

      <main className="max-w-[1600px] mx-auto px-6 pt-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Transactions & Escrow
            </h1>
            <p className="text-gray-500">
              Monitor payments, escrow holdings, and vendor payouts.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Filters */}
          <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search transactions..." className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#278687]/20 focus:border-[#278687]" />
            </div>
            <div className="flex gap-2">
              {['all', 'completed', 'pending', 'installment'].map(f => <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${filter === f ? 'bg-[#E8F3F1] text-[#278687]' : 'text-gray-500 hover:bg-gray-50'}`}>
                  {f}
                </button>)}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Transaction ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Order Ref
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Parties
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Commission
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Payout
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {transactions.map(tx => <tr key={tx.id} className="hover:bg-gray-50 group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-[#278687]">
                          {tx.id}
                        </span>
                        {tx.type === 'escrow' && <Shield className="w-3 h-3 text-gray-400" title="Escrow Protected" />}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {tx.orderId}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs text-gray-500">
                        From: <span className="text-gray-900">{tx.buyer}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        To: <span className="text-gray-900">{tx.vendor}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">
                      {tx.amount}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {tx.commission}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-green-600">
                      {tx.payout}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={tx.status as any} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link to={`/transactions/${tx.id.replace('#', '')}`} className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-[#278687] hover:bg-[#E8F3F1] rounded-lg transition-colors">
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>;
}