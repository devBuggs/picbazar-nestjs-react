import type { TypeQueryOptions } from '@/types';
import { useGroupQuery, useGroupsQuery } from './gql/groups.graphql';
import { useRouter } from 'next/router';

export function useTypes(options?: Partial<TypeQueryOptions>) {
  const { locale } = useRouter();

  const localeOptions = {
    language: locale,
    ...options,
  };

  const {
    data,
    loading: isLoading,
    error,
  } = useGroupsQuery({
    variables: {
      ...localeOptions,
    },
  });
  return {
    types: data?.types ?? [],
    isLoading,
    error,
  };
}

export function useType(slug: string) {
  const { locale } = useRouter();
  const {
    data,
    loading: isLoading,
    error,
  } = useGroupQuery({
    variables: {
      slug,
      language: locale,
    },
  });
  return {
    type: data?.type,
    isLoading,
    error,
  };
}
