import { appClsx } from "@/lib/utils";
import { useTranslation } from "next-i18next";

type InfoSection = {
  title: string,
  items: string[]
}

const InfoSection = () => {

  const { t } = useTranslation('common');
  const infoSection: InfoSection[] = t('page.infoSection', { returnObjects: true })

  return (
    <div className=" py-12 mobile:py-0 mobile:my-9">
      {
        infoSection.map((val, key) => (
          <div className="flex flex-col mb-7 mobile:mb-5" key={key}>
            <div className={appClsx(`text-sm mobile:text-base font-semibold mobile:mb-3 text-text-primary-light dark:text-text-primary-dark ${key === 0 ? "mb-5" : "mb-2"}`)}>{val.title}</div>
            <div className="flex flex-wrap">
              {
                val.items.map((innerItem, k) => (
                  <div key={k} className={`flex items-center text-nowrap text-xs mobile:text-sm font-normal ${key === 0 ? "text-text-primary-light border-r-[1.5px] mr-2 pr-2 border-border-senary-light dark:border-border-primary-dark dark:text-text-primary-dark" : "text-text-quaternary-dark"}`}>
                    {innerItem}
                    {
                      key !== 0 ? (
                        <span className=" mx-1.5 text-base  text-text-tertiary-light">•</span>
                      ) : null
                    }
                  </div>
                ))
              }

            </div>
          </div>
        ))
      }
    </div>
  )
}

export default InfoSection