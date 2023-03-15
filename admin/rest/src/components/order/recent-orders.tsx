import dayjs from 'dayjs';
import { Table } from '@/components/ui/table';
import usePrice from '@/utils/use-price';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Order, OrderStatus } from '@/types';
import { useTranslation } from 'next-i18next';
import Badge from '@/components/ui/badge/badge';
import StatusColor from '@/components/order/status-color';

type IProps = {
  orders: Order[];
  title?: string;
};

const RecentOrders = ({ orders, title }: IProps) => {
  const { t } = useTranslation();

  const rowExpandable = (record: any) => record.children?.length;

  const columns = [
    {
      title: t('table:table-item-tracking-number'),
      dataIndex: 'tracking_number',
      key: 'tracking_number',
      align: 'center',
      width: 150,
    },
    {
      title: t('table:table-item-total'),
      dataIndex: 'total',
      key: 'total',
      align: 'center',
      render: function Render(value: any) {
        const { price } = usePrice({
          amount: value,
        });
        return <span className="whitespace-nowrap">{price}</span>;
      },
    },
    {
      title: t('table:table-item-order-date'),
      dataIndex: 'created_at',
      key: 'created_at',
      align: 'center',
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
      align: 'center',
      render: (order_status: OrderStatus) => (
        <Badge text={t(order_status)} color={StatusColor(order_status)} />
      ),
    },
  ];

  return (
    <>
      <div className="overflow-hidden rounded shadow">
        <h3 className="border-b border-border-200 bg-light px-4 py-3 text-center font-semibold text-heading">
          {title}
        </h3>
        <Table
          //@ts-ignore
          columns={columns}
          emptyText={t('table:empty-table-data')}
          data={orders}
          rowKey="id"
          scroll={{ x: 200 }}
          expandable={{
            expandedRowRender: () => '',
            rowExpandable: rowExpandable,
          }}
        />
      </div>
    </>
  );
};

export default RecentOrders;
