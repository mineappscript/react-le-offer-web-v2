import { gumletLoader } from '@/lib/gumlet';
import { IMAGES } from '@/lib/images';
import Image from 'next/image';
import { categories } from '@/store/types';
import CategoriesCard from './CategoriesCard';
import { ChangeEvent, useEffect, useState } from 'react';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

type CategoriesDrawerProps = {
  changMenu: () => void;
  isSearchCategoriesDrower: boolean;
  // data?: categories[];
};

const CategoriesDrawer: React.FC<CategoriesDrawerProps> = ({
  isSearchCategoriesDrower,
  changMenu,
  //  data = []
}) => {
  const [searchField, setSearchField] = useState('');
  const [filteredData, setFilterData] = useState<categories[]>([]);
  const { categoriesWithChildren } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const newFilteredMonsters = categoriesWithChildren?.data?.filter((item) => {
      if (typeof item.title === 'string') {
        return item.title.toLocaleLowerCase().includes(searchField);
      }
    });
    setFilterData(newFilteredMonsters);
  }, [searchField, categoriesWithChildren]);
  //removed data from dependency array as it was making the component rerender again and again

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  return (
    <div className="z-10">
      <div
        className={` mobile:hidden transition-opacity ease-in duration-200 ${
          !isSearchCategoriesDrower ? 'opacity-0 pointer-events-none' : 'opacity-100'
        } fixed w-full h-full inset-0`}
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
        onClick={changMenu}
      ></div>

      <div
        className={` fixed h-full right-0 top-0 bottom-0 dark:bg-bg-nonary-dark bg-bg-secondary-light text-text-primary-light dark:text-text-secondary-light max-w-[30%] mobile:max-w-[100%] mobile:w-full transition-all ease-in duration-200  ${
          isSearchCategoriesDrower ? 'w-full opacity-100' : 'w-0 opacity-0'
        } `}
      >
        <div className="pb-5 pt-2 sticky top-0 w-full dark:bg-bg-nonary-dark bg-bg-secondary-light">
          <div className="w-full flex items-center justify-between my-6 font-semibold text-xl px-[28px] ">
            <span className="flex">All Categories</span>
            <Image
              width={14}
              height={14}
              className="cursor-pointer hover:scale-110 dark:hidden"
              onClick={() => changMenu()}
              src={IMAGES.CROSS_ICON}
              alt="cross_icon"
              loader={gumletLoader}
            />
            <Image
              width={14}
              height={14}
              className="cursor-pointer hover:scale-110 hidden dark:inline-block"
              onClick={() => changMenu()}
              src={IMAGES.CROSS_ICON_WHITE}
              alt="cross_icon"
              loader={gumletLoader}
            />
          </div>
          <div className="   w-full relative flex items-center px-[24px]">
            <Image
              width={17}
              height={17}
              className="absolute left-9 rtl:right-9 dark:hidden inline"
              src={IMAGES.SEARCH_ICON_BLACK}
              loader={gumletLoader}
              alt="location-icon"
            />
            <Image
              width={17}
              height={17}
              className="absolute left-9 rtl:right-9 dark:inline hidden"
              src={IMAGES.SEARCH_ICON_WHITE}
              loader={gumletLoader}
              alt="location-icon"
            />
            <input
              onChange={onSearchChange}
              className="w-full pl-9 rtl:pr-9 pr-2 h-11 outline-none dark:text-text-primary-dark dark:bg-bg-quinary-dark dark:border-border-tertiary-dark border-border-tertiary-light bg-bg-tertiary-light focus:border-2 focus:border-brand-color rounded"
              type="search"
              placeholder="search"
            />
          </div>
        </div>

        <div
          className=" w-full overflow-y-scroll h-full divide-y divide-border-tertiary-light dark:divide-border-tertiary-dark px-[24px]"
          style={{ boxSizing: 'border-box', height: 'calc(100vh - 149px)' }}
        >
          {filteredData?.map((item, index) => (
            <CategoriesCard key={index} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesDrawer;
