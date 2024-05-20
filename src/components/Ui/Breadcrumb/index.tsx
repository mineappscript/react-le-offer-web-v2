import { appClsx } from '@/lib/utils';
import React, { FC } from 'react';

export type Props = {
  steps: string[];
  className?: string;
};

const Breadcrumb: FC<Props> = ({ steps, className }) => {
  return (
    <ol
      className={appClsx(
        'flex space-x-2 text-sm mobile:text-xs font-normal dark:text-text-quaternary-dark text-text-tertiary-light',
        className
      )}
    >
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <li
            className={`rtl:ml-2 ${index === steps.length - 1 ? 'text-gray-500' : 'text-blue-600'} ${
              steps.length == index + 1 && 'text-brand-color'
            }`}
          >
            {step}
          </li>
          {index < steps.length - 1 && <li className="">&gt;</li>}
        </React.Fragment>
      ))}
    </ol>
  );
};

// Breadcrumb.propTypes = {
//   steps: PropTypes.arrayOf(PropTypes.string).isRequired
// };

export default Breadcrumb;
