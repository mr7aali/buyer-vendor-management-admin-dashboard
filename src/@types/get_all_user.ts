import { User } from "lucide-react";
/* ---------- Types ---------- */

// User types
export type IUser = {
  id: string;
  email: string;
  index: number;
  createdAt: string;
  updatedAt: string;
  userType: "vendor" | "buyer" | "user";
  buyer: IBuyer | null;
  vendor: IVendor | null;
  _count?: {
    receivedMessages: number;
    sentMessages: number;
    notifications: number;
  };
};

export type IBuyer = {
  id: string;
  userId: string;
  fulllName: string;
  phone: string;
  nidNumber: string;
  nidFontPhotoUrl: string;
  profilePhotoUrl: string;
  createdAt: string;
  updatedAt: string;
  gender: string;
  orderStats: IOrderStats;
  _count?: {
    orders: number;
    messages: number;
    couponAssignments: number;
    connections: number;
  };
};

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
  nationalIdNumber: string;
  nidFontPhotoUrl: string;
  bussinessRegNumber: string;
  bussinessIdPhotoUrl: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  orderStats: IOrderStats;
  _count?: {
    orders: number;
    products: number;
    categories: number;
    coupons: number;
    messages: number;
    connections: number;
  };
};

export type IOrderStats = {
  totalCount: number;
  totalAmount: number;
  byStatus: Record<string, number>;
};

export type IGetAllUsersParams = {
  page?: number;
  limit?: number;
  userType?: "vendor" | "buyer" | "user";
  search?: string;
  gender?: "male" | "female" | "other";
  isActive?: boolean;
  vendorCode?: string;
  sortBy?: "createdAt" | "updatedAt" | "email" | "index";
  sortOrder?: "asc" | "desc";
  includeMessages?: boolean;
  includeNotifications?: boolean;
  includeCount?: boolean;
};

export interface GetAllUsersResponse {
  data: IUser[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}
