

// NOTE: API CONFIG

export const WEB_DOMAIN = process.env.NEXT_PUBLIC_WEB_DOMAIN;
export const WEB_URL = WEB_DOMAIN + "/";
export const GUMLET_API_URL = process.env.NEXT_PUBLIC_GUMLET_API_URL;

export const STATIC_IMAGE_URL="https://photo.le-offers.com"

export const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
export const AUTH_URL_V1 = '/v1';
export const AUTH_URL_V2 = '/v2';

// Website SEO Linking
export const WEB_LINK = WEB_URL;

//api Credentials for guestToken
export const user = "le-offers";
export const pass = "admin@le-offers.com";

// HEAD TAG CONSTANTS - SEO
export const OG_TITLE = "Buy & Sell Construction Equipment";
export const OG_DESC = `Equipnow is a buyer focused marketplace for the construction industry.`;

// NOTE: This is FIREBASE SDK

export const FIRE_BASE_SDK_KEYS = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

export const GOOGLE_MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

// api routes that are inside next js within api folder of next js (api that are called within the project like to store cookie)
export const NEXT_URL = process.env.NEXT_PUBLIC_BASE_FRONTEND_URL || 'http://localhost:3000'

export const isUserAuthenticated: boolean = true;
