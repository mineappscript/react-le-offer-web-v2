
import Link from 'next/link'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Button from '@/components/Ui/Button'
import FormInput from '@/components/Form/FormInput'
import FormHeader from '@/components/Form/FormHeader'
import FormSubHeader from '@/components/Form/FormSubHeader'
import FormLabel from '@/components/Form/FormLabel'
import { useTranslation } from 'next-i18next'
import PhoneNumberInput from '@/components/Form/PhoneNumberInput'
import { FormDropdown } from '@/components/Form/FormDropdown'
import { countries } from '@/helper/Countries'
import { OtpData, OtpDataWithVerificationId, RequestPayloadForLogin, RequestSendVerificationCodePayload } from '@/store/types'
import authApi from '@/store/apiSlices/auth'
import { generateDeviceId } from '@/helper/generateDeviceId'
import platform from 'platform'
import { useActions } from '@/store/utils/hooks'
import { useDebounce } from '@/hooks/useDebounce'
import { SIGN_IN_PAGE, SIGN_UP_PAGE } from '@/routes'

export type CompleteSignUp = {
  completeRegistration: string;
  additionalDetailsMessage: string;
  accountTypeLabel: string;
  individualOption: string;
  firstNamePlaceholder: string;
  lastNamePlaceholder: string;
  accountNamePlaceholder: string;
  referralCodePlaceholder: string;
  phonePlaceholder: string;
  companyOption: string;
  companyOptionFirstNamePlaceholder: string;
  companyOptionLastNamePlaceholder: string;
  companyOptionCompanyPlaceholder: string;
  companyOptionAccountNamePlaceholder: string;
  termsAndConditionsMessage: string;
  continueBtn: string;
  alreadyHaveAccount: string;
  alreadyHaveAccountLink: string;
}

const RegistrationDetails = () => {
  const { t } = useTranslation('auth');
  const CompleteSignUp: CompleteSignUp = t('page.completeSignUp', { returnObjects: true });
  const router = useRouter()

  const [isIndividualOrCompany, setIsIndividualOrCompany] = useState(true);
  const [inviteReferralCode, setInViteReferralCode] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const [isFilled, setIsFilled] = useState(false);

  const { setOtpVerificationDetailsDispatch } = useActions();
  const [errorState, setErrorState] = useState({
    firstName: "",
    lastName: "",
    username: "",
    phoneNumber: "",
    country: "",
    companyName: "",

  })

  const [individualData, setIndividualData] = useState({
    accountType: "individual",
    firstName: "",
    lastName: "",
    username: "",
    phoneNumber: "",
    countryCode: "",
    country: "India",
  })

  const [companyData, setCompanyData] = useState({
    accountType: "company",
    firstName: "",
    lastName: "",
    companyName: "",
    username: "",
    phoneNumber: "",
    countryCode: "",
    country: "India",
  })

  const [sendVerificationCode] = authApi.useSendVerificationCodeMutation()
  const [phoneNumberValidation] = authApi.useValidatePhoneNumberMutation()
  const debouncedPhoneNumber = useDebounce({ countryCode: individualData.countryCode || companyData.countryCode, phoneNumber: individualData.phoneNumber || companyData.phoneNumber }, 500);

  useEffect(() => {
    //to remove timer from localstorage if the user backs from the screen
    localStorage.removeItem("timer")
    const checkPhoneNumberValidity = async (value: OtpData) => {

      if (value.countryCode || value.phoneNumber) {
        try {
          const requesPayloadForValidPhoneNumber = {
            countryCode: value.countryCode,
            phoneNumber: value.phoneNumber
          }
          // Make your API call here to check email validity
          const data = await phoneNumberValidation(requesPayloadForValidPhoneNumber).unwrap()

          if (data) {
            setPhoneNumberError("")
          }

        } catch (e) {

          const error = e as { data: { message: string } };
          if (error.data && error.data.message) {
            setPhoneNumberError(error.data.message);
          } else {
            console.error("Unexpected error:", error);
          }

        }
      }

    };


    const fetchPhoneValidity = async () => {
      if (debouncedPhoneNumber) {
        await checkPhoneNumberValidity(debouncedPhoneNumber);
      }
    };

    fetchPhoneValidity();
  }, [debouncedPhoneNumber, phoneNumberValidation]);

  // const [isError,setIsError]=useState(false)

  const onIndividualChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name in errorState) {
      // If it matches, update the errorState with an empty string
      setErrorState(prevState => ({ ...prevState, [name]: "" }));
    }
    // Check if the value contains any special characters, numbers, or spaces
    if (name === "firstName" || name === "lastName") {
      // Check if the value contains any special characters, numbers, or spaces
      if (/[^a-zA-Z]/.test(value)) {
        // If it does, don't update the state
        return;
      }
    }
    setIndividualData({ ...individualData, [name]: value })

  }

  const onCompanyChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name in errorState) {
      // If it matches, update the errorState with an empty string
      setErrorState(prevState => ({ ...prevState, [name]: "" }));
    }
    // Check if the value contains any special characters, numbers, or spaces
    if (name === "firstName" || name === "lastName") {
      // Check if the value contains any special characters, numbers, or spaces
      if (/[^a-zA-Z]/.test(value)) {
        // If it does, don't update the state
        return;
      }
    }
    setCompanyData({ ...companyData, [name]: value })
  }

  const onPhoneChange = (value: string, data: { dialCode: string, name: string }) => {
    setErrorState({ ...errorState, ["phoneNumber"]: "" })

    const country = data.name
    const countryCode = "+" + data.dialCode
    const realPhone = value
    const phoneNumber = realPhone.substring(countryCode.length - 1)
    if (isIndividualOrCompany) {
      setIndividualData({ ...individualData, countryCode, phoneNumber, country })

    } else {
      setCompanyData({ ...companyData, countryCode, phoneNumber })

    }
  };
  useEffect(() => {
    if (individualData.country || companyData.country) {
      if (isIndividualOrCompany) {
        onIndividualChange({
          target: {
            name: "country",
            value: individualData.country,
          }
        } as ChangeEvent<HTMLInputElement | HTMLSelectElement>);
      } else {
        onCompanyChange({
          target: {
            name: "country",
            value: companyData.country,
          }
        } as ChangeEvent<HTMLInputElement | HTMLSelectElement>);
      }
    }
  }, [individualData.country, companyData.country]);

  useEffect(() => {
    const dataToCheck = isIndividualOrCompany ? individualData : companyData;
    const isDataFilled = Object.values(dataToCheck).every(value => value);
    setIsFilled(isDataFilled);
  }, [individualData, companyData]);

  const handleSubmit = () => {
    if (isIndividualOrCompany) {
      //company
      const email = localStorage.getItem("email")
      const password = localStorage.getItem("password")



      const reqPayloadForLogin: RequestPayloadForLogin = {
        ...individualData,
        email,
        password,
        ...(inviteReferralCode && { inviteReferralCode }),
        deviceId: generateDeviceId(),
        deviceMake: platform.name,
        deviceModel: platform.version,
        deviceOs: platform?.os?.family + "-" + platform?.os?.version,
        deviceTypeCode: 3,
        appVersion: "1",
        isAdmin: 0,
        loginType: 1,
        termsAndCond: 1,
      }

      localStorage.setItem("signUpData", JSON.stringify(reqPayloadForLogin))

    } else {
      //individual
      const email = localStorage.getItem("email")
      const password = localStorage.getItem("password")
      const reqPayloadForLogin: RequestPayloadForLogin = {
        ...companyData,
        email,
        password,
        ...(inviteReferralCode && { inviteReferralCode }),
        deviceId: generateDeviceId(),
        deviceMake: platform.name,
        deviceModel: platform.version,
        deviceOs: platform?.os?.family + "-" + platform?.os?.version,
        deviceTypeCode: 3,
        appVersion: "1",
        isAdmin: 0,
        loginType: 1,
        termsAndCond: 1,
      }

      localStorage.setItem("signUpData", JSON.stringify(reqPayloadForLogin))
    }
  }

  const handleSubmitForVerification = async () => {

    //code to show the empty box errors
    if (isIndividualOrCompany) {

      const individualValues = Object.entries(individualData);

      for (const [key, value] of individualValues) {
        setErrorState(prevState => ({ ...prevState, [key]: value === "" }));
      }

    } else {
      const companyValues = Object.entries(companyData);
      for (const [key, value] of companyValues) {
        setErrorState(prevState => ({ ...prevState, [key]: value === "" }));
      }

    }

    if (phoneNumberError) {
      return
    }

    if (isIndividualOrCompany) {

      const individualValues = Object.values(individualData);
      if (individualValues.some(value => value == " ")) {
        return;
      }

      const reqPayload: RequestSendVerificationCodePayload = {
        countryCode: `${individualData.countryCode}`,
        phoneNumber: individualData.phoneNumber,
        trigger: 1,
      };
      try {
        const { data } = await sendVerificationCode(reqPayload).unwrap()
        if (data) {
          const otpVerificationPayload: OtpDataWithVerificationId = {
            countryCode: `${individualData.countryCode}`,
            phoneNumber: individualData.phoneNumber,
            verificationId: data.verificationId,
            expiryTime: data.expiryTime
          }
          setOtpVerificationDetailsDispatch(otpVerificationPayload)

          localStorage.setItem("verificationId", otpVerificationPayload.verificationId)
          handleSubmit();
          router.push(`${SIGN_UP_PAGE}?step=4`)
        }
      } catch (error) {
        console.error(error)
      }
    } else {
      const companyValues = Object.values(companyData);
      if (companyValues.some(value => value === "")) {
        return;
      }
      const reqPayload: RequestSendVerificationCodePayload = {
        countryCode: `${companyData.countryCode}`,
        phoneNumber: companyData.phoneNumber,
        trigger: 1,
      };
      try {
        const { data } = await sendVerificationCode(reqPayload).unwrap()
        if (data) {
          const otpVerificationPayload: OtpDataWithVerificationId = {
            countryCode: `${companyData.countryCode}`,
            phoneNumber: companyData.phoneNumber,
            verificationId: data.verificationId,
            expiryTime: data.expiryTime
          }
          setOtpVerificationDetailsDispatch(otpVerificationPayload)

          handleSubmit();
          router.push(`${SIGN_UP_PAGE}?step=4`)
        }
      } catch (error) {
        console.error(error)
      }

    }








  }

  return (


    // <div className=' mobile:w-full overflow-y-scroll lg:w-[40%] sm:w-full px-10 py-7 !pt-[60px] w-[40%] flex flex-col items-center justify-between'>
    <>
      <div className=' mobile:px-4 sm:max-w-[408px] w-full mobile:w-full flex flex-col items-center justify-start'>

        <FormHeader>{CompleteSignUp.completeRegistration}</FormHeader>
        <FormSubHeader >{CompleteSignUp.additionalDetailsMessage}</FormSubHeader>

        <div className='w-full flex flex-col'>
          <FormLabel className='text-sm mb-2'>{CompleteSignUp.accountTypeLabel}</FormLabel>
          <div className='flex items-center justify-between'>
            <Button buttonType="tertiary" className={`${isIndividualOrCompany && " !text-brand-color  !border-brand-color dark:!bg-bg-primary-dark"}dark:!border-border-tertiary-dark border border-bg-tertiary-light w-[48%] h-11 rounded`} onClick={() => setIsIndividualOrCompany(true)}>{CompleteSignUp.individualOption}</Button>
            <Button buttonType="tertiary" className={`${!isIndividualOrCompany && " !text-brand-color !border-brand-color dark:!bg-bg-primary-dark"}dark:!border-border-tertiary-dark border border-bg-tertiary-light w-[48%] h-11 rounded`} onClick={() => setIsIndividualOrCompany(false)}>{CompleteSignUp.companyOption}</Button>
          </div>
        </div>

        {
          isIndividualOrCompany ? (
            <>

              <FormInput required={true} label={CompleteSignUp.firstNamePlaceholder} error={errorState.firstName && "First Name is missing"} type="text" name="firstName" value={individualData.firstName} onChange={(e) => onIndividualChange(e)} />

              <FormInput required={true} label={CompleteSignUp.lastNamePlaceholder} error={errorState.lastName && "Last Name is missing"} type="text" name="lastName" value={individualData.lastName} onChange={(e) => onIndividualChange(e)} />


              <FormInput required label={CompleteSignUp.accountNamePlaceholder} error={errorState.username && "Account Name is missing"} type="text" name="username" value={individualData.username} onChange={(e) => onIndividualChange(e)} />

              {/* <FormInput label={CompleteSignUp.phonePlaceholder} type="number" name="phoneNumber" value={individualData.phoneNumber} onChange={(e)=>onIndividualChange(e)}/> */}
              <PhoneNumberInput country="in" required label={CompleteSignUp.phonePlaceholder} error={phoneNumberError ? phoneNumberError : errorState.phoneNumber && "Phone Number is missing"} onChange={onPhoneChange} />



              <FormDropdown
                required={true}
                label="Country"
                options={countries.data}
                selectedValue={individualData.country}
                // onSelect={setSelectedCountry}
                onSelect={(onIndividualChange)}
                id="country-selector"
                name="country"
              />

              <FormInput required={false} label={CompleteSignUp.referralCodePlaceholder} type="text" name="inviteReferralCode" value={inviteReferralCode} onChange={(e) => setInViteReferralCode(e.target.value)} />


            </>

          ) : (
            <>

              <FormInput required={true} label={CompleteSignUp.companyOptionFirstNamePlaceholder} error={errorState.firstName && "First Name is missing"} type="text" name="firstName" value={companyData.firstName} onChange={(e) => onCompanyChange(e)} />

              <FormInput required={true} label={CompleteSignUp.companyOptionLastNamePlaceholder} error={errorState.lastName && "Last Name is missing"} type="text" name="lastName" value={companyData.lastName} onChange={(e) => onCompanyChange(e)} />

              <FormInput required={true} label={CompleteSignUp.companyOptionCompanyPlaceholder} error={errorState.companyName && "Company Name is missing"} type="text" name="companyName" value={companyData.companyName} onChange={(e) => onCompanyChange(e)} />

              <FormInput required={true} label={CompleteSignUp.companyOptionAccountNamePlaceholder} error={errorState.username && "Account Name is missing"} type="text" name="username" value={companyData.username} onChange={(e) => onCompanyChange(e)} />


              <PhoneNumberInput required={true} label={CompleteSignUp.phonePlaceholder} error={phoneNumberError ? phoneNumberError : errorState.phoneNumber && "Phone Number is missing"} onChange={onPhoneChange} />


              <FormDropdown
                required={true}
                label="Country"
                options={countries.data}
                selectedValue={companyData.country}
                // onSelect={setSelectedCountry}
                onSelect={(onCompanyChange)}
                id="country-selector"
                name="country"
              />

              <FormInput label={CompleteSignUp.referralCodePlaceholder} type="text" name="inviteReferralCode" value={inviteReferralCode} onChange={(e) => setInViteReferralCode(e.target.value)} />

            </>
          )
        }

        <span className='text-xs font-normal text-center text-text-quinary-light w-[70%] mb-4'>{CompleteSignUp.termsAndConditionsMessage}</span>

        <Button
          className={`bg-bg-tertiary-light dark:bg-bg-undenary-dark text-sm font-semibold !text-[#888888] ${isFilled && '!text-text-tertiary-color !bg-brand-color'
            }`}
          buttonType='primary' onClick={() => handleSubmitForVerification()}>{CompleteSignUp.continueBtn}</Button>
      </div>

      <div className='mb-7 text-sm font-semibold'>
        <span className='text-text-primary-light dark:text-text-primary-dark'>{CompleteSignUp.alreadyHaveAccount}</span>
        <Link className='font-bold text-brand-color' href={`${SIGN_IN_PAGE}?step=1`}> {CompleteSignUp.alreadyHaveAccountLink}</Link>
      </div>
    </>


  )
}

export default RegistrationDetails
