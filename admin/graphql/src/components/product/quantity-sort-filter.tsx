import Select from '@/components/ui/select/select';
import React from 'react';
import { useTypesQuery } from '@/graphql/type.graphql';
import { useTranslation } from 'next-i18next';
import Label from '@/components/ui/label';
import cn from 'classnames';
import { formatSearchParams } from '@/utils/format-search-params';
import { useRouter } from 'next/router';

type Props = {
  refetch: Function;
  className?: string;
};
export default function QuantitySortFilter({ refetch, className }: Props) {
  const { t } = useTranslation();
  const { locale } = useRouter();
  const { data, loading } = useTypesQuery({
    variables: {
      language: locale,
    },
    fetchPolicy: 'network-only',
  });

  return (
    <div className={cn('flex w-full', className)}>
      <div className="w-full">
        <Label>{t('common:sort-by-quantity')}</Label>
        <Select
          options={data?.types}
          isLoading={loading}
          getOptionLabel={(option: any) => option.name}
          getOptionValue={(option: any) => option.slug}
          placeholder={t('common:sort-by-quantity')}
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
