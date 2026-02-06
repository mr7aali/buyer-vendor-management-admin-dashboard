import { useState } from "react";
import { Header } from "../components/dashboard/Header";
import { RevenueChart } from "../components/charts/RevenueChart";
import { SalesDistribution } from "../components/charts/SalesDistribution";
import { VendorPerformance } from "../components/charts/VendorPerformance";
import { UserGrowthChart } from "../components/charts/UserGrowthChart";
import { OrderGrowthChart } from "../components/charts/OrderGrowthChart";
import { KPICard } from "../components/ui/KPICard";
import {
  Download,
  TrendingUp,
  Users,
  ShoppingBag,
  DollarSign,
  X,
} from "lucide-react";
import html2pdf from "html2pdf.js";

// Mock Data Sets
const formatHour = (hour: number) => {
  if (hour === 0) return "12am";
  if (hour < 12) return `${hour}am`;
  if (hour === 12) return "12pm";
  return `${hour - 12}pm`;
};

const DAILY_DATA = {
  revenue: Array.from({ length: 12 }, (_, i) => ({
    name: formatHour(i * 2),
    revenue: Math.floor(Math.random() * 1000) + 200,
    profit: Math.floor(Math.random() * 400) + 100,
  })),
  users: Array.from({ length: 12 }, (_, i) => ({
    name: formatHour(i * 2),
    buyers: Math.floor(Math.random() * 40),
    vendors: Math.floor(Math.random() * 10),
  })),
  orders: Array.from({ length: 12 }, (_, i) => ({
    name: formatHour(i * 2),
    orders: Math.floor(Math.random() * 20),
  })),
  categories: [
    {
      name: "Electronics",
      value: 1200,
      color: "#278687",
      growth: "+5%",
      description: "Phones, Laptops & Accessories",
    },
    {
      name: "Fashion",
      value: 850,
      color: "#3B82F6",
      growth: "+3%",
      description: "Clothing, Shoes & Jewelry",
    },
    {
      name: "Home & Garden",
      value: 420,
      color: "#10B981",
      growth: "+7%",
      description: "Furniture & Decor",
    },
    {
      name: "Sports",
      value: 280,
      color: "#F59E0B",
      growth: "+2%",
      description: "Equipment & Apparel",
    },
  ],
};

const WEEKLY_DATA = {
  revenue: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => ({
    name: day,
    revenue: Math.floor(Math.random() * 3000) + 1000,
    profit: Math.floor(Math.random() * 1000) + 500,
  })),
  users: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => ({
    name: day,
    buyers: Math.floor(Math.random() * 100),
    vendors: Math.floor(Math.random() * 10),
  })),
  orders: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => ({
    name: day,
    orders: Math.floor(Math.random() * 50),
  })),
  categories: [
    {
      name: "Electronics",
      value: 8500,
      color: "#278687",
      growth: "+8%",
      description: "Phones, Laptops & Accessories",
    },
    {
      name: "Fashion",
      value: 6200,
      color: "#3B82F6",
      growth: "+6%",
      description: "Clothing, Shoes & Jewelry",
    },
    {
      name: "Home & Garden",
      value: 3100,
      color: "#10B981",
      growth: "+10%",
      description: "Furniture & Decor",
    },
    {
      name: "Sports",
      value: 1800,
      color: "#F59E0B",
      growth: "+4%",
      description: "Equipment & Apparel",
    },
  ],
};

const MONTHLY_DATA = {
  revenue: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ].map((m) => ({
    name: m,
    revenue: Math.floor(Math.random() * 20000) + 5000,
    profit: Math.floor(Math.random() * 5000) + 1000,
  })),
  users: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ].map((m) => ({
    name: m,
    buyers: Math.floor(Math.random() * 500),
    vendors: Math.floor(Math.random() * 50),
  })),
  orders: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ].map((m) => ({ name: m, orders: Math.floor(Math.random() * 300) })),
  categories: [
    {
      name: "Electronics",
      value: 45000,
      color: "#278687",
      growth: "+12%",
      description: "Phones, Laptops & Accessories",
    },
    {
      name: "Fashion",
      value: 32000,
      color: "#3B82F6",
      growth: "+8%",
      description: "Clothing, Shoes & Jewelry",
    },
    {
      name: "Home & Garden",
      value: 15000,
      color: "#10B981",
      growth: "+15%",
      description: "Furniture & Decor",
    },
    {
      name: "Sports",
      value: 8715,
      color: "#F59E0B",
      growth: "+5%",
      description: "Equipment & Apparel",
    },
  ],
};

const YEARLY_DATA = {
  revenue: ["2020", "2021", "2022", "2023", "2024"].map((y) => ({
    name: y,
    revenue: Math.floor(Math.random() * 500000) + 100000,
    profit: Math.floor(Math.random() * 100000) + 20000,
  })),
  users: ["2020", "2021", "2022", "2023", "2024"].map((y) => ({
    name: y,
    buyers: Math.floor(Math.random() * 10000),
    vendors: Math.floor(Math.random() * 500),
  })),
  orders: ["2020", "2021", "2022", "2023", "2024"].map((y) => ({
    name: y,
    orders: Math.floor(Math.random() * 5000),
  })),
  categories: [
    {
      name: "Electronics",
      value: 540000,
      color: "#278687",
      growth: "+18%",
      description: "Phones, Laptops & Accessories",
    },
    {
      name: "Fashion",
      value: 384000,
      color: "#3B82F6",
      growth: "+14%",
      description: "Clothing, Shoes & Jewelry",
    },
    {
      name: "Home & Garden",
      value: 180000,
      color: "#10B981",
      growth: "+22%",
      description: "Furniture & Decor",
    },
    {
      name: "Sports",
      value: 104580,
      color: "#F59E0B",
      growth: "+9%",
      description: "Equipment & Apparel",
    },
  ],
};

export function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<
    "daily" | "weekly" | "monthly" | "yearly"
  >("monthly");
  const [showExportModal, setShowExportModal] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const getData = () => {
    switch (timeRange) {
      case "daily":
        return DAILY_DATA;
      case "weekly":
        return WEEKLY_DATA;
      case "yearly":
        return YEARLY_DATA;
      default:
        return MONTHLY_DATA;
    }
  };

  const currentData = getData();

  const handleExport = async () => {
    setIsExporting(true);

    try {
      const element = document.getElementById("pdf-report-content");
      if (!element) {
        throw new Error("Report content not found");
      }

      // Store original styles
      const originalOverflow = element.style.overflow;
      const originalMaxHeight = element.style.maxHeight;

      // Temporarily remove scroll constraints to capture full content
      element.style.overflow = "visible";
      element.style.maxHeight = "none";

      // Wait a bit for any dynamic content to render
      await new Promise((resolve) => setTimeout(resolve, 500));

      const opt = {
        margin: 10,
        filename: `Analytics_Report_${timeRange}_${new Date().toISOString().split("T")[0]}.pdf`,
        image: { type: "jpeg" as const, quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: "#ffffff",
          windowHeight: element.scrollHeight,
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" as const },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] as any },
      };

      await html2pdf().from(element).set(opt).save();

      // Restore original styles
      element.style.overflow = originalOverflow;
      element.style.maxHeight = originalMaxHeight;

      setIsExporting(false);
      setShowExportModal(false);
    } catch (error) {
      console.error("PDF generation failed:", error);

      // Restore styles even if there's an error
      const element = document.getElementById("pdf-report-content");
      if (element) {
        element.style.overflow = "";
        element.style.maxHeight = "";
      }

      setIsExporting(false);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#E8F3F1] font-sans text-gray-900 pb-12">
      <Header />

      <main className="max-w-[1600px] mx-auto px-6 pt-8">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="mb-2 text-2xl font-bold text-gray-900">
              Analytics Overview
            </h1>
            <p className="text-gray-500">
              Deep dive into your platform's performance metrics.
            </p>
          </div>

          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <div className="flex rounded-lg border border-gray-200 bg-white p-1">
              {(["daily", "weekly", "monthly", "yearly"] as const).map(
                (range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium capitalize transition-colors ${
                      timeRange === range
                        ? "bg-[#E8F3F1] text-primary"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {range}
                  </button>
                ),
              )}
            </div>
            <button
              onClick={() => setShowExportModal(true)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm w-full sm:w-auto"
            >
              <Download className="h-4 w-4" />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="Total Revenue"
            value="$1,248,590"
            change={15}
            icon={DollarSign}
            linkText="View Report"
          />
          <KPICard
            title="Total Orders"
            value="8,492"
            change={8}
            icon={ShoppingBag}
            linkText="View Orders"
            linkTo="/orders"
          />
          <KPICard
            title="Active Users"
            value="12,450"
            change={24}
            icon={Users}
            linkText="View Users"
            linkTo="/buyers"
          />
          <KPICard
            title="Growth Rate"
            value="18.2%"
            change={5}
            icon={TrendingUp}
            linkText="View Growth"
          />
        </div>

        {/* Charts Grid */}
        <div className="mb-8 grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8">
            <RevenueChart
              data={currentData.revenue}
              timeRange={timeRange}
              totalRevenue={0}
              totalRevenueChange={0}
            />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <SalesDistribution data={currentData.categories} />
          </div>
        </div>

        {/* Growth Charts */}
        <div className="mb-8 grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-6">
            <OrderGrowthChart data={currentData.orders} />
          </div>
          <div className="col-span-12 lg:col-span-6">
            <UserGrowthChart
              data={currentData.users}
              totalUsers={0}
              totalUsersChange={0}
            />
          </div>
        </div>
      </main>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowExportModal(false)}
          />
          <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-xl w-full max-w-5xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 bg-gradient-to-r from-primary/5 to-transparent p-4 sm:p-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 sm:text-2xl">
                  Analytics Report Preview
                </h3>
                <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                  {timeRange.charAt(0).toUpperCase() + timeRange.slice(1)}{" "}
                  Report • Generated {new Date().toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => setShowExportModal(false)}
                className="rounded-lg p-2 transition-colors hover:bg-gray-100"
              >
                <X className="h-4 w-4 text-gray-500 sm:h-5 sm:w-5" />
              </button>
            </div>

            {/* Report Preview Content - SCROLLABLE */}
            <div
              className="p-3 sm:p-6 overflow-y-auto max-h-[calc(95vh-140px)] sm:max-h-[calc(90vh-180px)]"
              id="pdf-report-content"
            >
              {/* Executive Summary */}
              <div className="mb-6">
                <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-900">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Executive Summary
                </h4>
                <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
                  <div className="rounded-lg border border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5 p-2 sm:p-4">
                    <div className="text-[10px] sm:text-xs text-gray-600 mb-1 font-medium">
                      Total Revenue
                    </div>
                    <div className="text-base font-bold text-gray-900 sm:text-2xl">
                      $1,248,590
                    </div>
                    <div className="text-[10px] sm:text-xs text-green-600 font-medium mt-1">
                      +15% vs previous
                    </div>
                  </div>
                  <div className="rounded-lg border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-50/50 p-2 sm:p-4">
                    <div className="text-[10px] sm:text-xs text-gray-600 mb-1 font-medium">
                      Total Orders
                    </div>
                    <div className="text-base font-bold text-gray-900 sm:text-2xl">
                      8,492
                    </div>
                    <div className="text-[10px] sm:text-xs text-green-600 font-medium mt-1">
                      +8% vs previous
                    </div>
                  </div>
                  <div className="rounded-lg border border-purple-200 bg-gradient-to-br from-purple-50 to-purple-50/50 p-2 sm:p-4">
                    <div className="text-[10px] sm:text-xs text-gray-600 mb-1 font-medium">
                      Active Users
                    </div>
                    <div className="text-base font-bold text-gray-900 sm:text-2xl">
                      12,450
                    </div>
                    <div className="text-[10px] sm:text-xs text-green-600 font-medium mt-1">
                      +24% vs previous
                    </div>
                  </div>
                  <div className="rounded-lg border border-amber-200 bg-gradient-to-br from-amber-50 to-amber-50/50 p-2 sm:p-4">
                    <div className="text-[10px] sm:text-xs text-gray-600 mb-1 font-medium">
                      Growth Rate
                    </div>
                    <div className="text-base font-bold text-gray-900 sm:text-2xl">
                      18.2%
                    </div>
                    <div className="text-[10px] sm:text-xs text-green-600 font-medium mt-1">
                      +5% vs previous
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Data Breakdown */}
              <div className="mb-6 grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
                {/* Revenue & Profit Data */}
                <div>
                  <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-900">
                    <DollarSign className="h-4 w-4 text-primary" />
                    Revenue & Profit Breakdown ({
                      currentData.revenue.length
                    }{" "}
                    periods)
                  </h4>
                  <div className="overflow-auto rounded-lg border border-gray-200 bg-gray-50">
                    <table className="w-full text-xs">
                      <thead className="sticky top-0 z-10 bg-gray-100">
                        <tr>
                          <th className="bg-gray-100 p-2 text-left font-semibold text-gray-700">
                            Period
                          </th>
                          <th className="bg-gray-100 p-2 text-right font-semibold text-gray-700">
                            Revenue
                          </th>
                          <th className="bg-gray-100 p-2 text-right font-semibold text-gray-700">
                            Profit
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentData.revenue.map((item, idx) => (
                          <tr
                            key={idx}
                            className="border-t border-gray-200 hover:bg-white"
                          >
                            <td className="p-2 font-medium text-gray-900">
                              {item.name}
                            </td>
                            <td className="p-2 text-right text-gray-900">
                              ${item.revenue.toLocaleString()}
                            </td>
                            <td className="p-2 text-right font-medium text-green-600">
                              ${item.profit.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* User Growth Data */}
                <div>
                  <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-900">
                    <Users className="h-4 w-4 text-primary" />
                    User Growth Data ({currentData.users.length} periods)
                  </h4>
                  <div className="overflow-auto rounded-lg border border-gray-200 bg-gray-50">
                    <table className="w-full text-xs">
                      <thead className="sticky top-0 z-10 bg-gray-100">
                        <tr>
                          <th className="bg-gray-100 p-2 text-left font-semibold text-gray-700">
                            Period
                          </th>
                          <th className="bg-gray-100 p-2 text-right font-semibold text-gray-700">
                            Buyers
                          </th>
                          <th className="bg-gray-100 p-2 text-right font-semibold text-gray-700">
                            Vendors
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentData.users.map((item, idx) => (
                          <tr
                            key={idx}
                            className="border-t border-gray-200 hover:bg-white"
                          >
                            <td className="p-2 font-medium text-gray-900">
                              {item.name}
                            </td>
                            <td className="p-2 text-right font-medium text-primary">
                              {item.buyers}
                            </td>
                            <td className="p-2 text-right font-medium text-blue-600">
                              {item.vendors}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Order Data */}
              <div className="mb-6">
                <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-900">
                  <ShoppingBag className="h-4 w-4 text-primary" />
                  Order Metrics ({currentData.orders.length} periods)
                </h4>
                <div className="overflow-auto rounded-lg border border-gray-200 bg-gray-50">
                  <table className="w-full text-xs">
                    <thead className="sticky top-0 z-10 bg-gray-100">
                      <tr>
                        <th className="bg-gray-100 p-2 text-left font-semibold text-gray-700">
                          Period
                        </th>
                        <th className="bg-gray-100 p-2 text-right font-semibold text-gray-700">
                          Total Orders
                        </th>
                        <th className="bg-gray-100 p-2 text-right font-semibold text-gray-700">
                          Avg per Period
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentData.orders.map((item, idx) => (
                        <tr
                          key={idx}
                          className="border-t border-gray-200 hover:bg-white"
                        >
                          <td className="p-2 font-medium text-gray-900">
                            {item.name}
                          </td>
                          <td className="p-2 text-right font-medium text-gray-900">
                            {item.orders}
                          </td>
                          <td className="p-2 text-right text-gray-600">
                            {(item.orders / 7).toFixed(1)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Sales by Category */}
              <div className="mb-6">
                <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-900">
                  <DollarSign className="h-4 w-4 text-primary" />
                  Sales by Category
                </h4>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {currentData.categories.map((cat) => (
                    <div
                      key={cat.name}
                      className="flex items-center justify-between rounded-lg border border-gray-200 bg-gradient-to-r from-gray-50 to-white p-3 transition-shadow hover:shadow-md sm:p-4"
                    >
                      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                        <div
                          className="h-3 w-3 flex-shrink-0 rounded-full shadow-sm sm:h-4 sm:w-4"
                          style={{ backgroundColor: cat.color }}
                        ></div>
                        <div className="min-w-0">
                          <div className="truncate text-xs font-bold text-gray-900 sm:text-sm">
                            {cat.name}
                          </div>
                          <div className="text-[10px] sm:text-xs text-gray-500 truncate">
                            {cat.description}
                          </div>
                        </div>
                      </div>
                      <div className="ml-2 flex-shrink-0 text-right">
                        <div className="text-sm font-bold text-gray-900 sm:text-base">
                          ${(cat.value / 1000).toFixed(1)}k
                        </div>
                        <div className="text-[10px] sm:text-xs text-green-600 font-medium">
                          {cat.growth}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Report Coverage */}
              <div className="mb-4">
                <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-900">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Report Coverage & Scope
                </h4>
                <div className="rounded-lg border border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10 p-3 sm:p-5">
                  <div className="grid grid-cols-2 gap-4 text-center sm:gap-6 lg:grid-cols-4">
                    <div>
                      <div className="text-2xl font-bold text-primary sm:text-3xl">
                        {currentData.revenue.length}
                      </div>
                      <div className="text-[10px] sm:text-xs text-gray-600 mt-1 font-medium">
                        Revenue Data Points
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary sm:text-3xl">
                        {currentData.users.length}
                      </div>
                      <div className="text-[10px] sm:text-xs text-gray-600 mt-1 font-medium">
                        User Metrics
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary sm:text-3xl">
                        {currentData.orders.length}
                      </div>
                      <div className="text-[10px] sm:text-xs text-gray-600 mt-1 font-medium">
                        Order Records
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary sm:text-3xl">
                        {currentData.categories.length}
                      </div>
                      <div className="text-[10px] sm:text-xs text-gray-600 mt-1 font-medium">
                        Product Categories
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-xs text-blue-900 sm:p-4 sm:text-sm">
                <div className="flex items-start gap-2">
                  <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-[11px] sm:text-sm">
                    <strong className="font-bold">
                      PDF Export Information:
                    </strong>{" "}
                    This comprehensive report includes all{" "}
                    {currentData.revenue.length} data points with detailed
                    charts, trend analysis, category breakdowns, and actionable
                    insights for the <strong>{timeRange}</strong> period. All
                    tables shown above will be included with additional
                    statistical analysis and forecasting.
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="sticky bottom-0 flex flex-col gap-3 border-t border-gray-100 bg-gray-50 p-3 sm:flex-row sm:p-4">
              <button
                onClick={() => setShowExportModal(false)}
                className="flex-1 rounded-xl border border-gray-300 py-3 font-medium text-gray-700 transition-colors hover:bg-white"
              >
                Cancel
              </button>
              <button
                onClick={handleExport}
                disabled={isExporting}
                className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-primary py-3 font-medium text-white transition-colors hover:bg-primary/90 disabled:opacity-70"
              >
                {isExporting ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    Download Complete PDF Report
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
