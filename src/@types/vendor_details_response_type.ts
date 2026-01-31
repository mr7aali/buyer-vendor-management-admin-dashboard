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
    isNidVerify: boolean;
    isBussinessIdVerified: boolean;
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

// Add this type for the update vendor request
export type UpdateVendorRequest = {
  id: string;
  data: {
    fulllName?: string;
    phone?: string;
    address?: string;
    storename?: string;
    storeDescription?: string;
    gender?: string;
    businessName?: string;
    businessDescription?: string;
    website?: string;
    isActive?: boolean;
    isNidVerify?: boolean;
    isBussinessIdVerified?: boolean;
  };
};

// Add this type for the update vendor response
export type UpdateVendorResponse = {
  success: boolean;
  message: string;
  vendor: {
    id: string;
    userId: string;
    vendorCode: string;
    fulllName: string;
    phone: string;
    address: string;
    storename: string;
    storeDescription: string;
    gender: string;
    businessName: string | null;
    businessDescription: string | null;
    logoUrl: string;
    nationalIdNumber: string;
    nidFontPhotoUrl: string;
    nidBackPhotoUrl: string;
    isNidVerify: boolean;
    bussinessRegNumber: string;
    bussinessIdPhotoUrl: string;
    isBussinessIdVerified: boolean;
    website: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    user: {
      id: string;
      email: string;
      createdAt: string;
      updatedAt: string;
    };
  };
};
