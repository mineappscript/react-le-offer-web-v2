import React from 'react';
import CustomerTestimonial from '../CustomerTestimonial';
import { useTranslation } from 'next-i18next';
import SectionTitle from '@/components/Ui/SectionTitle';

type Testimonial = {
  title: string;
  comment: string;
  userName: string;
  ratings: number;
};

export type translateType = {
  title: string;
  testimonials: Testimonial[];
};

const TestimonialSection: React.FC = () => {
  const { t } = useTranslation('common');
  const _text: translateType = t('page.userTestimonials', { returnObjects: true });
  return (
    <div className=" py-12 mobile:py-0 mobile:mt-9 w-100">
      <div className="">
        <SectionTitle className="text-center !py-0 mb-5">{_text?.title}</SectionTitle>
      </div>
      <div className=" grid text-center md:text-left mobile:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 mobile:gap-4 place-content-center place-items-center ">
        <CustomerTestimonial data={_text?.testimonials} />
      </div>
    </div>
  );
};

export default TestimonialSection;
