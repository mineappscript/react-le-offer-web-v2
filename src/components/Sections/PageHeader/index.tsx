import React, { FC } from 'react';
import SearchBox from '../../SearchBox/SearchBox';
import Image from 'next/image';
import { gumletLoader } from '@/lib/gumlet';
import { useWindowScroll } from '@/hooks/useWindowScroll';
import { useWindowResize } from '@/hooks/useWindowResize';
import { appClsx } from '@/lib/utils';
import { IMAGES } from '@/lib/images';

export type Props = {
  stickyHeaderWithSearchBox?: boolean;
  handleGetLocationHelper: () => void;
  handleRemoveLocationHelper: () => void;
  className?:string
  imageClassName?:string
};

const PageHeader: FC<Props> = ({
  stickyHeaderWithSearchBox,
  handleGetLocationHelper,
  handleRemoveLocationHelper,
  className,
  imageClassName
}) => {
  const windowScroll = useWindowScroll();
  const windowWidth = useWindowResize();

  

  return (
    <div
      className={appClsx(`relative ${
        windowScroll > 400 ? '!static top-[69px]' : ''
      }  mx-auto h-[524px] bg-cover bg-top bg-no-repeat flex items-center justify-center ${
        stickyHeaderWithSearchBox && ' h-fit items-start'
      }`,className)}
      style={{ backgroundPosition: '50% 20%' }}
    >
      <Image
        className={appClsx(`relative ${
          windowScroll > 400 ? '!static top-[69px]' : ''
        }  mx-auto h-[524px] bg-cover bg-top bg-no-repeat flex items-center justify-center ${
          stickyHeaderWithSearchBox && 'hidden'
        } `,imageClassName)}
        src={IMAGES.PRIMARY_BANNER}
        alt="Header Image"
        layout="fill"
        objectFit="cover"
        objectPosition="50% 20%"
        loader={gumletLoader}
        priority
      />
      {/* image shadow or overlay */}
      <div
        className={appClsx(`${windowScroll > 400 ? 'hidden' : ''} ${stickyHeaderWithSearchBox && 'hidden'}`,imageClassName)}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3))',
        }}
      ></div>
      <SearchBox
        stickyHeaderWithSearchBox={stickyHeaderWithSearchBox}
        // content={content}
        windowScroll={windowScroll}
        windowWidth={windowWidth}
        handleGetLocationHelper={handleGetLocationHelper}
        handleRemoveLocationHelper={handleRemoveLocationHelper}
      />
    </div>
  );
};

export default PageHeader;
