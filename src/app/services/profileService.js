/*,*/

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { base_url } from "../firebase/database";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: base_url,
  }),
  tagTypes: ["Orders", "Favs"],
  endpoints: (builder) => ({
    postProfile: builder.mutation({
      query: ({ profile }) => ({
        url: `profile.json`,
        method: "POST",
        body: profile,
      }),
    }),
    getProfile: builder.query({
      query: (localId) => `profile/${localId}.json`,
    }),
    /*putImage: builder.mutation({
      query: ({ localId, image }) => ({
        url: `profile/${localId}.json`,
        method: "PUT",
        body: image,
      }),
    }),
    getImage: builder.query({
      query: (localId) => `profile/${localId}.json`,
    }),
    putUserLocation: builder.mutation({
      query: ({ localId, locationFormatted }) => ({
        url: `profile/${localId}.json`,
        method: "PUT",
        body: locationFormatted,
      }),
    }),
    getUserLocation: builder.query({
      query: (localId) => `userLocation/${localId}.json`,
    }),*/
    getAllOrders: builder.query({
      query: (localId) => `orders/${localId}.json`,
      transformResponse: (response) => {
        const data = Object.entries(response).map((item) => {
          return {
            id: item.id,
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
        const data = Object.entries(response).map((item) => {
          return {
            id: item.id,
            ...item[1],
          };
        });
        return data;
      },
      providesTags: ["Favs"],
    }),
    deleteFav: builder.mutation({
      query: ({ localId, productId }) => ({
        url: `favs/${localId}.json/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Favs"],
    }),
  }),
});

export const {
  /*usePutImageMutation,
  useGetImageQuery,
  usePutUserLocationMutation,
  useGetUserLocationQuery,*/
  usePostProfileMutation,
  useGetProfileQuery,
  useGetAllOrdersQuery,
  useGetAllFavsQuery,
  useDeleteFavMutation,
} = profileApi;
