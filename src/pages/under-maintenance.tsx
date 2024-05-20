import FormHeader from '@/components/Form/FormHeader'
import FormSubHeader from '@/components/Form/FormSubHeader'
import { gumletLoader } from '@/lib/gumlet'
import { IMAGES } from '@/lib/images'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Image from 'next/image'
import React from 'react'

type UnderMaintenance={
    title:string,
    subTitle:string,
}

const UnderMaintenancePage = () => {

  const { t } = useTranslation('underMaintenance');
  const underMaintenance:UnderMaintenance= t('page',{returnObjects:true});

  return (


        <div className=' flex items-center justify-center h-screen '>
            <div className=' max-w-[598px] w-full flex flex-col items-center justify-center mobile:px-4'>
                <Image width={300} height={300} className='' src={IMAGES.UNDER_MAINTENANCE} loader={gumletLoader} alt='not_found'/>
                <FormHeader className='mt-5 text-center'>{underMaintenance.title}</FormHeader>
                <FormSubHeader className='mt-3 text-center'>{underMaintenance.subTitle}</FormSubHeader>

            </div>
        </div>

  )
}

export default UnderMaintenancePage

export async function getStaticProps({ locale }:{locale:string}) {
   
  return {
    props: {
      ...(await serverSideTranslations(locale,['underMaintenance']))
    },
  };
}
