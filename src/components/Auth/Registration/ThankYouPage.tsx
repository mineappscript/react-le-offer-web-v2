
import Button from '@/components/Ui/Button'
import FormHeader from '@/components/Form/FormHeader'
import FormSubHeader from '@/components/Form/FormSubHeader'
import { gumletLoader } from '@/lib/gumlet'
import { IMAGES } from '@/lib/images'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'


import React from 'react'

export type ThankyouPage = {
  thanksMessage: string;
  welcomeMessage: string;
  nextStepsMessage: string;
  buyOption: string;
  sellOption: string;
}

const ThankYouPage = () => {
  const { t } = useTranslation('auth');
    const ThankyouPage:ThankyouPage= t('page.thankyouPage',{returnObjects:true});

  return (
    // <div className=' lg:w-[40%] sm:w-full mobile:w-full px-10 py-7 !pt-[60px] w-[40%] flex flex-col items-center justify-between'>
     <>
      <div className='mobile:px-4  dark:bg-bg-primary-dark sm:max-w-[408px] w-full mobile:w-full flex flex-col items-center justify-start'>

          <FormHeader>{ThankyouPage.thanksMessage}</FormHeader>
          <FormSubHeader>{ThankyouPage.welcomeMessage}</FormSubHeader>

          <Image width={300} height={300} src={IMAGES.THANK_YOU_LOGO} alt="thank_you" loader={gumletLoader}/>

      
          {/* <Button onClick={()=>handleSubmit()} >Continue</Button> */}
          <span className='text-xl font-medium mt-4 text-text-primary-light dark:text-text-primary-dark'>{ThankyouPage.nextStepsMessage}</span>
          <div className=' flex my-2 w-full mt-6 items-center justify-between'>

              
                <Button buttonType='tertiary' className="w-[47%] mr-2 bg-brand-color dark:text-text-secondary-dark dark:border-brand-color !text-text-primary-color dark:hover:text-brand-color hover:!bg-bg-secondary-light hover:text-brand-color hover:!border-2 hover:!border-brand-color hover:!scale-100 " >
                    <Link href={"/"} className=' w-full h-full flex items-center justify-center'> {ThankyouPage.buyOption}</Link>  
                </Button>
           
                <Button buttonType='tertiary' className='w-[47%] bg-brand-color dark:text-text-secondary-dark dark:border-brand-color !text-text-primary-color dark:hover:text-brand-color hover:!bg-bg-secondary-light hover:text-brand-color hover:!border-2 hover:!border-brand-color hover:!scale-100'  >
                    <Link href={"/"} className=' w-full h-full flex items-center justify-center'> {ThankyouPage.sellOption}</Link>
                </Button>
          
          </div>
        </div>
     </>

      
  // </div>
  )
}

export default ThankYouPage