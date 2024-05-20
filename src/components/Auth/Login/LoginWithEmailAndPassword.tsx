
import React, { ChangeEvent, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IMAGES } from '@/lib/images';
import Button from '@/components/Ui/Button';
import { useRouter } from 'next/router';
import { gumletLoader } from '@/lib/gumlet';
import FormHeader from '@/components/Form/FormHeader';
import FormSubHeader from '@/components/Form/FormSubHeader';
import FormInput from '@/components/Form/FormInput';
import { useTranslation } from 'next-i18next';
import { RequestLoginPaylodWithEmail } from '@/store/types';
import platform from 'platform';
import { generateDeviceId } from '@/helper/generateDeviceId';
import authApi from '@/store/apiSlices/auth';
import { useActions } from '@/store/utils/hooks';
import ForgotPasswordMainModel from '@/components/AuthModels/ForgotPassword/ForgotPasswordMainModel';
import { SIGN_IN_PAGE, SIGN_UP_PAGE } from '@/routes';


export type LoginWithEmail = {
  loginPrompt: string;
  continueMessage: string;
  emailPlaceholder: string;
  passwordPlaceholder: string;
  forgotPassword: string;
  continueButton: string;
  or: string;
  loginWithPhone: string;
  connectWith: string;
  google: string;
  facebook: string;
  signUpPrompt: string;
  signUpPromptLink: string;
  otherSignUpOptions: string
};

const LoginWithEmailAndPassword = () => {
  const { t } = useTranslation('auth');
  const LoginWithEmail: LoginWithEmail = t('page.loginWithEmail', { returnObjects: true });

  const router = useRouter();
  const [login] = authApi.useLoginMutation();
  const { setUserDetailsDispatch } = useActions();

  const [showAndHidePassword, setShowAndHidePassword] = useState(false);
  const [loginErrorForEmail, setLoginErrorForEmail] = useState<string>("");
  const [passwordError, setPasswrodError] = useState<string>("");
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginErrorForEmail("");
    setPasswrodError("")


    const { name, value } = e.target;
    if (name === "password" && value.length > 12) {
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const deviceId = generateDeviceId();

  // Email validation function
  const validateEmail = (email: string) => {
    if (!email) {
      // If email is empty, return true without validation
      return true;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const changeForgotPasswordModal = () => {
    setIsForgotPasswordModalOpen(!isForgotPasswordModalOpen);
  }

  let isValidEmail
  const loginWithEmail = async () => {
    isValidEmail = validateEmail(formData.email)
    if (!isValidEmail) {
      setLoginErrorForEmail("Incorrect Email")
      return
    }

    try {
      const reqPayloadForLogin: RequestLoginPaylodWithEmail = {
        password: formData.password,
        appVersion: "1",
        loginType: "4",
        deviceOs: platform?.os?.family as string + "-" + platform?.os?.version as string,
        browserVersion: platform.version as string,
        deviceTypeCode: 3,
        deviceId,
        deviceMake: platform.name as string,
        deviceModel: platform.version as string,
        email: formData.email,
      };

      const { data } = await login(reqPayloadForLogin).unwrap();

      if (data) {
        setUserDetailsDispatch(data);
        router.push('/');
      }
    } catch (e) {
      const error = e as { data: { message: string }, status: number };
      console.error("error==>", error)
      if (error.status == 409) {
        setPasswrodError(error.data.message)
      } else if (error.status == 422) {
        setLoginErrorForEmail(error.data.message)
      }
      else {
        setLoginErrorForEmail(error.data.message);

      }
    }
  };

  return (
    <>
      <div className='mobile:px-4 sm:max-w-[408px] w-full h-full flex flex-col items-center justify-start'>

        <FormHeader>{LoginWithEmail.loginPrompt}</FormHeader>
        <FormSubHeader>{LoginWithEmail.continueMessage}</FormSubHeader>

        {/* Email input with error message */}
        <FormInput
          label={LoginWithEmail.emailPlaceholder}
          error={!isValidEmail && loginErrorForEmail}
          type="email"
          name="email"
          value={formData.email}
          onChange={(e) => onChange(e)}
          required
        />

        <div className='mb-6 relative w-full flex flex-col'>
          <FormInput
            error={passwordError && passwordError}
            mainClassName='mb-0'
            label={LoginWithEmail.passwordPlaceholder}
            type={`${showAndHidePassword ? "text" : "password"}`}
            name="password"
            value={formData.password}
            onChange={(e) => onChange(e)}
            required
          >
            {/* Password show/hide toggle */}
            {
              showAndHidePassword ? (
                <>
                  <Image className='absolute right-4 dark:hidden inline' width={20} height={16} src={`${IMAGES.PASSWORD_SHOW_ICON_BLACK}`} loader={gumletLoader} onClick={() => setShowAndHidePassword(!showAndHidePassword)} alt="password_show_icon" />
                  <Image className='absolute right-4 dark:inline hidden' width={20} height={16} src={`${IMAGES.PASSWORD_SHOW_ICON_WHITE}`} loader={gumletLoader} onClick={() => setShowAndHidePassword(!showAndHidePassword)} alt="password_hide_icon" />
                </>
              ) : (
                <>
                  <Image className='absolute right-4 dark:hidden inline' width={20} height={16} src={`${IMAGES.PASSWORD_HIDE_ICON_BLACK}`} loader={gumletLoader} onClick={() => setShowAndHidePassword(!showAndHidePassword)} alt="password_show_icon" />
                  <Image className='absolute right-4 dark:inline hidden' width={20} height={16} src={`${IMAGES.PASSWORD_HIDE_ICON_WHITE}`} loader={gumletLoader} onClick={() => setShowAndHidePassword(!showAndHidePassword)} alt="password_hide_icon" />
                </>
              )
            }
          </FormInput>
          {/* <Link href="/forgotpassword" className="text-brand-color text-sm font-medium text-right">{LoginWithEmail.forgotPassword} ?</Link> */}
          <div onClick={changeForgotPasswordModal} className="text-brand-color text-sm font-medium text-right cursor-pointer">{LoginWithEmail.forgotPassword} ?</div>
        </div>

        {/* code to open forgotpassword modal */}
        {isForgotPasswordModalOpen && <ForgotPasswordMainModel changeForgotPasswordModal={changeForgotPasswordModal} />}



        <Button buttonType="primary" onClick={() => loginWithEmail()}>{LoginWithEmail.continueButton}</Button>
        <Link className='font-bold text-brand-color' href={`${SIGN_IN_PAGE}?step=1`}> {LoginWithEmail.otherSignUpOptions}</Link>


      </div>

      <div className='mb-7 text-sm font-semibold'>
        <span className='text-text-primary-light dark:text-text-primary-dark'>{LoginWithEmail.signUpPrompt}</span>
        <Link className='font-bold text-brand-color' href={`${SIGN_UP_PAGE}?step=1`}> {LoginWithEmail.signUpPromptLink}</Link>
      </div>
    </>
  )
}

export default LoginWithEmailAndPassword;