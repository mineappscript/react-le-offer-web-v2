import { appClsx } from '@/lib/utils';
import { FC, InputHTMLAttributes } from 'react';
import FormLabel from './FormLabel';

export type Props = {
  label?: string;
  name: string;
  error?: string;
  mainClassName?: string;
  labelClassName?: string;
  className?: string;
  errorClassName?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<Props> = ({
  children,
  required,
  label,
  error,
  name,
  mainClassName,
  labelClassName,
  errorClassName,
  className,
  ...otherProps
}) => {
  return (
    <div className={appClsx('mobile:mb-3 mb-5 w-full', mainClassName)}>
      {label && (
        <FormLabel className={appClsx('', labelClassName)} htmlFor={name}>
          {label}{required && '*'}
        </FormLabel>
      )}
      <div className=" flex items-center mobile:mt-1 mt-2 w-full relative">
        <input
          className={appClsx(
            'w-full px-5 outline-none h-11 border dark:bg-bg-primary-dark dark:border-border-tertiary-dark dark:text-text-primary-dark border-border-tertiary-light rounded ',
            className,
            { 'border-error dark:border-error': error }
          )}
          name={name}
          {...otherProps}
          autoComplete="off"
        />
        {children}
      </div>
      {error && (
        <span className={appClsx('text-xs font-normal', errorClassName)} style={{ color: 'red' }}>
          {error}
        </span>
      )}
    </div>
  );
};

export default FormInput;
