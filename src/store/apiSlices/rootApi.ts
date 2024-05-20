import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { BASE_API_URL } from '../../config/index';
// import { RootState } from '../store';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN } from '@/constants/cookies';

// Define the base query with its proper type from RTK Query
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_API_URL,
  prepareHeaders: (headers ) => {
    // const token = (getState() as RootState).auth.token;
    const authToken = Cookies.get(ACCESS_TOKEN);
    const storedLocation = localStorage.getItem("myLocation");
    // Check if storedLocation is not null before parsing
    const geoLocation = storedLocation !== null ? JSON.parse(storedLocation) : null;
    const myIpAddress:string | null = localStorage.getItem("ipAddress");
    // Check if myIpAddress is not null before using it
    const ipAddressHeader = myIpAddress !== null ? myIpAddress : "";
    
    if (authToken) {
      headers.set("authorization", authToken.replace(/"/g, ''));
      headers.set("Content-Type", "application/json");
      headers.set("lan", "en");
      headers.set("platform", "3");
      headers.set("City", geoLocation ? geoLocation.city : "Bengaluru" );
      headers.set("Country", geoLocation ? geoLocation.country : "India");
      headers.set("Ipaddress", ipAddressHeader? ipAddressHeader : "43.247.156.26");
      headers.set("Latitude", geoLocation ? geoLocation.latitude : "12.9716");
      headers.set("Longitude", geoLocation ? geoLocation.longitude : "77.5946");
    }
    return headers;
  },
});

export const rootApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery,
  //   baseQuery: baseQueryWithAuth,
  tagTypes: ['Product', 'Order', 'User'],
  //   endpoints: (builder) => ({}),
  endpoints: () => ({}),
});
