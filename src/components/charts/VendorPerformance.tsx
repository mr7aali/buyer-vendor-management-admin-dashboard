import React from 'react';
import { BarChart, Bar, ResponsiveContainer, Cell, XAxis } from 'recharts';
const data = [{
  name: 'Sat',
  value: 40
}, {
  name: 'Sun',
  value: 30
}, {
  name: 'Mon',
  value: 20
}, {
  name: 'Tue',
  value: 50
}, {
  name: 'Wed',
  value: 60
}, {
  name: 'Thu',
  value: 70
}, {
  name: 'Fri',
  value: 85
} // Current day highlighted
];
export function VendorPerformance() {
  return <div className="h-[100px] w-full relative mt-6">
      <div className="absolute right-0 top-0 bg-gray-900 text-white text-[10px] py-1 px-2 rounded pointer-events-none transform -translate-y-full -translate-x-2 mb-1">
        20,618 Sold
        <div className="text-[9px] text-gray-400">Last week</div>
        <div className="absolute bottom-0 right-4 transform translate-y-1 border-4 border-transparent border-t-gray-900"></div>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barSize={6}>
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{
          fill: '#9ca3af',
          fontSize: 10
        }} dy={5} />
          <Bar dataKey="value" radius={[2, 2, 2, 2]}>
            {data.map((entry, index) => <Cell key={`cell-${index}`} fill={index === data.length - 1 ? '#B4E34D' : '#f3f4f6'} stroke={index === data.length - 1 ? '#84cc16' : 'none'} strokeWidth={index === data.length - 1 ? 1 : 0} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Dotted line indicators */}
      <div className="absolute bottom-6 left-[28%] w-px h-8 border-l border-dashed border-gray-300 flex flex-col items-center">
        <div className="w-1.5 h-1.5 rounded-full bg-gray-400 -mt-1"></div>
      </div>
      <div className="absolute bottom-6 right-[4%] w-px h-16 border-l border-dashed border-gray-800 flex flex-col items-center">
        <div className="w-1.5 h-1.5 rounded-full bg-gray-900 -mt-1"></div>
      </div>
    </div>;
}