import { rootApi } from './rootApi';
import { AUTH_URL_V1, AUTH_URL_V2} from '../../config/index';
import {  ResponseGetAllGrandParentCategoriesPayload,ResponseGetAllCategoriesPayload } from '@/store/types/categoriesTypes';
import { GET_ALL_CATEGORIES_URL, GET_ALL_GRAND_PARENT_CATEGORIES_URL } from '@/api/endpoints';

export const categoriesApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllGrandParentCategories: builder.query<ResponseGetAllGrandParentCategoriesPayload,void>({
      query: () => ({
        url:`${AUTH_URL_V2}/${GET_ALL_GRAND_PARENT_CATEGORIES_URL}/?&limit=100&set=0&status=1`,
        method:"GET",
        // body:getGuestTokenConfig,
      }),
    }),
    getAllCategories: builder.query<ResponseGetAllCategoriesPayload,void>({
      query: () => ({
        url:`${AUTH_URL_V1}/${GET_ALL_CATEGORIES_URL}`,
        method:"GET",
        // body:getGuestTokenConfig,
      }),
    }),
  }),
});
