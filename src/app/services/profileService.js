import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { base_url } from "../firebase/database";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: base_url,
  }),
  tagTypes: ["Profiles", "Orders", "Favs"],
  endpoints: (builder) => ({
    postProfile: builder.mutation({
      query: ({ localId, profile }) => ({
        url: `profiles/${localId}.json`,
        method: "PUT",
        body: profile,
      }),
      invalidatesTags: ["Profiles"],
    }),
    postFav: builder.mutation({
      query: ({ localId, product }) => ({
        url: `favs/${localId}.json`,
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Favs"],
    }),
    getProfile: builder.query({
      query: (localId) => `profiles/${localId}.json`,
    }),
    getOrdersById: builder.query({
      query: (localId) => `orders/${localId}.json`,
      transformResponse: (response) => {
        if (response == null || undefined) {
          return false;
        }
        return true;
      },
    }),
    getFavsById: builder.query({
      query: (localId) => `favs/${localId}.json`,
      transformResponse: (response) => {
        if (response == null || undefined) {
          return false;
        }
        return true;
      },
    }),
    getAllOrders: builder.query({
      query: (localId) => `orders/${localId}.json`,
      transformResponse: (response) => {
        if(response == null || undefined) {
          return null;
        }
        const data = Object.entries(response).map((item) => {
          return {
            id: item[0],
            ...item[1],
          };
        });
        return data;
      },
      providesTags: ["Orders"],
    }),
    getAllFavs: builder.query({
      query: (localId) => `favs/${localId}.json`,
      transformResponse: (response) => {
        if (response == null || undefined) {
          return null;
        }
        const data = Object.entries(response).map((item) => {
          return {
            id: item[0],
            ...item[1],
          };
        });
        return data;
      },
      providesTags: ["Favs"],
    }),
    deleteFav: builder.mutation({
      query: (localId) => ({
        url: `favs/${localId}.json`,
        method: "DELETE",
      }),
      invalidatesTags: ["Favs"],
    }),
  }),
});

export const {
  usePostProfileMutation,
  usePostFavMutation,
  useGetProfileQuery,
  useGetOrdersByIdQuery,
  useGetFavsByIdQuery,
  useGetAllOrdersQuery,
  useGetAllFavsQuery,
  useDeleteFavMutation,
} = profileApi;
