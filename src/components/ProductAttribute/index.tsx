import React, { FC } from 'react';

export type Props = {
  data: {
    title: string;
    attribute: {
      name: string;
      value: string;
    }[];
  }[];
};

const ProductAttribute: FC<Props> = ({ data }) => {
  return (
    <>
      {data.map((item, index) => (
        <div className="mobile:mt-6 xl:mt-6 sm:mt-3" key={index}>
          <div className="mobile:text-lg xl:mb-3 sm:mt-2 xl:text-xl lg:text-lg md:text-base sm:text-sm font-semibold text-text-primary-light dark:text-text-quinary-dark">
            {item.title}
          </div>
          <div className="mobile:mt-2 flex flex-col">
            {item.attribute.map((item1, index1) => (
              <div className="mobile:h-9 mobile:text-sm flex items-center justify-between xl:h-14 sm:h-7" key={index1}>
                <span className="xl:text-base lg:text-sm md:text-xs sm:text-[10px] font-normal text-text-tertiary-light dark:text-text-tertiary-dark">
                  {item1.name}
                </span>
                <span className="xl:text-base lg:text-sm md:text-xs sm:text-[10px] text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
                  {item1.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductAttribute;
