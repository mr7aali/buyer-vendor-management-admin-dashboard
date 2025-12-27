import React from 'react';
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface UserGrowthChartProps {
    data?: any[];
}

const DEFAULT_DATA = [
    { name: 'Mon', buyers: 400, vendors: 240 },
    { name: 'Tue', buyers: 300, vendors: 139 },
    { name: 'Wed', buyers: 200, vendors: 980 },
    { name: 'Thu', buyers: 278, vendors: 390 },
    { name: 'Fri', buyers: 189, vendors: 480 },
    { name: 'Sat', buyers: 239, vendors: 380 },
    { name: 'Sun', buyers: 349, vendors: 430 },
];

export function UserGrowthChart({ data = DEFAULT_DATA }: UserGrowthChartProps) {
    return (
        <div className="bg-white rounded-xl p-3 sm:p-6 shadow-sm border border-gray-100 h-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2 sm:gap-0">
                <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">User Growth Weekly</h3>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-xl sm:text-3xl font-bold text-gray-900">2,450</span>
                        <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium bg-green-100 text-green-800">
                            +12% ↗
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-3 sm:gap-4 text-[10px] sm:text-xs text-gray-500">
                    <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-primary"></span>
                        Buyers
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#82ca9d]"></span>
                        Vendors
                    </div>
                </div>
            </div>

            <div className="h-[200px] sm:h-[240px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorBuyers" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#278687" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#278687" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorVendors" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9ca3af', fontSize: 10 }}
                            dy={8}
                            interval={0}
                            height={30}
                        />
                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', fontSize: '12px' }} />
                        <Area type="monotone" dataKey="buyers" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorBuyers)" strokeWidth={2} />
                        <Area type="monotone" dataKey="vendors" stroke="#82ca9d" fillOpacity={1} fill="url(#colorVendors)" strokeWidth={2} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
