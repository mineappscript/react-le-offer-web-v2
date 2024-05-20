'use client';
import { useRouter } from 'next/router';
import React from 'react';
import ForgotPasswordEnterEmail from '@/components/Auth/ForgotPassword/ForgotPasswordEnterEmail';
import ResetPasswordLinkSent from '@/components/Auth/ForgotPassword/ResetPasswordLinkSent';
import ChangePasswordForm from '@/components/Auth/ForgotPassword/ChangePasswordForm';
import Layout from '@/components/Layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ChangePasswordSuccessfully from '@/components/Auth/ForgotPassword/ChangePasswordSuccessfully';
import Link from 'next/link';
import Image from 'next/image';
import { IMAGES } from '@/lib/images';
import { gumletLoader } from '@/lib/gumlet';
import { appClsx } from '@/lib/utils';

const ForgotPassword = () => {
  const router = useRouter();
  const { step } = router.query;

  // return (
  //     <div>{JSON.stringify(query, null, 2)}</div>
  // )

  return (
    <Layout
    // content={ {
    //     heroImage: {
    //       data: "fdsfsd",
    //     },
    //     heading: "string",
    //     trendingSearchText: "string"
    //   }}
    >
      <div className={` dark:bg-bg-primary-dark w-full h-screen flex mobile:px-4 flex-col justify-center items-center`}>

        <Link href={"/"} className='sm:mt-20 sm:mb-10 mobile:mt-14 mobile:mb-10 '>
          <Image onClick={()=>{router.push("/")}} className={appClsx(`dark:hidden inline`)} width={198} height={44} src={IMAGES.PRIMARY_LOGO_BLACK} alt="left_banner" loader={gumletLoader}/>
          <Image onClick={()=>{router.push("/")}} className={appClsx(`dark:inline hidden`)} width={198} height={44} src={IMAGES.PRIMARY_LOGO_WHITE} alt="left_banner" loader={gumletLoader}/>
        </Link>

        {(() => {
          switch (step) {
            //with email
            case '1':
              return <ForgotPasswordEnterEmail />;
            case '2':
              return <ResetPasswordLinkSent />;
            case '3':
              return <ChangePasswordForm />;
            case '4':
              return <ChangePasswordSuccessfully />;
            // case "3":
            // return <ForgotPasswordMain/>

            // with mobile number
            // case "4":
            // return <EnterMobileNumber/>
            // case "5":
            // return <ForgotPasswordOtpForm/>
            // case "6":
            // return <ChangePasswordForm/>

            default:
              return <ForgotPasswordEnterEmail />;
          }
        })()}
      </div>
    </Layout>
  );
};

export default ForgotPassword;

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['auth'])),
    },
  };
}
