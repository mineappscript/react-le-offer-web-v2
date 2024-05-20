import React, { FC } from 'react';
import SingleCard from './SingleCard';

export type Props = {
  data: {
    heading: string,
    subHeading: string,
    image: string,
  }[]
}

const ServiceDetails: FC<Props> = ({ data }) => {
  return (
    <>
      {data?.map((_el, idx) => {
        return (
          <SingleCard key={idx} heading={_el.heading} image={_el.image} subHeading={_el.subHeading}/>
        );
      })}
    </>
  );
};

export default ServiceDetails;
