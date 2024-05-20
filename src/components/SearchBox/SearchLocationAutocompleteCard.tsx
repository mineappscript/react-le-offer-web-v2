import { gumletLoader } from '@/lib/gumlet';
import { IMAGES } from '@/lib/images';
import Image from 'next/image';
import React, { FC } from 'react';

export type LocationInformation = {
  description: string;
};

export type Props = {
  item: LocationInformation;
  cardNumber: number;
  selectedAddressFromLocationBox: (key: number) => void;
  setIsLocationTextBoxFocused: (isFocused: boolean) => void;
};

const SearchLocationAutocompleteCard: FC<Props> = ({
  item,
  cardNumber,
  selectedAddressFromLocationBox,
  setIsLocationTextBoxFocused,
}) => {
  const selectingALocation = (cardNumber: number) => {
    selectedAddressFromLocationBox(cardNumber);
    setIsLocationTextBoxFocused(true);
  };

  return (
    <div
      onClick={() => selectingALocation(cardNumber)}
      className="cursor-pointer dark:hover:bg-menu-hover hover:bg-bg-tertiary-light w-full h-16 flex items-center justify-between"
    >
      <div className="flex items-center w-full h-full">
        <div className="mr-2">
          <div className="h-12 w-12 flex items-center justify-center">
            <Image width={24} height={24} src={IMAGES.LOCATION_ICON_WHITE} loader={gumletLoader} alt="category-icon" />
          </div>
        </div>
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="text-sm font-medium line-clamp-1">{item.description}</div>
        </div>
      </div>
      <div className="ml-2">
        <div className="h-12 w-12 flex items-center justify-center">
          <Image width={12} height={12} src={IMAGES.UP_LEFT_ARROW_ICON} loader={gumletLoader} alt="up-left-arrow" />
        </div>
      </div>
    </div>
  );
};

export default SearchLocationAutocompleteCard;
