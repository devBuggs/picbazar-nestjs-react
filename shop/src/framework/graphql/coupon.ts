import type { CouponQueryOptions } from '@/types';
import { NetworkStatus } from '@apollo/client';
import { useCouponsQuery } from './gql/coupons.graphql';
import { useRouter } from 'next/router';

export function useCoupons(options?: Partial<CouponQueryOptions>) {

  const { locale } = useRouter();

  const localeOptions = {
    language: locale,
    ...options,
    first: 16,
  };


  const {
    data,
    loading: isLoading,
    error,
    fetchMore,
    networkStatus,
  } = useCouponsQuery({
    variables: localeOptions,
    notifyOnNetworkStatusChange: true,
  });
  function handleLoadMore() {
    if (data?.coupons?.paginatorInfo.hasMorePages) {
      fetchMore({
        variables: {
          page: data?.coupons?.paginatorInfo?.currentPage + 1,
          // first: limit,
        },
      });
    }
  }
  return {
    coupons: data?.coupons?.data ?? [],
    paginatorInfo: data?.coupons?.paginatorInfo,
    isLoading,
    error,
    isLoadingMore: networkStatus === NetworkStatus.fetchMore,
    loadMore: handleLoadMore,
    hasMore: Boolean(data?.coupons?.paginatorInfo?.hasMorePages),
  };
}
