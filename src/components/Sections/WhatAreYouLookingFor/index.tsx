import Image from 'next/image';
import React, { FC, useState } from 'react';
import CategoryCard from '../../Ui/CategoryCard';
import { IMAGES } from '@/lib/images';
import { gumletLoader } from '@/lib/gumlet';
import { useTranslation } from 'next-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { HydrationGuard } from '../../Ui/HydrationGuard';
import CategoriesIcon from '../../../../public/assets/svg/categories_icon';
import SectionTitle from '@/components/Ui/SectionTitle';
// import { categoriesApi } from '@/store/apiSlices/categoriesApi';
// import { ResponseGetAllCategoriesPayload } from '@/store/types/categoriesTypes';

export type Props = {
  allCategoriesIcon: string;
  // content: {
  //   Categories: {
  //     heading: string;
  //     categoryCard: []
  //   };
  // };
  // categories: ResponseGetAllGrandParentCategoriesPayload;
  // categoriesWithChildCategories: ResponseGetAllCategoriesPayload;

  // isError:boolean,
  // isLoading:boolean
};

export type category = {
  categoryName: string;
  categoriesIcon: string;
};
export type categoriesSection = {
  title: string;
  // Categories: category[];
  seeAllCategories: string;
};

const WhatAreYouLookingFor: FC<Props> = () => {
  const [isSearchCategoriesDrower, setIsSearchCategoriesDrower] = useState(false);
  const { categories } = useSelector((state: RootState) => state.auth);

  const changMenu = () => {
    setIsSearchCategoriesDrower(!isSearchCategoriesDrower);
  };

  const hadndleClick = () => {
    changMenu();
  };

  const { t } = useTranslation('common');
  const categoriesSection: categoriesSection = t('page.categoriesSection', { returnObjects: true });

  return (
    // text-sm font-medium capitalize
    <>
      <HydrationGuard>
        <div className={`w-full`}>
          <div className="my-12 mobile:my-9 m-auto h-full">
            <div className=" flex items-center justify-between">
              <SectionTitle className=" !py-0">{categoriesSection.title}</SectionTitle>
              <div
                className=" flex items-center justify-between mobile:hidden cursor-pointer"
                onClick={() => changMenu()}
              >
                <CategoriesIcon color='var(--brand-color)'/>
                <span className="ml-2 rtl:mr-2 rtl:ml-0 text-base text-brand-color font-medium">
                  {categoriesSection.seeAllCategories}
                </span>
              </div>
            </div>

            <div className=" mt-8 mobile:mt-4 text-text-primary-light dark:text-text-primary-dark border-primary-color h-fit grid xl:grid-cols-6 2lg:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 mobile:grid-cols-4 gap-10 sm:gap-16 md:gap-6 ">
              {categories?.data.slice(0, 6).map((item, index) => (
                <div className=" mobile:h-[100px] md:h-[224px] flex items-center justify-center" key={index}>
                  <CategoryCard category={item} />
                </div>
              ))}
              <div
                className=" mt-3 mobile:h-[100px] h-[224px] flex justify-center sm:hidden"
                onClick={() => hadndleClick()}
              >
                <div className=" bg-bg-tertiary-light h-[60px] w-[60px] md:h-[203px] md:w-[203px] flex-wrap rounded-full md:rounded-lg flex justify-center items-center p-2 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-150 cursor-pointer">
                  <div className="mobile:min-w-[60px] mobile:min-h-[60px] flex flex-col justify-center items-center">
                    <Image
                      src={`${IMAGES.RIGHT_ARROW_ICON}`}
                      width={7}
                      height={13}
                      alt={'category_images'}
                      loader={gumletLoader}
                      className="mix-blend-color-burn mt-[13px] mb-[20px] h-[20px] w-[20px] md:h-[50px] md:w-[78px]"
                    />
                    <h6 className="text-xs text-primary md:text-base mt-3 font-primary font-normal text-center max-w-[154.6px]">
                      See All
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </HydrationGuard>

      {/* <CategoriesDrawer isSearchCategoriesDrower={isSearchCategoriesDrower} changMenu={changMenu} data={categoriesWithChildCategories?.data} /> */}
    </>
  );
};

export default WhatAreYouLookingFor;
