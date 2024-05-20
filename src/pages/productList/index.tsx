import AboutUs from '@/components/AboutUs';
import Accordion from '@/components/Sections/AccordionCard';
import BrandSlider from '@/components/Ui/BrandSlider';
import BrowseFrontLoader from '@/components/BrowseFrontLoader';
import CategorySlider from '@/components/Ui/CategorySlider';
import Layout from '@/components/Layout'
import PageHeader from '@/components/Sections/PageHeader';
import ProductCard from '@/components/Ui/ProductCard';
import SectionTitle from '@/components/Ui/SectionTitle';
import { getLocationName, getUserLocation } from '@/helper/getLocation';
import { productsApi } from '@/store/apiSlices/productsApi';
import { RootState } from '@/store/store';
import { useActions, useAppSelector } from '@/store/utils/hooks';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { useCallback } from 'react'

export type aboutUs = {
    title: string;
    desc: string[];
}[];

export type accordion = {
    title: string;
    items: {
        title: string;
        desc: string;
    }[];
};

type BrowseFrontLoaderByState = {
    title: string,
    items: string[]
}

type BrowseFrontLoaderByCities = {
    title: string,
    items: string[]
}

function ProductDetails() {

    const { t } = useTranslation('productList');

    const aboutUs: aboutUs = t('page.aboutUs', { returnObjects: true });
    const accordion: accordion = t('page.accordion', { returnObjects: true });
    const browseFrontLoaderByState: BrowseFrontLoaderByState = t('page.browseFrontLoaderByState', { returnObjects: true });
    const browseFrontLoaderByCities: BrowseFrontLoaderByCities = t('page.browseFrontLoaderByCities', { returnObjects: true });

    const { myLocation } = useAppSelector((state: RootState) => state.auth)
    const { data: hilightedProducts, isError, error, isFetching } = productsApi.useGetAllHighlightedProductsQuery()
    const { data: recommendedProducts, isError: isErrorRecommendedProducts, error: errorRecommendedProducts, isFetching: isFetchingRecommendedProducts } = productsApi.useGetAllBannersAndProductsQuery({ page: 1, latitude: myLocation.latitude, longitude: myLocation.longitude })

    const { setMyLocationDispatch, setRemoveMyLocationDispatch } = useActions();

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

    return (
        <Layout>
            <div className=" relative custom-container mx-auto sm:px-16 mobile:px-4">
                <div className='mt-5'>
                    <PageHeader
                        className=' rounded-2xl mobile:hidden'
                        imageClassName='rounded-2xl'
                        // content={content}
                        stickyHeaderWithSearchBox={false}
                        handleGetLocationHelper={handleGetLocationHelper}
                        handleRemoveLocationHelper={handleRemoveLocationHelper}
                    />
                </div>

                <div className='py-12 mobile:py-0 '>
                    <CategorySlider />
                </div>

                <div className='mobile:mt-9 py-12 mobile:py-0  border-error'>
                    <BrandSlider />
                </div>

                <div className='mobile:mt-9 py-12 mobile:py-0  border-error'>
                    <SectionTitle className='!p-0 mb-5'>Featured Front Loader for Sale</SectionTitle>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-x-5 gap-y-7">
                        {
                            isFetching
                                ? "Loading..."
                                : isError
                                    ? `Error : ${error}`
                                    : !hilightedProducts?.result.length
                                        ? "No Products"
                                        : hilightedProducts?.result.map((item, key) => (
                                            <div key={key}>
                                                <ProductCard product={item} />
                                            </div>
                                        ))
                        }
                    </div>
                </div>


                <div className='mobile:mt-9 py-12 mobile:py-0   border-error'>
                    <SectionTitle className='!p-0 mb-5'>Search The Best Front Loader  Deals</SectionTitle>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-x-5 gap-y-7">
                        {
                            isFetchingRecommendedProducts
                                ? "Loading..."
                                : isErrorRecommendedProducts
                                    ? `Error : ${errorRecommendedProducts}`
                                    : !recommendedProducts?.result.length
                                        ? "No Products"
                                        : recommendedProducts?.result.map((item, key) => (
                                            <div key={key}>
                                                <ProductCard product={item} />
                                            </div>
                                        ))
                        }
                    </div>
                </div>


            </div>

            <div className="border-b border-border-tertiary-light dark:border-border-tertiary-dark mt-12 mobile:mt-9"></div>

            <div className="relative custom-container mx-auto sm:px-16 mobile:px-4">
                <div className="mobile:mt-9 py-12 mobile:py-0   border-error">
                    {/* start */}
                    <div className=" flex flex-col items-center justify-center ">
                        <div className="  mobile:mb-[42px] flex flex-col w-full border-error">
                            <AboutUs data={aboutUs} />
                            <Accordion data={accordion} />
                        </div>
                    </div>
                </div>


                <BrowseFrontLoader data={browseFrontLoaderByState} />

                <BrowseFrontLoader data={browseFrontLoaderByCities} />

            </div>
        </Layout>
    )
}

export default ProductDetails

export async function getServerSideProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "productList"]))
        }
    }
}