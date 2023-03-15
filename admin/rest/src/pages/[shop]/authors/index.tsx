import Card from '@/components/common/card';
import ShopLayout from '@/components/layouts/shop';
import { adminOwnerAndStaffOnly } from '@/utils/auth-utils';
import Search from '@/components/common/search';
import LinkButton from '@/components/ui/link-button';
import { useState } from 'react';
import { LIMIT } from '@/utils/constants';
import ErrorMessage from '@/components/ui/error-message';
import Loader from '@/components/ui/loader/loader';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Routes } from '@/config/routes';
import AuthorList from '@/components/author/author-list';
import { useAuthorsQuery } from '@/data/author';
import { SortOrder } from '@/types';
import { Config } from '@/config';

export default function Authors() {
  const { t } = useTranslation();
  const { locale } = useRouter();
  const {
    query: { shop },
  } = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [orderBy, setOrder] = useState('created_at');
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
  const { authors, loading, paginatorInfo, error } = useAuthorsQuery({
    limit: LIMIT,
    sortedBy,
    orderBy,
    name: searchTerm,
    page,
    language: locale,
  });
  if (loading) return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;

  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
  }

  function handlePagination(current: number) {
    setPage(current);
  }

  return (
    <>
      <Card className="mb-8 flex flex-col items-center xl:flex-row">
        <div className="mb-4 md:w-1/4 xl:mb-0">
          <h1 className="text-xl font-semibold text-heading">
            {t('common:text-authors')}
          </h1>
        </div>

        <div className="ms-auto flex w-full flex-col items-center space-y-4 md:flex-row md:space-y-0 xl:w-1/2">
          <Search onSearch={handleSearch} />

          {locale === Config.defaultLanguage && (
            <LinkButton
              href={`/${shop}${Routes.author.create}`}
              className="md:ms-6 h-12 w-full md:w-auto"
            >
              <span>+ {t('form:button-label-add-author')}</span>
            </LinkButton>
          )}
        </div>
      </Card>

      <AuthorList
        authors={authors}
        paginatorInfo={paginatorInfo}
        onPagination={handlePagination}
        onOrder={setOrder}
        onSort={setColumn}
      />
    </>
  );
}
Authors.authenticate = {
  permissions: adminOwnerAndStaffOnly,
};
Authors.Layout = ShopLayout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
  },
});
