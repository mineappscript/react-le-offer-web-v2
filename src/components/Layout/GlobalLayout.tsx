import styles from '@/styles/Layout.module.css';
import React, { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import CustomHeader from '../Ui/CustomHeader';
import Header from '../Sections/Header';
import Footer from '../Sections/FooterSection';
import { appClsx } from '@/lib/utils';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { ResponseGetAllCategoriesPayload, ResponseGetAllGrandParentCategoriesPayload, Token } from '@/store/types';
import { MyLocationFromIp } from '@/pages';
import Schema from '../htmlHeader';
import { SchemaItem } from '@/types';
import { SIGN_IN_PAGE, SIGN_UP_PAGE } from '@/routes';
import PageHeader from '../Sections/PageHeader';

export type Props = {
  // content:Content,
  title?: string;
  keywords?: string;
  description?: string;
  tokenFromServer?: Token;
  categories?: ResponseGetAllGrandParentCategoriesPayload;
  categoriesWithChildCategories?: ResponseGetAllCategoriesPayload;
  myLocationFromServer?: MyLocationFromIp;
  children: React.ReactNode;
};

// Define the type for the schema object

const headerCategories = [
  {
    category: 'Computers',
    subCategory: ['mobile', 'headphone', 'tab', 'iphone'],
  },
  {
    category: 'Furniture & Home Living',
    subCategory: ['mobile', 'headphone', 'tab', 'iphone', 'headphone', 'tab', 'iphone'],
  },
  {
    category: 'Bikes',
    subCategory: ['mobile', 'headphone', 'tab', 'iphone'],
  },
  {
    category: 'Cars',
    subCategory: ['mobile', 'headphone', 'tab', 'iphone', 'headphone', 'tab', 'iphone'],
  },
  {
    category: 'Mobiles and Gadgets',
    subCategory: ['mobile', 'headphone', 'tab', 'iphone'],
  },
];

const GlobalLayout: FC<Props> = ({ children, categoriesWithChildCategories }) => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  const { locale } = useRouter();
  const router = useRouter();

  const excludeDefaultHeader = ['auth', SIGN_IN_PAGE, SIGN_UP_PAGE, 'forgotpassword', '500'];
  const excludeDefaultFooter = ['auth', SIGN_IN_PAGE, SIGN_UP_PAGE, 'forgotpassword', '500'];
  const excludeDefaultPageHeader = ['auth', SIGN_IN_PAGE, SIGN_UP_PAGE, 'forgotpassword', "500", 'blogs'];

  const stickyHeaderWithSearchBox = router.pathname.includes('categories') || router.pathname.includes('product') || router.pathname.includes('blogs');

  const mobileHeaderForPdp = router.pathname.includes('blogs');

  useEffect(() => {
    if (userInfo) {
      if (
        router.pathname.includes(SIGN_IN_PAGE) ||
        router.pathname.includes(SIGN_UP_PAGE) ||
        router.pathname.includes('forgotpassword')
      ) {
        router.push('/');
      }
    }
  }, []);

  const organizationSchema: SchemaItem = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Equipnow - The largest Marketplace For Old & New Construction Equipment',
    url: 'https://webv2.le-offers.com/',
    logo: 'https://leoffer-media.s3.ap-south-1.amazonaws.com/og_image_36021e5b9a.svg',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '',
      contactType: '',
    },
    sameAs: 'https://www.facebook.com/',
  };

  return (
    <div dir={locale === 'ar' ? 'rtl' : undefined}>
      <CustomHeader />
      <Schema item={organizationSchema} />
      {!excludeDefaultHeader.some((substring) => router.pathname.includes(substring)) && (
        <Header
          categoriesWithChildCategories={categoriesWithChildCategories}
          categories={headerCategories}
          stickyHeaderWithSearchBox={stickyHeaderWithSearchBox}
        />
      )}
      {!excludeDefaultPageHeader.some((substring) => router.pathname.includes(substring)) && (
        <PageHeader
          // content={content}
          stickyHeaderWithSearchBox={stickyHeaderWithSearchBox}
          handleGetLocationHelper={() => { }}
          handleRemoveLocationHelper={() => { }}
        />
      )}

      <div className={styles.container}>
        <main
          className={appClsx(
            `${mobileHeaderForPdp && 'mobile:mt-[68px] mt-[138px]'} ${stickyHeaderWithSearchBox && !mobileHeaderForPdp && 'mobile:mt-[134px] mt-[138px]'
            } dark:bg-bg-primary-dark w-full h-full mx-auto overflow-hidden`
          )}
        >
          {children}
        </main>
      </div>

      {!excludeDefaultFooter.some((substring) => router.pathname.includes(substring)) && (
        <footer>
          {''}
          <Footer />
          {''}
        </footer>
      )}
    </div>
  );
};

export default GlobalLayout;
