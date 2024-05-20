import { appClsx } from '@/lib/utils';
import React, { FC, ReactNode } from 'react';

export type Props = {
  children: ReactNode;
  className?: string;
};

const SectionTitle: FC<Props> = ({ children, className, ...otherProps }) => {
  return (
    <>
      <h2
        className={appClsx(
          ` text-text-primary-light  dark:text-text-primary-dark text-base  md:text-2xl mobile:text-base font-semibold`,
          className
        )}
        {...otherProps}
      >
        {children}
      </h2>
    </>
  );
};

export default SectionTitle;
