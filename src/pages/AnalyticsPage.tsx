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

const formatCurrency = (value: number) =>
  `$${value.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;

const formatSignedPercent = (value: number) => `${value >= 0 ? "+" : ""}${value}%`;

const formatRangeLabel = (range: TimeRange) =>
  `${range.charAt(0).toUpperCase()}${range.slice(1)}`;

const getQueryErrorMessage = (error: unknown) => {
  if (!error || typeof error !== "object" || !("data" in error)) {
    return "Unable to fetch analytics data";
  }

  const data = error.data;
  if (!data || typeof data !== "object" || !("message" in data)) {
    return "An error occurred";
  }

  const message = data.message;
  return typeof message === "string" && message.trim().length > 0
    ? message
    : "An error occurred";
};

export function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>("monthly");
  const [showExportModal, setShowExportModal] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

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
  const analyticsErrorMessage = getQueryErrorMessage(error);

  const closeExportModal = () => {
    setShowExportModal(false);
    setExportError(null);
  };

  const openExportModal = () => {
    setExportError(null);
    setShowExportModal(true);
  };

  const handleExport = async () => {
    if (isExporting) return;

    const element = document.getElementById("pdf-report-content");
    if (!element) {
      setExportError("Report content is not ready yet. Please try again.");
      return;
    }

    setIsExporting(true);
    setExportError(null);

    const originalStyles = {
      overflow: element.style.overflow,
      maxHeight: element.style.maxHeight,
      height: element.style.height,
    };

    try {
      element.style.overflow = "visible";
      element.style.maxHeight = "none";
      element.style.height = "auto";

      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => resolve());
      });

      const filenameDate = new Date().toISOString().split("T")[0];
      const options = {
        margin: 10,
        filename: `Analytics_Report_${timeRange}_${filenameDate}.pdf`,
        image: { type: "jpeg" as const, quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: "#ffffff",
          windowHeight: element.scrollHeight,
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" as const },
        pagebreak: { mode: ["css", "legacy"] },
      };

      await html2pdf().from(element).set(options).save();
      closeExportModal();
    } catch (err) {
      console.error("PDF generation failed:", err);
      setExportError("Failed to generate PDF. Please try again.");
    } finally {
      element.style.overflow = originalStyles.overflow;
      element.style.maxHeight = originalStyles.maxHeight;
      element.style.height = originalStyles.height;
      setIsExporting(false);
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
                {analyticsErrorMessage}
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

  const currentData = {
    revenue: analyticsData.revenue.data,
    users: analyticsData.users.data,
    orders: analyticsData.orders.data,
    categories: analyticsData.categories.data,
  };

  // Calculate KPIs
  const totalRevenue = analyticsData.revenue.totalRevenue || 0;
  const totalRevenueChange = analyticsData.revenue.totalRevenueChange || 0;
  const totalOrders = analyticsData.orders.data.reduce(
    (sum, item) => sum + item.orders,
    0,
  );
  const totalUsers = analyticsData.users.totalUsers || 0;
  const totalUsersChange = analyticsData.users.totalUsersChange || 0;
  const growthRate = Math.round(
    (totalRevenueChange + totalUsersChange) / 2,
  );
  const reportGeneratedAt = new Date().toLocaleString();

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
              onClick={openExportModal}
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
            isHaveBootmLink={false}
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
            isHaveBootmLink={false}
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
            onClick={() => {
              if (!isExporting) {
                closeExportModal();
              }
            }}
          />
          <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-xl w-full max-w-5xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between border-b border-gray-100 bg-gradient-to-r from-primary/5 to-transparent p-4 sm:p-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 sm:text-2xl">
                  Analytics Report Preview
                </h3>
                <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                  {formatRangeLabel(timeRange)} Report
                </p>
              </div>
              <button
                onClick={closeExportModal}
                disabled={isExporting}
                className="rounded-lg p-2 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <X className="h-4 w-4 text-gray-500 sm:h-5 sm:w-5" />
              </button>
            </div>

            <div
              className="p-3 sm:p-6 overflow-y-auto max-h-[calc(95vh-140px)] sm:max-h-[calc(90vh-180px)]"
              id="pdf-report-content"
            >
              <div className="space-y-6 bg-white">
                <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h4 className="text-base font-semibold text-gray-900 sm:text-xl">
                        Analytics {formatRangeLabel(timeRange)} Report
                      </h4>
                      <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                        Generated: {reportGeneratedAt}
                      </p>
                    </div>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                      {timeRange}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="rounded-xl border border-gray-200 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Total Revenue
                    </p>
                    <p className="mt-2 text-xl font-bold text-gray-900">
                      {formatCurrency(totalRevenue)}
                    </p>
                    <p
                      className={`mt-1 text-xs font-medium ${
                        totalRevenueChange >= 0
                          ? "text-emerald-600"
                          : "text-red-600"
                      }`}
                    >
                      {formatSignedPercent(totalRevenueChange)} vs previous
                      period
                    </p>
                  </div>
                  <div className="rounded-xl border border-gray-200 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Active Users
                    </p>
                    <p className="mt-2 text-xl font-bold text-gray-900">
                      {totalUsers.toLocaleString()}
                    </p>
                    <p
                      className={`mt-1 text-xs font-medium ${
                        totalUsersChange >= 0
                          ? "text-emerald-600"
                          : "text-red-600"
                      }`}
                    >
                      {formatSignedPercent(totalUsersChange)} vs previous period
                    </p>
                  </div>
                  <div className="rounded-xl border border-gray-200 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Total Orders
                    </p>
                    <p className="mt-2 text-xl font-bold text-gray-900">
                      {totalOrders.toLocaleString()}
                    </p>
                    <p className="mt-1 text-xs font-medium text-gray-600">
                      From {currentData.orders.length} data points
                    </p>
                  </div>
                  <div className="rounded-xl border border-gray-200 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Growth Rate
                    </p>
                    <p className="mt-2 text-xl font-bold text-gray-900">
                      {growthRate}%
                    </p>
                    <p className="mt-1 text-xs font-medium text-gray-600">
                      Avg. revenue and user growth
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-gray-200">
                  <div className="border-b border-gray-100 bg-gray-50 px-4 py-3">
                    <h5 className="text-sm font-semibold text-gray-900">
                      Revenue Performance
                    </h5>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left font-medium text-gray-600">
                            Period
                          </th>
                          <th className="px-4 py-2 text-right font-medium text-gray-600">
                            Revenue
                          </th>
                          <th className="px-4 py-2 text-right font-medium text-gray-600">
                            Profit
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 bg-white">
                        {currentData.revenue.length > 0 ? (
                          currentData.revenue.map((item) => (
                            <tr key={`revenue-${item.name}`}>
                              <td className="px-4 py-2 text-gray-700">
                                {item.name}
                              </td>
                              <td className="px-4 py-2 text-right text-gray-900">
                                {formatCurrency(item.revenue)}
                              </td>
                              <td className="px-4 py-2 text-right text-gray-900">
                                {formatCurrency(item.profit)}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan={3}
                              className="px-4 py-4 text-center text-gray-500"
                            >
                              No revenue data available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <div className="rounded-xl border border-gray-200">
                    <div className="border-b border-gray-100 bg-gray-50 px-4 py-3">
                      <h5 className="text-sm font-semibold text-gray-900">
                        User Growth
                      </h5>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-2 text-left font-medium text-gray-600">
                              Period
                            </th>
                            <th className="px-4 py-2 text-right font-medium text-gray-600">
                              Buyers
                            </th>
                            <th className="px-4 py-2 text-right font-medium text-gray-600">
                              Vendors
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white">
                          {currentData.users.length > 0 ? (
                            currentData.users.map((item) => (
                              <tr key={`users-${item.name}`}>
                                <td className="px-4 py-2 text-gray-700">
                                  {item.name}
                                </td>
                                <td className="px-4 py-2 text-right text-gray-900">
                                  {item.buyers.toLocaleString()}
                                </td>
                                <td className="px-4 py-2 text-right text-gray-900">
                                  {item.vendors.toLocaleString()}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td
                                colSpan={3}
                                className="px-4 py-4 text-center text-gray-500"
                              >
                                No user growth data available
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="rounded-xl border border-gray-200">
                    <div className="border-b border-gray-100 bg-gray-50 px-4 py-3">
                      <h5 className="text-sm font-semibold text-gray-900">
                        Order Growth
                      </h5>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-2 text-left font-medium text-gray-600">
                              Period
                            </th>
                            <th className="px-4 py-2 text-right font-medium text-gray-600">
                              Orders
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white">
                          {currentData.orders.length > 0 ? (
                            currentData.orders.map((item) => (
                              <tr key={`orders-${item.name}`}>
                                <td className="px-4 py-2 text-gray-700">
                                  {item.name}
                                </td>
                                <td className="px-4 py-2 text-right text-gray-900">
                                  {item.orders.toLocaleString()}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td
                                colSpan={2}
                                className="px-4 py-4 text-center text-gray-500"
                              >
                                No order growth data available
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-gray-200">
                  <div className="border-b border-gray-100 bg-gray-50 px-4 py-3">
                    <h5 className="text-sm font-semibold text-gray-900">
                      Sales Distribution
                    </h5>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left font-medium text-gray-600">
                            Category
                          </th>
                          <th className="px-4 py-2 text-right font-medium text-gray-600">
                            Value
                          </th>
                          <th className="px-4 py-2 text-right font-medium text-gray-600">
                            Growth
                          </th>
                          <th className="px-4 py-2 text-left font-medium text-gray-600">
                            Description
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 bg-white">
                        {currentData.categories.length > 0 ? (
                          currentData.categories.map((item) => (
                            <tr key={`category-${item.name}`}>
                              <td className="px-4 py-2 font-medium text-gray-700">
                                {item.name}
                              </td>
                              <td className="px-4 py-2 text-right text-gray-900">
                                {item.value.toLocaleString()}
                              </td>
                              <td
                                className={`px-4 py-2 text-right font-medium ${
                                  item.growth.startsWith("-")
                                    ? "text-red-600"
                                    : "text-emerald-600"
                                }`}
                              >
                                {item.growth}
                              </td>
                              <td className="px-4 py-2 text-gray-600">
                                {item.description}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan={4}
                              className="px-4 py-4 text-center text-gray-500"
                            >
                              No category data available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {exportError && (
              <div className="mx-3 mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 sm:mx-6 sm:mb-4">
                {exportError}
              </div>
            )}

            <div className="sticky bottom-0 flex flex-col gap-3 border-t border-gray-100 bg-gray-50 p-3 sm:flex-row sm:p-4">
              <button
                onClick={closeExportModal}
                disabled={isExporting}
                className="flex-1 rounded-xl border border-gray-300 py-3 font-medium text-gray-700 transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
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
