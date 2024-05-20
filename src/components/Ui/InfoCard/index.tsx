import { appClsx } from '@/lib/utils'
import React, { FC } from 'react'

type InfoCardProps={
    index:number,
    title:string,
    items:string[]
}

const InfoCard:FC<InfoCardProps> = ({index,items,title}) => {
  return (
    <div className="flex flex-col mb-7 mobile:mb-5">
        <div className={appClsx(`text-sm mobile:text-base font-semibold mobile:mb-3 text-text-primary-light dark:text-text-primary-dark ${index===0 ? "mb-5" : "mb-2"}`)}>{title}</div>
        <div className="flex flex-wrap">
            {
            items.map((innerItem,k)=>(
                <div key={k} className={`flex items-center text-nowrap text-xs mobile:text-sm font-normal ${index===0 ? "text-text-primary-light border-r-[1.5px] mr-2 pr-2 border-border-senary-light dark:border-border-primary-dark dark:text-text-primary-dark" : "text-text-quaternary-dark"}`}>
                {innerItem}
                {
                    index !== 0 ? (
                    <span className=" mx-1.5 text-base  text-text-tertiary-light">•</span>
                    ) : null
                }
                </div>
            ))
            }

        </div>
    </div>
  )
}

export default InfoCard