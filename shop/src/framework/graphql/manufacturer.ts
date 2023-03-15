import type {
  ManufacturerQueryOptions,
  QueryOptions,
  SearchParamOptions,
} from '@/types';
import { NetworkStatus } from '@apollo/client';
import { useRouter } from 'next/router';
import {
  QueryManufacturersHasTypeColumn,
  SqlOperator,
} from '__generated__/__types__';
import {
  useManufacturersQuery,
  useTopManufacturersQuery,
} from './gql/manufacturers.graphql';

export function useManufacturers(options?: ManufacturerQueryOptions) {
  const { query, locale } = useRouter();

  const {
    data,
    loading: isLoading,
    error,
    fetchMore,
    networkStatus,
  } = useManufacturersQuery({
    //@ts-ignore
    variables: {
      first: options?.limit,
      language: locale,
      ...(query.text && { text: `%${query?.text}%` }),
      ...(query.searchType && {
        hasType: {
          column: QueryManufacturersHasTypeColumn.Slug,
          operator: SqlOperator.Eq,
          value: query.searchType,
        },
      }),
    },
    notifyOnNetworkStatusChange: true,
  });
  function handleLoadMore() {
    if (data?.manufacturers?.paginatorInfo.hasMorePages) {
      fetchMore({
        variables: {
          page: data?.manufacturers?.paginatorInfo?.currentPage + 1,
          first: options?.limit,
        },
      });
    }
  }
  return {
    manufacturers: data?.manufacturers?.data ?? [],
    paginatorInfo: data?.manufacturers?.paginatorInfo,
    isLoading,
    error,
    isLoadingMore: networkStatus === NetworkStatus.fetchMore,
    loadMore: handleLoadMore,
    hasMore: Boolean(data?.manufacturers?.paginatorInfo?.hasMorePages),
  };
}

export function useTopManufacturers(options: Pick<QueryOptions, 'limit'>) {
  const { locale } = useRouter();

  const formattedOptions = {
    language: locale,
    ...options,
  };

  const {
    data,
    loading: isLoading,
    error,
  } = useTopManufacturersQuery({
    variables: formattedOptions,
  });

  return {
    manufacturers: data?.topManufacturers ?? [],
    isLoading,
    error,
  };
}
