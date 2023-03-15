import { getLayout } from '@/components/layouts/layout';
import Order from '@/components/orders/order-view';
import Seo from '@/components/seo/seo';
import { useRouter } from 'next/router';
import { useOrder } from '@/framework/order';
import Spinner from '@/components/ui/loaders/spinner/spinner';

export { getServerSideProps } from '@/framework/order.ssr';

export default function OrderPage() {
  const { query } = useRouter();
  const { order, isLoading, isFetching } = useOrder({
    tracking_number: query.tracking_number!.toString(),
  });

  if (isLoading) {
    return <Spinner showText={false} />;
  }

  return (
    <>
      <Seo noindex={true} nofollow={true} />
      <Order order={order} loadingStatus={!isLoading && isFetching} />
    </>
  );
}

OrderPage.getLayout = getLayout;
