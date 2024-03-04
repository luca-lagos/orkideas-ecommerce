import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shopApi = createApi({
  reducerPath: "shopApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://orkideas-ecommerce-default-rtdb.firebaseio.com",
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "/products.json",
    }),
    getAllPromotions: builder.query({
      query: () => "/promotions.json",
    }),
    getProductsByCategory: builder.query({
      query: (category) =>
        `/products.json?orderBy="category"&equalTo="${category}`,
      transformResponse: (response) => {
        const data = Object.values(response);
        return data;
      },
    }),
    getAllCategories: builder.query({
      query: () => "/categories.json",
    }),
    getProductById: builder.query({
      query: (id) => `/products/${id}.json`,
    }),
    getProductsByRating: builder.query({
      query: () => `/products.json?orderBy="rating,desc"&limitToFirst="10"`,
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetAllPromotionsQuery,
  useGetAllCategoriesQuery,
  useGetProductsByCategoryQuery,
  useGetProductByIdQuery,
  useGetProductsByRatingQuery,
} = shopApi;
