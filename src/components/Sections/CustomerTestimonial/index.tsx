import React from 'react';
import Rating from '../../Ui/Rating';

interface Testimonial {
  ratings: number;
  title: string;
  comment: string;
  userName: string;
}

interface Props {
  data: Testimonial[];
}

const CustomerTestimonial: React.FC<Props> = ({ data }) => {
  return (
    <>
      {data?.map((item, index) => (
        <div
          className=" mobile:shadow mobile:rounded-lg mobile:w-full flex flex-col mobile:items-center mobile:justify-center rtl:text-right w-[306px] h-[241px] dark:bg-bg-primary-dark bg-bg-secondary-light mobile:dark:border dark:border-border-primary-dark"
          key={index}
        >
          <div className=" flex gap-2 place-content-center md:place-content-start">
            <Rating value={item.ratings} key={index} color="" itemClassName="mr-2 text-2xl" />
          </div>
          <div className="flex flex-col mobile:items-center mobile:justify-center pt-3 ">
            <p className=" text-text-primary-light dark:text-text-primary-dark font-semibold text-base py-2">
              {item.title}
            </p>
            <p className=" mobile:text-center text-sm text-text-tertiary-light flex-wrap">{item.comment}</p>
          </div>
          <div className="pt-5">
            <p className="text-base font-medium text-text-primary-light dark:text-text-primary-dark">{item.userName}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default CustomerTestimonial;
