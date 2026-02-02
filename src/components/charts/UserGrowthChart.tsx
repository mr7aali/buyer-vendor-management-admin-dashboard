import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface UserGrowthChartProps {
  data?: { name: string; buyers: number; vendors: number }[];
  totalUsers: number;
  totalUsersChange: number; // difference from previous period
}

const DEFAULT_DATA = [
  { name: "Mon", buyers: 400, vendors: 240 },
  { name: "Tue", buyers: 300, vendors: 139 },
  { name: "Wed", buyers: 200, vendors: 980 },
  { name: "Thu", buyers: 278, vendors: 390 },
  { name: "Fri", buyers: 189, vendors: 480 },
  { name: "Sat", buyers: 239, vendors: 380 },
  { name: "Sun", buyers: 349, vendors: 430 },
];

export function UserGrowthChart({
  data = DEFAULT_DATA,
  totalUsers,
  totalUsersChange,
}: UserGrowthChartProps) {
  // Calculate growth %
  // Calculate growth %
  const growthPercentage =
    totalUsersChange && totalUsers - totalUsersChange !== 0
      ? ((totalUsersChange / (totalUsers - totalUsersChange)) * 100).toFixed(2)
      : "0";

  // Determine arrow and color
  const isPositive = Number(growthPercentage) >= 0;
  const arrow = isPositive ? "↗" : "↘";
  const bgColor = isPositive ? "bg-green-100" : "bg-red-100";
  const textColor = isPositive ? "text-green-800" : "text-red-800";

  return (
    <div className="h-full rounded-xl border border-gray-100 bg-white p-3 shadow-sm sm:p-6">
      <div className="mb-4 flex flex-col items-start justify-between gap-2 sm:mb-6 sm:flex-row sm:items-center sm:gap-0">
        <div>
          <h3 className="text-base font-semibold text-gray-900 sm:text-lg">
            User Growth Weekly
          </h3>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900 sm:text-3xl">
              {totalUsers.toLocaleString()}
            </span>
            <span
              className={`inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium ${bgColor} ${textColor}`}
            >
              {isPositive ? "+" : "-"}
              {Math.abs(Number(growthPercentage))}% {arrow}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 sm:gap-4 text-[10px] sm:text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-primary"></span>
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
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f3f4f6"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 10 }}
              dy={8}
              interval={0}
              height={30}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                fontSize: "12px",
              }}
            />
            <Area
              type="monotone"
              dataKey="buyers"
              stroke="hsl(var(--primary))"
              fillOpacity={1}
              fill="url(#colorBuyers)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="vendors"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorVendors)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
