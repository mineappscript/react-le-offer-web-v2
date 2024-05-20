import { gumletLoader } from '@/lib/gumlet'
import { IMAGES } from '@/lib/images'
import { appClsx } from '@/lib/utils'
import Image from 'next/image'
import React, { FC } from 'react'

type FaqCardProps={
    question:string,
    answer:string,
    id:number,
    isOpen:boolean,
    onClick:(id:number)=>void
}

const FaqCard:FC<FaqCardProps> = ({question,answer,id,isOpen,onClick}) => {


  return (
    <div className={`flex  flex-col ${id===0 ? "" : "border-t border-border-tertiary-light dark:border-border-tertiary-dark" }`}>
        <div className='flex  mobile:my-4 my-5 hover:cursor-pointer' onClick={()=>onClick(id)}>
            <div className=' flex items-center justify-center'>
                {
                    isOpen ? (
                        <>
                            <Image width={12} height={12} className='inline dark:hidden' src={IMAGES.PLUS_ICON_BLACK} loader={gumletLoader} alt='plus_icon'/>
                            <Image width={12} height={12} className='dark:inline hidden' src={IMAGES.PLUS_ICON_WHITE} loader={gumletLoader} alt='plus_icon'/>
                        </>
                        
                    ) : (
                        <>
                            <Image width={12} height={12} className='inline dark:hidden' src={IMAGES.MINUS_ICON_BLACK} loader={gumletLoader} alt='plus_icon'/>
                            <Image width={12} height={12} className='dark:inline hidden' src={IMAGES.MINUS_ICON_WHITE} loader={gumletLoader} alt='plus_icon'/>
                        </>
                        
                    )
                }
            </div>
            <div className=' ml-5 rtl:ml-0 rtl:mr-5 mobile:text-sm font-semibold text-xl text-text-primary-light dark:text-text-secondary-light'>
                {question}
            </div>
        </div >
        <div className={appClsx(`${isOpen ? "inline" : "hidden"} mobile:text-sm mt-2 mb-5 mobile:ml-0 ml-8 rtl:ml-0 rtl:mr-10 font-normal text-base text-text-tertiary-light dark:text-text-tertiary-dark`)}>{answer}</div>
    </div> 
  )
}

export default FaqCard