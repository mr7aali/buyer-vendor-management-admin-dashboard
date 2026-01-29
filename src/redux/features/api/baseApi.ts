import { AdminLoginRequest, AdminLoginResponse } from "@/@types/logintypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/* ---------- Types ---------- */

export interface User {
  id: string;
  email: string;
  index: number;
  createdAt: string;
  updatedAt: string;
  userType: "vendor" | "buyer" | "user";
  buyer: Buyer | null;
  vendor: Vendor | null;
  _count?: {
    receivedMessages: number;
    sentMessages: number;
    notifications: number;
  };
}

export interface Buyer {
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
  orderStats: {
    totalCount: number;
    totalAmount: number;
    byStatus: Record<string, number>;
  };
  _count?: {
    orders: number;
    messages: number;
    couponAssignments: number;
    connections: number;
  };
}

export interface Vendor {
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
  orderStats: {
    totalCount: number;
    totalAmount: number;
    byStatus: Record<string, number>;
  };
  _count?: {
    orders: number;
    products: number;
    categories: number;
    coupons: number;
    messages: number;
    connections: number;
  };
}

export interface GetAllUsersResponse {
  data: User[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

/* ---------- API ---------- */

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    prepareHeaders: (headers) => {
      const token = localStorage?.getItem("accessToken"); // key name must match

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    /* ---------- QUERY EXAMPLE ---------- */
    getPokemonByName: builder.query<any, string>({
      query: (name) => `pokemon/${name}`,
    }),

    /* ---------- ADMIN LOGIN MUTATION ---------- */
    adminLogin: builder.mutation<AdminLoginResponse, AdminLoginRequest>({
      query: (body) => ({
        url: "/auth/admin/login",
        method: "POST",
        body,
      }),
    }),

    /* ---------- GET ALL USERS QUERY ---------- */
    getAllUsers: builder.query<
      GetAllUsersResponse,
      {
        page?: string;
        limit?: string;
        userType?: string;
        search?: string;
        gender?: string;
        isActive?: string;
        vendorCode?: string;
        sortBy?: string;
        sortOrder?: string;
        includeMessages?: string;
        includeNotifications?: string;
        includeCount?: string;
      }
    >({
      query: (params: {
        page?: string;
        limit?: string;
        userType?: string;
        search?: string;
        gender?: string;
        isActive?: string;
        vendorCode?: string;
        sortBy?: string;
        sortOrder?: string;
        includeMessages?: string;
        includeNotifications?: string;
        includeCount?: string;
      }) => ({
        url: `/auth/user`,
        method: "GET",
        params: params,
      }),
      providesTags: ["Users"],
    }),
  }),
});

/* ---------- Hooks ---------- */
export const {
  useGetPokemonByNameQuery,
  useAdminLoginMutation,
  useGetAllUsersQuery,
} = baseApi;
