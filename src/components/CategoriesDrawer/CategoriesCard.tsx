import { gumletLoader } from '@/lib/gumlet';
import { IMAGES } from '@/lib/images';
import { categories } from '@/store/types';
import Image from 'next/image';
import React, { FC, useState } from 'react';
import SubCategoriesCard from './SubCategoriesCard';
import { STATIC_IMAGE_URL } from '@/config';

type CategoryCardProps = {
  data: categories;
};

const CategoriesCard: FC<CategoryCardProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`!transition  !duration-700 !ease-in flex flex-col h-20 ${isOpen && '!h-fit'}`}>
      <div
        className="flex  items-center justify-between h-20 dark:hover:bg-menu-hover hover:bg-bg-octonary-light cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <Image
            width={40}
            height={40}
            className="w-10 h-10 mr-4 rtl:mr-0 rtl:ml-4"
            src={`${STATIC_IMAGE_URL}/${data.images.website}`}
            alt="category-icon"
          />
          {/* <Image width={40} height={40} className='w-10 h-10 mr-4 rtl:mr-0 rtl:ml-4' src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" alt="category-icon" /> */}

          <span className="text-sm truncate">{typeof data.title === 'string' ? data.title : data.title.en}</span>
        </div>
        <div>
          {data.child.length !== 0 ? (
            isOpen ? (
              <>
                <Image
                  width={12}
                  height={7}
                  className="mr-4 rtl:ml-4 dark:hidden inline"
                  src={IMAGES.UP_ARROW_ICON_BLACK}
                  loader={gumletLoader}
                  alt="up-arrow-icon"
                />
                <Image
                  width={12}
                  height={7}
                  className="mr-4 rtl:ml-4 dark:inline hidden"
                  src={IMAGES.UP_ARROW_ICON_WHITE}
                  loader={gumletLoader}
                  alt="up-arrow-icon"
                />
              </>
            ) : (
              <>
                <Image
                  width={12}
                  height={7}
                  className=" mr-4 rtl:ml-4 dark:hidden inline"
                  src={IMAGES.DOWN_ARROW_ICON_BLACK}
                  loader={gumletLoader}
                  alt="down-arrow-icon"
                />
                <Image
                  width={12}
                  height={7}
                  className=" mr-4 rtl:ml-4 dark:inline hidden"
                  src={IMAGES.DOWN_ARROW_ICON_WHITE}
                  loader={gumletLoader}
                  alt="down-arrow-icon"
                />
              </>
            )
          ) : null}
        </div>
      </div>

      <div className={`${!isOpen && 'hidden'} h-full  flex flex-col ml-11 rtl:ml-0 rtl:mr-11`}>
        {typeof data.child === 'string' ? (
          <></>
        ) : (
          data.child.map((item, index) => <SubCategoriesCard key={index} data={item} />)
        )}
      </div>
    </div>
  );
};

export default CategoriesCard;
