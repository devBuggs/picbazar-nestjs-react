import { MyReportsQueryOptions } from '@/types';
import { useMyReportsQuery } from '@/framework/gql/products.graphql';
import { NetworkStatus } from '@apollo/client';

export function useMyReports({
  limit,
  ...options
}: Partial<MyReportsQueryOptions> = {}) {
  const {
    data,
    loading: isLoading,
    error,
    fetchMore,
    networkStatus,
  } = useMyReportsQuery({
    variables: {
      ...options,
      page: 1,
      ...(limit && { first: limit }),
    },
    notifyOnNetworkStatusChange: true,
  });

  function handleLoadMore() {
    if (data?.myReports?.paginatorInfo.hasMorePages) {
      fetchMore({
        variables: {
          page: data?.myReports?.paginatorInfo?.currentPage + 1,
        },
      });
    }
  }

  return {
    reports: data?.myReports?.data ?? [],
    paginatorInfo: data?.myReports?.paginatorInfo,
    isLoading,
    error,
    isLoadingMore: networkStatus === NetworkStatus.fetchMore,
    loadMore: handleLoadMore,
    hasMore: Boolean(data?.myReports?.paginatorInfo?.hasMorePages),
  };
}
