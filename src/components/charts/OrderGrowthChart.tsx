import React from 'react';
import { BarChart, Bar, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface OrderGrowthChartProps {
    data?: any[];
}

const DEFAULT_DATA = [
    { name: 'Mon', orders: 120 },
    { name: 'Tue', orders: 150 },
    { name: 'Wed', orders: 180 },
    { name: 'Thu', orders: 220 },
    { name: 'Fri', orders: 250 },
    { name: 'Sat', orders: 300 },
    { name: 'Sun', orders: 280 },
];

export function OrderGrowthChart({ data = DEFAULT_DATA }: OrderGrowthChartProps) {
    const totalOrders = data.reduce((sum, item) => sum + item.orders, 0);
    const avgOrders = Math.floor(totalOrders / data.length);

    return (
        <div className="bg-white rounded-xl p-3 sm:p-6 shadow-sm border border-gray-100 h-full">
            <div className="mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Order Growth</h3>
                <div className="flex items-center gap-3 sm:gap-4 mt-2">
                    <div>
                        <p className="text-[10px] sm:text-xs text-gray-500">Total Orders</p>
                        <p className="text-lg sm:text-2xl font-bold text-gray-900">{totalOrders.toLocaleString()}</p>
                    </div>
                    <div className="h-8 w-px bg-gray-200"></div>
                    <div>
                        <p className="text-[10px] sm:text-xs text-gray-500">Daily Avg</p>
                        <p className="text-lg sm:text-2xl font-bold text-gray-900">{avgOrders}</p>
                    </div>
                    <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium bg-green-100 text-green-800 ml-auto">
                        +18% ↗
                    </span>
                </div>
            </div>

            <div className="h-[200px] sm:h-[240px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9ca3af', fontSize: 11 }}
                            dy={8}
                            interval={0}
                            height={30}
                        />
                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', fontSize: '12px' }} />
                        <Bar dataKey="orders" fill="hsl(var(--primary))" radius={[4, 4, 4, 4]} barSize={20} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
