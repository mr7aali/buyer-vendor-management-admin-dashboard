// @/@types/get_all_vendors.ts

export type IVendor = {
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
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  revenue: number;
  rating: number;
  totalOrders: number;
  orderStats: {
    totalCount: number;
    byStatus: {
      pending?: number;
      processing?: number;
      shipped?: number;
      out_for_delivered?: number;
      delivered?: number;
      cancelled?: number;
    };
  };
  counts: {
    orders: number;
    products: number;
    categories: number;
    coupons: number;
    messages: number;
    connections: number;
  };
};

export type IVendorsListApiResponse = {
  success: true;
  statusCode: number;
  message: string;
  data: {
    items: IVendor[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  };
};
