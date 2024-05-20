import { gumletLoader } from '@/lib/gumlet';
import { IMAGES } from '@/lib/images';
import { subCategories } from '@/store/types';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

type SubCategoriesCardProps = {
  data: subCategories;
};

const SubCategoriesCard: React.FC<SubCategoriesCardProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className=" " onClick={() => setIsOpen(!isOpen)}>
        <div className="my-2 flex items-center justify-between pl-3 rtl:pr-3 rtl:rounded-l-none rtl:rounded-r-md dark:hover:bg-menu-hover hover:bg-bg-octonary-light h-[41px] rounded-l-md">
          <Link href="" className="">
            {typeof data.title === 'string' ? data.title : data.title.en}
          </Link>
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

        <div className={`${!isOpen && 'hidden'}  h-full  flex flex-col ml-11 mr-11 rtl:ml-0 rtl:mr-11`}>
          {typeof data.child === 'string' ? (
            <></>
          ) : (
            data.child.map((item, index) => (
              <Link
                href=""
                className="my-1 pl-3 rtl:pr-3 flex items-center dark:hover:bg-menu-hover hover:bg-bg-octonary-light h-[34px] rounded-md"
                key={index}
              >
                {typeof item.title === 'string' ? item.title : item.title.en}
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default SubCategoriesCard;
