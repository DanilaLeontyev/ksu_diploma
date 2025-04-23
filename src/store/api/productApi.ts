import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Order, OrderBackend, Product } from "../../types";

// Define a service using a base URL and expected endpoints
export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API ?? "http://94.26.239.216:44483/",
  }),
  endpoints: (build) => ({
    getAllProducts: build.query<Product[], undefined>({
      query: () => `products`,
      transformResponse: (response: { responseObject: Product[] }) =>
        response.responseObject.map((product: Product) => ({
          ...product,
          quantity: 0, // Initialize quantity to 0
        })),
    }),
    getOrder: build.query<Order[], { cartId: string }>({
      query: ({ cartId }) => `carts/${cartId}`,
      transformResponse: (response: { responseObject: OrderBackend[] }) => {
        const orders = response.responseObject.map((order: OrderBackend) => ({
          ...order,
          paid: order.paid === "true",
        }));
        return orders;
      },
    }),
    createOrder: build.mutation<
      { responseObject: string },
      { productIds: string[] }
    >({
      query: ({ productIds }) => ({
        url: `carts`,
        method: "POST",
        body: { productIds },
      }),
    }),
    payOrder: build.mutation<
      { responseObject: string },
      { productUIDs: string[]; cartId: string }
    >({
      query: ({ productUIDs, cartId }) => ({
        url: `carts/payorder`,
        method: "POST",
        body: { productUIDs, cartId },
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllProductsQuery,
  useCreateOrderMutation,
  useGetOrderQuery,
  usePayOrderMutation,
} = productApi;
