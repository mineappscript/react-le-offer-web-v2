import Head from 'next/head';
import React from 'react';

interface OGTagsProps {
  url?: string;
  ogImage?: string;
  title?: string;
  description?: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
}

const defaultTitle = 'Equipnow - The largest Marketplace For Old & New Construction Equipment';
const defaultOGTitle = 'Equipnow - The largest Marketplace For Old & New Construction Equipment';
const defaultDescription =
  ' Buy & Sell construction equipment from top dealers around the USA in 2024. You can find both old and new equipment sourced from the best dealers in the country.';
const defaultOGURL = 'https://webv2.le-offers.com/';
const defaultOGImage = 'https://leoffer-media.s3.ap-south-1.amazonaws.com/og_image_36021e5b9a.svg';

const CustomHeader: React.FC<OGTagsProps> = ({
  url,
  ogImage,
  title,
  description,
  image,
  imageWidth = 1200,
  imageHeight = 630,
}) => {
  return (
    <Head>
      <meta charSet="UTF-8" />
      <title>{title || defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta property="og:title" content={title || defaultOGTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image || defaultOGImage} />
      <meta property="og:image:width" content={String(imageWidth)} />
      <meta property="og:image:height" content={String(imageHeight)} />

      {/* twitter */}
      <meta name="twitter:site" content={url || defaultOGURL} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={ogImage || defaultOGImage} />

      {/* og image */}
      <meta property="og:image" content={ogImage || defaultOGImage} />
      <meta property="og:image:width" content="512" />
      <meta property="og:image:height" content="512" />
      <link rel="canonical" href={url || defaultOGURL} />

      <meta name="robots" content="noindex"></meta>
      <meta name="googlebot" content="noindex"></meta>

    </Head>
  );
};

export default CustomHeader;
