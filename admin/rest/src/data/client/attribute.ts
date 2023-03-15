import { crudFactory } from '@/data/client/curd-factory';
import {
  Attribute,
  AttributePaginator,
  AttributeQueryOptions,
  CreateAttributeInput,
  QueryOptions,
} from '@/types';
import { API_ENDPOINTS } from '@/data/client/api-endpoints';
import { HttpClient } from '@/data/client/http-client';

export const attributeClient = {
  ...crudFactory<Attribute, QueryOptions, CreateAttributeInput>(
    API_ENDPOINTS.ATTRIBUTES
  ),
  paginated: ({
    type,
    name,
    shop_id,
    ...params
  }: Partial<AttributeQueryOptions>) => {
    return HttpClient.get<AttributePaginator>(API_ENDPOINTS.ATTRIBUTES, {
      searchJoin: 'and',
      ...params,
      search: HttpClient.formatSearchParams({ type, name, shop_id }),
    });
  },
  all: ({ type, name, shop_id, ...params }: Partial<AttributeQueryOptions>) => {
    return HttpClient.get<Attribute[]>(API_ENDPOINTS.ATTRIBUTES, {
      searchJoin: 'and',
      ...params,
      search: HttpClient.formatSearchParams({ type, name, shop_id }),
    });
  },
};
