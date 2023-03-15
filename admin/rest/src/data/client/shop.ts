import {
  QueryOptions,
  Shop,
  ShopInput,
  ShopPaginator,
  ShopQueryOptions,
} from '@/types';
import { ApproveShopInput } from '@/types';
import { API_ENDPOINTS } from './api-endpoints';
import { HttpClient } from './http-client';
import { crudFactory } from './curd-factory';

export const shopClient = {
  ...crudFactory<Shop, QueryOptions, ShopInput>(API_ENDPOINTS.SHOPS),
  get({ slug }: { slug: String }) {
    return HttpClient.get<Shop>(`${API_ENDPOINTS.SHOPS}/${slug}`);
  },
  paginated: ({ name, ...params }: Partial<ShopQueryOptions>) => {
    return HttpClient.get<ShopPaginator>(API_ENDPOINTS.SHOPS, {
      searchJoin: 'and',
      ...params,
      search: HttpClient.formatSearchParams({ name }),
    });
  },
  approve: (variables: ApproveShopInput) => {
    return HttpClient.post<any>(API_ENDPOINTS.APPROVE_SHOP, variables);
  },
  disapprove: (variables: { id: string }) => {
    return HttpClient.post<{ id: string }>(
      API_ENDPOINTS.DISAPPROVE_SHOP,
      variables
    );
  },
};
