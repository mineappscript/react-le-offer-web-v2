import React, { FC } from 'react';
import Button, { BUTTON_TYPE_CLASSES } from '../Ui/Button';
import { CommentCard } from './CommentCard';

export type Props = {
  data: {
    CommentsTitle: string;
    allComments: {
      name: string;
      DateAndTime: string;
      text: string;
    }[];
    commentBtn: string;
  };
};

const Comments: FC<Props> = ({ data }) => {
  return (
    <div className=" mobile:mt-6 xl:mt-[52px] sm:mt-6 xl:py-12 lg:py-9 md:py-6 sm:py-3 ">
      <div className="mobile:text-lg xl:text-2xl lg:text-xl md:text-lg sm:text-base font-semibold text-text-primary-light dark:text-text-quinary-dark">
        {data.CommentsTitle} ({data.allComments.length})
      </div>
      <div className="mobile:mt-2 xl:mt-8 sm:mt-4">
        {data.allComments.map((item1, index) => (
          <CommentCard item={item1} key={index} />
        ))}
      </div>
      <div className=" xl:mt-4 sm:mt-3 mobile:flex mobile:justify-center">
        <Button
          buttonType={BUTTON_TYPE_CLASSES.tertiary}
          className="mobile:text-sm mobile:w-[152px] mobile:h-[33px] xl:text-lg lg:text-xs sm:text-xs border-2 !mb-0 border-border-senary-light dark:border-border-primary-dark text-text-tertiary-light dark:text-text-tertiary-dark xl:w-[184px] sm:w-[120px] xl:h-11 sm:h-9"
        >
          {data.commentBtn.slice(0, 14)}
        </Button>
      </div>
    </div>
  );
};

export default Comments;
