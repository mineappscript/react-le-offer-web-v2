import styles from '@/styles/Layout.module.css';
import React, { FC, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import CustomHeader from '../Ui/CustomHeader';
import PageHeader from '../Sections/PageHeader';
import { getLocationName, getUserLocation } from '@/helper/getLocation';
import Footer from '../Sections/FooterSection';
import { appClsx } from '@/lib/utils';
import authApi from '@/store/apiSlices/auth';
import { useActions } from '@/store/utils/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { ResponseGetAllCategoriesPayload, ResponseGetAllGrandParentCategoriesPayload, Token } from '@/store/types';
import { MyLocationFromIp } from '@/pages';
import Schema from '../htmlHeader';
import { SchemaItem } from '@/types';
import ProgressBar from '../Ui/ProgressBar';
import { SIGN_IN_PAGE, SIGN_UP_PAGE } from '@/routes';
import Header from '../Sections/Header';
// import { CategoriesDataFromServer, CategoriesDataWithChildCategoriesFromServer } from '@/helper/CategoriesDataFromServer';

// export type Content={
//     heroImage: {
//       data: any;
//     };
//     heading: string,
//     trendingSearchText: string
// }

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

const Layout: FC<Props> = ({
  children,
  tokenFromServer,
  categories,
  categoriesWithChildCategories,
  myLocationFromServer,
}) => {

  const { setGuestTokenDispatch, setMyCategoriesDispatch, setMyCategoriesWithChildrenDispatch } = useActions();
  const { token, myLocation, ipAddress } = useSelector((state: RootState) => state.auth);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  const [getGuestToken /*{isSuccess,isError,isLoading}*/] = authApi.useGetGuestTokenMutation();

  // #error 2 times data call

  const { locale } = useRouter();
  const router = useRouter();

  const { setMyLocationDispatch, setRemoveMyLocationDispatch, setMyIpAddressDispatch } = useActions();

  const handleGetLocationHelper = useCallback(async () => {
    try {
      const getLocation = await getUserLocation();
      if (getLocation) {
        try {
          const placeName = await getLocationName(getLocation.latitude, getLocation.longitude);
          // setLocationName(placeName)
          setMyLocationDispatch({
            address: String(placeName.address),
            latitude: String(getLocation.latitude),
            longitude: String(getLocation.latitude),
            city: String(placeName.city),
            country: String(placeName.country),
          });
        } catch (e) {
          console.error(e);
        }
      }
    } catch (error) {
      console.error('Error retrieving user location:', error);
    }
  }, [setMyLocationDispatch]);

  const handleRemoveLocationHelper = () => {
    setRemoveMyLocationDispatch();
  };

  //in order to exclude both header and footer
  const excludeDefaultHeader = ['auth', SIGN_IN_PAGE, SIGN_UP_PAGE, 'forgotpassword',"500",];
  const excludeDefaultPageHeaderWeb = ['auth', SIGN_IN_PAGE, SIGN_UP_PAGE, 'forgotpassword',"500","productList"];
  const excludeDefaultFooter = ['auth', SIGN_IN_PAGE, SIGN_UP_PAGE, 'forgotpassword',"500"];
  
  const excludeDefaultPageHeaderForPlpPage = ["productList"];

  //in order to use 2 type of header on mentioned pages
  const stickyHeaderWithSearchBox =
    router.pathname.includes('categories')
    || router.pathname.includes('product')
    || router.pathname.includes("productDetails")


  //if user is already login then throw on index page
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

  useEffect(() => {
    if (!myLocation && myLocationFromServer) {
      handleGetLocationHelper();

      setMyIpAddressDispatch(myLocationFromServer.ip);
      setMyLocationDispatch({
        address: String(
          myLocationFromServer.city + ' ' + myLocationFromServer.region + ' ' + myLocationFromServer.country_name
        ),
        latitude: String(myLocationFromServer.latitude),
        longitude: String(myLocationFromServer.longitude),
        city: String(myLocationFromServer.city),
        country: String(myLocationFromServer.country),
      });
    } else {
      if (ipAddress && myLocation) {
        setMyIpAddressDispatch(ipAddress);
        setMyLocationDispatch({
          address: String(
            myLocation.address
          ),
          latitude: String(myLocation.latitude),
          longitude: String(myLocation.longitude),
          city: String(myLocation.city),
          country: String(myLocation.country),
        });
      }

    }

    if (tokenFromServer && !token?.accessToken) {
      setGuestTokenDispatch(tokenFromServer);
    } else {

      if (!token?.accessToken) {
        (async () => {
          try {
            const { data } = await getGuestToken().unwrap();
            setGuestTokenDispatch(data.token);

          } catch (error) {
            console.error('Error fetching guest token:', error);
          }
        })();
      }
    }

    if (categories && categoriesWithChildCategories) {
      setMyCategoriesDispatch(categories)
      setMyCategoriesWithChildrenDispatch(categoriesWithChildCategories)

    }
  }, []);
  return (
    <div dir={locale === 'ar' ? 'rtl' : undefined}>
      <ProgressBar color="var(--brand-color)" />
      <CustomHeader />

      <Schema item={organizationSchema} />

      {!excludeDefaultHeader.some((substring) => router.pathname.includes(substring)) && (
        <Header
          categoriesWithChildCategories={categoriesWithChildCategories}
          categories={headerCategories}
          stickyHeaderWithSearchBox={stickyHeaderWithSearchBox}
        />
      )}

      <PageHeader
        // content={content}
        className={`
          ${excludeDefaultPageHeaderWeb.some((substring) => router.pathname.includes(substring)) && "hidden"}
          ${excludeDefaultPageHeaderForPlpPage.some((substring) => router.pathname.includes(substring)) && " border-error sm:hidden mobile:inline"}
          
          `}
        stickyHeaderWithSearchBox={stickyHeaderWithSearchBox}
        handleGetLocationHelper={handleGetLocationHelper}
        handleRemoveLocationHelper={handleRemoveLocationHelper}
      />

      {/* {
        <SearchBox content={content}
        windowScroll={windowScroll}
        windowWidth={windowWidth}
        handleGetLocationHelper={handleGetLocationHelper}/>
      } */}

      {/* {router.pathname === '/' && <Showcase />} */}

      <div className={styles.container}>
        <main
          className={appClsx(
            ` 
              ${stickyHeaderWithSearchBox && 'mobile:mt-[134px] mt-[138px]'}
              ${excludeDefaultPageHeaderWeb.some((substring) => router.pathname.includes(substring)) && "mt-0"}
             dark:bg-bg-primary-dark w-full h-full mx-auto overflow-hidden`
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

export default Layout;
