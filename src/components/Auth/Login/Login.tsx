import Button from '@/components/Ui/Button';
import FormHeader from '@/components/Form/FormHeader';
import FormSubHeader from '@/components/Form/FormSubHeader';
import OAuth from '@/components/Ui/OAuth';
import { gumletLoader } from '@/lib/gumlet';
import { IMAGES } from '@/lib/images';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import { SIGN_IN_PAGE, SIGN_UP_PAGE } from '@/routes';
// import MobileIcon from '../../../../public/assets/svg/mobile_icon';

export type login={
    signInPrompt: string,
    chooseOptionMessage: string,
    google: string,
    facebook: string,
    signInWithPhone: string,
    signInWithEmail: string,
    doNotHaveAccount: string,
    doNotHaveAccountLink: string
}



const Login = () => {

    const router=useRouter()

    const { t } = useTranslation('auth');
    const login:login= t('page.signIn',{returnObjects:true});

    const handelLoginWithPhoneClick=()=>{
        router.push(`${SIGN_IN_PAGE}?step=2`)
    }

    const handelLoginWithEmailClick=()=>{
        router.push(`${SIGN_IN_PAGE}?step=4`)
    }

  return (
    <>
     <div className='mobile:px-4 sm:max-w-[408px] w-full mobile:w-full h-full flex flex-col items-center justify-start'>

    <FormHeader>{login.signInPrompt}</FormHeader>
    <FormSubHeader>{login.chooseOptionMessage}</FormSubHeader>

      <div className=' flex w-full items-center justify-between'>
        <OAuth/>
      </div>
      
      <Button buttonType='tertiary'  onClick={()=>handelLoginWithPhoneClick()}>
        {/* <MobileIcon className="absolute left-3 dark:text-text" /> */}
        <Image className="absolute left-3.5 dark:hidden inline" width={14} height={14} src={`${IMAGES.MOBILE_PHONE_ICON_BLACK}`} loader={gumletLoader} alt="facebook_logo" />
        <Image className="absolute left-3.5 dark:inline hidden" width={14} height={14} src={`${IMAGES.MOBILE_PHONE_ICON_WHITE}`} loader={gumletLoader} alt="facebook_logo" />
        <span>{login.signInWithPhone}</span>
      </Button>

      <Button buttonType='tertiary'  onClick={()=>handelLoginWithEmailClick()}>
        <Image className="absolute left-3 dark:hidden inline" width={20} height={20} src={`${IMAGES.MAIL_ICON_BLACK}`} loader={gumletLoader} alt="facebook_logo" />
        <Image className="absolute left-3 dark:inline hidden" width={20} height={20} src={`${IMAGES.MAIL_ICON_WHITE}`} loader={gumletLoader} alt="facebook_logo" />
        <span>{login.signInWithEmail}</span>
      </Button>

    </div>

        <div className='mb-7 text-sm font-semibold'>
            <span className='text-text-primary-light dark:text-text-primary-dark'>{login.doNotHaveAccount} </span>
            <Link className='font-bold text-brand-color' href={SIGN_UP_PAGE}>{login.doNotHaveAccountLink}</Link>
        </div>
    </>
  )
}

export default Login
