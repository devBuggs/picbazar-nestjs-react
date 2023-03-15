import { getLayout } from '@/components/layouts/layout';
import Order from '@/components/orders/order-view';
import Seo from '@/components/seo/seo';
import { useEffect } from 'react';
import { PaymentStatus } from '@/types';
import Spinner from '@/components/ui/loaders/spinner/spinner';
import { useOrder } from '@/framework/order';
import { useRouter } from 'next/router';
import { useModalAction } from '@/components/ui/modal/modal.context';

export { getServerSideProps } from '@/framework/order.ssr';

export default function OrderPage() {
  const { openModal } = useModalAction();
  const { query } = useRouter();
  const { order, isLoading, isFetching } = useOrder({
    tracking_number: query.tracking_number!.toString(),
  });
  // @ts-ignore
  const { payment_status, payment_intent, tracking_number } = order ?? {};
  const isPaymentModalEnabled =
    payment_status === PaymentStatus.PENDING &&
    payment_intent?.payment_intent_info &&
    !payment_intent?.payment_intent_info?.is_redirect;

  useEffect(() => {
    if (isPaymentModalEnabled) {
      openModal('PAYMENT_MODAL', {
        paymentGateway: payment_intent?.payment_gateway,
        paymentIntentInfo: payment_intent?.payment_intent_info,
        trackingNumber: tracking_number,
      });
    }
  }, [payment_status, payment_intent?.payment_intent_info]);

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
