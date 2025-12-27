import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '../components/dashboard/Header';
import { EscrowTimeline } from '../components/transactions/EscrowTimeline';
import { InstallmentTracker } from '../components/transactions/InstallmentTracker';
import { ArrowLeft, ExternalLink, Shield } from 'lucide-react';

export function TransactionDetailPage() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-[#E8F3F1] font-sans text-gray-900 pb-12">
      <Header />

      <main className="max-w-[1600px] mx-auto px-6 pt-8">
        <Link to="/transactions" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Transactions
        </Link>

        <div className="grid grid-cols-12 gap-6">
          {/* Main Content */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* Escrow Status */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Escrow Transaction #{id || 'TRX-9921'}
                  </h1>
                  <p className="text-gray-500">
                    Secure payment protection active
                  </p>
                </div>
              </div>
              <EscrowTimeline currentStep={3} />
            </div>

            {/* Installment Tracker */}
            <InstallmentTracker
              totalAmount="$1,200.00"
              installments={[
                { number: 1, amount: '$400.00', dueDate: 'Oct 01, 2023', status: 'paid', paidDate: 'Oct 01, 2023' },
                { number: 2, amount: '$400.00', dueDate: 'Nov 01, 2023', status: 'paid', paidDate: 'Nov 01, 2023' },
                { number: 3, amount: '$400.00', dueDate: 'Dec 01, 2023', status: 'pending' }
              ]}
            />
          </div>

          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            {/* Financial Summary */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-6">Financial Breakdown</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                  <span className="text-gray-500">Total Amount</span>
                  <span className="text-xl font-bold text-gray-900">$1,200.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Admin Commission (10%)</span>
                  <span className="font-medium text-red-600">-$120.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Processing Fee</span>
                  <span className="font-medium text-red-600">-$5.00</span>
                </div>
                <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="font-bold text-gray-900">Vendor Payout</span>
                  <span className="text-xl font-bold text-primary">$1,075.00</span>
                </div>
              </div>
            </div>

            {/* Linked Order */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">Linked Order</h3>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-500">Order ID</span>
                  <span className="font-mono font-medium text-gray-900">#ORD-7829</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Date</span>
                  <span className="text-sm text-gray-900">Oct 24, 2023</span>
                </div>
              </div>
              <Link to="/orders/1" className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                View Order Details
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}