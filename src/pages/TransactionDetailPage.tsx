import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Header } from '../components/dashboard/Header';
import { EscrowTimeline } from '../components/transactions/EscrowTimeline';
import { InstallmentTracker } from '../components/transactions/InstallmentTracker';
import { ArrowLeft, ExternalLink, Shield, CreditCard, CheckCircle } from 'lucide-react';
import { mockTransactions } from '../data/mockTransactions';
import { StatusBadge } from '../components/ui/StatusBadge';

export function TransactionDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Find transaction by ID (handle with or without #)
  const transaction = mockTransactions.find(t =>
    t.id === id || t.id.replace('#', '') === id || t.id === `#${id}`
  );

  if (!transaction) {
    return (
      <div className="min-h-screen bg-[#E8F3F1] font-sans text-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Transaction Not Found</h2>
          <p className="text-gray-500 mb-4">The transaction #{id} does not exist.</p>
          <button onClick={() => navigate(-1)} className="text-[#278687] hover:underline">Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E8F3F1] font-sans text-gray-900 pb-12">
      <Header />

      <main className="max-w-[1600px] mx-auto px-6 pt-8">
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Go back
        </button>

        <div className="grid grid-cols-12 gap-6">
          {/* Main Content */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* Escrow Status */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Shield className="w-6 h-6 text-[#278687]" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      Escrow Transaction #{transaction.id}
                    </h1>
                    <p className="text-gray-500">
                      Secure payment protection active
                    </p>
                  </div>
                </div>
                <StatusBadge status={transaction.status as any} />
              </div>

              {/* Only show timeline for escrow/completed types for demo, or mock logic based on status */}
              <EscrowTimeline currentStep={transaction.status === 'completed' ? 4 : transaction.status === 'pending' ? 1 : 2} />
            </div>

            {/* Payment Details Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-gray-400" />
                Payment Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-semibold">Payment Method</div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#278687]" />
                    <span className="font-medium text-gray-900">{transaction.paymentMethod}</span>
                    <span className="text-gray-400 text-sm">•••• 4242</span>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-semibold">Payout Account</div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="font-medium text-gray-900">Vendor Bank</span>
                    <span className="text-gray-400 text-sm">{transaction.vendorBank}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Installment Tracker (conditionally rendered if type matches, mocking mostly for now) */}
            {transaction.type === 'installment' && (
              <InstallmentTracker
                totalAmount={`$${transaction.amount.toFixed(2)}`}
                installments={[
                  { number: 1, amount: `$${(transaction.amount / 3).toFixed(2)}`, dueDate: 'Oct 01, 2023', status: 'paid', paidDate: 'Oct 01, 2023' },
                  { number: 2, amount: `$${(transaction.amount / 3).toFixed(2)}`, dueDate: 'Nov 01, 2023', status: 'paid', paidDate: 'Nov 01, 2023' },
                  { number: 3, amount: `$${(transaction.amount / 3).toFixed(2)}`, dueDate: 'Dec 01, 2023', status: 'pending' }
                ]}
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            {/* Financial Summary */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-6">Financial Breakdown</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                  <span className="text-gray-500">Total Amount</span>
                  <span className="text-xl font-bold text-gray-900">${transaction.amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Admin Commission (10%)</span>
                  <span className="font-medium text-red-600">-${transaction.commission.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Processing Fee</span>
                  <span className="font-medium text-red-600">-$5.00</span>
                </div>
                <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="font-bold text-gray-900">Vendor Payout</span>
                  <span className="text-xl font-bold text-[#278687]">${transaction.payout.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Linked Order */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">Linked Order</h3>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-500">Order ID</span>
                  <span className="font-mono font-medium text-gray-900">{transaction.orderId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Date</span>
                  <span className="text-sm text-gray-900">{transaction.date}</span>
                </div>
              </div>
              {/* Note: We handle navigation even if order doesn't exist in mockOrders, 
                  but in a real app checking existence would be good. 
                  The OrderDetailPage logic we added earlier handles missing orders gracefully. 
              */}
              <Link to={`/orders/${transaction.orderId.replace('#', '')}`} className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
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