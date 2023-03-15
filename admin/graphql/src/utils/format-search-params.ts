import { ProductStatus } from '../../__generated__/__types__';

interface SearchParamOptions {
  categories: string;
  code: string;
  type: string;
  name: string;
  shop_id: string;
  is_approved: boolean;
  tracking_number: string;
  status: ProductStatus;
}

function formatBooleanSearchParam(key: string, value: boolean) {
  return value ? `${key}:1` : `${key}:`;
}

export function formatSearchParams(params: Partial<SearchParamOptions>) {
  return Object.entries(params)
    .filter(([, value]) => Boolean(value))
    .map(([k, v]) =>
      ['type', 'categories', 'tags', 'author', 'manufacturer'].includes(k)
        ? `${k}.slug:${v}`
        : ['is_approved'].includes(k)
        ? formatBooleanSearchParam(k, v as boolean)
        : `${k}:${v}`
    )
    .join(';');
}
