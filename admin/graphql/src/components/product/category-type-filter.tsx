import Select from '@/components/ui/select/select';
import { useCategoriesQuery } from '@/graphql/categories.graphql';
import React from 'react';
import { useTypesQuery } from '@/graphql/type.graphql';
import { useTranslation } from 'next-i18next';
import Label from '@/components/ui/label';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { formatSearchParams } from '@/utils/format-search-params';

type Props = {
  refetch: Function;
  className?: string;
};

export default function CategoryTypeFilter({ refetch, className }: Props) {
  const { t } = useTranslation();
  const { locale } = useRouter();
  const { data, loading } = useTypesQuery({
    variables: {
      language: locale
    },
    fetchPolicy: 'network-only',
  });
  const { data: categoryData, loading: categoryLoading } = useCategoriesQuery({
    variables: {
      language: locale,
      first: 999,
      page: 1,
    },
    fetchPolicy: 'network-only',
  });

  return (
    <div
      className={cn(
        'flex flex-col md:flex-row md:space-x-5 rtl:space-x-reverse md:items-end space-y-5 md:space-y-0 w-full',
        className
      )}
    >
      <div className="w-full">
        <Label>{t('common:filter-by-group')}</Label>
        <Select
          options={data?.types}
          isLoading={loading}
          getOptionLabel={(option: any) => option.name}
          getOptionValue={(option: any) => option.slug}
          placeholder={t('common:filter-by-group-placeholder')}
          onChange={(value: any) => {
            refetch({
              page: 1,
              search: formatSearchParams({
                type: value.slug,
              }),
            });
          }}
        />
      </div>
      <div className="w-full">
        <Label>{t('common:filter-by-category')}</Label>
        <Select
          options={categoryData?.categories?.data}
          getOptionLabel={(option: any) => option.name}
          getOptionValue={(option: any) => option.slug}
          isLoading={categoryLoading}
          placeholder={t('common:filter-by-category-placeholder')}
          onChange={(value: any) => {
            refetch({
              page: 1,
              search: formatSearchParams({
                categories: value.slug,
              }),
            });
          }}
        />
      </div>
    </div>
  );
}
