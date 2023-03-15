import Button from '@/components/ui/button';
import React from 'react';
import { SortOrder } from '__generated__/__types__';
import { QueryProductsOrderByColumn } from '@/types/custom-types';

type Props = {
  refetch: Function;
};

export default function ClearFilterButton({ refetch }: Props) {
  return (
    <Button
      onClick={() => {
        refetch({
          first: 10,
          hasType: null,
          // shop_id: null,
          hasCategories: null,
          // status: null,
          orderBy: QueryProductsOrderByColumn.CREATED_AT,
          sortedBy: SortOrder.Desc,
          // orderBy: [
          //   {
          //     column: QueryProductsOrderByColumn.CREATED_AT,
          //     order: SortOrder.Desc,
          //   },
          // ],
          page: 1,
        });
      }}
    >
      Clear
    </Button>
  );
}
