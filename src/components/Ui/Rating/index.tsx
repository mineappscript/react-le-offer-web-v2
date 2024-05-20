import { appClsx } from '@/lib/utils';
import React, { FC } from 'react';
// import PropTypes from "prop-types"

export type Props = {
  value: number;
  text?: string;
  color?: string;
  itemClassName?: string;
  className?: string;
};

const Rating: FC<Props> = ({ value, text, itemClassName = '', className = '' }) => {
  return (
    <div className="rating">
      <span className={itemClassName}>
        <i
          className={appClsx(
            value >= 1
              ? 'fa-solid fa-star'
              : value >= 0.5
              ? 'fa-regular fa-star-half-stroke rtl:scale-x-[-1]'
              : 'fa-regular fa-star',
            'text-brand-color',
            className
          )}
        ></i>
      </span>
      <span className={itemClassName}>
        <i
          className={appClsx(
            value >= 2
              ? 'fa-solid fa-star'
              : value >= 1.5
              ? 'fa-regular fa-star-half-stroke rtl:scale-x-[-1]'
              : 'fa-regular fa-star',
            'text-brand-color',
            className
          )}
        ></i>
      </span>
      <span className={itemClassName}>
        <i
          className={appClsx(
            value >= 3
              ? 'fa-solid fa-star'
              : value >= 2.5
              ? 'fa-regular fa-star-half-stroke rtl:scale-x-[-1]'
              : 'fa-regular fa-star',
            'text-brand-color',
            className
          )}
        ></i>
      </span>
      <span className={itemClassName}>
        <i
          className={appClsx(
            value >= 4
              ? 'fa-solid fa-star'
              : value >= 3.5
              ? 'fa-regular fa-star-half-stroke rtl:scale-x-[-1]'
              : 'fa-regular fa-star',
            'text-brand-color',
            className
          )}
        ></i>
      </span>
      <span className={itemClassName}>
        <i
          className={appClsx(
            value >= 5
              ? 'fa-solid fa-star'
              : value >= 4.5
              ? 'fa-regular fa-star-half-stroke rtl:scale-x-[-1]'
              : 'fa-regular fa-star',
            'text-brand-color',
            className
          )}
        ></i>
      </span>
      <span className={itemClassName}>{text && text}</span>
    </div>
  );
};

Rating.defaultProps = {
  color: '#f8e825',
};

// Rating.propTypes={
//     value:PropTypes.number.isRequired,
//     text:PropTypes.string.isRequired,
//     color:PropTypes.string.isRequired,
// }

export default Rating;
