import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { base_url } from "../firebase/database";

export const shopApi = createApi({
  reducerPath: "shopApi",
  baseQuery: fetchBaseQuery({
    baseUrl: base_url,
  }),
  tagTypes: ["Favs"],
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "products.json",
    }),
    getAllPromotions: builder.query({
      query: () => "promotions.json",
    }),
    getProductsByCategory: builder.query({
      query: (category) =>
        `products.json?orderBy="category"&equalTo="${category}"`,
      transformResponse: (response) => {
        const data = Object.values(response);
        return data;
      },
    }),
    getAllCategories: builder.query({
      query: () => "categories.json",
    }),
    getProductById: builder.query({
      query: (id) => `products/${id}.json`,
    }),
    addFav: builder.mutation({
      query: ({ localId, product }) => ({
        url: `favs/${localId}.json`,
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Favs"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetAllPromotionsQuery,
  useGetAllCategoriesQuery,
  useGetProductsByCategoryQuery,
  useGetProductByIdQuery,
  useAddFavMutation,
} = shopApi;
