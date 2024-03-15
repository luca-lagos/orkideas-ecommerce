import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { base_url } from "../firebase/database";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: base_url,
  }),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    postOrder: builder.mutation({
      query: ({ localId, order }) => ({
        url: `orders/${localId}.json`,
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const { usePostOrderMutation } = cartApi;
