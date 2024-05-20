import React, { FC } from 'react';
// import SectionTitle from '../SectionTitle/SectionTitle';
import { Product } from '@/store/types/productTypes';
import ProductCard from '@/components/Ui/ProductCard';

export type Props = {
  data: Product[];
};

const HighlightedProducts: FC<Props> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-x-5 gap-y-7">
      {data?.slice(0, 5).map((product, index) => {
        return <ProductCard key={index} product={product} />;
      })}
    </div>
  );
};

export default HighlightedProducts;
