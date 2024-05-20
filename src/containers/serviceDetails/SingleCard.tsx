
import React, { FC } from 'react'
import Lottie from "lottie-react"

type SingleCardProps={
    heading: string,
    subHeading: string, 
    image: string,
}

const SingleCard:FC<SingleCardProps> = ({heading,image,subHeading}) => {

  return (
    <div  className="max-w-[416px] max-h-[416px]">
        <div className=" h-[300px] pb-6 flex justify-center items-center relative ">
            <Lottie className='h-full' autoPlay={false} loop={false} animationData={require(`../../../public/assets/lotties/${image}`)}/>
        </div>
        <div className="text-center">
            <p className="text-sm md:text-xl text-text-primary-light dark:text-text-primary-dark font-semibold py-2">
            {heading}
            </p>
            <span className="text-xs md:text-base text-text-tertiary-light">{subHeading}</span>
        </div>
    </div>
  )
}

export default SingleCard
