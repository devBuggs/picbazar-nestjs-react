import Layout from '@/components/layouts/admin';
import { useRouter } from 'next/router';
import ErrorMessage from '@/components/ui/error-message';
import Loader from '@/components/ui/loader/loader';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ReviewDetailsView from '@/components/reviews/review-details';
import { useReviewQuery } from '@/graphql/reviews.graphql';
import { Review } from '../../../../__generated__/__types__';

export default function ReviewDetailsPage() {
  const { t } = useTranslation();
  const { query } = useRouter();
  const { data, loading, error } = useReviewQuery({
    variables: {
      id: query.reviewId! as string,
    },
  });

  if (loading) return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;

  return <ReviewDetailsView review={data?.review as Review} />;
}
ReviewDetailsPage.Layout = Layout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'form', 'table'])),
  },
});
