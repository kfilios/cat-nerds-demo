import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Breed,
  CatItem,
  CatListItem,
  FilteredByBreed,
  FilteredByFavourites,
} from "types";

const baseURL = "https://api.thecatapi.com/v1";
const API_KEY =
  "live_egyViNm77jQEV4nO9lZ1LEeUFiYWpYTsJxl8V1l53VgbkrxjUUCGuJslFFo791it";
const headers = {
  "content-type": "application/json",
  "x-api-key": API_KEY,
};

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    getRandomCats: builder.query<Array<CatListItem>, { page: number }>({
      query: ({ page }) =>
        `images/search?order=RAND&limit=10&page${page ?? 0}&api_key=${API_KEY}`,
    }),
    getCatById: builder.query<CatItem, string>({
      query: (itemId) => `images/${itemId}`,
    }),
    getCatBreeds: builder.query<Array<Breed>, void>({
      query: () => "breeds",
    }),
    getCatsByBreed: builder.query<Array<FilteredByBreed>, string>({
      query: (breedId) =>
        `images/search?order=RAND&limit=3&breed_ids=${breedId}&api_key=${API_KEY}`,
    }),
    // TODO: We could add pagination here as it is in home page, but currently the API do not provide
    //       favourite information if we load one image. So I am loading all favourites here.
    getCatsByFavourite: builder.query<Array<FilteredByFavourites>, number>({
      query: (page) => `favourites?page=${page}&limit=100&api_key=${API_KEY}`,
    }),
    favouriteCat: builder.mutation<Partial<CatItem>, string>({
      query: (itemId) => ({
        url: "favourites",
        headers,
        method: "POST",
        body: {
          image_id: itemId,
          sub_id: "this_is_my_user_id",
        },
      }),
    }),
    unfavouriteCat: builder.mutation<void, string>({
      query: (itemId) => ({
        url: `favourites/${itemId}?sub_id=this_is_my_user_id`,
        headers,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetRandomCatsQuery,
  useGetCatByIdQuery,
  useGetCatBreedsQuery,
  useGetCatsByBreedQuery,
  useGetCatsByFavouriteQuery,
  useFavouriteCatMutation,
  useUnfavouriteCatMutation,
} = api;
