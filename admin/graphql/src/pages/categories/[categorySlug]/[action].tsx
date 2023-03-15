import Layout from '@/components/layouts/admin';
import CreateOrUpdateCategoriesForm from '@/components/category/category-form';
import { useRouter } from 'next/router';
import { useCategoryQuery } from '@/graphql/categories.graphql';
import ErrorMessage from '@/components/ui/error-message';
import Loader from '@/components/ui/loader/loader';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { adminOnly } from '@/utils/auth-utils';
import { Config } from '@/config';
import { Category } from '../../../../__generated__/__types__';

export default function UpdateCategoriesPage() {
  const { t } = useTranslation();
  const { locale, query } = useRouter();
  const { data, loading, error } = useCategoryQuery({
    variables: {
      slug: query.categorySlug as string,
      language:
        query.action!.toString() === 'edit' ? locale! : Config.defaultLanguage,
    },
  });
  if (loading) return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
        <h1 className="text-lg font-semibold text-heading">
          {t('form:form-title-edit-category')}
        </h1>
      </div>

      <CreateOrUpdateCategoriesForm
        initialValues={data?.category as Category}
      />
    </>
  );
}
UpdateCategoriesPage.authenticate = {
  permissions: adminOnly,
};
UpdateCategoriesPage.Layout = Layout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
});
