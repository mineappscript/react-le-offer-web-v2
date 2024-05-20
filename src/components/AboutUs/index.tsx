import React, { FC } from 'react';
import AboutUsDescription from './AboutUsDescription';
import SectionTitle from '../Ui/SectionTitle';

export type Props = {
  data: {
    title: string;
    desc: string[];
  }[];
};

const AboutUs: FC<Props> = ({ data }) => {
  return (
    <>
      {data.map((item, index) => (
        <div key={index}>
          <SectionTitle className="!text-2xl  mobile:!text-base mobile:font-semibold pt-12 pb-7 border-b border-border-tertiary-light dark:border-border-tertiary-dark">
            {item.title}
          </SectionTitle>
          <AboutUsDescription desc={item.desc} />
        </div>
      ))}
    </>
  );
};

export default AboutUs;
