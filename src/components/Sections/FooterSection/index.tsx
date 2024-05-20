import { gumletLoader } from '@/lib/gumlet'
import { IMAGES } from '@/lib/images'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import React from 'react'
import NewsLetterInput from './NewsLetterInput'
import Link from 'next/link'
import { useRouter } from 'next/router'

type FooterSection = {
  itemName: string,
  categories: string[]
}

type ConnectSection = {
  title: string
  tollFree: string
  newsLetterTitle: string
  newsLetterInputPlaceholder: string
  newsLetterSubmitBtnText: string
}

const Footer = () => {

  const router = useRouter();

  const { locales, locale: activeLocale } = router;

  const otherLocales = locales?.filter((locale) => locale !== activeLocale);

  const changeLocale = (locale: string) => {
    document.cookie = `NEXT_LOCALE=${locale}`;
  };

  const { t } = useTranslation('common');
  const footerSectionText: string = t('page.footerSectionText');
  const footerSection: FooterSection = t('page.footerSection', { returnObjects: true });

  const connectSection: ConnectSection = t('page.connectSection', { returnObjects: true });

  return (
    <div className=' w-full bg-bg-primary-light text-text-secondary-light'>
      <div className=' border-error max-w-[1440px] mx-auto px-[64px] mobile:px-4'>
        <div className=' border-yellow-50 flex item-center justify-center'>

          <div className=' my-12 border-yellow-400 max-w-[1203px] w-full grid mobile:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center'>
            <div className=' max-w-[360px] mobile:max-w-full w-full mobile:flex mobile:flex-col mobile:items-center'>
              <Image width={141} height={36} src={IMAGES.FOOTER_LOGO_WHITE} alt="footer logo" loader={gumletLoader} />
              <div className='text-sm font-normal mobile:text-center mobile:max-w-[300px] mt-5 mb-7 text-text-tertiary-light dark:text-text-quaternary-dark'>{footerSectionText}</div>
              <div className="flex ">
                <Image
                  className="cursor-pointer"
                  width={32}
                  height={32}
                  src={IMAGES.FACEBOOK_LOGO_BLACK}
                  alt="FACEBOOK_LOGO_BLACK"
                  loader={gumletLoader}
                />
                <Image
                  className="ml-4 cursor-pointer"
                  width={32}
                  height={32}
                  src={IMAGES.TWITTER_LOGO_BLACK}
                  alt="TWITTER_LOGO_BLACK"
                  loader={gumletLoader}
                />
                <Image
                  className="ml-4 cursor-pointer"
                  width={32}
                  height={32}
                  src={IMAGES.LINKEDIN_LOGO_BLACK}
                  alt="LINKEDIN_LOGO_BLACK"
                  loader={gumletLoader}
                />
                <Image
                  className="ml-4 cursor-pointer"
                  width={32}
                  height={32}
                  src={IMAGES.INSTAGRAM_LOGO_BLACK}
                  alt="INSTAGRAM_LOGO_BLACK"
                  loader={gumletLoader}
                />
                <Image
                  className="ml-4 cursor-pointer"
                  width={32}
                  height={32}
                  src={IMAGES.YOUTUBE_LOGO_BLACK}
                  alt="YOUTUBE_LOGO_BLACK"
                  loader={gumletLoader}
                />
              </div>
            </div>
            <div className=' mobile:my-9 max-w-[287px] mobile:max-w-full w-full flex flex-col '>
              <div className='text-base font-bold mb-3'>{footerSection.itemName}</div>
              <div className='grid grid-cols-2 gap-x-10 gap-y-2 text-sm font-normal text-text-tertiary-light dark:text-text-quaternary-dark'>
                {
                  footerSection?.categories?.map((item, key) => (
                    <div className='text-nowrap ' key={key}>{item}</div>
                  ))
                }
              </div>
            </div>
            <div className=' max-w-[360px] mobile:max-w-full w-full flex flex-col sm:mt-7'>
              <div className='mobile:order-1 mobile:mt-9'>
                <div className='text-base font-bold'>{connectSection.title}</div>

                <div className='text-sm font-normal'>
                  <span className='text-text-tertiary-light dark:text-text-quaternary-dark'>
                    {connectSection.tollFree}
                  </span> :
                  <span className='text-brand-color'> (866)856-5678</span>
                </div>

              </div>
              <div className='mobile:mt-0 mt-6'>
                <div className='mb-3'>{connectSection.newsLetterTitle}</div>
                <NewsLetterInput />
              </div>
              <div className="my-9  w-full ">
                <span className="bg-brand-color border px-4 py-2 rounded-xl uppercase text-sm">{activeLocale}</span>
                {otherLocales?.map((locale, localeIndex) => {
                  const { pathname, query } = router;

                  return (
                    <Link
                      key={localeIndex}
                      href={{ pathname, query }}
                      locale={locale}
                      onClick={() => changeLocale(locale)}
                      className=" ml-2  hover:bg-[#414052]/80 active:bg-[#414052] px-4 py-2 rounded-xl uppercase text-sm transition-colors"
                    >
                      {locale}
                    </Link>
                  );
                })}
              </div>

            </div>
          </div>

        </div>

        <div className='border-t h-[77px] flex items-center justify-center'>
          &copy; {new Date().getFullYear()} Equipnow
        </div>
      </div>
    </div>
  )
}

export default Footer
