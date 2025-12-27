import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Tag, TrendingUp } from 'lucide-react';

interface CategoryData {
  name: string;
  value: number;
  color: string;
  growth: string;
  description: string;
}

interface SalesDistributionProps {
  data?: CategoryData[];
}

const DEFAULT_DATA: CategoryData[] = [
  { name: 'Electronics', value: 45000, color: '#278687', growth: '+12%', description: 'Phones, Laptops & Accessories' },
  { name: 'Fashion', value: 32000, color: '#3B82F6', growth: '+8%', description: 'Clothing, Shoes & Jewelry' },
  { name: 'Home & Garden', value: 15000, color: '#10B981', growth: '+15%', description: 'Furniture & Decor' },
  { name: 'Sports', value: 8715, color: '#F59E0B', growth: '+5%', description: 'Equipment & Apparel' }
];

// Tooltip positions: Primary=right, Blue=below, Green=left, Orange=above
const TOOLTIP_POSITIONS: Record<string, { position: string; style: React.CSSProperties }> = {
  '#278687': { position: 'right', style: { left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: '12px' } },
  '#3B82F6': { position: 'below', style: { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: '12px' } },
  '#10B981': { position: 'left', style: { right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: '12px' } },
  '#F59E0B': { position: 'above', style: { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: '12px' } }
};

export function SalesDistribution({ data = DEFAULT_DATA }: SalesDistributionProps) {
  const totalSales = data.reduce((acc, item) => acc + item.value, 0);
  const [hoveredItem, setHoveredItem] = useState<CategoryData | null>(null);

  const getTooltipStyle = (color: string) => {
    return TOOLTIP_POSITIONS[color] || TOOLTIP_POSITIONS['#278687'];
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-full flex flex-col" style={{ overflow: 'visible' }}>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Sales by Category</h3>
          <p className="text-xs text-gray-500">Revenue distribution</p>
        </div>
        <div className="p-2 bg-gray-50 rounded-lg">
          <Tag className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-4 min-h-0" style={{ overflow: 'visible' }}>
        <div className="relative w-[160px] h-[160px] flex-shrink-0" style={{ overflow: 'visible' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={52}
                outerRadius={68}
                paddingAngle={4}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
                cornerRadius={6}
                stroke="none"
                onMouseLeave={() => setHoveredItem(null)}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    cursor="pointer"
                    onMouseEnter={() => setHoveredItem(entry)}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xl font-bold text-gray-900">${(totalSales / 1000).toFixed(1)}k</span>
            <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider mt-0.5">
              Total Sales
            </span>
          </div>

          {/* Custom Tooltip - positioned based on segment color */}
          {hoveredItem && (
            <div
              className="absolute pointer-events-none"
              style={{
                ...getTooltipStyle(hoveredItem.color).style,
                zIndex: 9999
              }}
            >
              <div className="bg-white border border-gray-200 shadow-2xl rounded-xl p-3 min-w-[180px]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: hoveredItem.color }}></div>
                  <span className="text-sm font-bold text-gray-900">{hoveredItem.name}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Revenue</span>
                    <span className="text-xs font-bold text-gray-900">${hoveredItem.value.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Share</span>
                    <span className="text-xs font-bold text-gray-900">{((hoveredItem.value / totalSales) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Growth</span>
                    <span className="text-xs font-bold text-green-600">{hoveredItem.growth}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="w-full" style={{ overflow: 'visible' }}>
          <div className="grid grid-cols-1 gap-2.5">
            {data.map((item) => (
              <div key={item.name} className="relative group" style={{ overflow: 'visible' }}>
                <div className="flex items-center justify-between cursor-pointer hover:bg-gray-50 px-2 py-1.5 rounded-lg transition-colors">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <div
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-xs font-medium text-gray-600 group-hover:text-gray-900 transition-colors truncate">
                      {item.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                    <div className="w-16 h-1 bg-gray-100 rounded-full overflow-hidden hidden sm:block">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${(item.value / totalSales) * 100}%`, backgroundColor: item.color }}
                      ></div>
                    </div>
                    <span className="text-xs font-bold text-gray-900 w-14 text-right">
                      ${(item.value / 1000).toFixed(1)}k
                    </span>
                  </div>
                </div>

                {/* Hover Tooltip - ABOVE the item */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 hidden group-hover:block"
                  style={{
                    bottom: '100%',
                    marginBottom: '8px',
                    zIndex: 9999
                  }}
                >
                  <div className="bg-white border border-gray-200 shadow-2xl rounded-xl p-3 min-w-[200px]">
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm font-bold text-gray-900">{item.name}</span>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">Revenue</span>
                        <span className="text-xs font-bold text-gray-900">${item.value.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">Share</span>
                        <span className="text-xs font-bold text-gray-900">{((item.value / totalSales) * 100).toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">Growth</span>
                        <span className="text-xs font-bold text-green-600 flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          {item.growth}
                        </span>
                      </div>
                      <div className="pt-1.5 border-t border-gray-100 mt-1.5">
                        <p className="text-[10px] text-gray-500">{item.description}</p>
                      </div>
                    </div>
                    {/* Arrow pointing DOWN */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}