import Button from '@/components/Ui/Button';
import { useRouter } from 'next/router';
import { useState, ChangeEvent, KeyboardEvent, useRef, useEffect } from 'react';
import FormHeader from '../Form/FormHeader';
import FormSubHeader from '../Form/FormSubHeader';
import { useTranslation } from 'next-i18next';
import platform from 'platform';
import { generateDeviceId } from '@/helper/generateDeviceId';
import {
  OtpDataWithVerificationId,
  RequestLoginPayload,
  RequestReSendVerificationCodePayload,
  RequestResendOtpData,
  RequestSendVerificationCodePayload,
} from '@/store/types';
import authApi from '@/store/apiSlices/auth';
import { useActions, useAppSelector } from '@/store/utils/hooks';
import { SIGN_IN_PAGE, SIGN_UP_PAGE } from '@/routes';

export type otpVerification = {
  verificationPrompt: string;
  enterCodeMessage: string;
  editButton: string;
  codeArrivalMessage: string;
  timer: string;
  sendAgain: string;
  verifyButton: string;
};

const OTPForm = () => {
  const { t } = useTranslation('auth');
  const otpVerification: otpVerification = t('page.otpVerification', { returnObjects: true });

  const router = useRouter();
  const [otp, setOTP] = useState(['', '', '', '']);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState<number>(0);
  const [signupError,setSignupError]=useState("")

  const [login] = authApi.useLoginMutation();
  const [signup] = authApi.useSignUpMutation();
  const [validVerificationCode] = authApi.useValidVerificationCodeMutation();
  const [reSendVerificationCode] = authApi.useReSendVerificationCodeMutation();
  const [sendVerificationCode] = authApi.useSendVerificationCodeMutation();

  const { setUserDetailsDispatch, setOtpVerificationDetailsDispatch } = useActions();
  const { otpData } = useAppSelector((state) => state.auth);
  // const {countryCode,phoneNumber} =  useAppSelector(state =>state.auth.otpData as OtpData)
  const { countryCode, phoneNumber, emailOrPhone } =
    typeof window !== 'undefined' && localStorage.getItem('otpData')
      ? JSON.parse(localStorage.getItem('otpData')!)
      : null;

  const { expiryTime } = useAppSelector((state) => state.auth?.otpData as OtpDataWithVerificationId);

  const refs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];


  useEffect(() => {
    let interval: NodeJS.Timeout;

    const storedTimer = localStorage.getItem('timer');

    if (expiryTime > 0) {
      if (storedTimer && Number(storedTimer) > 0) {
        setTimer(Number(storedTimer));
      } else {
        setTimer(expiryTime);
      }

      interval = setInterval(() => {
        setTimer((prevTimer) => {
          const newTimer = prevTimer ? prevTimer - 1 : 0;
          if (newTimer === 0) {
            clearInterval(interval);
            localStorage.removeItem('timer'); // Remove timer from local storage
          } else {
            localStorage.setItem('timer', String(newTimer));
          }
          return newTimer;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [expiryTime, otpData]);

  useEffect(() => {
  
    if(isCompleted){
      handleSubmit()
    }

  }, [otp])
  



  const handleFocus = (index: number) => {
    if (refs[index]?.current) {
      refs[index]?.current?.focus();
    }
  };

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(0, 1); // Limit to one character
    }

    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    if (value.length === 1 && index < otp.length - 1) {
      handleFocus(index + 1);
    }

    // Check if all OTP digits are filled
    const isFilled = newOTP.every((digit) => digit.length === 1);
    setIsCompleted(isFilled);

 

  };

  const handleKeyPress = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
      handleFocus(index - 1);
    }
  };

  const resendVerificationCode = async () => {
    if (router.pathname.includes(SIGN_UP_PAGE)) {
      const { countryCode, phoneNumber } =
        typeof window !== 'undefined' && localStorage.getItem('otpData')
          ? JSON.parse(localStorage.getItem('otpData')!)
          : null;

      const reqPayload: RequestSendVerificationCodePayload = {
        countryCode: `${countryCode}`,
        phoneNumber: phoneNumber,
        trigger: 1,
      };

      const { data } = await sendVerificationCode(reqPayload).unwrap();

      if (data) {
        const otpVerificationPayload: OtpDataWithVerificationId = {
          countryCode: `${countryCode}`,
          phoneNumber: phoneNumber,
          verificationId: data.verificationId,
          expiryTime: data.expiryTime,
        };

        setOtpVerificationDetailsDispatch(otpVerificationPayload);
      }
    } else {
      const { countryCode, phoneNumber } =
        typeof window !== 'undefined' && localStorage.getItem('otpData')
          ? JSON.parse(localStorage.getItem('otpData')!)
          : null;

      const reqPayload: RequestReSendVerificationCodePayload = {
        countryCode: `${countryCode}`,
        emailOrPhone: phoneNumber,
        trigger: 2,
        type: 1,
      };

      const { data } = await reSendVerificationCode(reqPayload).unwrap();
      if (data) {
        const otpVerificationPayload: RequestResendOtpData = {
          countryCode: `${countryCode}`,
          emailOrPhone: phoneNumber,
          verificationId: data.verificationId,
          expiryTime: data.expiryTime,
        };

        setOtpVerificationDetailsDispatch(otpVerificationPayload);
      }
    }
  };

  const deviceId = generateDeviceId();

  const handleSubmit = async () => {
    setIsCompleted(false);
    setIsLoading(!isLoading);
    if (router.pathname.includes(SIGN_UP_PAGE)) {
      const password = otp.join('');
      const signUpDataString: string | null = localStorage.getItem('signUpData');
      let reqPayloadForSignUp;
      if (signUpDataString) {
        reqPayloadForSignUp = JSON.parse(signUpDataString);
      }

      const { countryCode, phoneNumber, emailOrPhone } = reqPayloadForSignUp;

      const { verificationId } =
        typeof window !== 'undefined' && localStorage.getItem('otpData')
          ? JSON.parse(localStorage.getItem('otpData')!)
          : null;

      const validVerificationpayload = {
        code: password,
        countryCode: countryCode,
        phoneNumber: phoneNumber || emailOrPhone,
        verificationId: verificationId,
        trigger: 1,
      };
      try{

      const data = await validVerificationCode(validVerificationpayload).unwrap();

      if (data?.message) {
        if (signUpDataString) {
          
          const { data } = await signup(reqPayloadForSignUp).unwrap();

          if (data) {
            localStorage.removeItem('timer');
            setUserDetailsDispatch(data);

            setTimeout(() => {
              setIsLoading(!isLoading);
              setTimeout(() => {
                if (router.pathname.includes(SIGN_UP_PAGE)) {
                  router.push(`${SIGN_UP_PAGE}?step=5`);
                } else {
                  router.push(`/`);
                }
              }, 500);
            }, 500);
          }
        }
      }
    }catch(e){
      const error = e as {data:{message:string}}
      setSignupError(error.data.message)
      setIsLoading(false)
    } 
    } else if (router.pathname.includes(SIGN_IN_PAGE)) {
      const { countryCode, phoneNumber, emailOrPhone, verificationId } =
        typeof window !== 'undefined' && localStorage.getItem('otpData')
          ? JSON.parse(localStorage.getItem('otpData')!)
          : null;

      const password = otp.join('');

      const reqPayloadForLogin: RequestLoginPayload = {
        countryCode: countryCode,
        phoneNumber: phoneNumber || emailOrPhone,
        verificationId: verificationId,
        password,
        appVersion: '1',
        loginType: '1',
        deviceOs: ((platform?.os?.family as string) + '-' + platform?.os?.version) as string,
        browserVersion: platform.version as string,
        deviceTypeCode: 3,
        deviceId, // Assuming deviceId is defined elsewhere
        deviceMake: platform.name as string,
        deviceModel: platform.version as string,
      };
      try{

      const { data } = await login(reqPayloadForLogin).unwrap();

      setUserDetailsDispatch(data);
      router.push('/');
    }catch(e){
      setIsLoading(false)
    }

    }
  };

  const goBack = () => {
    router.back();
  };

  return (
    <>
      {/* <div className={` lg:w-[40%] sm:w-full mobile:w-full px-10 py-7 !pt-[60px] w-[40%] flex flex-col items-center justify-between`}> */}
      <div className=" mobile:px-4 sm:max-w-[408px] w-full mobile:w-full flex flex-col items-center justify-start">
        <FormHeader>{otpVerification.verificationPrompt}</FormHeader>
        <FormSubHeader className=" text-text-quaternary-light">
          {otpVerification.enterCodeMessage} <br />
          {countryCode} {phoneNumber ? phoneNumber : emailOrPhone}{' '}
          <span onClick={() => goBack()} className="text-brand-color cursor-pointer">
            {otpVerification.editButton}
          </span>{' '}
        </FormSubHeader>

        <div className="mt-6 w-full flex items-center justify-center">
          {otp.map((digit, index) => (
            <input
              className="border rounded dark:bg-bg-primary-dark dark:border-border-tertiary-dark dark:text-text-primary-dark border-border-tertiary-light outline-brand-color !w-[62px] h-[62px] text-center"
              autoFocus={index == 0 && true}
              key={index}
              ref={refs[index]}
              type="number"
              value={digit}
              maxLength={1}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value)}
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyPress(index, e)}
              style={{ width: '30px', marginRight: '10px' }}
            />
          ))}
        </div>

        {timer > 0 ? (
          <p className="mt-7 mb-12 text-base font-normal text-text-primary-light dark:text-text-primary-dark text-center">
            {otpVerification.codeArrivalMessage}
            <span className="text-brand-color">
              {' '}
              {Math.floor(timer / 60)} min {timer % 60} sec{' '}
            </span>{' '}
          </p>
        ) : (
          // <p className='mt-7 mb-12 text-brand-color hover:cursor-pointer'>{otpVerification.sendAgain}</p>
          <></>
        )}
        <p style={{ color: 'red' }} >{signupError}</p>

        {/* <input className={`mt-6 hover:cursor-pointer w-[70%] my-2 outline-none h-11 rounded bg-bg-tertiary-light text-sm font-semibold text-text-secondary-color ${isCompleted && "text-text-tertiary-color bg-secondary-light"}`}  type="button" disabled={!isCompleted} value="Verify" onClick={()=>handleSubmit()} /> */}
        {timer > 0 ? (
          <Button
            buttonType="primary"
            isLoading={isLoading}
            className={`mt-6 hover:cursor-pointer w-[70%] my-2 outline-none h-11 rounded bg-bg-tertiary-light dark:bg-bg-undenary-dark text-sm font-semibold !text-[#888888] ${
              isCompleted && '!text-text-tertiary-color !bg-brand-color'
            }`}
            disabled={!isCompleted}
            onClick={() => handleSubmit()}
          >
            {otpVerification.verifyButton}
          </Button>
        ) : (
          <p className="mt-7 mb-12 text-brand-color hover:cursor-pointer" onClick={resendVerificationCode}>
            {otpVerification.sendAgain}
          </p>
        )}
      </div>

      {/* </div> */}
    </>
  );
};

export default OTPForm;
