import Button, { BUTTON_TYPE_CLASSES } from '@/components/Ui/Button';
import Comments from '@/components/Comments';
// import HighlightedProducts from "@/components/HighlightedProducts/HighlightedProducts";
import ProductSlider from '@/components/Ui/ProductSlider';
import Layout from '@/components/Layout';
import ProductAttribute from '@/components/ProductAttribute';
import ProductCard from '@/components/Ui/ProductCard';
// import ProductCard from "@/components/ProductCard/ProductCard";
import Rating from '@/components/Ui/Rating';
import SectionTitle from '@/components/Ui/SectionTitle';
// import { dummyProducts } from "@/db/productData";
import { gumletLoader } from '@/lib/gumlet';
import { IMAGES } from '@/lib/images';
import { productsApi } from '@/store/apiSlices/productsApi';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
// import { highlightSection } from "..";

export type filteredProducts = {
  userName: string;
  timeStamp: string;
  productName: string;
  productPrice: string;
  location: string;
};
const images = [
  'https://media.istockphoto.com/id/1311101155/photo/young-social-media-influencer-recording-his-podcast-on-mobile-phone-concept-of-vlogging.jpg?s=1024x1024&w=is&k=20&c=ybdEd5NAJPAqnMcdqx5XSnrCGsGrjiPOI38K9rTT9is=',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D',
  'https://media.istockphoto.com/id/1311101155/photo/young-social-media-influencer-recording-his-podcast-on-mobile-phone-concept-of-vlogging.jpg?s=1024x1024&w=is&k=20&c=ybdEd5NAJPAqnMcdqx5XSnrCGsGrjiPOI38K9rTT9is=',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D',
  'https://media.istockphoto.com/id/1311101155/photo/young-social-media-influencer-recording-his-podcast-on-mobile-phone-concept-of-vlogging.jpg?s=1024x1024&w=is&k=20&c=ybdEd5NAJPAqnMcdqx5XSnrCGsGrjiPOI38K9rTT9is=',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D',
];

type productAttributes = {
  title: string;
  attribute: {
    name: string;
    value: string;
  }[];
}[];

type comments = {
  CommentsTitle: string;
  allComments: {
    name: string;
    DateAndTime: string;
    text: string;
  }[];
  commentBtn: string;
};

type webSection = {
  sectionTitle: string;
  actionText: string;
};

type mobileSection = {
  sectionTitle: string;
  actionText: string;
}[];

export default function Product() {
  // const _content = posts?.data?.[0]?.attributes;
  // const { t:tCategories  } = useTranslation('categories');
  // const filteredProducts:filteredProducts[] = tCategories('page.filteredProducts', { returnObjects: true });
  // const { t:tCommon  } = useTranslation('common');
  // const highlightSection:highlightSection = tCommon('page.highlightSection', { returnObjects: true });
  const { t: productDetails } = useTranslation('productDetails');

  const soldBy: string = productDetails('page.soldBy');
  const seller: string = productDetails('page.seller');
  const rating: string = productDetails('page.rating');
  const followBtn: string = productDetails('page.followBtn');

  const newBtn: string = productDetails('page.newBtn');
  const categoryTitle: string = productDetails('page.categoryTitle');
  const category: string = productDetails('page.category');
  const price: string = productDetails('page.price');
  const posted: string = productDetails('page.posted');
  const desc: string = productDetails('page.desc');
  const description: string = productDetails('page.description');

  const locationTitle: string = productDetails('page.locationTitle');
  const location: string = productDetails('page.location');
  const btnBuyDirect: string = productDetails('page.btnBuyDirect');

  const productAttributes: productAttributes = productDetails('page.productAttributes', { returnObjects: true });
  const comments: comments = productDetails('page.comments', { returnObjects: true });
  const webSection: webSection = productDetails('page.webSection', { returnObjects: true });
  const mobileSection: mobileSection = productDetails('page.mobileSection', { returnObjects: true });

  // const [showFullText,setShowFullText]=useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { data: bannersAndProducts } = productsApi.useGetAllBannersAndProductsQuery({ page: 1, latitude:"", longitude:""});

  const fullText = description;

  return (
    <Layout>
      {/* product slider for mobile screen start*/}
      <ProductSlider imagesArray={images} className="sm:hidden" />
      {/* product slider for mobile screen end */}

      <div className="relative custom-container mx-auto sm:px-16 mobile:px-4 ">
        {/* first section box start */}
        <div className=" flex w-full xl:h-[576px] lg:h-[530px] md:h-[340px] sm:h-[400px] mobile:flex-col ">
          <div className=" flex-1 w-[30%] h-full mobile:w-full">
            <ProductSlider className="mobile:hidden" imagesArray={images} />
            <div className="lg:mt-5 md:mt-3 sm:mt-2 flex items-end justify-between mobile:hidden">
              {/* <Button className="mb-0 md:max-w-[28%] sm:max-w-[39%] lg:h-11 sm:h-8  flex items-center justify-center" buttonType={BUTTON_TYPE_CLASSES.tertiary} >
                    <Image width={20} height={20} src={`${IMAGES.HART_ICON_BLACK}`} loader={gumletLoader} alt="google_logo" />
                    <span className='ml-2 rtl:ml-0 rtl:mr-2 '> Like</span>  
                  </Button> */}
              {/* <Button className="mb-0 md:max-w-[69%] sm:max-w-[60%] lg:h-11 sm:h-8 ">Buy Direct</Button> */}
              <Button className="mb-0 lg:h-11 sm:h-7">{btnBuyDirect}</Button>
            </div>
          </div>

          <div className=" mobile:mt-5 mobile:ml-0 mobile:w-full flex-2 w-[60%] max-w-[695px] ml-12 rtl:ml-0 rtl:mr-12  overflow-y-scroll">
            <div>
              <div className=" border-b mobile:border-b-0 border-border-tertiary-light lg:py-5 sm:py-2 flex items-center justify-between w-full">
                <div className="w-full flex items-center justify-between">
                  <div className=" flex">
                    <div className="flex items-center">
                      <Image
                        className="lg:w-[62px] lg:h-[62px] md:w-[48px] md:h-[48px] sm:w-[43px] sm:h-[42px] mobile:w-[56px] mobile:h-[56px]"
                        width={62}
                        height={62}
                        src={IMAGES.USER_ICON}
                        loader={gumletLoader}
                        alt="user-image"
                      />
                    </div>

                    <div className="flex flex-col ml-4 rtl:ml-0 rtl:mr-4">
                      <span className="text-text-tertiary-light dark:text-text-tertiary-dark lg:text-sm md:text-xs sm:text-[10px] mobile:text-[10px] font-medium ">
                        {soldBy}
                      </span>
                      <div className="font-semibold lg:text-xl md:text-lg sm:text-base text-text-primary-light dark:text-text-quinary-dark mobile:text-base">
                        {seller}{' '}
                      </div>
                      <Rating
                        itemClassName="w-[14px] h-[14px] mr-1 text-xs dark:text-text-tertiary-dark"
                        value={parseInt(rating)}
                        text={rating + '.0'}
                      />
                    </div>
                  </div>
                  <div className=" mobile:w-[84px] mobile:h-[33px] flex mobile:items-center mobile:justify-center mobile:mr-3 rtl:ml-3">
                    <Button className="flex items-center justify-center" buttonType={BUTTON_TYPE_CLASSES.quinary}>
                      {followBtn}
                    </Button>
                  </div>
                </div>

                {/* <div className="flex justify-between items-center mobile:hidden">
                      <Button className="mb-0 px-6 py-2 rounded-full flex items-center justify-center xl:px-7 xl:py-2 2lg:px-6 2lg:py-2 lg:px-5 lg:py-2 md:px-4 md:py-1 sm:px-3 sm:py-1 xl:text-base 2lg:text-sm sm:text-xs xl:h-full 2lg:h-full sm:h-7 " buttonType={BUTTON_TYPE_CLASSES.tertiary} >
                        <Image width={17} height={11} src={`${IMAGES.SHARE_ICON_BLACK}`} loader={gumletLoader} alt="google_logo" />
                        <span className='ml-2 rtl:ml-0 rtl:mr-2 '>Share</span>  
                      </Button>
                      <Button className="ml-2 mb-0 px-3 py-2 rounded-full flex items-center justify-center  xl:text-base 2lg:text-sm sm:text-xs xl:h-full 2lg:h-full sm:h-7 " buttonType={BUTTON_TYPE_CLASSES.tertiary} >
                        <Image  width={20} height={20} src={`${IMAGES.EYE_ICON_BLACK}`} loader={gumletLoader} alt="google_logo" />
                        <span className='ml-2 rtl:ml-0 rtl:mr-2'> 2</span>  
                      </Button>
                    </div> */}
              </div>

              <div className=" mobile:mt-5 w-full flex flex-col">
                <span className="mobile:w-[50px] mobile:text-xs mobile:flex mobile:items-center mobile:justify-center mobile:h-[20px] lg:mt-7 sm:mt-3 xl:text-lg lg:text-base md:text-sm sm:text-xs rounded xl:w-16 lg:w-[54px] md:w-[44px] sm:w-[34px] text-text-secondary-light dark:text-text-quinary-dark bg-bg-nonary-light  text-center ">
                  {newBtn.length <= 3 ? newBtn : newBtn.slice(0, 3)}
                </span>
                <span className="mobile:mt-3 mobile:text-lg lg:mt-3 sm:mt-2 xl:text-2xl lg:text-xl md:text-lg sm:text-base font-semibold text-text-primary-light dark:text-text-quinary-dark">
                  {categoryTitle}
                </span>
                <span className="mobile:mt-[2px] mobile:text-xs lg:mt-1 sm:mt-[2px] text-text-tertiary-light dark:text-text-tertiary-dark xl:text-base lg:text-sm md:text-xs sm:text-[10px]">
                  {category}
                </span>

                <div className="flex flex-col mobile:flex-row mobile:justify-between mobile:items-center">
                  <span className="mobile:mt-2 mobile:text-2xl lg:mt-4 sm:mt-2 xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl font-bold text-text-primary-light dark:text-text-quinary-dark">
                    {price}
                  </span>

                  <span className="mobile:text-xs mobile:font-medium lg:mt-4 sm:mt-1 xl:text-base lg:text-sm md:text-xs sm:text-[10px] font-normal text-text-tertiary-light dark:text-text-quaternary-dark">
                    {posted}
                  </span>
                </div>

                <div className="mobile:mt-6 lg:mt-8 sm:mt-3">
                  <div className="mobile:text-[18px] xl:text-xl lg:text-lg md:text-base sm:text-sm  font-semibold text-text-primary-light dark:text-text-quinary-dark">
                    {desc}
                  </div>
                  <div className="mobile:mt-2 mobile:text-sm lg:mt-5 sm:mt-1 w-full text-text-octonary-light dark:text-text-tertiary-dark">
                    <span
                      className={`transition-height duration-300 ease-in-out ${
                        isExpanded ? 'max-h-screen' : 'max-h-12'
                      }`}
                    >
                      <span className="transition-all duration-300 ease-in xl:text-base lg:text-sm md:text-xs sm:text-[10px]">
                        {isExpanded ? fullText : `${fullText.substring(0, 210).trim()}...`}
                        <span
                          className=" text-blue-500 hover:underline hover:cursor-pointer"
                          onClick={() => setIsExpanded(!isExpanded)}
                        >
                          {isExpanded ? '...Read less' : 'Read more'}
                        </span>
                      </span>
                    </span>
                  </div>
                </div>

                {/* <span className="lg:mt-8 sm:mt-3 xl:text-xl lg:text-lg md:text-base sm:text-sm font-semibold text-text-primary-light ">Furniture</span> */}
              </div>

              <div className="mobile:mt-6 xl:mt-8 sm:mt-3">
                <ProductAttribute data={productAttributes} />
              </div>

              <div className="xl:mt-7 sm:mt-3 w-full flex flex-col mobile:mt-8">
                <div className="mobile:text-lg  xl:text-2xl lg:text-xl md:text-lg sm:text-base font-semibold text-text-primary-light dark:text-text-primary-dark">
                  {locationTitle}
                </div>
                <div className="mobile:mt-2 mobile:text-sm xl:mt-4 sm:mt-2  xl:text-base lg:text-sm md:text-xs sm:text-[10px] font-normal dark:text-text-tertiary-dark">
                  {location}
                </div>
                <div className="xl:mt-3 sm:mt-2 mobile:mt-2">
                  <Image
                    className="w-full md:h-[246px] sm:h-[146px]"
                    src={'https://cdn.britannica.com/37/245037-050-79129D52/world-map-continents-oceans.jpg'}
                    width={100}
                    height={100}
                    alt="map"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* first section box end */}

        {/* comments section start */}
        <Comments data={comments} />
        {/* comments section end */}
      </div>

      {/* sticky button for mobile screen start */}

      <div className=" px-2 z-10 sm:hidden flex items-center justify-between h-[76px] w-full fixed bottom-0 right-0 left-0 bg-bg-secondary-light dark:bg-bg-secondary-dark">
        <div className="w-[25%] flex items-center justify-evenly">
          <Image
            className="dark:hidden inline-block"
            width={17}
            height={19}
            src={IMAGES.SHARE_ICON_BLACK}
            loader={gumletLoader}
            alt="share_icon"
          />
          <Image
            className="dark:inline-block"
            width={17}
            height={19}
            src={IMAGES.SHARE_ICON_WHITE}
            loader={gumletLoader}
            alt="share_icon"
          />
          <Image
            className="dark:hidden inline-block"
            width={22}
            height={17}
            src={IMAGES.MAIL_ICON_EMPTY_BLACK}
            loader={gumletLoader}
            alt="mail_icon"
          />
          <Image
            className="dark:inline-block"
            width={22}
            height={17}
            src={IMAGES.MAIL_ICON_EMPTY_WHITE}
            loader={gumletLoader}
            alt="mail_icon"
          />
        </div>
        <div className="w-[75%] !h-[44px] flex items-center justify-center">
          <Button className="border-2 w-full !mb-0 !h-[44px]">{btnBuyDirect}</Button>
        </div>
      </div>

      {/* sticky button for mobile screen end */}

      {/* page divider start */}
      <div className="border-b border-border-tertiary-light dark:border-border-tertiary-dark mt-12 mobile:hidden"></div>
      {/* page divider end */}

      <div className=" relative mb-11 custom-container mx-auto sm:px-16 mobile:px-4 ">
        {/*product section start */}
        <div className="mobile:hidden">
          <div className="mt-6 flex items-center justify-between">
            <SectionTitle>{webSection.sectionTitle}</SectionTitle>
            <Link className=" flex items-center justify-between mobile:hidden" href="/">
              <span className="mr-2 rtl:mr-2 rtl:ml-0 text-base text-brand-color font-normal ">
                {webSection.actionText}
              </span>
              <Image
                className="rtl:mr-2"
                width={6}
                height={11}
                src={`${IMAGES.RIGHT_ARROW_ICON_YELLOW}`}
                loader={gumletLoader}
                alt="grid_category_icon"
              />
            </Link>
          </div>
          {/* Product card start */}
          <div className="lg:mt-[52px] mobile:mt-[16px] w-full">
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 2lg:grid-cols-4 xl:grid-cols-5">
              {bannersAndProducts?.result.map((product, index) => {
                return (
                  <div key={index}>
                    <ProductCard key={index} product={product} />
                  </div>
                );
              })}
            </div>
          </div>
          {/* Product card end */}
        </div>
        {/*product section end */}

        {/* mobile similar product section start */}
        <div className="mx-auto mobile:mt-6 sm:hidden">
          <div className="flex items-center justify-between">
            <SectionTitle className="text-lg">{mobileSection[0].sectionTitle}</SectionTitle>
            <Link className="text-xs flex items-center justify-between " href="/">
              <span className=" mr-2 rtl:mr-0 rtl:ml-2  text-brand-color font-normal ">
                {mobileSection[0].actionText}
              </span>
              <Image
                className=""
                width={6}
                height={11}
                src={`${IMAGES.RIGHT_ARROW_ICON_YELLOW}`}
                loader={gumletLoader}
                alt="grid_category_icon"
              />
            </Link>
          </div>
          <div className="mt-5">{/* <HighlightedProducts data={highlightSection}/> */}</div>
        </div>
        {/* mobile similar product section end */}

        {/* mobile similar product section start */}
        <div className="mx-auto mobile:mt-6 sm:hidden">
          <div className="flex items-center justify-between">
            <SectionTitle className="text-lg">{mobileSection[1].sectionTitle}</SectionTitle>
          </div>
          <div className="mt-5">{/* <HighlightedProducts data={highlightSection}/> */}</div>
        </div>
        {/* mobile similar product section end */}
      </div>
    </Layout>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['categories', 'common', 'productDetails'])),
    },
  };
}
