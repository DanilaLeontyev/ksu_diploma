import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "../../types";

// Define a service using a base URL and expected endpoints
export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/" }),
  endpoints: (build) => ({
    getAllProducts: build.query<Product[], undefined>({
      query: () => `products`,
      transformResponse: (response: { responseObject: Product[] }) =>
        response.responseObject.map((product: Product) => ({
          ...product,
          quantity: 0, // Initialize quantity to 0
        })),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllProductsQuery } = productApi;
