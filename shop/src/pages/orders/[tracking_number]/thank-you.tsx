import { getLayout } from '@/components/layouts/layout';
import Order from '@/components/orders/order-view';
import Seo from '@/components/seo/seo';
import { useEffect, useState } from 'react';
import Spinner from '@/components/ui/loaders/spinner/spinner';
import { useOrder, useOrderPayment } from '@/framework/order';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';

export { getServerSideProps } from '@/framework/order.ssr';

export default function OrderPage() {
  const { query } = useRouter();
  const { t } = useTranslation();
  const { order, isLoading, isFetching } = useOrder({
    tracking_number: query.tracking_number!.toString(),
  });
  const { createOrderPayment } = useOrderPayment();

  useEffect(() => {
    //@ts-ignore
    switch (order?.payment_status) {
      case 'payment-pending':
        toast.success(t('payment-pending'));
        break;

      case 'payment-awaiting-for-approval':
        toast.success(t('payment-awaiting-for-approval'));
        break;

      case 'payment-processing':
        toast.success(t('payment-processing'));
        break;

      case 'payment-success':
        toast.success(t('payment-success'));
        break;

      case 'payment-reversal':
        toast.error(t('payment-reversal'));
        break;

      case 'payment-failed':
        toast.error(t('payment-failed'));
        break;
    }
    //@ts-ignore
  }, [order?.payment_status]);

  useEffect(() => {
    createOrderPayment({
      tracking_number: query?.tracking_number as string,
    });
  }, []);

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
