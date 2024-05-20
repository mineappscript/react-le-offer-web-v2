import Image from 'next/image';
import React, { ChangeEvent, FC, useState } from 'react';
import SearchUserAndCategoryCard from './SearchUserAndCategoryCard';
import { gumletLoader } from '@/lib/gumlet';
import { IMAGES } from '@/lib/images';
import { appClsx } from '@/lib/utils';
import SearchLocationAutocompleteCard from './SearchLocationAutocompleteCard';
import { SearchItems, SearchUsers } from '@/store/types';
import SearchItemsAndCategoryCard from './SearchItemsAndCategoryCard copy';
import { HydrationGuard } from '../Ui/HydrationGuard';

interface PlacePredictions {
  place_id: string;
  description: string;
}

export type Props = {
  className: string;
  searchItemAndUserDrower: boolean;
  setSearchItemAndUserDrower: React.Dispatch<React.SetStateAction<boolean>>;
  handleGetLocationHelper: () => void;
  handleRemoveLocationHelper: () => void;
  handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
  address: string;
  placesService: {
    getDetails: (
      options: {
        placeId: string;
      },
      callback: () => void
    ) => void;
  } | null;
  placePredictions: PlacePredictions[];
  getPlacePredictions: (opt: google.maps.places.AutocompletionRequest) => void;
  selectedAddressFromLocationBox: (key: number) => void;
  formData: {
    search: string;
    location: string;
  };
  products: SearchItems[] | SearchUsers[];
  handleOptionSelect: (option: string) => void;
  selectedOption: string;
};

export type heroSection = {
  title: string;
  searchUserandItem: { users: string; items: string };
  searchItem: { placeholder: string };
  searchPlace: { placeholder: string };
  button: string;
  popularSearch: string;
};

const SearchUserAndCategoryDrower: FC<Props> = ({
  className,
  searchItemAndUserDrower,
  setSearchItemAndUserDrower,
  handleGetLocationHelper,
  handleRemoveLocationHelper,
  address,
  handleOnChange,
  placePredictions,
  getPlacePredictions,
  selectedAddressFromLocationBox,
  formData,
  products,
  handleOptionSelect,
  selectedOption,
}) => {
  // const { t } = useTranslation('common');
  //   const heroSection:heroSection = t('page.header.heroSection', { returnObjects: true });

  const [isUserOrItem, setIsUserOrItem] = useState(true);
  const [isLocationTextBoxFocused, setIsLocationTextBoxFocused] = useState(true);

  const removeLocation = () => {
    handleRemoveLocationHelper();
    setIsLocationTextBoxFocused(false);
  };

  return (
  
      <div
        className={appClsx(
          `h-full overflow-y-scroll fixed flex-col dark:bg-bg-primary-dark dark:text-text-primary-dark bg-bg-secondary-light inset-0 z-50 flex `,
          className
        )}
      >
        {/* <div className='border-2 w-full mx-4 relative'> */}
        <div className="sticky top-0 py-2  bg-bg-secondary-light dark:bg-bg-primary-dark">
          <div className="relative mx-4 flex items-center justify-center my-3 transition delay-0 ease-in duration-1000">
            <Image
              className="hover:cursor-pointer hover:scale-125 absolute left-1 dark:hidden"
              width={12}
              height={11}
              src={IMAGES.BACK_ARROW_ICON_BLACK}
              alt="back-arrow-icon"
              onClick={() => setSearchItemAndUserDrower(!searchItemAndUserDrower)}
              loader={gumletLoader}
            />
            <Image
              className="hover:cursor-pointer hover:scale-125 absolute left-1 hidden dark:inline-block"
              width={12}
              height={11}
              src={IMAGES.BACK_ARROW_ICON_WHITE}
              alt="back-arrow-icon"
              onClick={() => setSearchItemAndUserDrower(!searchItemAndUserDrower)}
              loader={gumletLoader}
            />
            <span className="text-lg font-bold">Search</span>
          </div>

          <div className="relative mx-4 flex items-center mb-4">
            <Image
              width={20}
              height={20}
              className="absolute left-4 rtl:right-4 dark:hidden"
              src={IMAGES.SEARCH_ICON_BLACK}
              loader={gumletLoader}
              alt="search_icon"
            />
            <Image
              width={20}
              height={20}
              className="absolute left-4 rtl:right-4 hidden dark:inline-block"
              src={IMAGES.SEARCH_ICON_WHITE}
              loader={gumletLoader}
              alt="search_icon"
            />
            <input
              className="border-border-tertiary-light dark:border-border-tertiary-dark dark:bg-bg-quinary-dark focus:border-2 focus:!border-brand-color dark:text-bg-tertiary-light px-11 rtl:px-5 pr-4 rtl:pr-12 text-sm outline-none border rounded-md h-12 w-full focus:border-primary bg-bg-tertiary-light"
              type="text"
              name="search"
              onFocus={() => setIsLocationTextBoxFocused(true)}
              value={formData.search}
              onChange={(e) => handleOnChange(e)}
            />
          </div>

          <div className="relative mx-4 flex items-center mb-4">
            <Image
              width={20}
              height={20}
              className="absolute left-4 rtl:right-4 dark:hidden"
              src={IMAGES.LOCATION_ICON_BLACK}
              loader={gumletLoader}
              alt="location-icon"
            />
            <Image
              width={20}
              height={20}
              className="absolute left-4 rtl:right-4 hidden dark:inline-block"
              src={IMAGES.LOCATION_ICON_WHITE}
              loader={gumletLoader}
              alt="location-icon"
            />
            <input
              className="border-border-tertiary-light dark:border-border-tertiary-dark dark:bg-bg-quinary-dark focus:border-2 focus:!border-brand-color dark:text-bg-tertiary-light px-11 rtl:px-5 pr-10 rtl:pr-12  text-sm outline-none border rounded-md h-12 w-full focus:border-primary bg-bg-tertiary-light"
              name="location"
              autoComplete="off"
              type="text"
              onFocus={() => setIsLocationTextBoxFocused(false)}
              value={address}
              onChange={(e) => {
                handleOnChange(e);
                getPlacePredictions({ input: e.target.value });
              }}
            />

            <HydrationGuard>

            {
              address !== "" ? (
                <>
                  <Image
                    width={17}
                    height={17}
                    className={`absolute right-4 rtl:right-[95%] cursor-pointer transition duration-75 hover:scale-105 dark:hidden inline`}
                    src={IMAGES.CROSS_ICON}
                    alt="location-target-icon"
                    loader={gumletLoader}
                    onClick={removeLocation}
                  />
                  <Image
                    width={17}
                    height={17}
                    className={`absolute right-4 rtl:right-[95%] cursor-pointer transition duration-75 hover:scale-105 dark:inline hidden`}
                    src={IMAGES.CROSS_ICON_WHITE}
                    alt="location-target-icon"
                    loader={gumletLoader}
                    onClick={removeLocation}
                  />
                </>
              ) : null
            }
            </HydrationGuard>
          </div>
        </div>

        {isLocationTextBoxFocused ? (
          <>
            <div className="sticky top-[196px] dark:bg-bg-primary-dark  bg-bg-secondary-light flex items-center justify-around mb-4 h-12 border-b-2 dark:border-b-border-tertiary-dark border-border-tertiary-light">
              <div
                className="hover:cursor-pointer h-[98%] w-[25%] flex flex-col items-center justify-center"
                onClick={() => {
                  setIsUserOrItem(true);
                  handleOptionSelect('Items');
                }}
              >
                <div
                  className={` h-full w-full ${isUserOrItem ? 'text-primary' : ''}  flex items-center justify-center `}
                >
                  Items
                </div>
                <div
                  className={`transition-all duration-100 ease-in ${
                    isUserOrItem ? 'border-brand-color border-[3px] rounded-t-2xl' : ''
                  }  w-full`}
                ></div>
              </div>

              <div
                className="h-[98%] w-[25%] flex flex-col items-center justify-center"
                onClick={() => {
                  setIsUserOrItem(false);
                  handleOptionSelect('Users');
                }}
              >
                <div
                  className={` hover:cursor-pointer ${
                    !isUserOrItem ? 'text-primary' : ''
                  } h-full w-full flex items-center justify-center`}
                >
                  Users
                </div>
                <div
                  className={`transition-all duration-100 ease-in ${
                    !isUserOrItem ? 'border-brand-color border-[3px] rounded-t-2xl' : ''
                  } w-full `}
                ></div>
              </div>
            </div>
            
        

              <div className="h-full overflow-y-scroll border-primary px-4 divide-y-2 dark:divide-border-tertiary-dark divide-border-tertiary-light">
                {selectedOption == 'Items'
                  ? (products as SearchItems[])?.map((item, index) => (
                      <>
                        <SearchItemsAndCategoryCard key={index} item={item} />
                      </>
                    ))
                  : (products as SearchUsers[])?.map((item, index) => (
                      <>
                        <SearchUserAndCategoryCard key={index} item={item} />
                      </>
                    ))}
              </div>
        
          </>
        ) : placePredictions.length ? (
          <>
            <div className="h-full overflow-y-scroll border-primary px-4 divide-y-2 dark:divide-border-tertiary-dark divide-border-tertiary-light">
              <div className="flex items-center my-4 hover:cursor-pointer" onClick={() => handleGetLocationHelper()}>
                <Image
                  className="hover:scale-105 "
                  width={20}
                  height={20}
                  src={IMAGES.LOCATION_TARGET_ICON}
                  alt="current-location-mark"
                  loader={gumletLoader}
                />

                <div className=" text-xs ml-2 font-medium">Current location</div>
              </div>
              {
                // isUserOrItem ? () : ()
                placePredictions.map((item, index) => (
                  <>
                    <SearchLocationAutocompleteCard
                      key={index}
                      cardNumber={index}
                      item={item}
                      selectedAddressFromLocationBox={selectedAddressFromLocationBox}
                      setIsLocationTextBoxFocused={setIsLocationTextBoxFocused}
                    />
                    {/* <p> {item?.description}</p>  */}
                  </>
                ))
              }
            </div>
          </>
        ) : (
          <div className=" px-4 h-full flex flex-col overflow-y-scroll">
            <div className="flex items-center my-4 hover:cursor-pointer" onClick={() => handleGetLocationHelper()}>
              <Image
                className="hover:scale-105 "
                width={20}
                height={20}
                src={IMAGES.LOCATION_TARGET_ICON}
                alt="current-location-mark"
                loader={gumletLoader}
              />

              <div className=" text-xs ml-2 font-medium">Current location</div>
            </div>
          </div>
        )}
      </div>


  );
};

export default SearchUserAndCategoryDrower;
