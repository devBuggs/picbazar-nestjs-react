import Layout from '@/components/layouts/admin';
import { useRouter } from 'next/router';
import ErrorMessage from '@/components/ui/error-message';
import Loader from '@/components/ui/loader/loader';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTagQuery } from '@/graphql/tags.graphql';
import CreateOrUpdateTagForm from '@/components/tag/tag-form';
import { adminOnly } from '@/utils/auth-utils';
import { Config } from '@/config';
import { Tag } from '__generated__/__types__';

export default function UpdateTagPage() {
  const { t } = useTranslation();
  const { locale, query } = useRouter();
  const { data, loading, error } = useTagQuery({
    variables: {
      slug: query.tagSlug as string,
      language:
        query.action!.toString() === 'edit' ? locale! : Config.defaultLanguage,
    },
  });
  if (loading) return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-gray-300">
        <h1 className="text-lg font-semibold text-heading">
          {t('form:form-title-edit-tags')}
        </h1>
      </div>

      <CreateOrUpdateTagForm initialValues={data?.tag as Tag} />
    </>
  );
}
UpdateTagPage.authenticate = {
  permissions: adminOnly,
};
UpdateTagPage.Layout = Layout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
});
