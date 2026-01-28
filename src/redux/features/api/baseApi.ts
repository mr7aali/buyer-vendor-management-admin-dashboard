import { AdminLoginRequest, AdminLoginResponse } from "@/@types/logintypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/* ---------- Types (recommended) ---------- */

/* ---------- API ---------- */

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
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
  }),
});

/* ---------- Hooks ---------- */
export const { useGetPokemonByNameQuery, useAdminLoginMutation } = baseApi;
