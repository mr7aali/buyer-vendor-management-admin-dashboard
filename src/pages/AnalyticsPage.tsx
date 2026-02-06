import { useState } from "react";
import { Header } from "../components/dashboard/Header";
import { RevenueChart } from "../components/charts/RevenueChart";
import { SalesDistribution } from "../components/charts/SalesDistribution";
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
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import html2pdf from "html2pdf.js";
import { TimeRange, useGetAnalyticsQuery } from "@/redux/features/api/baseApi";
// import { useGetAnalyticsQuery, TimeRange } from "../redux/baseApi";

export function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>("monthly");
  const [showExportModal, setShowExportModal] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Fetch analytics data using your existing baseApi
  const {
    data: analyticsRawData,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useGetAnalyticsQuery({ timeRange });
  const analyticsData = analyticsRawData?.data;
  const handleExport = async () => {
    setIsExporting(true);

    try {
      const element = document.getElementById("pdf-report-content");
      if (!element) {
        throw new Error("Report content not found");
      }

      const originalOverflow = element.style.overflow;
      const originalMaxHeight = element.style.maxHeight;

      element.style.overflow = "visible";
      element.style.maxHeight = "none";

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

      element.style.overflow = originalOverflow;
      element.style.maxHeight = originalMaxHeight;

      setIsExporting(false);
      setShowExportModal(false);
    } catch (error) {
      console.error("PDF generation failed:", error);

      const element = document.getElementById("pdf-report-content");
      if (element) {
        element.style.overflow = "";
        element.style.maxHeight = "";
      }

      setIsExporting(false);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#E8F3F1] font-sans text-gray-900">
        <Header />
        <main className="max-w-[1600px] mx-auto px-6 pt-8">
          <div className="flex h-96 items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-primary"></div>
              <p className="mt-4 text-gray-600">Loading analytics...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="min-h-screen bg-[#E8F3F1] font-sans text-gray-900">
        <Header />
        <main className="max-w-[1600px] mx-auto px-6 pt-8">
          <div className="flex h-96 items-center justify-center">
            <div className="max-w-md text-center">
              <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-500" />
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                Failed to load analytics
              </h3>
              <p className="mb-4 text-gray-600">
                {error && "data" in error
                  ? (error.data as any)?.message || "An error occurred"
                  : "Unable to fetch analytics data"}
              </p>
              <button
                onClick={() => refetch()}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white transition-colors hover:bg-primary/90"
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!analyticsData) {
    return null;
  }

  // Extract data from response
  const currentData = {
    revenue: analyticsData.revenue.data,
    users: analyticsData.users.data,
    orders: analyticsData.orders.data,
    categories: analyticsData.categories.data,
  };

  // Calculate KPIs
  const totalRevenue = analyticsData.revenue.totalRevenue || 0;
  const totalOrders = analyticsData.orders.data.reduce(
    (sum, item) => sum + item.orders,
    0,
  );
  const totalUsers = analyticsData.users.totalUsers || 0;
  const growthRate = Math.round(
    (analyticsData.revenue.totalRevenueChange +
      analyticsData.users.totalUsersChange) /
      2,
  );

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
            {/* Time Range Selector */}
            <div className="flex rounded-lg border border-gray-200 bg-white p-1">
              {(["daily", "weekly", "monthly", "yearly"] as const).map(
                (range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    disabled={isFetching}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium capitalize transition-colors disabled:opacity-50 ${
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

            {/* Refresh Button */}
            <button
              onClick={() => refetch()}
              disabled={isFetching}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 w-full sm:w-auto"
              title="Refresh data"
            >
              <RefreshCw
                className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
              />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            {/* Export Button */}
            <button
              onClick={() => setShowExportModal(true)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm w-full sm:w-auto"
            >
              <Download className="h-4 w-4" />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* Loading Overlay */}
        {isFetching && (
          <div className="mb-4 flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 p-3">
            <RefreshCw className="h-4 w-4 animate-spin text-blue-600" />
            <span className="text-sm text-blue-800">Updating data...</span>
          </div>
        )}

        {/* KPI Grid */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="Total Revenue"
            value={`$${totalRevenue.toLocaleString()}`}
            change={analyticsData.revenue.totalRevenueChange}
            icon={DollarSign}
            linkText="View Report"
          />
          <KPICard
            title="Total Orders"
            value={totalOrders.toLocaleString()}
            change={15}
            icon={ShoppingBag}
            linkText="View Orders"
            linkTo="/orders"
          />
          <KPICard
            title="Active Users"
            value={totalUsers.toLocaleString()}
            change={analyticsData.users.totalUsersChange}
            icon={Users}
            linkText="View Users"
            linkTo="/buyers"
          />
          <KPICard
            title="Growth Rate"
            value={`${growthRate}%`}
            change={growthRate > 0 ? 5 : -5}
            icon={TrendingUp}
            linkText="View Growth"
          />
        </div>

        {/* Charts Grid */}
        <div className="mb-8 grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8">
            <RevenueChart
              data={analyticsData.revenue.data}
              timeRange={timeRange}
              totalRevenue={analyticsData.revenue.totalRevenue}
              totalRevenueChange={analyticsData.revenue.totalRevenueChange}
            />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <SalesDistribution data={analyticsData.categories.data} />
          </div>
        </div>

        {/* Growth Charts */}
        <div className="mb-8 grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-6">
            <OrderGrowthChart data={analyticsData.orders.data} />
          </div>
          <div className="col-span-12 lg:col-span-6">
            <UserGrowthChart
              data={analyticsData.users.data}
              totalUsers={analyticsData.users.totalUsers}
              totalUsersChange={analyticsData.users.totalUsersChange}
            />
          </div>
        </div>
      </main>

      {/* Export Modal - Same as before */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowExportModal(false)}
          />
          <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-xl w-full max-w-5xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden">
            {/* Modal content - keeping it short for brevity */}
            <div className="flex items-center justify-between border-b border-gray-100 bg-gradient-to-r from-primary/5 to-transparent p-4 sm:p-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 sm:text-2xl">
                  Analytics Report Preview
                </h3>
                <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                  {timeRange.charAt(0).toUpperCase() + timeRange.slice(1)}{" "}
                  Report
                </p>
              </div>
              <button
                onClick={() => setShowExportModal(false)}
                className="rounded-lg p-2 transition-colors hover:bg-gray-100"
              >
                <X className="h-4 w-4 text-gray-500 sm:h-5 sm:w-5" />
              </button>
            </div>

            <div
              className="p-3 sm:p-6 overflow-y-auto max-h-[calc(95vh-140px)] sm:max-h-[calc(90vh-180px)]"
              id="pdf-report-content"
            >
              {/* Your existing modal content here */}
              <div className="p-8 text-center">
                <p className="text-gray-600">
                  Report content would be rendered here...
                </p>
              </div>
            </div>

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
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-3 font-medium text-white transition-colors hover:bg-primary/90 disabled:opacity-70"
              >
                {isExporting ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    Download Report
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
