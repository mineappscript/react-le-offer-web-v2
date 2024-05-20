
import Link from 'next/link'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { IMAGES } from '@/lib/images'
import Image from 'next/image'
import Button from '@/components/Ui/Button'
import FormInput from '@/components/Form/FormInput'
import { gumletLoader } from '@/lib/gumlet'
import FormHeading from '@/components/Form/FormHeader'
import FormSubHeading from '@/components/Form/FormSubHeader'
import { useTranslation } from 'next-i18next'
import { useDebounce } from '@/hooks/useDebounce'
import authApi from '@/store/apiSlices/auth'
import { SIGN_IN_PAGE, SIGN_UP_PAGE } from '@/routes'

export type SignUpWithEmailAndPassword = {
  signupPrompt: string;
  registerMessage: string;
  emailPlaceholder: string;
  emailError: string;
  passwordPlaceholder: string;
  continueBtn: string;
  alreadyHaveAccount: string;
  alreadyHaveAccountLink: string;
  otherSignUpOptions:string
}

const RegisterWithEmailAndPassword = () => {

  const { t } = useTranslation('auth');
    const SignUpWithEmailAndPassword:SignUpWithEmailAndPassword= t('page.signUpWithEmailAndPassword',{returnObjects:true});

  const router=useRouter()

  const [formData,setFormData]=useState({
    email:"",
    password:""
  })
  const [showAndHidePassword,setShowAndHidePassword]=useState(false);
  const [signUpEmailError,setSignupEmailError]=useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");


  const debouncedEmail = useDebounce(formData.email, 500);

  const [validateEmail] = authApi.useValidateEmailMutation()

  const onChange=(e:ChangeEvent<HTMLInputElement>)=>{
    const {name,value}=e.target;

    if(name =="email"){
      setSignupEmailError("");
    }else{
      setPasswordError("");
    }
    if (name === "password" && value.length > 12) {
      return;
    }
    setFormData({...formData,[name]:value})
    
  }

  useEffect(() => {
    const checkEmailValidity = async (email: string) => {
      try {
        const requesPayloadForValidEmail = {
          email:email
        }
        // Make your API call here to check email validity
        const data = await validateEmail(requesPayloadForValidEmail).unwrap()
        
        console.log("debouncedvalue",email,data); // Handle the response data accordingly

      } catch (e) {

        const error = e as { data: { message: string } };
        if (error.data && error.data.message) {
          setSignupEmailError(error.data.message);
        } else {
            console.error("Unexpected error:", error);
        }
        
        console.error('debouncedvalueError:', error);
      }
    };

   

    const fetchEmailValidity = async () => {
      if (debouncedEmail) {
        await checkEmailValidity(debouncedEmail);
      }
    };

    fetchEmailValidity();
  }, [debouncedEmail, validateEmail]);
  
  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  
  useEffect(() => {
    const handleKeyDown = (event:KeyboardEvent) => {
      if (event.key === 'Enter') {
        signupWithEmailAndPassword();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const signupWithEmailAndPassword=async()=>{
    if (!validatePassword(formData.password)) {
      setPasswordError("Password must be 8 characters long and contain at least one uppercase letter, one digit, and one special character.");
      return;
    }

    const requesPayloadForValidEmail = {
      email:formData.email
    }

    try{
      const data = await validateEmail(requesPayloadForValidEmail).unwrap()

      if(data){
      if(signUpEmailError || passwordError){
        return;
      }
      
      localStorage.setItem("email",formData.email)
      localStorage.setItem("password",formData.password)
  
  
      router.push(`${SIGN_UP_PAGE}?step=3`)}
    }catch(e){
      const error = e as { data: { message: string } };
      setSignupEmailError(error.data.message);

    }
    
  }

  return (
    <>
      {/* // <div className=' mobile:w-full lg:w-[40%] sm:w-full !pt-[59px] w-[40%] flex flex-col items-center justify-between'> */}
        <div className=' mobile:px-4  sm:max-w-[408px] w-full h-full mobile:w-full flex flex-col items-center justify-start'>

          <FormHeading className=''>{SignUpWithEmailAndPassword.signupPrompt}</FormHeading>
          <FormSubHeading className=''>{SignUpWithEmailAndPassword.registerMessage}</FormSubHeading>

         
          <FormInput  label={SignUpWithEmailAndPassword.emailPlaceholder} error={signUpEmailError} className='' type="text" name="email" value={formData.email} onChange={(e)=>onChange(e)} required/>

          
          <FormInput  label={SignUpWithEmailAndPassword.passwordPlaceholder} error={passwordError}  className='' type={`${showAndHidePassword ? "text" : "password"}`} name="password" value={formData.password} onChange={(e)=>onChange(e)} required>
            {
              showAndHidePassword ? (
                <>
                  <Image className='absolute right-4 dark:hidden inline' width={20} height={16} src={`${IMAGES.PASSWORD_SHOW_ICON_BLACK}`} loader={gumletLoader} onClick={()=>setShowAndHidePassword(!showAndHidePassword)} alt="password_show_icon" />
                  <Image className='absolute right-4 dark:inline hidden' width={20} height={16} src={`${IMAGES.PASSWORD_SHOW_ICON_WHITE}`} loader={gumletLoader} onClick={()=>setShowAndHidePassword(!showAndHidePassword)} alt="password_show_icon" />
                </>
                
                ) : (
                  <>
                    <Image className='absolute right-4 dark:hidden inline' width={20} height={16} src={`${IMAGES.PASSWORD_HIDE_ICON_BLACK}`} loader={gumletLoader} onClick={()=>setShowAndHidePassword(!showAndHidePassword)} alt="password_hide_icon" />
                    <Image className='absolute right-4 dark:inline hidden' width={20} height={16} src={`${IMAGES.PASSWORD_HIDE_ICON_WHITE}`} loader={gumletLoader} onClick={()=>setShowAndHidePassword(!showAndHidePassword)} alt="password_hide_icon" />
                  </>
              )
            }
          </FormInput>
          
          

      
          <Button  isLoading={false} onClick={()=>signupWithEmailAndPassword()} >{SignUpWithEmailAndPassword.continueBtn}</Button>

          <Link className='font-bold text-brand-color' href={`${SIGN_UP_PAGE}?step=1`}> {SignUpWithEmailAndPassword.otherSignUpOptions}</Link>
        </div>

        <div className='mb-7 text-sm font-semibold'>
            <span className='text-text-primary-light dark:text-text-primary-dark'>{SignUpWithEmailAndPassword.alreadyHaveAccount}</span>
            <Link className='font-bold text-brand-color' href={`${SIGN_IN_PAGE}?step=1`}> {SignUpWithEmailAndPassword.alreadyHaveAccountLink}</Link>
        </div>
        {/* // </div> */}
    </>
  )
}

export default RegisterWithEmailAndPassword
