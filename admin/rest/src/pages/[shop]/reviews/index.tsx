import ReviewList from '@/components/reviews/review-list';
import Card from '@/components/common/card';
import Layout from '@/components/layouts/shop';
import { useState } from 'react';
import ErrorMessage from '@/components/ui/error-message';
import Loader from '@/components/ui/loader/loader';
import { SortOrder } from '@/types';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useReviewsQuery } from '@/data/review';
import { adminAndOwnerOnly } from '@/utils/auth-utils';
import { useShopQuery } from '@/data/shop';
import { useRouter } from 'next/router';

export default function Reviews() {
  const [page, setPage] = useState(1);
  const { t } = useTranslation();
  const [orderBy, setOrder] = useState('created_at');
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
  const {
    query: { shop },
  } = useRouter();
  const { data: shopData } = useShopQuery({ slug: shop as string });
  const shopId = shopData?.id!;
  const { reviews, paginatorInfo, loading, error } = useReviewsQuery(
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
      <Card className="mb-8 flex flex-col">
        <div className="flex w-full flex-col items-center md:flex-row">
          <h1 className="text-xl font-semibold text-heading">
            {t('form:input-label-reviews')}
          </h1>
        </div>
      </Card>
      <ReviewList
        reviews={reviews}
        paginatorInfo={paginatorInfo}
        onPagination={handlePagination}
        onOrder={setOrder}
        onSort={setColumn}
      />
    </>
  );
}
Reviews.authenticate = {
  permissions: adminAndOwnerOnly,
};
Reviews.Layout = Layout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
  },
});
