import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CatItem, CatListItem } from "types";

const baseURL = "https://api.thecatapi.com/v1/images";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    getRandomCats: builder.query<Array<CatListItem>, void>({
      query: () =>
        "search?order=RAND&limit=10&api_key=live_egyViNm77jQEV4nO9lZ1LEeUFiYWpYTsJxl8V1l53VgbkrxjUUCGuJslFFo791it&order=RAND",
    }),
    getCatById: builder.query<CatItem, string>({
      query: (itemId) => `${itemId}`,
    }),
  }),
});

export const { useGetRandomCatsQuery, useGetCatByIdQuery } = api;
