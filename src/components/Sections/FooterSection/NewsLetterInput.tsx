import React, { useState } from 'react';
import Button from '../../Ui/Button';
import { productsApi } from '@/store/apiSlices/productsApi';
import { useTranslation } from 'next-i18next';

type ConnectSection={
  title:string
  tollFree:string
  newsLetterTitle:string
  newsLetterInputPlaceholder:string
  newsLetterSubmitBtnText:string
}

const NewsLetterInput = () => {
  const { t } = useTranslation('common');
  const connectSection: ConnectSection = t('page.connectSection', { returnObjects: true });

  const [subscribeToNewsLetter, { error, data: newData }] = productsApi.useSubscribeToNewsLetterMutation();
  const [email, setEmail] = useState('');
  
  const handleNewsLetterSubmit = () => {
    subscribeToNewsLetter(email);
  };

  return (
    <>
      <div className=" w-full mobile:mt-0  h-[44px] relative">
        <input
          className="w-[80%] text-sm h-full p-4 rtl:mr-14 rtl:pr-24 outline-none text-text-primary-light dark:text-text-secondary-dark rounded-l-md"
          type="text"
          placeholder={connectSection.newsLetterInputPlaceholder}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Button
          onClick={() => handleNewsLetterSubmit()}
          className=" absolute top-0 right-0 w-[92px] mobile:w-[25%] !h-full bg-btn-primary-light rounded-l-none rounded-r-md  text-text-secondary-light dark:text-text-primary-dark text-xs font-semibold"
        >
          {connectSection.newsLetterSubmitBtnText}
        </Button>
        {/* {error && <div style={{ color: 'red' }}>{}</div>} */}
      </div>
      {error && <div className="text-error">* {(error as { data: { message: string } }).data.message}</div>}
      {newData && <div>{newData.message}</div>}
    </>
  );
};

export default NewsLetterInput;
