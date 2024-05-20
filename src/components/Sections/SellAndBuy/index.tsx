import React from 'react';

import ServiceDetails from '@/containers/serviceDetails';
import { useTranslation } from 'next-i18next';
import SectionTitle from '@/components/Ui/SectionTitle';
interface FlowSection {
  title: string;
  section: {
    heading: string;
    subHeading: string;
    image: string;
  }[];
}

const SellAndBuy: React.FC = () => {
  const { t } = useTranslation('common');

  const flowSection: FlowSection = t('page.flowSection', { returnObjects: true });

  return (
    <div className=" sm:py-12 mobile:py-0 mobile:mt-9 flex flex-col items-center ">
      <div className=" text-center pb-12 mobile:pb-5 mobile: max-w-[329px] ">
        <SectionTitle>{flowSection.title}</SectionTitle>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 place-items-center">
        <ServiceDetails data={flowSection.section} />
      </div>
    </div>
  );
};

export default SellAndBuy;
