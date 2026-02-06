import {
  AdminMeResponse,
  ChangeAdminPasswordRequest,
  ChangeAdminPasswordResponse,
  UpdateAdminProfileRequest,
  UpdateAdminProfileResponse,
} from "@/@types/admin_profile_data";
import {
  CreateAdminEmployeeRequest,
  CreateAdminEmployeeResponse,
  GetAdminEmployeesResponse,
  UpdateAdminEmployeePermissionsRequest,
  UpdateAdminEmployeePermissionsResponse,
} from "@/@types/admin_employee";
import { IUsersListApiResponse } from "@/@types/get_all_user";
import { IVendorsListApiResponse } from "@/@types/get_all_vendors";
import { AdminUserDetailsResponse } from "@/@types/get_single_buyer";
import { OrderResponse } from "@/@types/get_single_orders";
import { AdminLoginRequest, AdminLoginResponse } from "@/@types/logintypes";
import { OrderListResponse } from "@/@types/oder";
import {
  PendingBuyersResponse,
  PendingVendorsResponse,
} from "@/@types/verification";
import {
  ISingleVendorResponse,
  UpdateVendorRequest,
  UpdateVendorResponse,
} from "@/@types/vendor_details_response_type";
import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

// ========== ANALYTICS TYPES ==========
export interface RevenueDataPoint {
  name: string;
  revenue: number;
  profit: number;
}

export interface UserGrowthDataPoint {
  name: string;
  buyers: number;
  vendors: number;
}

export interface OrderGrowthDataPoint {
  name: string;
  orders: number;
}

export interface CategoryData {
  name: string;
  value: number;
  color: string;
  growth: string;
  description: string;
}

export interface RevenueChartData {
  data: RevenueDataPoint[];
  totalRevenue: number;
  totalRevenueChange: number;
}

export interface UserGrowthChartData {
  data: UserGrowthDataPoint[];
  totalUsers: number;
  totalUsersChange: number;
}

export interface OrderGrowthChartData {
  data: OrderGrowthDataPoint[];
}

export interface SalesDistributionData {
  data: CategoryData[];
}

export interface AnalyticsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    revenue: RevenueChartData;
    users: UserGrowthChartData;
    orders: OrderGrowthChartData;
    categories: SalesDistributionData;
  };
}

export type TimeRange = "daily" | "weekly" | "monthly" | "yearly";

export interface AnalyticsQueryParams {
  timeRange?: TimeRange;
  vendorId?: string;
}
// ========================================

const rawBaseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000",
  prepareHeaders: (headers) => {
    const token = localStorage?.getItem("accessToken");

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithAuthRedirect: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    localStorage?.removeItem("accessToken");

    if (window.location.pathname !== "/login") {
      window.location.assign("/login");
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithAuthRedirect,
  tagTypes: [
    "Users",
    "Vendors",
    "Orders",
    "Admin",
    "AdminEmployees",
    "PendingVendors",
    "PendingBuyers",
    "Analytics", // Added Analytics tag
  ],
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

    getSingleVendorsById: builder.query<ISingleVendorResponse, { id: string }>({
      query: (params: { id: string }) => ({
        url: `/auth/vendor/${params.id}`,
        method: "GET",
      }),
      providesTags: ["Vendors"],
    }),

    /* ---------- UPDATE VENDOR MUTATION ---------- */
    updateVendor: builder.mutation<UpdateVendorResponse, UpdateVendorRequest>({
      query: ({ id, data }: UpdateVendorRequest) => ({
        url: `/auth/vendor/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Vendors", id },
        "Vendors",
      ],
    }),

    /* ---------- ORDER QUERIES ---------- */
    getAllOrders: builder.query<
      OrderListResponse,
      { page?: number; limit?: number; search?: string; status?: string }
    >({
      query: (params) => ({
        url: "/orders/get-all",
        method: "GET",
        params,
      }),
      providesTags: ["Orders"],
    }),

    getAdminOrderDetails: builder.query<OrderResponse, string>({
      query: (id) => `/orders/admin-order-details/${id}`,
      providesTags: ["Orders"],
    }),

    getAdminUserDetails: builder.query<AdminUserDetailsResponse, string>({
      query: (id) => `/auth/admin/users/${id}`,
      providesTags: ["Users"],
    }),

    /* ---------- ADMIN PROFILE QUERIES ---------- */
    getAdminMe: builder.query<AdminMeResponse, void>({
      query: () => "/auth/admin/me",
      providesTags: ["Admin"],
    }),

    updateAdminProfile: builder.mutation<
      UpdateAdminProfileResponse,
      UpdateAdminProfileRequest
    >({
      query: (body) => {
        const hasAvatar = Boolean(body.avatar);

        if (hasAvatar) {
          const formData = new FormData();
          formData.append("fullName", body.fullName);
          formData.append("email", body.email);
          if (body.bio !== undefined) {
            formData.append("bio", body.bio ?? "");
          }
          formData.append("avatar", body.avatar as File);

          return {
            url: "/auth/admin-profile-update",
            method: "PATCH",
            body: formData,
          };
        }

        return {
          url: "/auth/admin-profile-update",
          method: "PATCH",
          body: {
            fullName: body.fullName,
            email: body.email,
            bio: body.bio ?? "",
          },
        };
      },
      invalidatesTags: ["Admin"],
    }),

    changeAdminPassword: builder.mutation<
      ChangeAdminPasswordResponse,
      ChangeAdminPasswordRequest
    >({
      query: (body) => ({
        url: "/auth/change-admin-password",
        method: "PATCH",
        body,
      }),
    }),

    /* ---------- ADMIN EMPLOYEE QUERIES ---------- */
    createAdminEmployee: builder.mutation<
      CreateAdminEmployeeResponse,
      CreateAdminEmployeeRequest
    >({
      query: (body) => ({
        url: "/auth/admin/employee",
        method: "POST",
        body,
      }),
      invalidatesTags: ["AdminEmployees"],
    }),

    getAdminEmployees: builder.query<GetAdminEmployeesResponse, void>({
      query: () => ({
        url: "/auth/admin/employees",
        method: "GET",
      }),
      providesTags: ["AdminEmployees"],
    }),

    updateAdminEmployeePermissions: builder.mutation<
      UpdateAdminEmployeePermissionsResponse,
      UpdateAdminEmployeePermissionsRequest
    >({
      query: ({ id, permissions }) => ({
        url: `/auth/admin/employee/${id}/permissions`,
        method: "PATCH",
        body: { permissions },
      }),
      invalidatesTags: ["AdminEmployees"],
    }),

    deleteAdminEmployee: builder.mutation<
      { success?: boolean; message?: string },
      string | number
    >({
      query: (id) => ({
        url: `/auth/admin/employee/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AdminEmployees"],
    }),

    /* ---------- VERIFICATION QUERIES ---------- */
    getPendingBuyers: builder.query<PendingBuyersResponse, void>({
      query: () => ({
        url: "/auth/admin/pending-buyers",
        method: "GET",
      }),
      providesTags: ["PendingBuyers"],
    }),

    getPendingVendors: builder.query<PendingVendorsResponse, void>({
      query: () => ({
        url: "/auth/admin/pending-vendors",
        method: "GET",
      }),
      providesTags: ["PendingVendors"],
    }),

    verifyVendorDocuments: builder.mutation<
      { success?: boolean; message?: string },
      {
        id: string | number;
        isNidVerify: boolean;
        isBussinessIdVerified: boolean;
      }
    >({
      query: ({ id, isNidVerify, isBussinessIdVerified }) => ({
        url: `/auth/vendor/${id}`,
        method: "PATCH",
        body: { isNidVerify, isBussinessIdVerified },
      }),
      invalidatesTags: ["Vendors", "PendingVendors"],
    }),

    verifyBuyerDocuments: builder.mutation<
      { success?: boolean; message?: string },
      { id: string | number; isNidVerify: boolean }
    >({
      query: ({ id, isNidVerify }) => ({
        url: `/auth/buyer/${id}`,
        method: "PATCH",
        body: { isNidVerify },
      }),
      invalidatesTags: ["Users", "PendingBuyers"],
    }),

    /* ---------- ANALYTICS QUERY ---------- */
    getAnalytics: builder.query<AnalyticsResponse, AnalyticsQueryParams>({
      query: (params) => ({
        url: "/analytics",
        method: "GET",
        params: {
          timeRange: params.timeRange || "monthly",
          ...(params.vendorId && { vendorId: params.vendorId }),
        },
      }),
      providesTags: ["Analytics"],
      // Keep data fresh for 5 minutes
      keepUnusedDataFor: 300,
    }),
  }),
});

/* ---------- Hooks ---------- */
export const {
  useAdminLoginMutation,
  useGetAllUsersQuery,
  useGetAllVendorsQuery,
  useGetSingleVendorsByIdQuery,
  useUpdateVendorMutation,
  useGetAllOrdersQuery,
  useGetAdminOrderDetailsQuery,
  useGetAdminUserDetailsQuery,
  useGetAdminMeQuery,
  useUpdateAdminProfileMutation,
  useChangeAdminPasswordMutation,
  useCreateAdminEmployeeMutation,
  useGetAdminEmployeesQuery,
  useUpdateAdminEmployeePermissionsMutation,
  useDeleteAdminEmployeeMutation,
  useGetPendingBuyersQuery,
  useGetPendingVendorsQuery,
  useVerifyVendorDocumentsMutation,
  useVerifyBuyerDocumentsMutation,
  useGetAnalyticsQuery, // New analytics hook
} = baseApi;
