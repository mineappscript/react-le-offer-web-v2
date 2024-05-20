import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from '@/components/Ui/Button';
import { useRouter } from 'next/router';
import FormHeader from '@/components/Form/FormHeader';
import FormSubHeader from '@/components/Form/FormSubHeader';
import { useTranslation } from 'next-i18next';
import PhoneNumberInput from '@/components/Form/PhoneNumberInput';
import authApi from '@/store/apiSlices/auth';
import { OtpDataWithVerificationId, RequestSendVerificationCodePayload } from '@/store/types';
import { useActions } from '@/store/utils/hooks';
import { SIGN_IN_PAGE, SIGN_UP_PAGE } from '@/routes';

export type loginWithPhone = {
  title: string;
  message: string;
  phonePlaceholder: string;
  continueBtn: string;
  or: string;
  loginWithEmail: string;
  connectWith: string;
  google: string;
  facebook: string;
  signUpPrompt: string;
  signUpPromptLink: string;
  otherLoginOptions: string;
};

const LoginWithPhone = () => {
  const { t } = useTranslation('auth');
  const loginWithPhoneData: loginWithPhone = t('page.loginWithPhone', { returnObjects: true });

  const router = useRouter();
  // const { page } = router.query;

  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [realPhoneNumber, setRealPhoneNumber] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const [countryCode, setCountryCode] = useState<string>('');
  const { setOtpVerificationDetailsDispatch } = useActions();

  const handlePhoneInputChange = (
    value: string,
    data: { dialCode: string },
    event: React.ChangeEvent<HTMLInputElement>,
    formattedValue: string
  ) => {
    setLoginError('');

    const countryCodes = data?.dialCode;
    const phoneNumbers = value;
    const realPhone = phoneNumbers?.substring(countryCodes?.length);
    setCountryCode(countryCodes);
    setRealPhoneNumber(realPhone);
    setPhoneNumber(formattedValue);
  };

  const [sendVerificationCode] = authApi.useSendVerificationCodeMutation();



  const loginWithPhone = async () => {
    setIsLoading(true);
    try {
      const reqPayload: RequestSendVerificationCodePayload = {
        countryCode: `+${countryCode}`,
        phoneNumber: realPhoneNumber,
        trigger: 2,
      };

      const { data } = await sendVerificationCode(reqPayload).unwrap();

      if (data) {
        const otpVerificationPayload: OtpDataWithVerificationId = {
          countryCode: `+${countryCode}`,
          phoneNumber: realPhoneNumber,
          verificationId: data.verificationId,
          expiryTime: data.expiryTime,
        };

        setOtpVerificationDetailsDispatch(otpVerificationPayload);

        setIsLoading(false);

        router.push(`${SIGN_IN_PAGE}?step=3`);
      }
    } catch (e) {
      setIsLoading(false);
      const error = e as { data: { message: string } };
      if (error.data && error.data.message) {
        setLoginError(error.data.message);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  useEffect(() => {
    //to remove timer from localstorage if the user backs from the screen
    localStorage.removeItem('timer');

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        loginWithPhone();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [loginWithPhone]);


  return (
    <>
      <div className="mobile:px-4 sm:max-w-[408px] w-full h-full flex flex-col items-center justify-start">
        <FormHeader>{loginWithPhoneData.title}</FormHeader>
        <FormSubHeader>{loginWithPhoneData.message}</FormSubHeader>

        {/* <FormInput label={loginWithPhoneData.phonePlaceholder} error=''  type="number" name="phoneNumber"/> */}
        <PhoneNumberInput
          label={loginWithPhoneData.phonePlaceholder}
          error={loginError}
          value={phoneNumber}
          onChange={handlePhoneInputChange}
          required={true}
          // country={myLocation.country.toLocaleLowerCase()}
          country="in"

        />

        <Button buttonType="primary" isLoading={isLoading} isDisabled={isLoading} onClick={() => loginWithPhone()}>
          {loginWithPhoneData.continueBtn}
        </Button>

        <Link className="font-bold text-brand-color" href={`${SIGN_IN_PAGE}?step=1`}>
          {' '}
          {loginWithPhoneData.otherLoginOptions}

        </Link>
      </div>

      <div className="mb-7 text-sm font-semibold">
        <span className="text-text-primary-light dark:text-text-primary-dark">{loginWithPhoneData.signUpPrompt} </span>
        <Link className="font-bold text-brand-color" href={SIGN_UP_PAGE}>
          {loginWithPhoneData.signUpPromptLink}
        </Link>
      </div>
    </>
  );
};

export default LoginWithPhone;
