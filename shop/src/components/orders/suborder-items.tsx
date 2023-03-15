import { useIsRTL } from '@/lib/locals';
import { useTranslation } from 'next-i18next';
import dayjs from 'dayjs';
import Badge from '@/components/ui/badge';
import { formatString } from '@/lib/format-string';
import usePrice from '@/lib/use-price';
import Link from '@/components/ui/link';
import { Routes } from '@/config/routes';
import { Table } from '@/components/ui/table';

interface SuborderItemsProps {
  items: any;
}

const SuborderItems: React.FC<SuborderItemsProps> = ({ items }) => {
  const { t } = useTranslation('common');
  const { alignLeft, alignRight } = useIsRTL();

  const orderTableColumns = [
    {
      title: t('text-tracking-number'),
      dataIndex: 'tracking_number',
      key: 'tracking_number',
      align: alignLeft,
    },
    {
      title: t('text-date'),
      dataIndex: 'date',
      key: 'date',
      align: alignLeft,
      render: (created_at: string) => dayjs(created_at).format('MMMM D, YYYY'),
    },
    {
      title: t('text-status'),
      dataIndex: 'status',
      key: 'status',
      align: alignLeft,
      render: function renderStatus(status: any) {
        return (
          <Badge
            text={status?.name}
            style={{ backgroundColor: status?.color }}
          />
        );
      },
    },
    {
      title: t('text-item'),
      dataIndex: 'products',
      key: 'products',
      align: alignLeft,
      render: (products: any) => formatString(products?.length, t('text-item')),
    },
    {
      title: t('text-total-price'),
      dataIndex: 'paid_total',
      key: 'paid_total',
      align: alignRight,
      // width: 100,
      render: function TotalPrice(paid_total: any) {
        const { price } = usePrice({ amount: paid_total });
        return <p>{price}</p>;
      },
    },
    {
      title: '',
      dataIndex: 'tracking_number',
      key: 'tracking_number',
      align: alignRight,
      // width: 100,
      render: function renderTrackingNumber(tracking_number: string) {
        return (
          <Link
            href={Routes.order(tracking_number)}
            className="inline-flex h-10 flex-shrink-0 items-center justify-center rounded border border-transparent bg-gray-700 px-4 py-0 text-sm font-semibold leading-none text-light outline-none transition duration-300 ease-in-out hover:bg-gray-900 focus:shadow focus:outline-none"
          >
            {t('text-view')}
          </Link>
        );
      },
    },
  ];
  return (
    <Table
      //@ts-ignore
      columns={orderTableColumns}
      emptyText={t('table:empty-table-data')}
      //@ts-ignore
      data={items}
      rowKey="id"
      scroll={{ x: 800 }}
    />
  );
};

export default SuborderItems;
