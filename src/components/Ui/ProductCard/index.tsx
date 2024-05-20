import Image from 'next/image';
import React, { FC, useState } from 'react';
import { Product } from '@/store/types';
import { STATIC_IMAGE_URL } from '@/config';
import LocationSvg from '../../../../public/assets/svg/location';
import HartSvg from '../../../../public/assets/svg/hart';
import { productsApi } from '@/store/apiSlices/productsApi';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useRouter } from 'next/router';
import { SIGN_IN_PAGE } from '@/routes';

interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {

  const router = useRouter();
  const [isLiked, setIsLiked] = useState(product.isLiked)
  const [likeAndDislikeProduct] = productsApi.useLikeAndDislikeProductMutation();
  const userID = useSelector((state: RootState) => state.auth.userInfo?._id);

  const likeAndDislikedHandle = () => {

    if (userID) {
      setIsLiked(!isLiked)
      likeAndDislikeProduct({
        assetid: product._id,
        like: !isLiked,
        userId: userID
      })
    }
    else {
      router.push(SIGN_IN_PAGE)
    }
  }


  const imageUrl = product?.images?.[0]?.url;
  const src = imageUrl.includes("https")
    ? imageUrl
    : `${STATIC_IMAGE_URL}/${imageUrl}`

  return (
    <>
      <div className="hover:scale-102 transition-all duration-300 ease-in hover:cursor-pointer shadow rounded-xl mobile:max-w-[100%] mobile:max-h-[362px] w-full h-screen max-w-[313px] max-h-[355px] dark:bg-bg-secondary-dark">
        <div className="max-h-[185px] w-full h-full mobile:max-w-full border-brand-color rounded-t-xl">
          <Image
            width={100}
            height={100}
            className=" border-error object-cover w-full h-full rounded-t-xl"
            // src="/images/eq.svg"
            src={src}
            alt="eq.svg"
          />
        </div>
        <div className="p-3">
          <div className="pb-3 border-b border-border-nonary-light ">
            <div className="text-xs font-normal text-text-tertiary-light dark:text-text-senary-dark leading-[18px]">
              {product?.assetTitle}
            </div>
            <div className="py-1 text-base font-semibold text-text-primary-light dark:text-text-primary-dark leading-6">
              {product?.mainCategory}
            </div>
            <div className="text-xs font-normal text-text-tertiary-light dark:text-text-senary-dark leading-[18px]">
              {product?.assetTypeTitle}
            </div>
          </div>
          <div className="">
            <div className="mt-3.5 mb-3 text-xl font-semibold text-text-primary-light dark:text-text-primary-dark leading-5">
              USD {product?.price}
            </div>
            <div className=" flex justify-between ">
              <div className='flex items-center'>

                <LocationSvg height="13" width="11" color="#FDB514" />
                <div className="ml-1 rtl:mr-1  text-xs font-normal text-text-primary-light dark:text-text-primary-dark leading-[18px]">
                  {product?.city}, {product?.zip}
                </div>
              </div>
              <div className='hover:cursor-pointer' onClick={() => likeAndDislikedHandle()}>
                <HartSvg isFilled={isLiked} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className='shadow border-2 border-brand-color rounded-xl max-w-[313px] max-h-[355px] h-screen'>
        <div className="max-h-[185px] h-full w-full">
            <Image
              width={100}
              height={100}
              className="h-full w-full"
              // src="/images/eq.svg"
              src={`${STATIC_IMAGE_URL}/${product?.images?.[0].url}`}
              alt="eq.svg"
            />
        </div> 

        <div >
          content
        </div>
      </div> */}

    </>
  );
};

export default ProductCard;
