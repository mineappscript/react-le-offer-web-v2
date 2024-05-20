import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Button from '@/components/Ui/Button'
import FormHeader from '@/components/Form/FormHeader'
import FormSubHeader from '@/components/Form/FormSubHeader'
import { useTranslation } from 'next-i18next'
import OAuth from '@/components/Ui/OAuth'
import { gumletLoader } from '@/lib/gumlet'
import { IMAGES } from '@/lib/images'
import Image from 'next/image'
import { SIGN_IN_PAGE, SIGN_UP_PAGE } from '@/routes'

export type SignUp = {
    signupPrompt: string;
    chooseOptionMessage: string;
    signupWithEmail: string;
    connectWith: string;
    google: string;
    facebook: string;
    alreadyHaveAccount: string;
    alreadyHaveAccountLink: string;
}


const Registration = () => {
    const { t } = useTranslation('auth');
    const SignUp:SignUp= t('page.signUp',{returnObjects:true});

    const router=useRouter();
    // const { page,step } = router.query;
    // const { page } = router.query;

    const handelClick=()=>{
        router.push(`${SIGN_UP_PAGE}?step=2`)
    }

    return (
    <div className=' mobile:px-4  h-full w-full flex flex-col items-center justify-between'>

            <div className='  sm:w-[408px]  mobile:w-full flex flex-col items-center justify-start'>

                <FormHeader>{SignUp.signupPrompt}</FormHeader>
                <FormSubHeader>{SignUp.chooseOptionMessage}</FormSubHeader>
    
                <div className='flex w-full items-center justify-between'>
                    <OAuth/>
                </div>

                <Button buttonType='tertiary'  onClick={()=>handelClick()}>{SignUp.signupWithEmail}
                    <Image className="absolute left-3 dark:hidden inline" width={20} height={20} src={`${IMAGES.MAIL_ICON_BLACK}`} loader={gumletLoader} alt="facebook_logo" />
                    <Image className="absolute left-3 dark:inline hidden" width={20} height={20} src={`${IMAGES.MAIL_ICON_WHITE}`} loader={gumletLoader} alt="facebook_logo" />
                </Button>

            </div>

            <div className='mb-7 text-sm font-semibold'>
                <span className='text-text-primary-light dark:text-text-primary-dark'>{SignUp.alreadyHaveAccount}</span>
                <Link className='font-bold text-brand-color' href={`${SIGN_IN_PAGE}?step=1`}> {SignUp.alreadyHaveAccountLink}</Link>
            </div>
     
    </div>
  )
}

export default Registration
