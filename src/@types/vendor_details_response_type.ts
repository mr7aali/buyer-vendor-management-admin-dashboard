export type ISingleVendorResponse = {
  message: string;
  statusCode: number;
  success: boolean;
  data: {
    id: string;
    userId: string;
    isVerified: boolean;
    vendorCode: string;
    fulllName: string;
    phone: string;
    address: string;

    storename: string;
    storeDescription: string | null;

    businessName: string | null;
    businessDescription: string | null;

    gender: "male" | "female" | "other" | string;
    nationalIdNumber: string;

    bussinessRegNumber: string | null;
    bussinessIdPhotoUrl: string;
    nidFontPhotoUrl: string;
    nidBackPhotoUrl: string;

    logoUrl: string | null;

    isActive: boolean;
    createdAt: string;
    website: string;
    rating: number;
    returnRate: number;
    user: {
      id: string;
      email: string;
      createdAt: string;
      updatedAt: string;
      evanAddress: string;
    };
    activeConnections: number;
    unreadMessages: number;
    activeCoupons: number;

    productStats: ProductStats;
    counts: VendorCounts;
    financialStats: {
      revenue: number;
      totalRevenue: number;
      monthlyRevenue: number;
      recentRevenue: number;
      avgOrderValue: number;
    };
    _count: {
      products: number;
      categories: number;
      orders: number;
      coupons: number;
      messages: number;
      connections: number;
    };
  };
};

export type ProductStats = {
  total: number;
  available: number;
  outOfStock: number;
  lowStock: number;
};

export type VendorCounts = {
  products: number;
  categories: number;
  orders: number;
  coupons: number;
  messages: number;
  connections: number;
};
