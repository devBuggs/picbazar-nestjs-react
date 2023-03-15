import { MyQuestionQueryOptions } from '@/types';
import { NetworkStatus } from '@apollo/client';
import { useMyQuestionsQuery } from '@/framework/gql/products.graphql';

export function useMyQuestions(options?: MyQuestionQueryOptions) {
  const {
    data,
    loading: isLoading,
    error,
    fetchMore,
    networkStatus,
  } = useMyQuestionsQuery({
    variables: { ...options, page: 1 },
    notifyOnNetworkStatusChange: true,
  });

  function handleLoadMore() {
    if (data?.myQuestions?.paginatorInfo.hasMorePages) {
      fetchMore({
        variables: {
          page: data?.myQuestions?.paginatorInfo?.currentPage + 1,
        },
      });
    }
  }

  return {
    questions: data?.myQuestions?.data ?? [],
    paginatorInfo: data?.myQuestions?.paginatorInfo,
    isLoading,
    error,
    isLoadingMore: networkStatus === NetworkStatus.fetchMore,
    loadMore: handleLoadMore,
    hasMore: Boolean(data?.myQuestions?.paginatorInfo?.hasMorePages),
  };
}
