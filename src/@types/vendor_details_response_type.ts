export type ISingleVendorResponse = {
  id: string;
  userId: string;

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

  rating: number;
  returnRate: number;

  activeConnections: number;
  unreadMessages: number;
  activeCoupons: number;

  productStats: ProductStats;
  counts: VendorCounts;
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
