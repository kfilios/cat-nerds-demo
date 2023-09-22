import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Breed, CatItem, CatListItem, FilteredByBreed } from "types";

export const baseURL = "https://api.thecatapi.com/v1";
export const API_KEY =
  "&api_key=live_egyViNm77jQEV4nO9lZ1LEeUFiYWpYTsJxl8V1l53VgbkrxjUUCGuJslFFo791it";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    getRandomCats: builder.query<Array<CatListItem>, void>({
      query: () => `images/search?order=RAND&limit=10${API_KEY}`,
    }),
    getCatById: builder.query<CatItem, string>({
      query: (itemId) => `images/${itemId}`,
    }),
    getCatBreeds: builder.query<Array<Breed>, void>({
      query: () => "breeds",
    }),
    getCatsByBreed: builder.query<Array<FilteredByBreed>, string>({
      query: (breedId) =>
        `images/search?order=RAND&limit=3&breed_ids=${breedId}${API_KEY}`,
    }),
  }),
});

export const {
  useGetRandomCatsQuery,
  useGetCatByIdQuery,
  useGetCatBreedsQuery,
  useGetCatsByBreedQuery,
} = api;
