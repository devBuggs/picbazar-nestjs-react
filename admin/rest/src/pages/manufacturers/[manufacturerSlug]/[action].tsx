import Layout from '@/components/layouts/admin';
import ManufacturerCreateOrUpdateForm from '@/components/manufacturer/manufacturer-form';
import ErrorMessage from '@/components/ui/error-message';
import Loader from '@/components/ui/loader/loader';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { adminOnly } from '@/utils/auth-utils';
import { useManufacturerQuery } from '@/data/manufacturer';
import { Config } from '@/config';

export default function UpdateManufacturerPage() {
  const { query, locale } = useRouter();
  const { t } = useTranslation();
  const { manufacturer, loading, error } = useManufacturerQuery({
    slug: query.manufacturerSlug as string,
    language:
      query.action!.toString() === 'edit' ? locale! : Config.defaultLanguage,
  });

  if (loading) return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;
  return (
    <>
      <div className="flex border-b border-dashed border-border-base py-5 sm:py-8">
        <h1 className="text-lg font-semibold text-heading">
          {t('form:form-title-update-manufacturer')}
        </h1>
      </div>
      <ManufacturerCreateOrUpdateForm initialValues={manufacturer} />
    </>
  );
}
UpdateManufacturerPage.authenticate = {
  permissions: adminOnly,
};
UpdateManufacturerPage.Layout = Layout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
});
