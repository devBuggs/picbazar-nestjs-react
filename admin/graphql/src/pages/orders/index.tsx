import Card from '@/components/common/card';
import Layout from '@/components/layouts/admin';
import Search from '@/components/common/search';
import OrderList from '@/components/order/order-list';
import {
  useOrdersQuery,
  useGenerateOrderExportUrlMutation,
} from '@/graphql/orders.graphql';
import { LIMIT } from '@/utils/constants';
import { useState, Fragment } from 'react';
import ErrorMessage from '@/components/ui/error-message';
import Loader from '@/components/ui/loader/loader';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { adminOnly } from '@/utils/auth-utils';
import { MoreIcon } from '@/components/icons/more-icon';
import { Menu, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useShopQuery } from '@/graphql/shops.graphql';
import { DownloadIcon } from '@/components/icons/download-icon';
import { OrderPaginator } from '../../../__generated__/__types__';

export default function Orders() {
  const router = useRouter();
  const {
    query: { shop },
  } = router;
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [generateOrderExportUrlMutation] = useGenerateOrderExportUrlMutation();

  const { data: shopData } = useShopQuery({
    skip: !Boolean(shop),
    variables: {
      slug: shop as string,
    },
  });

  const shopId = shopData?.shop?.id!;

  const { data, loading, error, refetch } = useOrdersQuery({
    variables: {
      first: LIMIT,
      page: 1,
      orderBy: 'updated_at',
      sortedBy: 'DESC',
    },
    fetchPolicy: 'network-only',
  });

  if (loading) return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;

  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
    refetch({
      tracking_number: `%${searchText}%`,
      page: 1,
    });
  }

  function handlePagination(current: any) {
    refetch({
      tracking_number: `%${searchTerm}%`,
      page: current,
    });
  }

  async function handleExportOrder() {
    const { data } = await generateOrderExportUrlMutation({
      variables: {
        input: {
          ...(shopId && { shop_id: shopId }),
        },
      },
    });

    if (data?.generateOrderExportUrl) {
      router.push(data?.generateOrderExportUrl);
    }
  }

  return (
    <>
      <Card className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div className="md:w-1/4 mb-4 md:mb-0">
          <h1 className="text-lg font-semibold text-heading">
            {t('form:input-label-orders')}
          </h1>
        </div>

        <div className="w-full md:w-1/2 flex flex-col md:flex-row items-center ms-auto">
          <Search onSearch={handleSearch} />
        </div>

        <Menu
          as="div"
          className="relative inline-block ltr:text-left rtl:text-right"
        >
          <Menu.Button className="group p-2">
            <MoreIcon className="w-3.5 text-body" />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              as="ul"
              className={classNames(
                'absolute mt-2 w-52 overflow-hidden rounded border border-border-200 bg-light py-2 shadow-700 focus:outline-none ltr:right-0 ltr:origin-top-right rtl:left-0 rtl:origin-top-left z-50'
              )}
            >
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleExportOrder}
                    className={classNames(
                      'flex w-full items-center space-x-3 px-5 py-2.5 text-sm font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none rtl:space-x-reverse',
                      active ? 'text-accent' : 'text-body'
                    )}
                  >
                    <DownloadIcon className="w-5 shrink-0" />
                    <span className="whitespace-nowrap">
                      {t('common:text-export-orders')}
                    </span>
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </Card>

      <OrderList
        orders={data?.orders as OrderPaginator}
        onPagination={handlePagination}
        refetch={refetch}
      />
    </>
  );
}
Orders.authenticate = {
  permissions: adminOnly,
};
Orders.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
  },
});
