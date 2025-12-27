import React from 'react';
import { ChevronDown, MoreHorizontal } from 'lucide-react';
import { VendorPerformance } from '../charts/VendorPerformance';
export function TopVendors() {
  return <div className="bg-white rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.06)] border border-gray-100 h-full flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Top Selling Products
        </h3>
        <button className="flex items-center text-xs font-medium text-gray-500 hover:text-gray-900 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
          Weekly
          <ChevronDown className="w-3 h-3 ml-1" />
        </button>
      </div>

      <div className="bg-gray-50 rounded-xl p-4 mb-6 relative overflow-hidden">
        <div className="flex items-start justify-between relative z-10">
          <div className="flex gap-4">
            <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center flex-shrink-0">
              <img src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=100&h=100&q=80" alt="Apple Watch" className="w-12 h-12 object-contain" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-1">
                Apple Watch Series 10 46mm GPS
              </h4>
              <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                <span>Brand: Apple</span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  5.8k stock available
                </span>
              </div>
              <div className="text-lg font-bold text-gray-900">$799.00</div>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-end">
        <VendorPerformance />
        <div className="flex justify-between text-[10px] text-gray-400 mt-2 px-2">
          <span>Sat</span>
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
        </div>
      </div>
    </div>;
}