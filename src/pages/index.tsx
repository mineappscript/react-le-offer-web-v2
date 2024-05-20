import DownloadCard from '@/components/Sections/DownloadCard';
// import ImgSlider from '@/components/ImgSlider/ImgSlider';
// import WhatAreYouLookingFor from '@/components/WhatAreYouLookingFor/WhatAreYouLookingFor';
// import { IMAGES } from '@/lib/images';
import Layout from '@/components/Layout';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// import HighlightedProducts from '@/components/HighlightedProducts/HighlightedProducts';
// import RecommendedProduct from '@/components/RecommendedProduct/RecommendedProduct';
import TestimonialSection from '@/components/Sections/TestimonialSection';
// import { useTranslation } from 'next-i18next';
// import { AUTH_URL_V2, BASE_API_URL } from '@/config';
import { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// import { categoriesApi } from '@/store/apiSlices/categoriesApi';
// import { productsApi } from '@/store/apiSlices/productsApi';
// import { useTranslation } from 'next-i18next';
// import { useEffect } from 'react';
// import { useTranslation } from 'next-i18next';
// import debounce from 'lodash.debounce';
import Link from 'next/link';
import Image from 'next/image';

import { getGuesTokenFromServer } from '@/helper/GetGuestTokenFromServer';
// import {
//   CategoriesDataFromServer,
//   CategoriesDataWithChildCategoriesFromServer,
// } from '@/helper/CategoriesDataFromServer';
import { ProductsApiForBannerFromServer, ProductsApiForHighlightFromServer } from '@/helper/ProductsApiFromSever';
import {
  ResponseGetAllBannersAndProductsPayload,

  ResponseGetAllCategoriesPayload,

  ResponseGetAllGrandParentCategoriesPayload,

  ResponseGetAllHighlightedProductsPayload,
  Token,
  myLocationFieldWithIp,
} from '@/store/types';
import * as cookie from 'cookie';
import { getLocationData } from '@/helper/GetLocationFromServer';

// import useTheme from '@/hooks/theme';
import { SIGN_IN_PAGE } from '@/routes';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import RecommendedProduct from '@/components/Sections/RecommendedProduct';
import WhatAreYouLookingFor from '@/components/Sections/WhatAreYouLookingFor';
import { IMAGES } from '@/lib/images';
import { useTranslation } from 'next-i18next';
import FAQ from '@/components/Sections/FAQ';
import { CategoriesDataFromServer, CategoriesDataWithChildCategoriesFromServer } from '@/helper/CategoriesDataFromServer';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/store/utils/hooks';
import InfoSection from '@/components/Sections/InfoSection';
import ImgSlider from '@/components/Ui/ImgSlider';
import HighlightedProducts from '@/components/Sections/HighlightedProducts';
import SectionTitle from '@/components/Ui/SectionTitle';
import SectionDescription from '@/components/Ui/SectionDescription';

export type highlightSection = {
  title: string;
  productList: {
    userName: string;
    timeStamp: string;
    productName: string;
    productPrice: string;
    location: string;
  }[];
};

export interface MyLocationFromIp {
  ip: string;
  city: string;
  region: string;
  country: string;
  loc: string;
  org: string;
  postal: string;
  timezone: string;
  country_name: string;
  latitude: string;
  longitude: string;
}

interface HomeProps {
  tokenFromServer: Token;
  categories: ResponseGetAllGrandParentCategoriesPayload;
  categoriesWithChildCategories: ResponseGetAllCategoriesPayload;
  // highlightedProducts: ResponseGetAllHighlightedProductsPayload;
  // bannerProducts: ResponseGetAllBannersAndProductsPayload;
  myLocationFromServer: MyLocationFromIp;
}



interface RecommendedSection {
  title: string
}

interface SellAndBuySection {
  title: string,
  items: {
    image: string,
    title: string,
    description: string
  }[],

}

interface DealersSection {
  title: string,
  description: string,
  items: {
    image: string,
    description: string,
    btnText: string
  }[]
}


interface NewAndUsedBannerSection {
  title: string,
  description: string,
  items: {
    image: string,
    title: string
    description: string,
    btnText: string
  }[]
}
interface BrandLogoSection {
  title: string,
  description: string,
  items: {
    image: string
  }[]
}


const Home: NextPage<HomeProps> = function ({
  tokenFromServer,
  categories,
  categoriesWithChildCategories,
  // highlightedProducts,
  // bannerProducts,
  myLocationFromServer,
}) {


  const { t } = useTranslation('common');
  const recommendedSection: RecommendedSection = t('page.recommendedSection', { returnObjects: true });
  const sellAndBuySection: SellAndBuySection = t('page.sellAndBuySection', { returnObjects: true });
  const dealersSection: DealersSection = t('page.dealersSection', { returnObjects: true });
 
  const newAndUsedBannerSection: NewAndUsedBannerSection = t('page.newAndUsedBannerSection', { returnObjects: true });
  const brandLogoSection: BrandLogoSection = t('page.brandLogoSection', { returnObjects: true });

  const [highlightedProducts, setHighlightedProducts] = useState<ResponseGetAllHighlightedProductsPayload>()
  const [bannerProducts, setBannerProducts] = useState<ResponseGetAllBannersAndProductsPayload>()

  const { token, myLocation, ipAddress } = useSelector((state: RootState) => state.auth);

  const callingHighlightandBanneprodudtApi = async (tokens: Token, location: myLocationFieldWithIp) => {
    const highlightedProductsResponse = await ProductsApiForHighlightFromServer(tokens?.accessToken, location)
    const bannerProductsResponse = await ProductsApiForBannerFromServer(tokens?.accessToken, location) || [];

    setBannerProducts(bannerProductsResponse)
    setHighlightedProducts(highlightedProductsResponse)
  }

  useEffect(() => {

    if (token) {
      const locationForProductAndHighlightApi = myLocation ? { ip: ipAddress, ...myLocation } : {
        ip: myLocationFromServer.ip,
        address: myLocationFromServer.city + ' ' + myLocationFromServer.region + ' ' + myLocationFromServer.country_name,
        country: myLocationFromServer.country_name,
        latitude: myLocationFromServer.latitude,
        longitude: myLocationFromServer.longitude,
        city: myLocationFromServer.city,
      }

      const locationAndIpAddress = locationForProductAndHighlightApi
      callingHighlightandBanneprodudtApi(token, locationAndIpAddress)
    } else {

      const locationAndIpAddress = {
        ip: myLocationFromServer.ip,
        address: myLocationFromServer.city + ' ' + myLocationFromServer.region + ' ' + myLocationFromServer.country_name,
        country: myLocationFromServer.country_name,
        latitude: myLocationFromServer.latitude,
        longitude: myLocationFromServer.longitude,
        city: myLocationFromServer.city,
      }
      callingHighlightandBanneprodudtApi(tokenFromServer, locationAndIpAddress)
    }


  }, [])

  const router = useRouter();

  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const sellPage = () => {
    if (userInfo) {
      // write the code to route to sell pag
    } else {
      router.push(SIGN_IN_PAGE);
    }
  };

  useEffect(() => {
    // Disable the browser's back functionality by pushing a new entry to the history stack
    window.history.pushState(null, '', window.location.pathname);

    // Add event listener to prevent navigation via the browser's back button
    const handleBackButton = () => {
      window.history.pushState(null, '', window.location.pathname);
    };

    window.addEventListener('popstate', handleBackButton);

    // Cleanup function
    return () => {
      // Remove event listener when component is unmounted
      window.removeEventListener('popstate', handleBackButton);
    };
  }, []);

  return (
    <Layout
      tokenFromServer={tokenFromServer}
      categories={categories}
      categoriesWithChildCategories={categoriesWithChildCategories}
      myLocationFromServer={myLocationFromServer}
    >
      {/* <main className="dark:bg-bg-primary-dark w-full h-full mx-auto overflow-hidden"> */}

      {/* header with image and search box */}
      {/* Section:- What are you looking for? */}

      <div className=" relative custom-container mx-auto sm:px-16 mobile:px-4 ">
        {/* {isLoading
          ? 'Loading...'
          : isError
            ? 'error'
            : data?.data && ( */}
        <WhatAreYouLookingFor
          allCategoriesIcon={IMAGES.CATEGORY_GRID_ICON}
        // categories={categories}
        // categoriesWithChildCategories={categoriesWithChildCategories}
        />
        {/* )} */}

        <Link
          href={""}
          className="cursor-pointer hover:scale-102 shadow-sm bg-brand-color text-text-primary-light dark:text-text-secondary-light hidden mobile:flex items-center justify-center fixed w-[89px] h-[44px] bottom-3 right-4 rounded-full z-10"
          onClick={sellPage}
        >
          <span className="text-3xl">+</span>
          <span className="ml-1 text-base font-semibold mr-1 tracking-wide">Sell</span>
        </Link>

        {/* <Model/> */}
        {/* <Location/> */}
        {/* <LoginWithPhoneModel/> */}
        {/* <LoginWithEmailAndPasswordModel/> */}
        {/* <RegistrationModel/> */}
        {/* <RegistrationDetailsModel/> */}
        {/* <RegisterWithEmailAndPasswordModel/> */}

        {/* <OTPFormModel/> */}
        {/* <ChangePasswordFormModel/> */}
        {/* <EnterMobileNumberModel /> */}
        {/* <ForgotPasswordEnterEmailModel/> */}
        {/* <ForgotPasswordMainModel/> */}
        {/* <ForgotPasswordOtpFormModel/> */}
        {/* <ResetPasswordLinkSentModel/> */}

        {/*Highlight Product Sections*/}
        <div className=" mx-auto py-12 mobile:py-9">
          {highlightedProducts?.result?.length ? <SectionTitle className="!py-0 mb-8 mobile:mb-4">Highlighted Products</SectionTitle> : null}
          <HighlightedProducts data={highlightedProducts?.result || []} />
        </div>
        {/*Highlight Product Sections Ends*/}


        {/** Banner Section Starts */}
        {/* {IsLoadingBannersAndProducts
          ? 'Loading...'
          : IsErrorBannersAndProducts
            ? 'error'
            : bannersAndProducts?.banners &&  */}

        {bannerProducts?.banners?.length ? <ImgSlider data={bannerProducts?.banners} /> : null}
        {/* } */}
        {/** Banner Section Ends */}

        {/* Recommended Product Sections */}
        <div className="mx-auto py-12 mobile:py-0 mobile:pt-9">
          <div>
            <SectionTitle className='!py-0 mb-8 mobile:mb-4'>{recommendedSection.title}</SectionTitle>
          </div>

          {/* {IsLoadingBannersAndProducts ? (
            'Loading...'
          ) : IsErrorBannersAndProducts ? (
            'error'
          ) : bannersAndProducts?.result ? ( */}

          <RecommendedProduct products={bannerProducts?.result || []} />
          {/* ) : null} */}

        </div>
        {/*Recommended Product Sections Ends*/}

        {/* brand logo section start */}
        <div className="mobile:my-0 mobile:mt-9 my-12 rounded-[20px] flex flex-col items-center justify-center bg-bg-tertiary-light dark:bg-bg-nonary-dark py-12 px-16 mobile:py-9 mobile:px-2">
          <SectionTitle className=" mb-3 mobile:mb-2">
            {brandLogoSection.title}
          </SectionTitle>

          <SectionDescription className=" mb-8 mobile:mb-4">
            {brandLogoSection.description}
          </SectionDescription>

          <div className="flex items-center justify-center flex-wrap gap-4 mobile:gap-2">
            {brandLogoSection.items.map((data, index) => (
              <div
                key={index}
                className="hover:cursor-pointer flex justify-center items-center shadow rounded-xl h-[72px] w-[72px] sm:min-h-[174px] sm:min-w-[174px] p-12 mobile:p-4 bg-bg-terdenary-light"
              >
                <Image
                  width={100}
                  height={100}
                  className="w-full h-full object-contain"
                  src={data.image}
                  alt="eq.svg"
                />
              </div>
            ))}
          </div>
        </div>
        {/* brand logo section end */}

        {/* Explore New & Used Trucks for Sale section starts */}
        <div className="  sm:py-12 mobile:py-0 mobile:mt-9 flex flex-col items-center justify-center">
          <SectionTitle className=" mb-3 mobile:mb-2">
            {newAndUsedBannerSection.title}
          </SectionTitle>

          <SectionDescription className=" mb-8 mobile:mb-4">
            {newAndUsedBannerSection.description}
          </SectionDescription>

          <div className=" w-full flex sm:flex-col lg:flex-row mobile:flex-col items-center justify-between  rounded-xl">
            {newAndUsedBannerSection.items.map((_item, _id) => {
              return (
                <div
                  key={_id}
                  className="lg:ml-3 lg:mt-0 sm:mt-3 mobile:mt-3  lg:max-w-[648px] mobile:h-[343px] sm:w-full relative flex items-end"
                >
                  <div className="absolute z-[1] mb-6 ml-6 rtl:mr-6">
                    <div className="text-2xl font-semibold leading-9 text-text-secondary-light dark:text-text-primary-dark">
                      {_item.title}
                    </div>
                    <div className="text-sm font-normal leading-5 text-text-secondary-light dark:text-text-primary-dark mt-2 mb-4">
                      {_item.description}
                    </div>

                    <Link
                      href={'/'}
                      className="bg-brand-color rounded px-3 py-2 flex items-center justify-between w-[50%] mobile:w-[73%] mobile:h-[44px]"
                    >
                      <span className="text-sm font-bold leading-5 text-text-secondary-light dark:text-text-primary-dark">
                        {_item.btnText}
                      </span>
                      <Image className="" width={10} height={10} src={'/images/up_right_arrow_black.svg'} alt={''} />
                    </Link>
                  </div>

                  <div
                    className="rounded-xl"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0))',
                    }}
                  ></div>
                  <Image
                    width={750}
                    height={750}
                    className="object-cover w-full h-full rounded-xl"
                    src={_item.image}
                    alt="truck_image"
                  />
                </div>
              );
            })}
          </div>
        </div>
        {/* Explore New & Used Trucks for Sale section ends */}

        {/* Sell and buy every kinda thing on Equipnow start */}
        {/* <SellAndBuy /> */}
        <div className=" flex flex-col items-center justify-center sm:py-12 mobile:py-0 mobile:mt-9 mobile:mb-9">
        
          <SectionTitle className=" mb-3 mobile:mb-2">
            {sellAndBuySection.title}
          </SectionTitle>

       

          

          <div className="mt-8 w-full h-full flex mobile:flex-col gap-x-4 mobile:gap-y-5">
            {/* max-w-[50%] mobile:max-h-[343px] mobile:h-[343px]  this three classes are diffrent in first one and  max-w-[50%] second two are [25%] [25%]*/}

            {
              sellAndBuySection.items.map((item, key) => (
                <div key={key} className="relative rounded-xl max-w-[427px] mobile:max-w-full w-full max-h-[379px] flex flex-col  items-start mobile:items-center">
                  {/* max-w-[50%] mobile:max-h-[343px] mobile:h-[343px]  this three classes are diffrent in first one and  max-w-[50%] second two are [25%] [25%]*/}

                  <div className=" relative rounded-xl max-w-[427px] mobile:max-w-full w-full max-h-[379px] flex flex-col  items-center ">
                    <div className=" max-h-[224px] h-full mobile:h-[180px] w-full">
                      <Image
                        width={750}
                        height={750}
                        className="rounded-xl object-cover w-full h-full"
                        src={item.image}
                        alt="user_image"
                      />
                    </div>

                    <div className=" lg:mt-5 sm:mt-2 mobile:mt-4 sm:text-sm md:text-xl font-semibold text-center dark:text-text-primary-dark">
                      {item.title}
                    </div>

                    <div className="lg:mt-5 sm:mt-1 mobile:mt-4 sm:text-[10px] md:text-sm font-normal text-center dark:text-text-primary-dark">
                      {item.description}
                    </div>


                  </div>
                </div>

              ))
            }

          </div>
        </div>
        {/* Sell and buy every kinda thing on Equipnow end */}

        {/* Comments Sections Starts Here*/}
        <TestimonialSection />
        {/* Comments Sections Ends Here*/}

        {/* For Dealers & Virtual Retailing */}
        <div className=" flex flex-col items-center justify-center sm:py-12 mobile:py-0 mobile:mt-9 mobile:mb-9">
          <SectionTitle className=" mb-3 mobile:mb-2">
            {dealersSection.title}
          </SectionTitle>

          <SectionDescription className="max-w-[877px] text-center mb-8 mobile:mb-4">
            {dealersSection.description}
          </SectionDescription>

          <div className="w-full h-full flex mobile:flex-col gap-x-4 mobile:gap-y-5">
            {/* max-w-[50%] mobile:max-h-[343px] mobile:h-[343px]  this three classes are diffrent in first one and  max-w-[50%] second two are [25%] [25%]*/}
            {
              dealersSection.items.map((it, key) => (
                <div key={key} className="relative rounded-xl max-w-[427px] mobile:max-w-full w-full max-h-[379px] sm:max-h-fit flex flex-col  items-start justify-between mobile:items-center cursor-pointer">
                  <div className=" max-h-[224px] mobile:h-[180px] w-full">
                    <Image
                      width={750}
                      height={750}
                      className="rounded-xl object-cover w-full h-full"
                      src={it.image}
                      alt="user_image"
                    />
                  </div>

                  <div className="lg:mt-5 sm:mt-2 mobile:mt-4 sm:text-[10px] md:text-sm font-normal mobile:text-center dark:text-text-primary-dark">
                    {it.description}
                  </div>

                  <div className="text-text-secondary-light dark:text-text-primary-dark hover:cursor-pointer lg:mt-11 sm:mt-2 mobile:mt-5 sm:text-[10px] md:text-sm font-semibold sm:max-w-[80px] md:max-w-[100px] lg:max-w-[166px] w-full mobile:max-w-[166px] mobile:min-h-[48px] sm:min-h-[30px] md:min-h-[35px] lg:min-h-[48px] flex items-center justify-center rounded bg-brand-color">
                    {it.btnText}
                  </div>
                </div>

              ))
            }

          </div>
        </div>
        {/* For Dealers & Virtual Retailing */}

        {/* FAQ’s section starts */}
        <FAQ />
        {/* FAQ’s section ends */}
      </div>

      {/* App Download Starts Here*/}
      <div>
        <DownloadCard />
      </div>
      {/* App Download Starts Here*/}

      {/* start */}
      <div className=" relative custom-container mx-auto sm:px-16 mobile:px-4 ">
        <InfoSection />
      </div>

    </Layout>
  );
};

export default Home;

export async function getStaticProps({ req, locale }: { req: GetServerSidePropsContext['req']; locale: string }) {
  let guestToken, tokenFromServer, accessTokenFromServer;
  const cookies = req?.headers?.cookie;
  let parsedCookie;
  if (cookies) {
    parsedCookie = cookie.parse(cookies);
    if (!parsedCookie.accessToken) {
      guestToken = await getGuesTokenFromServer();
      tokenFromServer = guestToken.data.token;
      accessTokenFromServer = tokenFromServer.accessToken;
    } else {
      accessTokenFromServer = parsedCookie.accessToken.replace(/^"(.*)"$/, '$1');
    }
  } else {
    guestToken = await getGuesTokenFromServer();
    tokenFromServer = guestToken.data.token;
    accessTokenFromServer = tokenFromServer.accessToken;
  }

  const myLocationFromServer = await getLocationData(req);

  const categories = await CategoriesDataFromServer(accessTokenFromServer) || [];

  const categoriesWithChildCategories = await CategoriesDataWithChildCategoriesFromServer(accessTokenFromServer) || [];


  return {
    props: {
      // categories,
      // posts,
      ...(await serverSideTranslations(locale, ['common'])),
      tokenFromServer: tokenFromServer || null,
      myLocationFromServer,
      categories,
      categoriesWithChildCategories,
      // highlightedProducts,
      // bannerProducts,
    },
  };
}



   {/* Equipnow Guides & Tips section starts */}
         {/* const guidesAndTipsSection: GuidesAndTipsSection = t('page.guidesAndTipsSection', { returnObjects: true });
        import SellAndBuy from '@/components/Sections/SellAndBuy';
        interface GuidesAndTipsSection {
          title: string,
          description: string,
          items: {
            image: string,
            title: string
            description: string,
          }[]
        }
        <div className=" flex flex-col items-center justify-center sm:py-12 mobile:py-0 mobile:mt-9">

          <SectionTitle className=" mb-3 mobile:mb-2">
            {guidesAndTipsSection.title}
          </SectionTitle>

          <SectionDescription className="max-w-[877px] text-center mb-8 mobile:mb-4">
            {guidesAndTipsSection.description}
          </SectionDescription>

          <div className=" w-full flex mobile:flex-col gap-x-4 mobile:gap-y-3">
            {
              guidesAndTipsSection.items.map((item, key) => (
                <div key={key} className={`relative rounded-xl ${key === 0 ? "max-w-[50%] mobile:max-h-[343px] mobile:h-[343px] max-h-[224px]" : "max-w-[25%] max-h-[224px] mobile:max-h-[228px] mobile:h-[228px]"} w-full mobile:max-w-full flex items-end cursor-pointer`} onClick={() => router.push('blogs')}>
                  <div className=" absolute z-[1] lg:mb-4 sm:mb-2 ml-4 rtl:mr-4 w-[67%]">
                    <div className="max-w-[306px] lg:font-semibold lg:text-xl lg:leading-7 sm:text-xs mobile:text-2xl  text-text-secondary-light">
                      {item.title}
                    </div>
                    <div className="hover:cursor-pointer mt-1 xl:font-normal xl:text-xs lg:leading-4 sm:text-[6px] mobile:text-sm text-text-secondary-light">
                      {item.description}
                    </div>
                  </div>
                  <div
                    className="rounded-xl "
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0))',
                    }}
                  ></div>
                  <Image
                    width={750}
                    height={750}
                    className="rounded-xl object-cover w-full h-full"
                    src={item.image}
                    alt="user_image"
                  />
                </div>
              ))
            }
          </div>
        </div> */}
        {/* Equipnow Guides & Tips section ends */}