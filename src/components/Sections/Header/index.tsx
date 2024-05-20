
import React, { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import HeaderDropdown from '../../Ui/HeaderDropDown';
import Image from 'next/image';
import { gumletLoader } from '@/lib/gumlet';
import { IMAGES } from '@/lib/images';
import Button from '../../Ui/Button';
import { useTranslation } from 'next-i18next';
import { useWindowScroll } from '@/hooks/useWindowScroll';
import { useWindowResize } from '@/hooks/useWindowResize';
import { HydrationGuard } from '../../Ui/HydrationGuard'
import { useAppSelector } from '@/store/utils/hooks';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
const CategoriesDrawer = dynamic(() => import('@/components/CategoriesDrawer'), {ssr: false,});
import useTheme from '@/hooks/theme';
import LoginWithPhoneModel from '../../AuthModels/Login/LoginWithPhoneModel';
import { SIGN_IN_PAGE } from '@/routes';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { ResponseGetAllCategoriesPayload } from '@/store/types';
import UserLogin from './UserLogin';

export type loginOrUserName = {
  login: string;
  userName: string;
};

export type categories = {
  category: string;
  subCategory: string[];
};

export type Props = {
  stickyHeaderWithSearchBox?: boolean;
  categories: categories[];
  showItems?: number;
  categoriesWithChildCategories?: ResponseGetAllCategoriesPayload;
};

const Header: FC<Props> = ({
  stickyHeaderWithSearchBox = false,
  showItems = 5,
  // categoriesWithChildCategories,
}) => {
  const [theme, setTheme] = useTheme();
  const windowScroll = useWindowScroll();
  const windowWidth = useWindowResize();
  const { categoriesWithChildren } = useSelector((state: RootState) => state.auth);

  // const {data,isLoading,isError}=categoriesApi.useGetAllCategoriesQuery();

  const { t } = useTranslation('common');
  // const categories:categories[] = t('page.header.categories', { returnObjects: true });
  const allcategories: string = t('page.header.allcategories');
  const router = useRouter();

  const loginOrUserName: loginOrUserName = t('page.header.loginOrUserName', { returnObjects: true });
  const btnText: string = t('page.header.button');

  const [isSearchCategoriesDrower, setIsSearchCategoriesDrower] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const changeisLoginModalOpen = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
  };

  const changMenu = () => {
    setIsSearchCategoriesDrower(!isSearchCategoriesDrower);
  };

  useEffect(() => {
    if (isSearchCategoriesDrower) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isSearchCategoriesDrower]);

  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const sellPage = () => {
    if (userInfo) {
      // write the code to route to sell page
    } else {
      router.push(SIGN_IN_PAGE);
    }
  };

  return (
    <>
      {/* // desktop,letop,tab screen  */}
      {/* {
        !(windowWidth<638) && ( */}

      <nav
        className={`mobile:hidden ${
          windowScroll > 130 && ' border-b border-border-tertiary-light dark:border-b-border-tertiary-dark'
        } ${windowWidth >= 639 ? '' : 'hidden'} ${
          stickyHeaderWithSearchBox && 'border-b border-b-border-tertiary-light dark:border-b-border-tertiary-dark'
        } ${
          windowScroll > 0
            ? stickyHeaderWithSearchBox
              ? 'text-text-primary-light dark:text-text-primary-dark bg-bg-secondary-light dark:bg-bg-primary-dark'
              : 'text-text-primary-light dark:text-text-primary-dark bg-bg-secondary-light dark:bg-bg-primary-dark'
            : stickyHeaderWithSearchBox
            ? 'text-text-primary-light dark:text-text-primary-dark bg-bg-secondary-light dark:bg-bg-primary-dark'
            : `text-text-secondary-light dark:text-text-primary-dark`
        } h-[69px] w-full fixed top-0 z-10 text-sm font-medium capitalize transition ease-in-out duration-2000`}
      >
        <div className=" max-w-[1440px] px-[64px] m-auto h-full flex items-center justify-between">
          <div className="flex items-center h-full">
            <Link className="" href="/">
              {stickyHeaderWithSearchBox ? (
                theme ? (
                  !(windowScroll > 0 && !theme) ? (
                    <Image
                      width={135}
                      height={38}
                      className="min-w-[126px] h-[38px]"
                      src={IMAGES.PRIMARY_LOGO_WHITE}
                      alt="images/main-logo-white"
                      loader={gumletLoader}
                    />
                  ) : (
                    <Image
                      width={135}
                      height={38}
                      className="min-w-[135px] h-[38px]"
                      src={IMAGES.PRIMARY_LOGO_BLACK}
                      alt="main-logo-blue"
                      loader={gumletLoader}
                    />
                  )
                ) : windowScroll > 0 && !theme && !stickyHeaderWithSearchBox ? (
                  <Image
                    width={135}
                    height={38}
                    className="min-w-[135px] h-[38px]"
                    src={IMAGES.PRIMARY_LOGO_WHITE}
                    alt="images/main-logo-white"
                    loader={gumletLoader}
                  />
                ) : (
                  <Image
                    width={135}
                    height={38}
                    className="min-w-[135px] h-[38px]"
                    src={IMAGES.PRIMARY_LOGO_BLACK}
                    alt="main-logo-blue"
                    loader={gumletLoader}
                  />
                )
              ) : !(windowScroll > 0) ? (
                <Image
                  width={135}
                  height={38}
                  className="min-w-[135px] h-[38px]"
                  src={IMAGES.FOOTER_LOGO_WHITE}
                  alt="images/main-logo-white"
                  loader={gumletLoader}
                />
              ) : (
                <Image
                  width={135}
                  height={38}
                  className="min-w-[135px] h-[38px]"
                  src={IMAGES.PRIMARY_LOGO_BLACK}
                  alt="main-logo-blue"
                  loader={gumletLoader}
                />
              )}
            </Link>

            <ul className=" flex ml-9 mobile:text-[12px] h-full ">
              <>
                {
                  // isLoading ? "Loading..." : isError ? "error" :
                  // data && (
                  categoriesWithChildren?.data
                    .slice(
                      0,
                      windowWidth > 1144
                        ? showItems
                        : windowWidth >= 1144
                        ? 4
                        : windowWidth >= 963
                        ? 3
                        : windowWidth >= 831
                        ? 2
                        : windowWidth >= 634
                        ? 1
                        : 0
                    )
                    .map((item, index) => (
                      <HeaderDropdown key={index} item={item} />
                    ))
                }
              </>

              <li className="flex mx-4 items-center justify-center">
                <div className="flex items-center justify-center" onClick={() => changMenu()}>
                  {stickyHeaderWithSearchBox ? (
                    theme ? (
                      !(windowScroll > 0 && theme !== true) ? (
                        <Image
                          width={0}
                          height={0}
                          className="h-4 w-4 font-medium"
                          src={IMAGES.ALL_CATEGORIES_ICON_WHITE}
                          loader={gumletLoader}
                          alt="all-categories-white"
                        />
                      ) : (
                        <Image
                          width={0}
                          height={0}
                          className="h-4 w-4"
                          src={IMAGES.ALL_CATEGORIES_ICON_BLACK}
                          loader={gumletLoader}
                          alt="all-categories-black"
                        />
                      )
                    ) : windowScroll > 0 && !theme && !stickyHeaderWithSearchBox ? (
                      <Image
                        width={0}
                        height={0}
                        className="h-4 w-4 font-medium"
                        src={IMAGES.ALL_CATEGORIES_ICON_WHITE}
                        loader={gumletLoader}
                        alt="all-categories-white"
                      />
                    ) : (
                      <Image
                        width={0}
                        height={0}
                        className="h-4 w-4"
                        src={IMAGES.ALL_CATEGORIES_ICON_BLACK}
                        loader={gumletLoader}
                        alt="all-categories-black"
                      />
                    )
                  ) : !(windowScroll > 0 && theme !== true) ? (
                    <Image
                      width={0}
                      height={0}
                      className="h-4 w-4 font-medium"
                      src={IMAGES.ALL_CATEGORIES_ICON_WHITE}
                      loader={gumletLoader}
                      alt="all-categories-white"
                    />
                  ) : (
                    <Image
                      width={0}
                      height={0}
                      className="h-4 w-4"
                      src={IMAGES.ALL_CATEGORIES_ICON_BLACK}
                      loader={gumletLoader}
                      alt="all-categories-black"
                    />
                  )}
                  <Link className="ml-2 rtl:ml-0 rtl:mr-2 truncate" href="">
                    {allcategories}
                  </Link>
                </div>

                <CategoriesDrawer
                  isSearchCategoriesDrower={isSearchCategoriesDrower}
                  changMenu={changMenu}
                  // data={categoriesWithChildren}
                />
              </li>
            </ul>
          </div>

          <div className=" h-full flex items-center justify-center gap-4">
            {
              <>
                <Image
                  className="transition-all duration-300 hover:scale-110  cursor-pointer dark:inline-block hidden"
                  width={40}
                  height={40}
                  src="/images/light_mode_icon.png"
                  onClick={() => setTheme(!theme)}
                  alt="light_mode_icon"
                />

                <Image
                  className="transition-all duration-300 hover:scale-110 cursor-pointer dark:hidden inline-block"
                  width={30}
                  height={30}
                  src="/images/dark_mode_icon.png"
                  onClick={() => setTheme(!theme)}
                  alt="light_mode_icon"
                />
              </>
            }
            <HydrationGuard>
              {userInfo ? (
                <UserLogin />
              ) : (
                <Link className="mx-9" href={SIGN_IN_PAGE}>
                  {' '}
                  {loginOrUserName.login}
                </Link>
                // <div className=" mx-9" onClick={changeisLoginModalOpen}> {loginOrUserName.login}</div>
              )}
            </HydrationGuard>
            <Button
              onClick={sellPage}
              type="button"
              className={`mb-0 ${
                !(windowScroll > 0)
                  ? stickyHeaderWithSearchBox
                    ? '!text-text-secondary-light dark:text-text-secondary-dark'
                    : `text-text-primary-light dark:text-tes`
                  : stickyHeaderWithSearchBox
                  ? '!text-text-secondary-light dark:text-text-secondary-dark'
                  : `!text-text-secondary-light dark:text-text-secondary-dark`
              }  rounded-lg py-2 w-24 h-[34px] text-center hover:scale-105 transition-all duration-200`}
            >
              {btnText}
            </Button>
          </div>
        </div>
      </nav>

      {isLoginModalOpen && <LoginWithPhoneModel changeisLoginModalOpen={changeisLoginModalOpen} />}

      {/* <CategoryDrower className={`sm:hidden mobile:inline-block ${searchCategoryDrower && "!hidden"} transition duration-700`} searchCategoryDrower={searchCategoryDrower} setsearchCategoryDrower={setsearchCategoryDrower}/> */}
      <nav
        className={` border-error ${stickyHeaderWithSearchBox && 'dark:bg-bg-secondary-dark'} ${
          windowScroll > 0 && 'dark:bg-bg-primary-dark bg-bg-secondary-light'
        } mobile:inline-block ${
          windowWidth >= 639 && 'hidden'
        } h-[69px] w-full fixed top-0 z-[9] flex items-center justify-center px-[16px]`}
      >
        <div className=" flex items-center justify-between h-full w-full max-w-[638px]">
          <div className={` flex items-center ${stickyHeaderWithSearchBox && 'mobile:hidden'} `}>
            {
              // stickyHeaderWithSearchBox ? (
              //     !(theme!==true)
              //     ? (<Image width={18} height={12} className='h-[12px] cursor-pointer w-[18px] min-h-3 hover:scale-110' onClick={()=>setsearchCategoryDrower(!searchCategoryDrower)} src={IMAGES.HAND_BURGER_MENU_ICON_WHITE} loader={gumletLoader} alt="hand-burger-menu-icon-white" />)
              //     : (<Image width={18} height={12} className='h-[12px] cursor-pointer w-[18px] min-h-3 hover:scale-110' onClick={()=>setsearchCategoryDrower(!searchCategoryDrower)} src={IMAGES.HAND_BURGER_MENU_ICON_BLACK} loader={gumletLoader} alt="hand-burger-menu-icon-black" />)

              // ) : (

              !(windowScroll > 0 && theme !== true) ? (
                <Image
                  width={18}
                  height={12}
                  className="h-[12px] cursor-pointer w-[18px] min-h-3 hover:scale-110"
                  src={IMAGES.HAND_BURGER_MENU_ICON_WHITE}
                  loader={gumletLoader}
                  alt="hand-burger-menu-icon-white"
                />
              ) : (
                <Image
                  width={18}
                  height={12}
                  className="h-[12px] cursor-pointer w-[18px] min-h-3 hover:scale-110"
                  src={IMAGES.HAND_BURGER_MENU_ICON_BLACK}
                  loader={gumletLoader}
                  alt="hand-burger-menu-icon-black"
                />
              )
              // )
            }
            <Link className=" pl-6 rtl:pl-0 rtl:pr-6" href="/">
              {stickyHeaderWithSearchBox ? (
                !(theme !== true) ? (
                  <Image
                    width={135}
                    height={38}
                    className="min-w-[135px] h-[38px]"
                    src={IMAGES.PRIMARY_LOGO_WHITE}
                    alt="PRIMARY_LOGO_WHITE"
                    loader={gumletLoader}
                  />
                ) : (
                  <Image
                    width={135}
                    height={38}
                    className="min-w-[135px] h-[38px]"
                    src={IMAGES.PRIMARY_LOGO_BLACK}
                    alt="PRIMARY_LOGO_BLACK"
                    loader={gumletLoader}
                  />
                )
              ) : !(windowScroll > 0) ? (
                <Image
                  width={135}
                  height={38}
                  className="min-w-[135px] h-[38px]"
                  src={IMAGES.FOOTER_LOGO_WHITE}
                  alt="PRIMARY_LOGO_WHITE"
                  loader={gumletLoader}
                />
              ) : (
                <Image
                  width={135}
                  height={38}
                  className="min-w-[135px] h-[38px]"
                  src={IMAGES.PRIMARY_LOGO_BLACK}
                  alt="PRIMARY_LOGO_BLACK"
                  loader={gumletLoader}
                />
              )}
            </Link>
          </div>
          <div className={` flex items-center justify-evenly  h-full ${stickyHeaderWithSearchBox && 'mobile:hidden'} `}>
            <div className={`mr-5 rtl:mr-0 rtl:ml-4 `}>
              {
                <>
                  <Image
                    className="transition-all duration-300 hover:scale-110 cursor-pointer dark:inline-block hidden"
                    width={40}
                    height={40}
                    src="/images/light_mode_icon.png"
                    onClick={() => setTheme(!theme)}
                    alt="light_mode_icon"
                  />

                  <Image
                    className="transition-all duration-300 hover:scale-110 cursor-pointer dark:hidden inline-block"
                    width={30}
                    height={30}
                    src="/images/dark_mode_icon.png"
                    onClick={() => setTheme(!theme)}
                    alt="light_mode_icon"
                  />
                </>
              }
            </div>

            <div className=" text-text-secondary-light flex-1 w-[40%]">
              <HydrationGuard>
                {!userInfo ? (
                  <Link
                    className={`rtl:mr-0 mr-4 flex items-center justify-center text-text-secondary-light`}
                    href={SIGN_IN_PAGE}
                  >
                    <span
                      className={`${
                        stickyHeaderWithSearchBox && '!text-text-primary-light dark:!text-text-secondary-light'
                      } ${
                        windowScroll > 0
                          ? '!text-text-primary-light dark:!text-text-secondary-light'
                          : 'text-text-secondary-light'
                      }  text-base font-semibold rtl:ml-0 ml-0 `}
                    >
                      {loginOrUserName.login}
                    </span>
                  </Link>
                ) : !(windowScroll > 0) ? (
                  <>
                    <Image
                      width={21}
                      height={21}
                      className=" cursor-pointer hover:scale-110 "
                      src={IMAGES.CHAT_ICON_WHITE}
                      loader={gumletLoader}
                      alt="chat-icon-white"
                    />
                  </>
                ) : (
                  <>
                    <Image
                      width={21}
                      height={21}
                      className=" cursor-pointer hover:scale-110 dark:hidden inline"
                      src={IMAGES.CHAT_ICON_BLACK}
                      loader={gumletLoader}
                      alt="chat-icon-black"
                    />
                    <Image
                      width={21}
                      height={21}
                      className=" cursor-pointer hover:scale-110 dark:inline hidden"
                      src={IMAGES.CHAT_ICON_WHITE}
                      loader={gumletLoader}
                      alt="chat-icon-white"
                    />
                  </>
                )}
              </HydrationGuard>
            </div>
          </div>

          {stickyHeaderWithSearchBox && (
            <>
              <div className=" relative w-12 h-12 flex items-center justify-center">
                <Link className="relative w-12 h-12 flex items-center justify-center" href="/">
                  <Image
                    className="hover:cursor-pointer hover:scale-102 absolute left-1 dark:hidden"
                    width={15}
                    height={15}
                    src={IMAGES.BACK_ARROW_ICON_BLACK}
                    alt="back-arrow-icon"
                    loader={gumletLoader}
                  />
                  <Image
                    className="hover:cursor-pointer hover:scale-102 absolute left-1 hidden dark:inline-block"
                    width={15}
                    height={15}
                    src={IMAGES.BACK_ARROW_ICON_WHITE}
                    alt="back-arrow-icon"
                    loader={gumletLoader}
                  />
                </Link>
              </div>

              <div className=" flex items-center justify-center ">
                <div className="mr-9">
                  <Image
                    width={21}
                    height={21}
                    className=" cursor-pointer hover:scale-110 dark:hidden inline"
                    src={IMAGES.CHAT_ICON_BLACK}
                    loader={gumletLoader}
                    alt="chat-icon-black"
                  />
                  <Image
                    width={21}
                    height={21}
                    className=" cursor-pointer hover:scale-110 dark:inline hidden"
                    src={IMAGES.CHAT_ICON_WHITE}
                    loader={gumletLoader}
                    alt="chat-icon-white"
                  />
                </div>
                <div>
                  <Image
                    width={18}
                    height={12}
                    className="h-[12px] cursor-pointer w-[18px] min-h-3 hover:scale-110 dark:inline hidden "
                    src={IMAGES.HAND_BURGER_MENU_ICON_WHITE}
                    loader={gumletLoader}
                    alt="hand-burger-menu-icon-white"
                  />
                  <Image
                    width={18}
                    height={12}
                    className="h-[12px] cursor-pointer w-[18px] min-h-3 hover:scale-110 dark:hidden inline"
                    src={IMAGES.HAND_BURGER_MENU_ICON_BLACK}
                    loader={gumletLoader}
                    alt="hand-burger-menu-icon-black"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
