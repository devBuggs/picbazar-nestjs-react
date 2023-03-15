import Card from '@/components/common/card';
import Layout from '@/components/layouts/admin';
import Search from '@/components/common/search';
import CouponList from '@/components/coupon/coupon-list';
import LinkButton from '@/components/ui/link-button';
import { useCouponsQuery } from '@/graphql/coupons.graphql';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { LIMIT } from '@/utils/constants';
import ErrorMessage from '@/components/ui/error-message';
import Loader from '@/components/ui/loader/loader';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { adminOnly } from '@/utils/auth-utils';
import { CouponPaginator, QueryCouponsOrderByColumn, SortOrder } from '__generated__/__types__';
import { Routes } from '@/config/routes';
import { Config } from '@/config';

export default function Coupons() {
  const { t } = useTranslation();
  const { locale } = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const { data, loading, error, refetch } = useCouponsQuery({
    variables: {
      language: locale,
      first: LIMIT,
      orderBy: [
        {
          column: QueryCouponsOrderByColumn.CreatedAt,
          order: SortOrder.Desc,
        },
      ],
      page: 1,
    },
    fetchPolicy: 'network-only',
  });
  if (loading) return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;

  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
    refetch({
      text: `%${searchText}%`,
      page: 1,
    });
  }

  function handlePagination(current: number) {
    refetch({
      text: `%${searchTerm}%`,
      page: current,
    });
  }

  return (
    <>
      <Card className="flex flex-col xl:flex-row items-center mb-8">
        <div className="md:w-1/4 mb-4 xl:mb-0">
          <h1 className="text-xl font-semibold text-heading">
            {t('form:input-label-coupons')}
          </h1>
        </div>

        <div className="w-full xl:w-1/2 flex flex-col md:flex-row space-y-4 md:space-y-0 items-center ms-auto">
          <Search onSearch={handleSearch} />

          {locale === Config.defaultLanguage && (
            <LinkButton
              href={`${Routes.coupon.create}`}
              className="h-12 md:ms-6 w-full md:w-auto"
            >
              <span>+ {t('form:button-label-add-coupon')}</span>
            </LinkButton>
          )}
        </div>
      </Card>

      <CouponList
        coupons={data?.coupons as CouponPaginator}
        onPagination={handlePagination}
        refetch={refetch}
      />
    </>
  );
}
Coupons.authenticate = {
  permissions: adminOnly,
};
Coupons.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common', 'table'])),
  },
});
