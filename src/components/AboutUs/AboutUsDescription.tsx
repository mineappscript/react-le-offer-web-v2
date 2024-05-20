import React, { FC } from 'react';

export type Props = {
  desc: string[];
};

const AboutUsDescription: FC<Props> = ({ desc }) => {
  return (
    <div>
      {
        <div>
          {desc.map((item, index) => (
            <div
              className="text-base mt-6 mobile:!text-xs text-text-tertiary-light dark:text-text-tertiary-dark"
              key={index}
            >
              {item.toString()}
            </div>
          ))}
        </div>
      }
      {/* {type===1 && (
            <>
               {Array.isArray(steps) && steps.map((item, index) => (
                    typeof item !== "string" && (
                        <DescriptionDropdown key={index} item={item}/>
                    ) // Handling array of objects
                ))}
            </>
        )} */}
    </div>
  );
};

export default AboutUsDescription;
