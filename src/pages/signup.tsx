import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useLayoutEffect } from 'react';
import Image from 'next/image';
import { IMAGES } from '@/lib/images';
const Registration = dynamic(() => import('@/components/Auth/Registration/Registration'), { ssr: false });
const RegisterWithEmailAndPassword = dynamic(() => import('@/components/Auth/Registration/RegisterWithEmailAndPassword'), { ssr: false });
const RegistrationDetails = dynamic(() => import('@/components/Auth/Registration/RegistrationDetails'), { ssr: false });
const OtpForm = dynamic(() => import('@/components/Auth/OtpForm'), { ssr: false });
const ThankYouPage = dynamic(() => import('@/components/Auth/Registration/ThankYouPage'), { ssr: false });
import { gumletLoader } from '@/lib/gumlet';
import { appClsx } from '@/lib/utils';
import Layout from '@/components/Layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { ACCESS_TOKEN, IS_USER_AUTH } from '@/constants/cookies';
import { getCookie } from '@/utils/cookies';

const Auth = () => {
  const router = useRouter();
  const { step } = router.query;

  useLayoutEffect(() => {
    const IS_ACCESS_TOKEN = getCookie(ACCESS_TOKEN);
    const IS_AUTH_USER = getCookie(IS_USER_AUTH);
    if (IS_ACCESS_TOKEN && IS_AUTH_USER) {
      router.push('/');
    }
  }, []);

  return (
    <Layout>
      {/* <Image onClick={()=>{router.push("/")}} className={appClsx(`hover:cursor-pointer ${(page=="registration" && step=="5") ? "sm:!hidden" : ""} mobile:hidden lg:inline-block sm:hidden absolute top-8 left-9 rtl:hidden`)} width={198} height={44} src={IMAGES.PRIMARY_LOGO_WHITE} alt="left_banner" loader={gumletLoader}/> 
                <Image onClick={()=>{router.push("/")}} className={appClsx(`hover:cursor-pointer ${(page=="registration" && step=="5") ? "sm:!hidden" : ""} mobile:hidden lg:inline-block sm:hidden !hidden rtl:!inline-block absolute top-8 rtl:right-9`)} width={198} height={44} src={IMAGES.PRIMARY_LOGO_WHITE} alt="left_banner" loader={gumletLoader}/> */}

      <div className={` h-screen overflow-scroll flex flex-col items-center`}>
                <Link href={"/"} className='sm:mt-20 sm:mb-10 mobile:mt-14 mobile:mb-10 '>
                  <Image onClick={()=>{router.push("/")}} className={appClsx(`dark:hidden inline`)} width={198} height={44} src={IMAGES.PRIMARY_LOGO_BLACK} alt="left_banner" loader={gumletLoader}/>
                  <Image onClick={()=>{router.push("/")}} className={appClsx(`dark:inline hidden`)} width={198} height={44} src={IMAGES.PRIMARY_LOGO_WHITE} alt="left_banner" loader={gumletLoader}/>
                </Link>

        {(() => {
          switch (step) {
            case '1':
              return <Registration />;
            case '2':
              return <RegisterWithEmailAndPassword />;
            case '3':
              return <RegistrationDetails />;
            case '4':
              return <OtpForm />;
            case '5':
              return <ThankYouPage />;
            default:
              return <Registration />;
          }
        })()}
      </div>
    </Layout>
  );
};

export default Auth;

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['auth'])),
    },
  };
}
