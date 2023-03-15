import Card from '@/components/common/card';
import ErrorMessage from '@/components/ui/error-message';
import Loader from '@/components/ui/loader/loader';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import WithdrawList from '@/components/withdraw/withdraw-list';
import LinkButton from '@/components/ui/link-button';
import ShopLayout from '@/components/layouts/shop';
import { useRouter } from 'next/router';
import { adminAndOwnerOnly } from '@/utils/auth-utils';
import { useShopQuery } from '@/data/shop';
import { useWithdrawsQuery } from '@/data/withdraw';
import { useState } from 'react';
import { SortOrder } from '@/types';

export default function WithdrawsPage() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [orderBy, setOrder] = useState('created_at');
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
  const {
    query: { shop },
  } = useRouter();
  const { data: shopData } = useShopQuery({
    slug: shop as string,
  });
  const shopId = shopData?.id!;

  const { withdraws, paginatorInfo, loading, error } = useWithdrawsQuery(
    {
      shop_id: shopId,
      limit: 10,
      page,
      orderBy,
      sortedBy,
    },
    {
      enabled: Boolean(shopId),
    }
  );

  if (loading) return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;

  function handlePagination(current: any) {
    setPage(current);
  }

  return (
    <>
      <Card className="mb-8 flex flex-col items-center justify-between md:flex-row">
        <div className="mb-4 md:mb-0 md:w-1/4">
          <h1 className="text-lg font-semibold text-heading">
            {t('common:sidebar-nav-item-withdraws')}
          </h1>
        </div>

        <LinkButton
          href={`/${shop}/withdraws/create`}
          className="h-12 w-full md:w-auto md:ms-auto"
        >
          <span>+ {t('form:button-label-add-withdraw')}</span>
        </LinkButton>
      </Card>

      <WithdrawList
        withdraws={withdraws}
        paginatorInfo={paginatorInfo}
        onPagination={handlePagination}
        onOrder={setOrder}
        onSort={setColumn}
      />
    </>
  );
}
WithdrawsPage.authenticate = {
  permissions: adminAndOwnerOnly,
};
WithdrawsPage.Layout = ShopLayout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
  },
});
