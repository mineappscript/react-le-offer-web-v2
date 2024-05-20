import { appClsx } from '@/lib/utils';
import React, { FC, useState } from 'react';
import PhoneInput, { PhoneInputProps } from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import FormLabel from './FormLabel';

export type Props = {
  country?: string;
  required: boolean;
  label?: string;
  error?: string;
  mainClassName?: string;
  labelClassName?: string;
  className?: string;
  errorClassName?: string;
  children?: string;
} & PhoneInputProps;

const PhoneNumberInput: FC<Props> = ({
  country,
  required,
  children,
  label,
  error,
  mainClassName,
  labelClassName,
  errorClassName,
  className = '',
  ...otherProps
}) => {
  const [phone, setPhone] = useState();

  return (
    <div className={appClsx('mobile:mb-3 mb-5 w-full', mainClassName)}>
      {label && (
        <FormLabel className={appClsx('', labelClassName)}>
          {label}
          {required && '*'}
        </FormLabel>
      )}
      <div className="mobile:mt-1 mt-2 w-full relative">
        <PhoneInput
          country={country || "us"}
          value={phone}
          onChange={() => setPhone(phone)}
          containerStyle={{}}
          inputStyle={{ border: '', width: '100%', height: '100%' }}
          dropdownStyle={{
            background: 'white',
            color: 'black',
          }}
          inputClass={appClsx('!border-none dark:!bg-bg-primary-dark dark:!text-text-primary-dark')}
          searchClass="!border-1 !border-error"
          buttonClass="dark:!border-border-tertiary-dark dark:!bg-bg-primary-dark dark:!text-text-primary-dark "
          dropdownClass={appClsx(
            'my-custom-dropdown my-custom-dropdown-active dark:!bg-bg-primary-dark dark:!text-text-primary-dark '
          )}
          containerClass={appClsx(
            '!border-2 w-full outline-none h-11 border dark:bg-bg-primary-dark dark:border-border-tertiary-dark border-border-tertiary-light rounded',
            className,
            { 'border-error': error }
          )}
          {...otherProps}
        />
        {/* <input />      */}
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

export default PhoneNumberInput;

{
  /* <PhoneInput
  ...
  containerClass="my-container-class"
  inputClass="my-input-class"
  containerStyle={{
    border: "10px solid black"
  }}
  inputStyle={{
    background: "lightblue"
  }}

   containerClass='.....' //css class name
  inputClass='.....'
  buttonClass='.....'
  dropdownClass='.....'
  searchClass='.....'

/> */
}

{
  /* <PhoneInput
              name = "phoneNumber"
              type = "text"
              country={'us'}
              enableAreaCodes={true}
              onlyCountries={['us']}
              areaCodes={{us: ['999']}}
              inputProps={{
                name: 'phone',
                country:'us',
                required: true,
                autoFocus: true
              }}
              value={this.state.phone}
              onChange={this.handleOnChange}

           /> */
}
