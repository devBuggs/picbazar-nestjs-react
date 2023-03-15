import type { GetStaticProps } from 'next';
import { Image } from '@/components/ui/image';
import Link from '@/components/ui/link';
import { Routes } from '@/config/routes';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import noResult from '@/assets/no-result.svg';

export default function NotFoundPage() {
  const { t } = useTranslation('common');

  return (
    <div className="grid min-h-screen place-items-center p-4 sm:p-8">
      <div className="text-center">
        <p className="2xl: mb-4 text-sm uppercase tracking-widest text-body-dark sm:mb-5">
          {t('404-heading')}
        </p>
        <h1 className="mb-5 text-2xl font-bold leading-normal text-bolder sm:text-3xl">
          {t('404-sub-heading')}
        </h1>
        <div className="mb-11">
          <Image src={noResult} alt={t('404-heading')} />
        </div>
        <Link
          href={Routes.home}
          className="inline-flex items-center text-bolder underline hover:text-body-dark hover:no-underline focus:outline-none sm:text-base"
        >
          {t('404-back-home')}
        </Link>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  };
};
