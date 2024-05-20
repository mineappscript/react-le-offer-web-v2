// import { gumletLoader } from '@/lib/gumlet';
import { STATIC_IMAGE_URL } from '@/config';
import { Category } from '@/store/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { HydrationGuard } from '../HydrationGuard';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const ImageName = category.title;
  return (
    <HydrationGuard>
    <Link
      href={'/categories'}
      className=" mobile:dark:bg-bg-primary-dark md:dark:bg-bg-secondary-dark  md:bg-bg-tertiary-light h-full w-full md:h-[203px] md:w-[203px] flex-wrap rounded-full md:rounded-lg flex justify-center items-center p-2 transition-all ease-in-out delay-100 hover:cursor-pointer hover:-translate-y-1 hover:scale-110 duration-150 cursor-pointer"
    >
      <div className=" mobile:bg-opacity-0 flex flex-col justify-center items-center ">
        <div className=" mobile:min-w-[60px] mobile:min-h-[60px] mobile:bg-opacity-0 md:dark:bg-bg-tertiary-dark md:rounded-full sm:h-[103px] sm:w-[103px] flex items-center justify-center">
          <Image
            src={`${STATIC_IMAGE_URL}/${category.images.website}`}
            // src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
            width={78}
            height={50}
            alt="category_images"
            className=" h-full w-full"
            // loader={gumletLoader}
          />
        </div>
        <h3 className=" text-xs md:text-base mt-6 text-text-primary-color font-primary font-normal text-center max-w-[154.59]">
          {ImageName}
        </h3>
      </div>
    </Link>
    </HydrationGuard>
  );
};

export default CategoryCard;
