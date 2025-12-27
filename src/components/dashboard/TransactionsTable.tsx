import React from 'react';
import { MoreHorizontal, ArrowRight } from 'lucide-react';
import { StatusBadge, type StatusType } from '../ui/StatusBadge';
interface Transaction {
  id: string;
  productName: string;
  productImage: string;
  additionalItems?: number;
  date: string;
  paymentMethod: string;
  amount: string;
  status: StatusType;
}
const transactions: Transaction[] = [{
  id: '#302012',
  productName: 'Wall Clock Special Edition',
  productImage: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=100&h=100&q=80',
  additionalItems: 3,
  date: '22 Jan 2022',
  paymentMethod: 'Mastercard',
  amount: '$121.00',
  status: 'completed'
}, {
  id: '#302011',
  productName: 'Airpods Max 2024 Edition',
  productImage: 'https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?auto=format&fit=crop&w=100&h=100&q=80',
  date: '20 Jan 2022',
  paymentMethod: 'Visa',
  amount: '$590.00',
  status: 'in-progress'
}, {
  id: '#302002',
  productName: 'Nike Shoes',
  productImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=100&h=100&q=80',
  additionalItems: 1,
  date: '24 Jan 2022',
  paymentMethod: 'Paypal',
  amount: '$348.00',
  status: 'waiting'
}, {
  id: '#301900',
  productName: 'Winter Jacket',
  productImage: 'https://images.unsplash.com/photo-1551028919-ac76c90f29b9?auto=format&fit=crop&w=100&h=100&q=80',
  date: '26 Jan 2022',
  paymentMethod: 'Mastercard',
  amount: '$607.00',
  status: 'cancelled'
}];
export function TransactionsTable() {
  return <div className="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-50 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
          <p className="text-sm text-gray-500 mt-1">
            Keep track of recent order data and others information.
          </p>
        </div>
        <button className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 transition-colors">
          View All
          <ArrowRight className="w-4 h-4 ml-1.5" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
                <input type="checkbox" className="rounded border-gray-300 text-[#278687] focus:ring-[#278687]" />
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {transactions.map(tx => <tr key={tx.id} className="hover:bg-gray-50/80 transition-colors group">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input type="checkbox" className="rounded border-gray-300 text-[#278687] focus:ring-[#278687]" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {tx.status === 'completed' || tx.status === 'in-progress' ? <span className="text-[#278687]">{tx.id}</span> : <span className="text-gray-500">{tx.id}</span>}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img className="h-10 w-10 rounded-lg object-cover border border-gray-100" src={tx.productImage} alt="" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {tx.productName}
                      </div>
                      {tx.additionalItems && <div className="text-xs text-gray-500">
                          +{tx.additionalItems} other products
                        </div>}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {tx.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {tx.paymentMethod}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {tx.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={tx.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>
    </div>;
}