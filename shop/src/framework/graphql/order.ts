import type { CheckoutVerificationInput, CreateOrderInput } from '__generated__/__types__';
import { PaymentGatewayType, SavePaymentMethodInput } from '__generated__/__types__';
import type { CreateOrderPaymentInput, OrderQueryOptions, QueryOptions } from '@/types';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useModalAction } from '@/components/ui/modal/modal.context';
import {
  OrdersDocument,
  useCreateOrderMutation,
  useCreateOrderPaymentMutation,
  useOrderQuery,
  useOrdersQuery,
  useVerifyCheckoutMutation,
} from './gql/orders.graphql';
import { NetworkStatus } from '@apollo/client';
import { useRouter } from 'next/router';
import { useCreateRefundMutation, useRefundsQuery } from './gql/refunds.graphql';
import { DownloadableProductsDocument, useDownloadableProductsQuery, useGenerateDownloadableUrlMutation } from './gql/products.graphql';
import { useAtom } from 'jotai';
import { verifiedResponseAtom } from '@/store/checkout';
import { Routes } from '@/config/routes';
import { useGetPaymentIntentLazyQuery, useSavePaymentMethodMutation } from '@/framework/gql/payment_intent.graphql';

export function useOrders(options?: Partial<OrderQueryOptions>) {
  const { locale } = useRouter();

  const {
    data,
    loading: isLoading,
    error,
    fetchMore,
    networkStatus,
  } = useOrdersQuery({
    variables: {
      first: 10,
    },
    notifyOnNetworkStatusChange: true,
  });

  function handleLoadMore() {
    if (data?.orders?.paginatorInfo.hasMorePages) {
      fetchMore({
        variables: {
          page: data?.orders?.paginatorInfo?.currentPage + 1,
        },
      });
    }
  }

  return {
    orders: data?.orders?.data ?? [],
    paginatorInfo: data?.orders?.paginatorInfo,
    isLoading,
    isFetching: networkStatus === NetworkStatus.refetch,
    error,
    isLoadingMore: networkStatus === NetworkStatus.fetchMore,
    loadMore: handleLoadMore,
    hasMore: Boolean(data?.orders?.paginatorInfo?.hasMorePages),
  };
}

export function useOrder({ tracking_number }: { tracking_number: string }) {
  const { data, loading, networkStatus, refetch, error } = useOrderQuery({
    variables: {
      tracking_number,
    },
    notifyOnNetworkStatusChange: true,
  });

  return {
    order: data?.order ?? [],
    isFetching: networkStatus === NetworkStatus.refetch,
    refetch,
    isLoading: loading && networkStatus !== NetworkStatus.refetch,
    error,
  };
}

export function useRefunds(options: Pick<QueryOptions, 'limit'>) {
  const { locale } = useRouter();

  const {
    data,
    loading: isLoading,
    error,
    fetchMore,
    networkStatus,
  } = useRefundsQuery({
    variables: {
      orderBy: 'created_at',
      sortedBy: 'desc',
    },
    notifyOnNetworkStatusChange: true,
  });

  function handleLoadMore() {
    if (data?.refunds?.paginatorInfo.hasMorePages) {
      fetchMore({
        variables: {
          page: data?.refunds?.paginatorInfo?.currentPage + 1,
        },
      });
    }
  }

  return {
    refunds: data?.refunds?.data ?? [],
    paginatorInfo: data?.refunds?.paginatorInfo,
    isLoading,
    isLoadingMore: networkStatus === NetworkStatus.fetchMore,
    error,
    loadMore: handleLoadMore,
    hasMore: Boolean(data?.refunds?.paginatorInfo?.hasMorePages),
  };
}

export const useDownloadableProducts = (
  options: Pick<QueryOptions, 'limit'>
) => {
  const { locale } = useRouter();

  const {
    data,
    loading: isLoading,
    error,
    fetchMore,
    networkStatus,
  } = useDownloadableProductsQuery({
    variables: {
      first: options.limit,
    },
    notifyOnNetworkStatusChange: true,
  });

  function handleLoadMore() {
    if (data?.downloads?.paginatorInfo.hasMorePages) {
      fetchMore({
        variables: {
          page: data?.downloads?.paginatorInfo?.currentPage + 1,
          first: 5,
        },
      });
    }
  }

  return {
    downloads: data?.downloads?.data ?? [],
    paginatorInfo: data?.downloads?.paginatorInfo,
    isLoading,
    isLoadingMore: networkStatus === NetworkStatus.fetchMore,
    isFetching: networkStatus === NetworkStatus.refetch,
    error,
    loadMore: handleLoadMore,
    hasMore: Boolean(data?.downloads?.paginatorInfo?.hasMorePages),
  };
};

export function useCreateRefund() {
  const { t } = useTranslation();
  const { closeModal } = useModalAction();
  const { locale } = useRouter();
  const [refundRequest, { loading: isLoading }] = useCreateRefundMutation({
    refetchQueries: ['Orders'],
    onCompleted: () => {
      toast.success(t('text-refund-request-submitted'));
      closeModal();
    },
  });

  function createRefundRequest(input: any) {
    refundRequest({
      variables: {
        input,
      },
    });
  }

  return {
    createRefundRequest,
    isLoading,
  };
}

export function useCreateOrder() {
  const router = useRouter();
  const { locale } = router;
  const [createOrder, { loading: isLoading }] = useCreateOrderMutation({
    onCompleted: (data) => {
      const { tracking_number, payment_gateway, payment_intent } = data?.createOrder ?? {};
      if (tracking_number) {
        if (
          [
            PaymentGatewayType.CashOnDelivery,
            PaymentGatewayType.Cash,
            PaymentGatewayType.FullWalletPayment,
          ].includes(payment_gateway as PaymentGatewayType)
        ) {
          return router.push(Routes.order(tracking_number));
        }

        if (payment_intent?.payment_intent_info?.is_redirect) {
          return router.push(
            payment_intent?.payment_intent_info?.redirect_url as string
          );
        } else {
          return router.push(`${Routes.order(tracking_number)}/payment`);
        }
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function create(input: CreateOrderInput) {
    createOrder({
      variables: {
        input: {
          ...input,
          language: locale,
        },
      },
    });
  }

  return {
    createOrder: create,
    isLoading,
  };
}

export function useGenerateDownloadableUrl() {
  const [getDownloadableUrl] = useGenerateDownloadableUrlMutation({
    onCompleted: (data) => {
      function download(fileUrl: string, fileName: string) {
        var a = document.createElement('a');
        a.href = fileUrl;
        a.setAttribute('download', fileName);
        a.click();
      }

      download(data?.generateDownloadableUrl!, 'record.name');
    },
  });

  function generateDownloadableUrl(digital_file_id: string) {
    getDownloadableUrl({
      variables: {
        input: {
          digital_file_id,
        },
      },
    });
  }

  return {
    generateDownloadableUrl,
  };
}

export function useVerifyOrder() {
  const [_, setVerifiedResponse] = useAtom(verifiedResponseAtom);

  const [mutate, { loading: isLoading, error }] = useVerifyCheckoutMutation({
    onCompleted: (data) => {
      if (data?.verifyCheckout) {
        //@ts-ignore
        setVerifiedResponse(data.verifyCheckout);
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function verifyOrder(values: CheckoutVerificationInput) {
    mutate({
      variables: {
        input: values,
      },
    });
  }

  return {
    mutate: verifyOrder,
    isLoading,
    error,
  };
}

export function useOrderPayment() {
  const [createOrderPayment, { loading: isLoading, error }] =
    useCreateOrderPaymentMutation({
      onError: (error) => {
        toast.error(error.message);
      },
      refetchQueries: [
        {
          query: OrdersDocument,
        },
        {
          query: DownloadableProductsDocument,
        },
      ],
    });

  function create(input: CreateOrderPaymentInput) {
    createOrderPayment({
      variables: {
        input: {
          ...input,
        },
      },
    });
  }

  return {
    createOrderPayment: create,
    isLoading,
    error,
  };
}

export function useSavePaymentMethod() {
  const [savePaymentMethodMutation, { data, loading, error }] =
    useSavePaymentMethodMutation();

  function savePaymentMethod(
    input: SavePaymentMethodInput,
    { onSuccess }: { onSuccess: any }
  ) {
    savePaymentMethodMutation({
      variables: {
        input: {
          ...input,
        },
      },
      onCompleted: (payload) => onSuccess(payload?.savePaymentMethod),
    });
  }

  return {
    savePaymentMethod,
    isLoading: loading,
    error,
    data: data?.savePaymentMethod,
  };
}

export function useGetPaymentIntent({
  tracking_number,
}: {
  tracking_number: string;
}) {
  const router = useRouter();
  const { openModal } = useModalAction();

  const [getPaymentIntent, { data, loading, error }] =
    useGetPaymentIntentLazyQuery({
      fetchPolicy: "cache-and-network",
      onCompleted: ({ getPaymentIntent: data }) => {
        if (data?.payment_intent_info?.is_redirect) {
          return router.push(data?.payment_intent_info?.redirect_url as string);
        } else {
          openModal('PAYMENT_MODAL', {
            paymentGateway: data?.payment_gateway,
            paymentIntentInfo: data?.payment_intent_info,
            trackingNumber: data?.tracking_number,
          });
        }
      },
    });

  function getPaymentIntentFormatter() {
    getPaymentIntent({
      variables: {
        tracking_number,
      },
    });
  }

  return {
    data: data?.getPaymentIntent,
    getPaymentIntentQuery: getPaymentIntentFormatter,
    isLoading: loading,
    error,
  };
}
