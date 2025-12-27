import React from 'react';
import { CheckCircle, Circle, Clock } from 'lucide-react';

interface Installment {
  number: number;
  amount: string;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  paidDate?: string;
}

interface InstallmentTrackerProps {
  installments: Installment[];
  totalAmount: string;
}

export function InstallmentTracker({
  installments,
  totalAmount
}: InstallmentTrackerProps) {
  const paidCount = installments.filter(i => i.status === 'paid').length;
  const progress = paidCount / installments.length * 100;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h3 className="font-bold text-gray-900 text-lg">Payment Plan</h3>
          <p className="text-sm text-gray-500">
            Total Amount:{' '}
            <span className="font-semibold text-gray-900">{totalAmount}</span>
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">
            {paidCount}/{installments.length}
          </div>
          <p className="text-xs text-gray-500">Installments Paid</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-100 rounded-full h-2 mb-8 overflow-hidden">
        <div
          className="bg-primary h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* List */}
      <div className="space-y-4">
        {installments.map(inst => (
          <div key={inst.number} className={`flex items-center justify-between p-4 rounded-xl border transition-all ${inst.status === 'paid' ? 'bg-green-50/50 border-green-100' :
              inst.status === 'overdue' ? 'bg-red-50/50 border-red-100' :
                'bg-white border-gray-100'
            }`}>
            <div className="flex items-center gap-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${inst.status === 'paid' ? 'bg-green-100 text-green-600' :
                  inst.status === 'overdue' ? 'bg-red-100 text-red-600' :
                    'bg-gray-100 text-gray-400'
                }`}>
                {inst.status === 'paid' ? <CheckCircle className="w-5 h-5" /> :
                  inst.status === 'overdue' ? <Clock className="w-5 h-5" /> :
                    <Circle className="w-5 h-5" />}
              </div>
              <div>
                <div className="font-semibold text-gray-900">
                  Installment #{inst.number}
                </div>
                <div className="text-xs text-gray-500">Due: {inst.dueDate}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-gray-900">{inst.amount}</div>
              {inst.paidDate && (
                <div className="text-xs text-green-600 font-medium">
                  Paid on {inst.paidDate}
                </div>
              )}
              {inst.status === 'pending' && (
                <div className="text-xs text-orange-600 font-medium">
                  Pending
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}