// @ts-check
import pkg from './next-i18next.config.js'
const { i18n } = pkg;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "leoffer-media.s3.ap-south-1.amazonaws.com",
      "photo.le-offers.com",
      "photo.le-offers.comhttps",
      "photo.le-offers.comlisting",
      "upload.wikimedia.org",
      "media.istockphoto.com",
      "images.unsplash.com",
      "cdn.britannica.com",
      "media.istockphoto.com",
      "assets.le-offers.com"
    ]
  },
  i18n,
};

export default nextConfig;
