import CategoryList from '@/components/category/category-list';
import Card from '@/components/common/card';
import Layout from '@/components/layouts/admin';
import Search from '@/components/common/search';
import LinkButton from '@/components/ui/link-button';
import { useState } from 'react';
import ErrorMessage from '@/components/ui/error-message';
import Loader from '@/components/ui/loader/loader';
import { SortOrder } from '@/types';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Routes } from '@/config/routes';
import TypeFilter from '@/components/category/type-filter';
import { adminOnly } from '@/utils/auth-utils';
import { useCategoriesQuery } from '@/data/category';
import { useRouter } from 'next/router';
import { Config } from '@/config';

export default function Categories() {
  const { locale } = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [type, setType] = useState('');
  const [page, setPage] = useState(1);
  const { t } = useTranslation();
  const [orderBy, setOrder] = useState('created_at');
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
  const { categories, paginatorInfo, loading, error } = useCategoriesQuery({
    limit: 20,
    page,
    type,
    name: searchTerm,
    orderBy,
    sortedBy,
    parent: null,
    language: locale,
  });

  if (loading) return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;

  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
    setPage(1);
  }

  function handlePagination(current: any) {
    setPage(current);
  }

  return (
    <>
      <Card className="mb-8 flex flex-col">
        <div className="flex w-full flex-col items-center md:flex-row">
          <div className="mb-4 md:mb-0 md:w-1/4">
            <h1 className="text-xl font-semibold text-heading">
              {t('form:input-label-categories')}
            </h1>
          </div>

          <div className="ms-auto flex w-full flex-col items-center space-y-4 md:flex-row md:space-y-0 xl:w-3/4">
            <Search onSearch={handleSearch} />

            <TypeFilter
              className="md:ms-6"
              onTypeFilter={({ slug }: { slug: string }) => {
                setType(slug);
                setPage(1);
              }}
            />

            {locale === Config.defaultLanguage && (
              <LinkButton
                href={`${Routes.category.create}`}
                className="md:ms-6 h-12 w-full md:w-auto"
              >
                <span className="block md:hidden xl:block">
                  + {t('form:button-label-add-categories')}
                </span>
                <span className="hidden md:block xl:hidden">
                  + {t('form:button-label-add')}
                </span>
              </LinkButton>
            )}
          </div>
        </div>
      </Card>
      <CategoryList
        categories={categories}
        paginatorInfo={paginatorInfo}
        onPagination={handlePagination}
        onOrder={setOrder}
        onSort={setColumn}
      />
    </>
  );
}

Categories.authenticate = {
  permissions: adminOnly,
};
Categories.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common', 'table'])),
  },
});
