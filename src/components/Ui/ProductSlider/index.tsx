import { gumletLoader } from '@/lib/gumlet';
import { IMAGES } from '@/lib/images';
import { appClsx } from '@/lib/utils';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import React, { MouseEvent, useRef, useState } from 'react';

export type Props = {
  imagesArray: string[];
  className: string;
};

const ProductSlider: React.FC<Props> = ({ imagesArray, className }) => {
  const { t: productDetails } = useTranslation('productDetails');
  const likeBtn: string = productDetails('page.likeBtn');
  const shareBtn: string = productDetails('page.shareBtn');

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [, /*isDragging*/ setIsDragging] = useState(false); // this state fot just to track the image
  const [startPosition, setStartPosition] = useState<number | null>(null); // Store the start position for both touch and mouse events

  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  // Handlers for next and previous buttons
  const btnPressPrev = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? imagesArray.length - 1 : prevIndex - 1));
  };

  const btnPressNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === imagesArray.length - 1 ? 0 : prevIndex + 1));
  };

  // Handler for selecting an image from the gallery
  const handleGalleryImageClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  // mobile move start
  const handleStart = (position: number) => {
    setStartPosition(position);
  };

  // Unified end swipe handler for touch and mouse events
  const handleEnd = (endPosition: number) => {
    if (startPosition == null) return;

    const diff = startPosition - endPosition;
    if (diff > 50) {
      // Swipe left
      btnPressNext();
    } else if (diff < -50) {
      // Swipe right
      btnPressPrev();
    }
    setStartPosition(null); // Reset for the next swipe
  };
  // mobile move end

  // mouse move start
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault(); // Prevent image selection
    setIsDragging(true);
    setStartPosition(e.clientX);
  };

  // const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  //   if (!isDragging || startPosition === null) return;
  //   e.preventDefault(); // Prevent image selection

  //   const endPosition = e.clientX;
  //   const diff = startPosition - endPosition;

  //   if (diff > 50) { // Swipe left
  //     btnPressNext();
  //     setIsDragging(false);
  //   } else if (diff < -50) { // Swipe right
  //     btnPressPrev();
  //     setIsDragging(false);
  //   }
  // };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault(); // Prevent image selection
    setIsDragging(false);
  };
  // mouse move end

  //Zoom functionality handlers
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;

    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  return (
    <div
      className={appClsx(
        ' w-full max-h-[492px] 2xl:h-full mobile:max-h-[396px] mobile:h-full flex flex-col justify-between',
        className
      )}
    >
      {/* Main image display with swipe functionality */}
      <div
        className="border-[1px] border-border-tertiary-light dark:border-border-tertiary-dark relative overflow-hidden flex items-center justify-center w-full max-h-[990px] h-full"
        onMouseDown={(e) => {
          handleStart(e.clientX);
          handleMouseDown(e);
        }}
        onMouseUp={(e) => {
          handleEnd(e.clientX);
          handleMouseUp(e);
        }}
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        onTouchEnd={(e) => handleEnd(e.changedTouches[0].clientX)}
        ref={imageContainerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: 'crosshair' }}
        // onMouseDown={handleMouseDown}
        // onMouseMove={handleMouseMove}
        // onMouseUp={handleMouseUp}
        // onMouseLeave={handleMouseUp}
      >
        <div className="absolute lg:right-5 lg:top-5 right-5 top-5 sm:top-2 sm:right-1 flex max-h-9 items-center ">
          <div className="mobile:px-3 mobile:py-3 flex items-center justify-center hover:cursor-pointer lg:px-3 rounded-full lg:ml-2 sm:ml-1 lg:py-2 sm:px-2 sm:py-1 text-xs  text-text-secondary-light bg-bg-denary-light bg-opacity-20 hover:bg-opacity-50">
            <Image className="" width={13} height={9} src={`/images/eye_icon_white.svg`} alt="views_icon" />
            <div className="ml-[5px] rtl:ml-0 rtl:mr-[5px]">2</div>
          </div>
          <div className="mobile:px-3 flex mobile:py-3 mobile:ml-2 rtl:mobile:ml-0 rtl:mobile:mr-2  hover:cursor-pointer lg:px-3 rounded-full lg:ml-2 sm:ml-1 lg:py-2 sm:px-2 sm:py-1 text-xs text-text-secondary-light bg-bg-denary-light bg-opacity-20 hover:bg-opacity-50">
            <Image className="" width={13} height={9} src={`/images/hart_icon_white.svg`} alt="like_icon" />
            <div className="ml-[5px] rtl:ml-0 rtl:mr-[5px]">{likeBtn}</div>
          </div>
          <div className="lg:flex md:hidden sm:hidden flex hover:cursor-pointer lg:px-3 rounded-full lg:ml-2 sm:ml-1 lg:py-2 text-xs sm:px-2 sm:py-1 text-text-secondary-light bg-bg-denary-light bg-opacity-20 hover:bg-opacity-50 mobile:hidden">
            <Image
              className=""
              width={13}
              height={9}
              src={`${IMAGES.SHARE_ICON_WHITE}`}
              loader={gumletLoader}
              alt="share_icon"
            />
            <div className="ml-[5px] rtl:ml-0 rtl:mr-[5px]">{shareBtn}</div>
          </div>
          <div className="md:flex sm:hidden hover:cursor-pointer lg:px-3 rounded-full lg:ml-2 sm:ml-1 lg:py-2 text-xs sm:px-2 sm:py-1 text-text-secondary-light bg-bg-denary-light bg-opacity-20 hover:bg-opacity-50 mobile:hidden">
            <Image className="w-[2.6px]" width={3} height={1} src={`/images/settings_icon_white.svg`} alt="like_icon" />
          </div>
        </div>
        <Image
          className="mobile:cursor-auto object-contain max-h-[490px] h-full"
          src={imagesArray[currentImageIndex]}
          // src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
          alt={`Image ${currentImageIndex}`}
          width={569}
          height={426}
          layout="responsive"
        />

        <button
          className="mobile:left-4  absolute w-16 h-24 flex items-center lg:justify-center sm:justify-start lg:left-4 sm:left-1"
          onClick={btnPressPrev}
        >
          <p className=" text-text-secondary-light bg-bg-denary-light bg-opacity-20 hover:bg-opacity-50 rounded-full lg:text-3xl sm:text-sm mobile:w-8 mobile:h-8 lg:w-9 lg:h-9 sm:w-4 sm:h-4 flex items-center justify-center hover:scale-102 ">
            &lt;
          </p>
        </button>
        <button
          className="mobile:right-4 mobile:justify-end absolute w-16 h-24 flex items-center lg:justify-center sm:justify-end lg:right-4 sm:right-1"
          onClick={btnPressNext}
        >
          <p className=" text-text-secondary-light bg-bg-denary-light bg-opacity-20 hover:bg-opacity-50 rounded-full lg:text-3xl sm:text-sm mobile:w-8 mobile:h-8 lg:w-9 lg:h-9 sm:w-4 sm:h-4  flex items-center justify-center hover:scale-102">
            &gt;
          </p>
        </button>
      </div>

      {isZoomed && (
        <div
          className="mobile:hidden absolute border border-solid border-gray-400 xl:top-[8px] xl:right-[500px] lg:top-[8px] lg:right-[320px] md:top-[8px] md:right-[220px] sm:top-[8px] sm:right-[120px] overflow-hidden w-[300px] h-[300px]"
          style={{
            // right: '10%', top: '50%', transform: 'translateY(-50%)',
            // width: '300px', height: '300px', // Set the dimensions of the zoom box
            // overflow: 'hidden', // Ensure the image doesn't flow outside the box
            backgroundImage: `url(${imagesArray[currentImageIndex]})`,
            backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
            backgroundSize: '400%', // Set how much the image should be zoomed
          }}
        />
      )}

      {/* Thumbnails gallery */}
      <div className=" flex justify-start lg:mt-5 md:mt-3 sm:mt-2 max-h-[50px] overflow-x-auto mobile:hidden">
        {imagesArray.map((img, index) => (
          <div
            key={index}
            className=" mx-1 cursor-pointer max-w-[63px] h-full w-full"
            onClick={() => handleGalleryImageClick(index)}
            onMouseEnter={() => handleGalleryImageClick(index)}
          >
            <Image
              src={img}
              // src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
              alt={`Thumbnail ${index}`}
              width={100}
              height={100}
              className={`h-full w-full ${index === currentImageIndex ? '!border-2' : ''}`}
              layout="fixed"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSlider;
