import { generateDeviceId } from '@/helper/generateDeviceId';
import { IMAGES } from '@/lib/images';
import authApi from '@/store/apiSlices/auth';
import { RequestLogoutPayload } from '@/store/types';
import { useActions, useAppSelector } from '@/store/utils/hooks';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

type menuOptions = {
  item: string;
};

const UserLogin = () => {
  const { t } = useTranslation('common');
  // const categories:categories[] = t('page.header.categories', { returnObjects: true });
  const menuOptions: menuOptions[] = t('page.menuOptions', { returnObjects: true });

  // const loginOrUserName:loginOrUserName = t('page.header.loginOrUserName');

  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const [isHovered, setIsHovered] = useState(false);

  const deviceId = generateDeviceId();
  const { setRemoveUserDataDispatch,setGuestTokenDispatch } = useActions();
  const storedRefreshToken = useAppSelector((state) => state.auth.token?.refreshToken);
  const [logout] = authApi.useLogoutMutation();
  const [getGuestToken] =authApi.useGetGuestTokenMutation()

  const signOut = async () => {
    const reqPayload: RequestLogoutPayload = {
      deviceId: deviceId,
      refreshToken: storedRefreshToken as string,
    };

    const { message } = await logout(reqPayload).unwrap();


    if (message) {
      setRemoveUserDataDispatch();
      const { data } = await getGuestToken().unwrap();
      setGuestTokenDispatch(data.token);

    }
  };

  return (
    <div
      className=" relative  md:flex md:text-sm sm:text-[12px]  h-full "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className=" h-full cursor-pointer flex px-2 gap-3 items-center justify-center">
        {/* <Image
          className="border-2 w-7 h-7 border-error"
          width={28}
          height={28}
          src={IMAGES.USER_ICON}
          loader={gumletLoader}
          alt="user-image"
        /> */}
        <div> 
          {((userInfo?.firstName?.[0]+"") + (userInfo?.lastName?.[0] || "")).toLocaleUpperCase()}
        </div>
        <div className="  justify-center  h-full flex w-full text-nowrap flex-nowrap items-center py-4 text-sm">
          {userInfo?.firstName?.slice(0, 6)}..
        </div>
      </div>

      <div
        className={`${
          isHovered ? 'block' : 'hidden'
        } hover:cursor-pointer rounded-b-md absolute sm:mt-[0px] md:mt-[69px] left-[-55px] bg-bg-secondary-light dark:bg-bg-nonary-dark text-text-primary-light dark:text-text-primary-dark`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link
          href={''}
          className="flex w-[266px] h-[45px] items-center rounded-b-md hover:bg-bg-tertiary-light dark:hover:bg-bg-tertiary-dark"
        >
          <div className="ml-4 rtl:mr-4">
            <Image
              className="hidden dark:inline"
              width={19}
              height={19}
              src={`/images/${IMAGES.PROFILE_ICON_WHITE}`}
              alt={'profile_icon'}
            />
            <Image
              className="inline dark:hidden"
              width={19}
              height={19}
              src={`/images/${IMAGES.PROFILE_ICON_BLACK}`}
              alt={'profile_icon'}
            />
          </div>
          <div className="ml-2 text-sm font-medium">{menuOptions[0].item}</div>
        </Link>
        <Link
          href={''}
          className="flex w-[266px] h-[45px] items-center rounded-b-md hover:bg-bg-tertiary-light dark:hover:bg-bg-tertiary-dark"
        >
          <div className="ml-4 rtl:mr-4">
            <Image
              className="hidden dark:inline"
              width={19}
              height={19}
              src={`/images/${IMAGES.MANAGE_LISTINGS_ICON_WHITE}`}
              alt={'manage_listings_icon'}
            />
            <Image
              className="inline dark:hidden"
              width={19}
              height={19}
              src={`/images/${IMAGES.MANAGE_LISTINGS_ICON_BLACK}`}
              alt={'manage_listings_icon'}
            />
          </div>
          <div className="ml-2 text-sm font-medium">{menuOptions[1].item}</div>
        </Link>
        <Link
          href={''}
          className="flex w-[266px] h-[45px] items-center rounded-b-md hover:bg-bg-tertiary-light dark:hover:bg-bg-tertiary-dark"
        >
          <div className="ml-4 rtl:mr-4">
            <Image
              className="hidden dark:inline"
              width={19}
              height={19}
              src={`/images/${IMAGES.SETTINGS_ICON_WHITE}`}
              alt={'settings_icon'}
            />
            <Image
              className="inline dark:hidden"
              width={19}
              height={19}
              src={`/images/${IMAGES.SETTINGS_ICON_BLACK}`}
              alt={'settings_icon'}
            />
          </div>
          <div className="ml-2 text-sm font-medium">{menuOptions[2].item}</div>
        </Link>
        <Link
          href={''}
          className="flex w-[266px] h-[45px] items-center rounded-b-md hover:bg-bg-tertiary-light dark:hover:bg-bg-tertiary-dark"
        >
          <div className="ml-4 rtl:mr-4">
            <Image
              className="hidden dark:inline"
              width={19}
              height={19}
              src={`/images/${IMAGES.MY_PURCHASES_ICON_WHITE}`}
              alt={'purchase_icon'}
            />
            <Image
              className="inline dark:hidden"
              width={19}
              height={19}
              src={`/images/${IMAGES.MY_PURCHASES_ICON_BLACK}`}
              alt={'purchase_icon'}
            />
          </div>
          <div className="ml-2 text-sm font-medium">{menuOptions[3].item}</div>
        </Link>
        <Link
          href={''}
          className="flex w-[266px] h-[45px] items-center rounded-b-md hover:bg-bg-tertiary-light dark:hover:bg-bg-tertiary-dark"
        >
          <div className="ml-4 rtl:mr-4">
            <Image
              className="hidden dark:inline"
              width={19}
              height={19}
              src={`/images/${IMAGES.MY_SALES_ICON_WHITE}`}
              alt={'my_sales_icon'}
            />
            <Image
              className="inline dark:hidden"
              width={19}
              height={19}
              src={`/images/${IMAGES.MY_SALES_ICON_BLACK}`}
              alt={'my_sales_icon'}
            />
          </div>
          <div className="ml-2 text-sm font-medium">{menuOptions[4].item}</div>
        </Link>
        <Link
          href={''}
          className="flex w-[266px] h-[45px] items-center rounded-b-md hover:bg-bg-tertiary-light dark:hover:bg-bg-tertiary-dark"
        >
          <div className="ml-4 rtl:mr-4">
            <Image
              className="hidden dark:inline"
              width={19}
              height={19}
              src={`/images/${IMAGES.LIKES_ICON_WHITE}`}
              alt={'like_icon'}
            />
            <Image
              className="inline dark:hidden"
              width={19}
              height={19}
              src={`/images/${IMAGES.LIKES_ICON_BLACK}`}
              alt={'like_icon'}
            />
          </div>
          <div className="ml-2 text-sm font-medium">{menuOptions[5].item}</div>
        </Link>
        <Link
          href={''}
          className="flex w-[266px] h-[45px] items-center rounded-b-md hover:bg-bg-tertiary-light dark:hover:bg-bg-tertiary-dark"
        >
          <div className="ml-4 rtl:mr-4">
            <Image
              className="hidden dark:inline"
              width={19}
              height={19}
              src={`/images/${IMAGES.CART_ICON_WHITE}`}
              alt={'cart_icon'}
            />
            <Image
              className="inline dark:hidden"
              width={19}
              height={19}
              src={`/images/${IMAGES.CART_ICON_BLACK}`}
              alt={'cart_icon'}
            />
          </div>
          <div className="ml-2 text-sm font-medium">{menuOptions[6].item}</div>
        </Link>
        <Link
          href={''}
          className="flex w-[266px] h-[45px] items-center rounded-b-md hover:bg-bg-tertiary-light dark:hover:bg-bg-tertiary-dark"
        >
          <div className="ml-4 rtl:mr-4">
            <Image
              className="hidden dark:inline"
              width={19}
              height={19}
              src={`/images/${IMAGES.SELLING_PREFERENCES_ICON_WHITE}`}
              alt={'selling_preferences_icon'}
            />
            <Image
              className="inline dark:hidden"
              width={19}
              height={19}
              src={`/images/${IMAGES.SELLING_PREFERENCES_ICON_BLACK}`}
              alt={'selling_preferences_icon'}
            />
          </div>
          <div className="ml-2 text-sm font-medium">{menuOptions[7].item}</div>
        </Link>
        <Link
          href={''}
          className="flex w-[266px] h-[45px] items-center rounded-b-md hover:bg-bg-tertiary-light dark:hover:bg-bg-tertiary-dark"
        >
          <div className="ml-4 rtl:mr-4">
            <Image
              className="hidden dark:inline"
              width={19}
              height={19}
              src={`/images/${IMAGES.DELIVERY_PROMO_ICON_WHITE}`}
              alt={'delivery_promo_icon'}
            />
            <Image
              className="inline dark:hidden"
              width={19}
              height={19}
              src={`/images/${IMAGES.DELIVERY_PROMO_ICON_BLACK}`}
              alt={'delivery_promo_icon'}
            />
          </div>
          <div className="ml-2 text-sm font-medium">{menuOptions[8].item}</div>
        </Link>
        <div
          className="flex w-[266px] h-[45px] items-center rounded-b-md hover:bg-bg-tertiary-light dark:hover:bg-bg-tertiary-dark"
          onClick={signOut}
        >
          <div className="ml-4 rtl:mr-4">
            <Image
              className="hidden dark:inline"
              width={19}
              height={19}
              src={`/images/${IMAGES.LOGOUT_ICON_WHITE}`}
              alt={'logout_icon'}
            />
            <Image
              className="inline dark:hidden"
              width={19}
              height={19}
              src={`/images/${IMAGES.LOGOUT_ICON_BLACK}`}
              alt={'logout_icon'}
            />
          </div>
          <div className="ml-2 text-sm font-medium">{menuOptions[9].item}</div>
        </div>
      </div>
      {/* <div className={`z-50 left-0 rtl:right-0 absolute ${isHovered ? 'block' : 'hidden'} top-[45px] w-[150px] dark:bg-bg-tertiary-dark rounded-b-md bg-bg-secondary-light text-text-primary-light dark:text-text-primary-dark`}>
            <div className=" dark:bg-bg-tertiary-dark dark:text-text-primary-dark rounded-b-md dark:hover:bg-menu-hover p-2 px-4 py-3  font-normal text-text-primary-light hover:bg-bg-tertiary-light">
                <p
                    onClick={signOut} 
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className='cursor-pointer'
                >Logout</p>
            </div>
        </div> */}
    </div>
  );
};

export default UserLogin;
