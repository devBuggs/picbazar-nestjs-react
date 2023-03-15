import camelCaseKeys from 'camelcase-keys';
import { MappedPaginatorInfo, PaginatorInfo } from '@/types';

export const mapPaginatorData = (
  obj: PaginatorInfo<any> | undefined
): MappedPaginatorInfo | null => {
  if (!obj) return null;
  const { data, ...formattedValues } = camelCaseKeys(obj);
  return {
    ...formattedValues,
    hasMorePages: formattedValues.lastPage !== formattedValues.currentPage,
  };
};
