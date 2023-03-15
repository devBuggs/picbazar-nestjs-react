import { useRouter } from 'next/router';
import ErrorMessage from '@/components/ui/error-message';
import Loader from '@/components/ui/loader/loader';
import CreateOrUpdateAttributeForm from '@/components/attribute/attribute-form';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ShopLayout from '@/components/layouts/shop';
import { adminOwnerAndStaffOnly } from '@/utils/auth-utils';
import { useAttributeQuery } from '@/data/attributes';
import { Config } from '@/config';

export default function UpdateAttributePage() {
  const { t } = useTranslation();

  const { query, locale } = useRouter();

  const {
    data,
    isLoading: loading,
    error,
  } = useAttributeQuery({
    slug: query.attributeId as string,
    language:
      query.action!.toString() === 'edit' ? locale! : Config.defaultLanguage,
  });

  if (loading) return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;
  return (
    <>
      <div className="flex border-b border-dashed border-border-base py-5 sm:py-8">
        <h1 className="text-lg font-semibold text-heading">
          {t('form:edit-attribute')}
        </h1>
      </div>
      <CreateOrUpdateAttributeForm initialValues={data} />
    </>
  );
}
UpdateAttributePage.authenticate = {
  permissions: adminOwnerAndStaffOnly,
};
UpdateAttributePage.Layout = ShopLayout;
export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
  },
});
