import Slider from 'react-slick';
import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import { IMAGES } from "@/lib/images"
import Image from 'next/image';
// import { gumletLoader } from "@/lib/gumlet"
import useSizeMode from '@/hooks/size';
import { Banner } from '@/store/types';
import { STATIC_IMAGE_URL } from '@/config';
export type Props = {
  data: Banner[];
};

const ImgSlider: FC<Props> = ({ data }) => {
  const sizeMode = useSizeMode();

  const [theme, setTheme] = useState(false);

  // Effect to retrieve theme from sessionStorage on component mount
  useEffect(() => {
    const storedTheme = sessionStorage.getItem('theme');
    if (storedTheme !== null) {
      setTheme(JSON.parse(storedTheme));
    }
  }, [theme]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: sizeMode === 4 || sizeMode === 3 || sizeMode === 2 ? 2 : 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <Carousel {...settings} className="z-0 sm:mb-[22px] mobile:mb-10" theme={theme}>
      {data?.map((item, index) => (
        <Warp key={index}>
          <a href='#'>
            <Image className="rounded-2xl" width={639} height={260} src={STATIC_IMAGE_URL+ "/" + item.imageWeb} alt="BANNER_DUMMY_IMG_1" />
            {/* <Image className="rounded-2xl" width={639} height={260} src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" alt="BANNER_DUMMY_IMG_1" /> */}
          </a>
        </Warp>
      ))}
    </Carousel>
  );
};

const Carousel = styled(Slider) <{ theme: boolean }>`
  // z-index:0;
  /* border:2px solid red; */
  // margin:10px 10px;
  // margin-left:90px;
  // padding-left:190px;
  margin-top: 20px;

  //button's setting
  & > button {
    opacity: 0;
    margin: 0px 15px;
    height: 100%;
    width: 5vw;
    z-index: 1;

    &:hover {
      transition: all 0.2s ease 0s;
      opacity: 1;
    }
  }

  //dot's color
  ul {
    // margin-left:25px;
    // border:2px solid red;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  ul li {
    width: 4.5%;

    // margin:0px 25px;
    // border:2px solid red;
    button {
      // border:2px solid red;
      // display:flex;
      // align-item:center;
      // justify-content:center;

      &:before {
        // border:2px solid red;
        margin-top: 10px;
        content: '';
        display: block;
        height: 5px; /* Adjust the height of the horizontal line */
        width: 100%; /* Make the line span the full width */
        border-radius: 8px;
        // color:#202020;
        /* background-color: #202020;  */

        background-color: ${(props) => (props.theme === true ? 'white' : '#202020')};
      }
    }
  }

  li.slick-active button:before {
    color: #202020;
  }

  .slick-list {
    overflow: hidden;
  }

  .slick-prev {
    left: -30px;
  }
  .slick-next {
    right: -30px;
  }
`;

const Warp = styled.div`
  /* border:2px solid red; */
  padding-left: 4px;
  padding-right: 4px;
  cursor: pointer;
  position: relative;
  border-radius: 4px;

  a {
    // border:2px solid green;
    /* border-radius:100px; */
    /* box-shadow: 5px 5px 5px 5px lightblue; */
    cursor: pointer;
    display: block;
    position: relative;
    // padding:4px;
    img {
      /* border-radius:100px; */
      margin: auto;
      width: 100%;
      height: 100%;
    }

    &:hover {
      /* padding:0; */
      /* border:4px solid rgba(249,249,249,0.8); */
      // transition-duration:1s;
      // transform: scale(1.02);
    }
  }
`;

export default ImgSlider;
