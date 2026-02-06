import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface RevenueChartProps {
  data?: { name: string; revenue: number; profit: number }[];
  timeRange?: string;
  totalRevenue: number;
  totalRevenueChange: number; // difference from previous period
}

const DEFAULT_DATA = [
  { name: "Jan", revenue: 4000, profit: 2400 },
  { name: "Feb", revenue: 3000, profit: 1398 },
  { name: "Mar", revenue: 2000, profit: 9800 },
  { name: "Apr", revenue: 2780, profit: 3908 },
  { name: "May", revenue: 1890, profit: 4800 },
  { name: "Jun", revenue: 2390, profit: 3800 },
];

export function RevenueChart({
  data = DEFAULT_DATA,
  timeRange,
  totalRevenue,
  totalRevenueChange,
}: RevenueChartProps) {
  // Calculate growth % (guard against division by 0)
  const growthPercentage =
    totalRevenueChange && totalRevenue - totalRevenueChange !== 0
      ? (
          (totalRevenueChange / (totalRevenue - totalRevenueChange)) *
          100
        ).toFixed(2)
      : "0";

  // Determine arrow and color
  const isPositive = Number(growthPercentage) >= 0;
  const arrow = isPositive ? "↗" : "↘";
  const bgColor = isPositive ? "bg-green-100" : "bg-red-100";
  const textColor = isPositive ? "text-green-800" : "text-red-800";

  return (
    <div className="h-full rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Total Profit Overview Weekly
          </h3>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-3xl font-bold text-gray-900">
              ${totalRevenue.toLocaleString()}
            </span>
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}
            >
              {isPositive ? "+" : "-"}
              {Math.abs(Number(growthPercentage))}% {arrow}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-gray-200"></span>
              Total Revenue
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-primary"></span>
              Total Profit
            </div>
          </div>
        </div>
      </div>

      <div className="h-[240px] w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={4}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f3f4f6"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              dy={10}
              padding={{ left: 20, right: 20 }}
            />
            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Bar
              dataKey="revenue"
              fill="hsl(var(--primary))"
              fillOpacity={0.2}
              radius={[4, 4, 4, 4]}
              barSize={28}
            />
            <Bar
              dataKey="profit"
              fill="hsl(var(--primary))"
              radius={[4, 4, 4, 4]}
              barSize={28}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
