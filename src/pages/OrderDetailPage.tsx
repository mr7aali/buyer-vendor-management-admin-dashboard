import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '../components/dashboard/Header';
import { StatusBadge } from '../components/ui/StatusBadge';
import { OrderTimeline } from '../components/orders/OrderTimeline';
import { DeliveryTracker } from '../components/orders/DeliveryTracker';
import { ArrowLeft, User, Store, CreditCard, Download, Printer } from 'lucide-react';
export function OrderDetailPage() {
  const {
    id
  } = useParams();
  return <div className="min-h-screen bg-[#E8F3F1] font-sans text-gray-900 pb-12">
      <Header />

      <main className="max-w-[1600px] mx-auto px-6 pt-8">
        <div className="flex items-center justify-between mb-6">
          <Link to="/orders" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Orders
          </Link>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
              <Printer className="w-4 h-4" />
              Print Invoice
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#278687] text-white rounded-lg text-sm font-medium hover:bg-[#1e6b6c] transition-colors shadow-sm">
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Main Content */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* Order Header & Timeline */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">
                    Order #{id || 'ORD-7829'}
                  </h1>
                  <p className="text-gray-500">
                    Placed on Oct 24, 2023 at 10:30 AM
                  </p>
                </div>
                <StatusBadge status="in-progress" className="text-sm px-3 py-1" />
              </div>
              <OrderTimeline status="shipped" />
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h3 className="font-bold text-gray-900">Order Items</h3>
              </div>
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[1, 2].map(i => <tr key={i}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-gray-100 border border-gray-200"></div>
                          <div>
                            <div className="font-medium text-gray-900">
                              Premium Wireless Headphones
                            </div>
                            <div className="text-xs text-gray-500">
                              Black • Wireless
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        $249.00
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">1</td>
                      <td className="px-6 py-4 text-sm font-bold text-gray-900 text-right">
                        $249.00
                      </td>
                    </tr>)}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td colSpan={3} className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                      Subtotal
                    </td>
                    <td className="px-6 py-3 text-right text-sm font-medium text-gray-900">
                      $498.00
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3} className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                      Shipping
                    </td>
                    <td className="px-6 py-3 text-right text-sm font-medium text-gray-900">
                      $15.00
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3} className="px-6 py-3 text-right text-sm font-bold text-gray-900">
                      Total
                    </td>
                    <td className="px-6 py-3 text-right text-lg font-bold text-[#278687]">
                      $513.00
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Delivery Tracking */}
            <DeliveryTracker />
          </div>

          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            {/* Customer Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-gray-400" />
                Customer Details
              </h3>
              <div className="flex items-center gap-3 mb-4">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="w-10 h-10 rounded-full" />
                <div>
                  <div className="font-medium text-gray-900">Alice Johnson</div>
                  <div className="text-xs text-gray-500">
                    alice.j@example.com
                  </div>
                </div>
              </div>
              <div className="space-y-3 text-sm border-t border-gray-50 pt-4">
                <div>
                  <div className="text-gray-500 text-xs mb-1">
                    Shipping Address
                  </div>
                  <div className="text-gray-900">
                    123 Main Street, Apt 4B
                    <br />
                    New York, NY 10001
                    <br />
                    United States
                  </div>
                </div>
                <div>
                  <div className="text-gray-500 text-xs mb-1">Phone</div>
                  <div className="text-gray-900">+1 (555) 123-4567</div>
                </div>
              </div>
              <Link to="/buyers/1" className="block mt-4 text-center text-sm font-medium text-[#278687] hover:underline">
                View Profile
              </Link>
            </div>

            {/* Vendor Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Store className="w-5 h-5 text-gray-400" />
                Vendor Details
              </h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200"></div>
                <div>
                  <div className="font-medium text-gray-900">
                    TechGiant Solutions
                  </div>
                  <div className="text-xs text-gray-500">Electronics</div>
                </div>
              </div>
              <Link to="/vendors/1" className="block mt-4 text-center text-sm font-medium text-[#278687] hover:underline">
                View Store
              </Link>
            </div>

            {/* Payment Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-gray-400" />
                Payment Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Payment Method</span>
                  <span className="font-medium text-gray-900">
                    Mastercard ending 4242
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Transaction ID</span>
                  <span className="font-mono text-gray-900">TRX-9921</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Status</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                    Paid
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>;
}