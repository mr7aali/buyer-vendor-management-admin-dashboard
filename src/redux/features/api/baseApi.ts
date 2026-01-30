import { IUsersListApiResponse } from "@/@types/get_all_user";
import { IVendorsListApiResponse } from "@/@types/get_all_vendors";
// import { IVendorsListApiResponse } from "@/@types/get_all_vendors"; // Add this type
import { AdminLoginRequest, AdminLoginResponse } from "@/@types/logintypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
  tagTypes: ["Users", "Vendors"], // Add Vendors tag
  endpoints: (builder) => ({
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
      IUsersListApiResponse,
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
      query: (params) => ({
        url: `/auth/user`,
        method: "GET",
        params: params,
      }),
      providesTags: ["Users"],
    }),

    /* ---------- GET ALL VENDORS QUERY ---------- */
    getAllVendors: builder.query<
      IVendorsListApiResponse,
      {
        page?: string;
        limit?: string;
        search?: string;
        vendorCode?: string;
        gender?: string;
        isActive?: string | undefined;
        businessName?: string;
        minRevenue?: string;
        maxRevenue?: string;
        minRating?: string;
        maxRating?: string;
        sortBy?:
          | "createdAt"
          | "fulllName"
          | "storename"
          | "revenue"
          | "rating"
          | "totalOrders";
        sortOrder?: "asc" | "desc";
      }
    >({
      query: (params) => ({
        url: `/auth/all-vendor`,
        method: "GET",
        params: params,
      }),
      providesTags: ["Vendors"],
    }),
  }),
});

/* ---------- Hooks ---------- */
export const {
  useAdminLoginMutation,
  useGetAllUsersQuery,
  useGetAllVendorsQuery, // Add this hook
} = baseApi;
