import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useLayoutEffect } from 'react';
import Image from 'next/image';
import { IMAGES } from '@/lib/images';
const LoginWithEmailAndPassword = dynamic(() => import('@/components/Auth/Login/LoginWithEmailAndPassword'), {
  ssr: false,
});
const LoginWithPhone = dynamic(() => import('@/components/Auth/Login/LoginWithPhone'), { ssr: false });
const OTPForm = dynamic(() => import('@/components/Auth/OtpForm'), { ssr: false });
const Login = dynamic(() => import('@/components/Auth/Login/Login'), { ssr: false });

import { gumletLoader } from '@/lib/gumlet';
import { appClsx } from '@/lib/utils';
import Layout from '@/components/Layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { getCookie } from '@/utils/cookies';
import { ACCESS_TOKEN, IS_USER_AUTH } from '@/constants/cookies';

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
      <div className={` h-screen overflow-scroll flex flex-col items-center`}>
        <Link href={'/'} className="sm:mt-20 sm:mb-10 mobile:mt-14 mobile:mb-10 ">
          <Image
            onClick={() => {
              router.push('/');
            }}
            className={appClsx(`dark:hidden inline`)}
            width={198}
            height={44}
            src={IMAGES.PRIMARY_LOGO_BLACK}
            alt="left_banner"
            loader={gumletLoader}
          />
          <Image
            onClick={() => {
              router.push('/');
            }}
            className={appClsx(`dark:inline hidden`)}
            width={198}
            height={44}
            src={IMAGES.PRIMARY_LOGO_WHITE}
            alt="left_banner"
            loader={gumletLoader}
          />
        </Link>

        {/* insert content here*/}
        {/* Content */}
        {/* Content */}
        {(() => {
          switch (step) {
            case '1':
              return <Login />;
            case '2':
              return <LoginWithPhone />;
            case '3':
              return <OTPForm />;
            case '4':
              return <LoginWithEmailAndPassword />;
            default:
              return <Login />;
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
