import { rootApi } from './rootApi';
import { AUTH_URL_V1, AUTH_URL_V2 } from '../../config/index';

import { ResponseGetAllBannersAndProductsPayload, ResponseGetAllHighlightedProductsPayload, ResponseGetRecentSearchDataPayload, ResponseSearchItemsPayload, ResponseSearchUsersPayload, } from '@/store/types';
import { ADD_RECENT_SEARCH_DATA_URL, ADD_RECENT_SEARCH_DATA_WITH_SINGLE_PRODUCT_SEARCH_URL, GET_ALL_BANNERS_AND_PRODUCTS_URL, GET_ALL_HIGHLIGHTED_PRODUCTS_URL, GET_RECENT_SEARCH_DATA_URL, LIKE_AND_DISLIKE_PRODUCT_URL, SEARCH_PRODUCTS_AND_USERS_URL, SUBSCRIBE_TO_NEWS_LETTER_URL } from '@/api/endpoints';

export const productsApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBannersAndProducts: builder.query<ResponseGetAllBannersAndProductsPayload, {page:number,latitude:string,longitude:string}>({
      query: ({page,latitude,longitude}) => ({
        url: `${AUTH_URL_V2}/${GET_ALL_BANNERS_AND_PRODUCTS_URL}/?page=${page}&lat=${latitude}&long=${longitude}`,
        method: "GET",
        // body:getGuestTokenConfig,
      }),
      // // Only have one cache entry because the arg always maps to one string
      // serializeQueryArgs: ({ endpointName }) => {
      //   return endpointName;
      // },
      // // Always merge incoming data to the cache entry
      // merge: (currentCache, newItems) => {
      //   if (newItems?.result) {
      //     currentCache.result.push(...newItems.result);
      //   }
      // },
      // // Refetch when the page arg changes
      // forceRefetch({ currentArg, previousArg }) {
      //   return currentArg !== previousArg;
      // }
    }),
    getAllHighlightedProducts: builder.query<ResponseGetAllHighlightedProductsPayload, void>({
      query: () => ({
        url: `${AUTH_URL_V2}/${GET_ALL_HIGHLIGHTED_PRODUCTS_URL}/?page=1&promoted=1&lat=21.1959&long=72.8302`,
        method: "GET",
        // body:getGuestTokenConfig,
      }),
    }),
    searchProductsAndUsers: builder.query<ResponseSearchItemsPayload | ResponseSearchUsersPayload, { serachQuery: string; IsUserOrItemFlag: string }>({
      query: ({ serachQuery, IsUserOrItemFlag }) => ({
        url: `${AUTH_URL_V1}/${SEARCH_PRODUCTS_AND_USERS_URL}/?searchItem=${serachQuery}${IsUserOrItemFlag}`,
        method: "GET",
        // body:getGuestTokenConfig,
        keepUnusedDataFor: 0
      }),
    }),
    getRecentSearchData: builder.query<ResponseGetRecentSearchDataPayload, void>({
      query: () => ({
        url: `${AUTH_URL_V1}/${GET_RECENT_SEARCH_DATA_URL}`,
        method: "GET",
      }),
    }),
    addRecentSearchData: builder.query<void, string>({
      query: (search) => ({
        url: `${AUTH_URL_V2}/${ADD_RECENT_SEARCH_DATA_URL}/?page=1&q=${search}&lat=21.1959&long=72.8302&cat_id=`,
        method: "GET",
      }),
    }),
    addRecentSearchDataWithSingleProduct: builder.query<void, { assetId: string, search: string }>({
      query: ({ assetId, search }) => ({
        url: `${AUTH_URL_V2}/${ADD_RECENT_SEARCH_DATA_WITH_SINGLE_PRODUCT_SEARCH_URL}/?assetId=${assetId}&q=${search}`,
        method: "GET",
      }),
    }),
    subscribeToNewsLetter: builder.mutation<{ message: string }, string>({
      query: (email) => ({
        url: `${AUTH_URL_V1}/${SUBSCRIBE_TO_NEWS_LETTER_URL}`,
        method: "POST",
        body: { email: email },
      }),
    }),
    likeAndDislikeProduct:builder.mutation<{ message: string },{assetid:string,like:boolean,userId:string}>({
      query:(data)=>({
        url:`${AUTH_URL_V1}/${LIKE_AND_DISLIKE_PRODUCT_URL}`,
        method: "POST",
        body: data,
      }),
    })
  }),
});
