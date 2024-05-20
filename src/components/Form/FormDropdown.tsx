import { appClsx } from '@/lib/utils';
import React, { ChangeEventHandler } from 'react';
import FormLabel from './FormLabel';

export type DropdownProps = {
  label: string;
  required: boolean;
  mainClassName?: string;
  menuClass?: string;
  className?: string;
  labelClassName?: string;
  error?: string;
  options: (string | number | string[])[][];
  selectedValue: string | number | string[];

  onSelect: ChangeEventHandler<HTMLSelectElement>;

  id?: string;
  name?: string;
};

export const FormDropdown: React.FC<DropdownProps> = ({
  label,
  required,
  options,
  selectedValue,
  onSelect,
  id,
  name,
  mainClassName,
  labelClassName,
  className,
  menuClass,
  error,
  ...otherProps
}) => {
  return (
    <>
      <div className={appClsx('mobile:mb-3 mb-5 w-full', mainClassName)}>
        {label && (
          <FormLabel className={appClsx('', labelClassName)} htmlFor={name}>
            {label}
            {required && '*'}
          </FormLabel>
        )}

        <div className="mobile:mt-1 mt-2 w-full relative">
          <select
            id={id}
            name={name}
            value={selectedValue}
            onChange={(e) => onSelect(e)}
            className={appClsx(
              'w-full px-4 outline-none h-11 border dark:bg-bg-primary-dark dark:border-border-tertiary-dark dark:text-text-primary-dark border-border-tertiary-light rounded',
              className,
              { 'border-error': error }
            )}
            {...otherProps}
          >
            <option value={selectedValue ? selectedValue : ''}>
              {selectedValue ? selectedValue : 'Select Country'}
            </option>
            {options.map((option, index) => (
              <option
                key={index}
                value={option?.[0]}
                className={appClsx(
                  'w-full px-5 outline-none h-11 border dark:bg-bg-primary-dark dark:border-border-tertiary-dark dark:text-text-primary-dark border-border-tertiary-light rounded',
                  menuClass,
                  { 'border-error': error }
                )}
              >
                {option[0]}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};
