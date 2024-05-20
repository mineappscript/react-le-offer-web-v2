import AboutUs from '@/components/AboutUs';
import Accordion from '@/components/Sections/AccordionCard';
import Breadcrumb from '@/components/Ui/Breadcrumb';
import ButtonWithIcon from '@/components/FilterSection/ButtonWithIcon';
import { CategoryButton } from '@/components/FilterSection/CategoryButton';
import CheckBoxButtonDropdown from '@/components/FilterSection/CheckBoxButtonDropdown';
import NumberInputDropdown from '@/components/FilterSection/NumberInputDropdown';
import RadioButtonDropdown from '@/components/FilterSection/RadioButtonDropdown';
import Layout from '@/components/Layout';
import ProductCard from '@/components/Ui/ProductCard';
// import ProductCard from '@/components/ProductCard/ProductCard';
import ToggleSwitch from '@/components/Ui/ToggleSwitch';
import useTheme from '@/hooks/theme';
import { gumletLoader } from '@/lib/gumlet';
import { IMAGES } from '@/lib/images';
import { SIGN_IN_PAGE } from '@/routes';
import { productsApi } from '@/store/apiSlices/productsApi';
import { useTranslation } from 'next-i18next';
// import Header from '@/components/header';
// import SearchBox from '@/components/SearchBox/SearchBox';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import SectionTitle from '@/components/Ui/SectionTitle';

export type filteredProducts = {
  userName: string;
  timeStamp: string;
  productName: string;
  productPrice: string;
  location: string;
};

export type sectionTitle = {
  title: string;
  description: string;
};

export type filter1 = {
  title: string;
  items: string[];
};

export type filter2 = filter1 & { text: string };
export type filter3 = { title: string };
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

export default function Home() {
  const { t } = useTranslation('categories');
  const breadcrumb: string[] = t('page.breadcrumb', { returnObjects: true });
  const sectionTitle: sectionTitle = t('page.sectionTitle', { returnObjects: true });
  const saveToSearch: string = t('page.saveToSearch');
  const filter1: filter1 = t('page.filter1', { returnObjects: true });
  const filter2: filter2 = t('page.filter2', { returnObjects: true });
  const filter3: filter3 = t('page.filter3', { returnObjects: true });
  const filter4: filter1 = t('page.filter4', { returnObjects: true });
  const filter5: filter1 = t('page.filter5', { returnObjects: true });
  const filter6: filter1 = t('page.filter6', { returnObjects: true });
  const filter7: filter3 = t('page.filter7', { returnObjects: true });
  const filter8: filter3 = t('page.filter8', { returnObjects: true });
  // const filteredProducts: filteredProducts[] = t('page.filteredProducts', { returnObjects: true });
  const aboutUs: aboutUs = t('page.aboutUs', { returnObjects: true });
  const accordion: accordion = t('page.accordion', { returnObjects: true });

  const [isEnabled, setIsEnabled] = useState(false);
  const [theme] = useTheme();

  const { data: bannersAndProducts } = productsApi.useGetAllBannersAndProductsQuery(1);
  // const _content = posts?.data?.[0]?.attributes;

  return (
    <Layout>
      {/* <Header categories={headerCategories} windowScroll={2000}  windowWidth={5000} /> */}
      {/* <main className="mobile:mt-[134px] mt-[138px] dark:bg-bg-primary-dark w-full h-full mx-auto overflow-hidden"> */}
      {/* header with image and search box */}
      {/* Section:- What are you looking for? */}
      <div className=" relative custom-container mx-auto sm:px-16 mobile:px-4 ">
        {/* start */}
        <div className=" flex flex-col items-center justify-center ">
          <div className=" flex w-full flex-wrap  mt-5 ">
            <Breadcrumb steps={breadcrumb} />
          </div>

          <div className=" flex flex-col w-full  mt-3">
            <SectionTitle >{sectionTitle.title}</SectionTitle>
          </div>

          <div className=" flex items-center w-full flex-wrap mt-5 mobile:hidden">
            <p className="text-base font-normal mr-3 rtl:ml-3 dark:text-text-primary-dark text-text-primary-light">
              {saveToSearch}
            </p>
            <ToggleSwitch isEnabled={isEnabled} setIsEnabled={setIsEnabled} />
          </div>

          <Link
            href={SIGN_IN_PAGE}
            className="cursor-pointer hover:scale-102 shadow-sm bg-brand-color text-text-primary-light dark:text-text-secondary-light hidden mobile:flex items-center justify-center fixed w-[89px] h-[44px] bottom-3 right-4 rounded-full z-10"
          >
            <span className="text-3xl">+</span>
            <span className="ml-1 text-base font-semibold mr-1 tracking-wide">Sell</span>
          </Link>

          <div className=" flex  items-center w-full justify-between flex-wrap mt-5">
            {/* <FilterSection/> */}
            <div className="sm:hidden mr-1">
              {theme ? (
                <Image
                  width={19}
                  height={19}
                  src={IMAGES.FILTERS_ICON_WHITE}
                  alt="dollar_coin_icon"
                  loader={gumletLoader}
                />
              ) : (
                <Image
                  width={19}
                  height={19}
                  src={IMAGES.FILTERS_ICON_BLACK}
                  alt="dollar_coin_icon"
                  loader={gumletLoader}
                />
              )}
            </div>

            <div className=" flex justify-between ">
              <CategoryButton className=" mobile:mr-0" title={filter1.title} />
              <RadioButtonDropdown
                className="mobile:hidden lg:inline-block sm:hidden"
                leftText={filter2.text}
                data={filter2.items}
                title={filter2.title}
              />
            </div>

            <div className="mobile:hidden md:inline-block sm:hidden border-l border-border-quaternary-light  mx-3 h-6 self-center"></div>

            <div className="flex  justify-between">
              <ButtonWithIcon
                className="mobile:text-sm mobile:mr-0 mobile:truncate mobile:w-[120px] mobile:h-[37px]"
                title={filter3.title}
              >
                <Image
                  className="dark:hidden inline-block"
                  width={19}
                  height={19}
                  src={IMAGES.DOLLAR_COIN_ICON_BLACK}
                  alt="dollar_coin_icon"
                  loader={gumletLoader}
                />
                <Image
                  className="dark:inline-block hidden"
                  width={19}
                  height={19}
                  src={IMAGES.DOLLAR_COIN_ICON_WHITE}
                  alt="dollar_coin_icon"
                  loader={gumletLoader}
                />
              </ButtonWithIcon>

              <CheckBoxButtonDropdown
                className="mobile:hidden md:inline-block sm:hidden"
                title={filter4.title}
                data={filter4.items}
              />
              <CheckBoxButtonDropdown
                className="mobile:hidden lg:inline-block sm:hidden"
                title={filter5.title}
                data={filter5.items}
              />
              <NumberInputDropdown
                className="mobile:hidden xl:inline-block 2lg:hidden sm:hidden"
                title={filter6.title}
              />
              <ButtonWithIcon
                className="mobile:hidden 2xl:inline-block sm:hidden"
                title={filter7.title}
              ></ButtonWithIcon>
            </div>

            <div className="border-l md:inline-block sm:hidden mobile:hidden border-border-quaternary-light  mx-3 h-6 self-center"></div>

            <div className="flex  justify-between mobile:hidden">
              <ButtonWithIcon className="mobile:hidden" title={filter8.title} imageLeftOrRightflag={true}>
                <Image
                  className="dark:inline-block hidden"
                  width={19}
                  height={19}
                  src={IMAGES.FILTERS_ICON_WHITE}
                  alt="dollar_coin_icon"
                  loader={gumletLoader}
                />
                <Image
                  className="dark:hidden inline-block"
                  width={19}
                  height={19}
                  src={IMAGES.FILTERS_ICON_BLACK}
                  alt="dollar_coin_icon"
                  loader={gumletLoader}
                />
              </ButtonWithIcon>
            </div>
          </div>

          {/* Product card start */}
          <div className="mt-[52px] mobile:mt-[16px]  w-full">
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 2lg:grid-cols-4 xl:grid-cols-5">
              {bannersAndProducts?.result.map((product, index) => {
                return (
                  <div key={index}>
                    <ProductCard key={index} product={product} />
                  </div>
                );
              })}
            </div>
            {/* Product card end */}
          </div>
        </div>
      </div>

      <div className="border-b border-border-tertiary-light dark:border-border-tertiary-dark mt-12"></div>

      <div className=" relative custom-container mx-auto sm:px-16 mobile:px-4 ">
        {/* start */}
        <div className=" flex flex-col items-center justify-center ">
          <div className=" mb-24 mobile:mb-[42px] flex flex-col w-full border-error">
            <AboutUs data={aboutUs} />
            <Accordion data={accordion} />
          </div>
        </div>
      </div>
      {/* </main> */}
    </Layout>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['categories', 'common'])),
    },
  };
}
