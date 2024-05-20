import Link from 'next/link';
import React, { FC, useState } from 'react';
import { categories } from '@/store/types/categoriesTypes';
import { HydrationGuard } from '../HydrationGuard';

export type Props = {
  item: categories;
};

const HeaderDropdown: FC<Props> = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <HydrationGuard>


    <li
      className="relative sm:hidden md:flex px-4 md:text-sm sm:text-[12px]  h-full flex"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href="/categories" className="truncate h-full flex items-center">
        {item.title as string}
      </Link>
      <div
        className={`z-50 left-0 rtl:right-0 absolute ${
          isHovered ? 'block' : 'hidden'
        } top-[69px] w-40 dark:bg-bg-tertiary-dark rounded-b-md bg-bg-secondary-light text-text-primary-light dark:text-text-primary-dark`}
      >
        {item?.child?.slice(0, 8).map((sub, i) => (
          <div
            className="truncate dark:bg-bg-tertiary-dark dark:text-text-primary-dark rounded-b-md dark:hover:bg-menu-hover p-2 px-4 py-3  font-normal text-text-primary-light hover:bg-bg-tertiary-light"
            key={i}
          >
            <Link href="/categories" className="">
              {sub.title.en}
            </Link>
          </div>
        ))}
      </div>
    </li>
      </HydrationGuard>

  );
};

export default HeaderDropdown;
