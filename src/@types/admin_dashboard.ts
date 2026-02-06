export type DashboardApiResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    kpiMetrics: {
      totalUsers: number;
      totalUsersChange: number;
      totalRevenue: number;
      totalRevenueChange: number;
      pendingOrders: number;
      pendingOrdersChange: number;
      activeVendors: number;
      activeVendorsChange: number;
    };
    systemHealth: {
      status: "operational" | "degraded" | string;
      uptime: number;
      lastOutageHours: number;
      message: string;
    };
    orderFulfillment: {
      delivered: {
        percentage: number;
        count: number;
        change: number;
      };
      inTransit: {
        percentage: number;
        count: number;
        status: string;
      };
      pending: {
        percentage: number;
        count: number;
      };
      failed: {
        percentage: number;
        count: number;
      };
    };
    supportVolume: {
      todayTickets: number;
      averageResponseMinutes: number;
      critical: number;
      high: number;
      medium: number;
      low: number;
    };
    weeklyRevenue: Array<{
      name: string; // "Sun" | "Mon" | "Tue" | ...
      revenue: number;
      profit: number;
    }>;
    weeklyUsers: Array<{
      name: string; // "Sun" | "Mon" | "Tue" | ...
      buyers: number;
      vendors: number;
    }>;
    recentActivity: Array<{
      id?: string;
      type: string; // "ORDER" | "VENDOR_KYC" | "DELIVERY" | "USER_REGISTRATION" | "PAYMENT"
      text?: string;
      time?: string;
      timestamp?: string;
      icon?: string;
      color?: string;
    }>;
    actionItems: Array<{
      type: string; // "VERIFICATION" | "UNSHIPPED_ORDERS" | "SUPPORT_MESSAGES"
      count: number;
      title: string;
      description: string;
      severity: "critical" | "warning" | "info" | string;
      actionUrl: string;
    }>;
  };
};
