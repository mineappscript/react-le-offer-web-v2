import React from 'react';
import Image from 'next/image';
import { gumletLoader } from '@/lib/gumlet';
import { IMAGES } from '@/lib/images';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

const DownloadCard: React.FC = () => {
  const { t } = useTranslation('common');
  const _text = t('page.appDownloadSection', { returnObjects: true }) as { heading: string; subHeading: string };

  return (
    <div className=" w-screen mobile:h-fit h-[847px] md:h-[539px] bg-gradient-to-b from-gradient-color-from to-gradient-color-to">
      <div className="px-16  h-full flex flex-col md:flex-row gap-6 place-items-center custom-container">
        <div className="md:hidden py-6">
          <p className="font-semibold text-2xl md:text-4xl text-center md:text-left  dark:text-text-primary-dark pt-0 order-1">
            {_text?.heading}
          </p>
          <p className="font-base text-xs text-center md:text-left md:text-medium  dark:text-text-primary-dark py-3">
            {_text?.subHeading}
          </p>
        </div>
        <div>
          <Image src={IMAGES.MOBILE_MOCKUPS} height={443} width={681} alt="mockups" loader={gumletLoader} />
        </div>
        <div>
          <div className="hidden md:block">
            <p className="font-semibold text-2xl md:text-4xl text-center md:text-left text-text-secondary-light dark:text-text-primary-dark pt-0 order-1">
              {_text?.heading}
            </p>
            <p className="font-base text-base text-center md:text-left md:text-medium text-text-secondary-light dark:text-text-primary-dark py-3">
              {_text?.subHeading}
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="space-y-4">
              <Link href={''} className="cursor-pointer">
                <Image
                  src={IMAGES.PLAY_STORE_ICON}
                  height={62}
                  width={220}
                  alt="play-store Image"
                  loader={gumletLoader}
                />
              </Link>

              <Link href={'https://testflight.apple.com/join/taGW9cmp'} className="cursor-pointer">
                <Image
                  className="mt-2"
                  src={IMAGES.APP_STORE_ICON}
                  height={62}
                  width={220}
                  alt="app-store Image"
                  loader={gumletLoader}
                />
              </Link>
            </div>
            <div>
              <Image
                src={IMAGES.QR_CODE_DOWNLOAD_LINK}
                width={120}
                height={150}
                alt="download_qr"
                loader={gumletLoader}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadCard;
