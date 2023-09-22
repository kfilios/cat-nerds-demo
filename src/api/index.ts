import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Item {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds: [];
  favourite: {};
}

// Define your API base URL
const baseURL = "https://api.thecatapi.com/v1/images";

// Define your RTK Query API slice
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    getItems: builder.query<Array<Item>, void>({
      query: () =>
        "search?order=RAND&limit=10&api_key=live_egyViNm77jQEV4nO9lZ1LEeUFiYWpYTsJxl8V1l53VgbkrxjUUCGuJslFFo791it&order=RAND",
    }),
    getItemById: builder.query<Item, string>({
      query: (itemId) => `${itemId}`,
    }),

    // Define an endpoint for creating a new item (e.g., a new todo)
    // createItem: builder.mutation<Item, Partial<Item>>({
    // 	query: newItem => ({
    // 		url: "items",
    // 		method: "POST",
    // 		body: newItem
    // 	})
    // }),

    // Define an endpoint for updating an item (e.g., updating a todo)
    // updateItem: builder.mutation<Item, Partial<Item>>({
    // 	query: update => ({
    // 		url: `items/${update.id}`, // Customize the API endpoint URL as needed
    // 		method: "PUT",
    // 		body: update
    // 	})
    // }),

    // Define an endpoint for deleting an item (e.g., deleting a todo)
    // deleteItem: builder.mutation<void, number>({
    // 	query: id => ({
    // 		url: `items/${id}`, // Customize the API endpoint URL as needed
    // 		method: "DELETE"
    // 	})
    // })
  }),
});

// Export the generated hooks for using the API endpoints
export const {
  useGetItemsQuery,
  useGetItemByIdQuery /* useCreateItemMutation, useUpdateItemMutation, useDeleteItemMutation */,
} = api;
