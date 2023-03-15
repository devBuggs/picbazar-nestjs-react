import { useTranslation } from 'next-i18next';
import { Image } from '@/components/ui/image';
import Link from '@/components/ui/link';
import SectionBlock from '@/components/ui/section-block';
import { siteSettings } from '@/config/site';
import AppStoreImg from '@/assets/app-store-btn.png';
import PlayStoreImg from '@/assets/play-store-btn.png';
import PatternImg from '@/assets/pattern.png';

const CallToAction = () => {
  const { t } = useTranslation('common');

  return (
    <SectionBlock className="last:pb-0">
      <div className="relative flex w-full overflow-hidden rounded-xl bg-gray-100 px-6 py-12 md:px-10 xl:px-32 xl:py-32">
        <Image src={PatternImg} layout="fill" alt="background pattern" />
        <div className="z-0 flex w-full justify-center lg:justify-between">
          <div className="flex max-w-[500px] flex-col items-center lg:items-start">
            <span className="mb-4 text-lg font-semibold uppercase sm:text-xl lg:font-bold">
              {t('text-cta-header')}
            </span>
            <span
              className="text-center text-2xl sm:text-4xl sm:!leading-[3rem] lg:text-left rtl:lg:text-right"
              dangerouslySetInnerHTML={{ __html: t('text-cta-description') }}
            />

            <div className="mt-8 flex items-center space-x-6 rtl:space-x-reverse lg:mt-14">
              <Link
                href={siteSettings.cta.app_store_link}
                className="w-32 md:w-48"
              >
                <Image
                  src={AppStoreImg}
                  width={338}
                  height={100}
                  layout="responsive"
                  alt="app store button"
                />
              </Link>
              <Link
                href={siteSettings.cta.app_store_link}
                className="w-32 md:w-48"
              >
                <Image
                  src={PlayStoreImg}
                  width={334}
                  height={100}
                  layout="responsive"
                  alt="play store button"
                />
              </Link>
            </div>
          </div>

          <div className="absolute bottom-0 right-10 hidden rtl:left-10 lg:block lg:w-[360px] xl:right-28 xl:w-[400px] rtl:xl:left-28 2xl:right-64 rtl:2xl:left-64 3xl:w-[480px]">
            <Image
              src={siteSettings.cta.mockup_img_src}
              width={400}
              height={386}
              layout="responsive"
              alt="mockup"
            />
          </div>
        </div>
      </div>
    </SectionBlock>
  );
};

export default CallToAction;
