import { ProductQueryOptions, SearchParamOptions } from '@/types';

function formatSearchParams(params: Partial<SearchParamOptions>) {
  return Object.entries(params)
    .filter(([, value]) => Boolean(value))
    .map(([k, v]) =>
      ['type', 'categories', 'tags', 'author', 'manufacturer'].includes(k)
        ? `${k}.slug:${v}`
        : `${k}:${v}`
    )
    .join(';');
}

export const getProducts = ({
  type,
  categories,
  name,
  shop_id,
  author,
  manufacturer,
  min_price,
  max_price,
  tags,
  text,
  limit = 30,
  ...params
}: Partial<ProductQueryOptions>) => {
  return {
    // searchJoin: 'AND',
    // with: 'type;author',
    first: limit,
    ...params,
    search: formatSearchParams({
      ...(name && { name: name.toString() }),
      ...(text && { name: text.toString() }),
      type,
      categories,
      shop_id,
      author,
      manufacturer,
      min_price,
      max_price,
      tags,
      status: 'publish',
    }),
  };
};
