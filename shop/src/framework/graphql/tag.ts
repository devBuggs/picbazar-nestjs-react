import { QueryOptions } from '@/types';
import { NetworkStatus } from '@apollo/client';
import { useRouter } from 'next/router';
import { QueryTagsHasTypeColumn, SqlOperator } from '__generated__/__types__';
import { useTagsQuery } from './gql/tags.graphql';

export const useTags = (options: Pick<QueryOptions, 'limit'>) => {
  const { query, locale } = useRouter();

  const {
    data,
    loading: isLoading,
    error,
    networkStatus,
    fetchMore,
  } = useTagsQuery({
    // @ts-ignore
    variables: {
      ...(query.searchType && {
        hasType: {
          column: QueryTagsHasTypeColumn.Slug,
          operator: SqlOperator.Eq,
          value: query.searchType,
        },
      }),
      language: locale,
      first: options.limit,
    },
    notifyOnNetworkStatusChange: true,
  });
  function handleLoadMore() {
    // @ts-ignore
    if (data?.tags?.paginatorInfo?.hasMorePages) {
      fetchMore({
        variables: {
          // @ts-ignore
          page: data?.tags?.paginatorInfo?.currentPage + 1,
          first: options.limit,
        },
      });
    }
  }
  return {
    tags: data?.tags?.data ?? [],
    // @ts-ignore
    paginatorInfo: data?.tags?.paginatorInfo,
    isLoading,
    isLoadingMore: networkStatus === NetworkStatus.fetchMore,
    error,
    loadMore: handleLoadMore,
    // @ts-ignore
    hasMore: Boolean(data?.tags?.paginatorInfo?.hasMorePages),
  };
};
