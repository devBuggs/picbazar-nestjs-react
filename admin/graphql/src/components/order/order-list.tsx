import Pagination from '@/components/ui/pagination';
import dayjs from 'dayjs';
import { Table } from '@/components/ui/table';
import ActionButtons from '@/components/common/action-buttons';
import usePrice from '@/utils/use-price';
import { formatAddress } from '@/utils/format-address';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { useTranslation } from 'next-i18next';
import { useIsRTL } from '@/utils/locals';
import {
  OrderPaginator,
  UserAddress,
  SortOrder,
} from '__generated__/__types__';
import { useMemo, useState } from 'react';
import debounce from 'lodash/debounce';
import TitleWithSort from '@/components/ui/title-with-sort';
import { Order } from 'graphql-let/__generated__/__types__';
import { useRouter } from 'next/router';
import Badge from '@/components/ui/badge/badge';
import StatusColor from '@/components/order/status-color';

type IProps = {
  orders: OrderPaginator | null | undefined;
  onPagination: (current: number) => void;
  refetch: Function;
};

const OrderList = ({ orders, onPagination, refetch }: IProps) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { data, paginatorInfo } = orders! ?? {};
  const rowExpandable = (record: any) => record.children?.length;
  const { alignLeft } = useIsRTL();

  const [order, setOrder] = useState<SortOrder>(SortOrder.Desc);
  const [column, setColumn] = useState<string>();

  const debouncedHeaderClick = useMemo(
    () =>
      debounce((value) => {
        setColumn(value);
        setOrder(order === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc);
        refetch({
          sortedBy: order === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc,
          orderBy: value,
        });
      }, 500),
    [order]
  );

  const onHeaderClick = (value: string | undefined) => ({
    onClick: () => {
      debouncedHeaderClick(value);
    },
  });

  const columns = [
    {
      title: t('table:table-item-tracking-number'),
      dataIndex: 'tracking_number',
      key: 'tracking_number',
      align: 'center',
      width: 150,
    },
    {
      title: t('table:table-item-delivery-fee'),
      dataIndex: 'delivery_fee',
      key: 'delivery_fee',
      align: 'center',
      render: function Render(value: any) {
        const delivery_fee = value ? value : 0;
        const { price } = usePrice({
          amount: delivery_fee,
        });
        return <span>{price}</span>;
      },
    },

    {
      title: (
        <TitleWithSort
          title={t('table:table-item-total')}
          ascending={order === SortOrder.Asc && column === 'total'}
          isActive={column === 'total'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'total',
      key: 'total',
      align: 'center',
      width: 120,
      onHeaderCell: () => onHeaderClick('total'),
      render: function Render(value: any) {
        const { price } = usePrice({
          amount: value,
        });
        return <span className="whitespace-nowrap">{price}</span>;
      },
    },
    {
      title: (
        <TitleWithSort
          title={t('table:table-item-order-date')}
          ascending={order === SortOrder.Asc && column === 'created_at'}
          isActive={column === 'created_at'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'created_at',
      key: 'created_at',
      align: 'center',
      onHeaderCell: () => onHeaderClick('created_at'),
      render: (date: string) => {
        dayjs.extend(relativeTime);
        dayjs.extend(utc);
        dayjs.extend(timezone);
        return (
          <span className="whitespace-nowrap">
            {dayjs.utc(date).tz(dayjs.tz.guess()).fromNow()}
          </span>
        );
      },
    },
    {
      title: t('table:table-item-status'),
      dataIndex: 'order_status',
      key: 'order_status',
      align: alignLeft,
      render: (order_status: string) => (
        <Badge text={t(order_status)} color={StatusColor(order_status)} />
      ),
    },
    {
      title: t('table:table-item-shipping-address'),
      dataIndex: 'shipping_address',
      key: 'shipping_address',
      align: alignLeft,
      render: (shipping_address: UserAddress) => (
        <div>{formatAddress(shipping_address)}</div>
      ),
    },
    {
      title: t('table:table-item-actions'),
      dataIndex: 'id',
      key: 'actions',
      align: 'center',
      width: 100,
      render: (id: string, order: Order) => {
        return (
          <ActionButtons
            id={id}
            detailsUrl={`${router.asPath}/${id}`}
            customLocale={order.language as string}
          />
        );
      },
    },
  ];

  return (
    <>
      <div className="rounded overflow-hidden shadow mb-6">
        <Table
          //@ts-ignore
          columns={columns}
          emptyText={t('table:empty-table-data')}
          data={data}
          rowKey="id"
          scroll={{ x: 1000 }}
          expandable={{
            expandedRowRender: () => '',
            rowExpandable: rowExpandable,
          }}
        />
      </div>

      {!!paginatorInfo?.total && (
        <div className="flex justify-end items-center">
          <Pagination
            total={paginatorInfo?.total}
            current={paginatorInfo?.currentPage}
            pageSize={paginatorInfo?.perPage}
            onChange={onPagination}
          />
        </div>
      )}
    </>
  );
};

export default OrderList;
