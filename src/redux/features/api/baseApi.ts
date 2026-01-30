import { IUsersListApiResponse } from "@/@types/get_all_user";
import { AdminLoginRequest, AdminLoginResponse } from "@/@types/logintypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/* ---------- Types ---------- */

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
      query: (params: {
        page?: string;
        limit?: string;
        userType?: "buyer" | "vendor" | "user";
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
export const { useAdminLoginMutation, useGetAllUsersQuery } = baseApi;
