import { DashboardApiResponse } from "@/@types/admin_dashboard";
import { baseApi } from "./baseApi";

/* =======================
   Types
======================= */

export interface DashboardOverviewResponse {
  success: boolean;
  data: {
    kpi: {
      totalUsers: number;
      totalRevenue: number;
      pendingOrders: number;
      activeVendors: number;
    };
    systemHealth: {
      status: string;
      uptime: number;
    };
    orderFulfillment: {
      delivered: number;
      inTransit: number;
    };
    supportVolume: {
      total: number;
      avgResponseMinutes: number;
      critical: number;
      high: number;
    };
    weeklyRevenue: {
      name: string;
      revenue: number;
      profit: number;
    }[];
    weeklyUsers: {
      name: string;
      buyers: number;
      vendors: number;
    }[];
    recentActivity: {
      id: string;
      text: string;
      time: string;
      type: "order" | "vendor" | "user" | "payment";
    }[];
    actionItems: {
      id: string;
      title: string;
      description: string;
      route: string;
    }[];
  };
}

/* =======================
   Inject Endpoints
======================= */

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /* -------- Dashboard Overview -------- */
    getDashboardOverview: builder.query<
      DashboardApiResponse,
      {
        days?: number;
        includeCharts?: boolean;
        includeActivity?: boolean;
      } | void
    >({
      query: (params) => ({
        url: "/admin/dashboard/overview",
        method: "GET",
        params: params || undefined,
      }),
    }),

    /* -------- KPI Metrics -------- */
    getDashboardKPI: builder.query<
      DashboardOverviewResponse["data"]["kpi"],
      { days?: number } | void
    >({
      query: (params) => ({
        url: "/admin/dashboard/kpi-metrics",
        method: "GET",
        params: params || undefined,
      }),
    }),

    /* -------- System Health -------- */
    getSystemHealth: builder.query<
      DashboardOverviewResponse["data"]["systemHealth"],
      void
    >({
      query: () => ({
        url: "/admin/dashboard/system-health",
        method: "GET",
      }),
    }),

    /* -------- Order Fulfillment -------- */
    getOrderFulfillment: builder.query<
      DashboardOverviewResponse["data"]["orderFulfillment"],
      void
    >({
      query: () => ({
        url: "/admin/dashboard/order-fulfillment",
        method: "GET",
      }),
    }),

    /* -------- Support Volume -------- */
    getSupportVolume: builder.query<
      DashboardOverviewResponse["data"]["supportVolume"],
      void
    >({
      query: () => ({
        url: "/admin/dashboard/support-volume",
        method: "GET",
      }),
    }),

    /* -------- Weekly Revenue -------- */
    getWeeklyRevenue: builder.query<
      DashboardOverviewResponse["data"]["weeklyRevenue"],
      { days?: number } | void
    >({
      query: (params) => ({
        url: "/admin/dashboard/weekly-revenue",
        method: "GET",
        params: params || undefined,
      }),
    }),

    /* -------- Weekly Users -------- */
    getWeeklyUsers: builder.query<
      DashboardOverviewResponse["data"]["weeklyUsers"],
      { days?: number } | void
    >({
      query: (params) => ({
        url: "/admin/dashboard/weekly-users",
        method: "GET",
        params: params || undefined,
      }),
    }),

    /* -------- Recent Activity -------- */
    getRecentActivity: builder.query<
      DashboardOverviewResponse["data"]["recentActivity"],
      { limit?: number } | void
    >({
      query: (params) => ({
        url: "/admin/dashboard/recent-activity",
        method: "GET",
        params: params || undefined,
      }),
    }),

    /* -------- Action Items -------- */
    getActionItems: builder.query<
      DashboardOverviewResponse["data"]["actionItems"],
      void
    >({
      query: () => ({
        url: "/admin/dashboard/action-items",
        method: "GET",
      }),
    }),
  }),
});

/* =======================
   Hooks
======================= */

export const {
  useGetDashboardOverviewQuery,
  useGetDashboardKPIQuery,
  useGetSystemHealthQuery,
  useGetOrderFulfillmentQuery,
  useGetSupportVolumeQuery,
  useGetWeeklyRevenueQuery,
  useGetWeeklyUsersQuery,
  useGetRecentActivityQuery,
  useGetActionItemsQuery,
} = dashboardApi;
