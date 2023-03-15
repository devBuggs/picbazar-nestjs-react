import ErrorMessage from '@/components/ui/error-message';
import { useTranslation } from 'next-i18next';
import NotFound from '@/components/ui/not-found';
import { useMyReports } from '@/framework/report';
import { useIsRTL } from '@/lib/locals';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Table } from '@/components/ui/table';
import TableLoader from '../ui/loaders/table-loader';
import { useRouter } from 'next/router';

type AlignType = 'left' | 'right' | 'center';

const MyReports: React.FC = () => {
  const { t } = useTranslation('common');
  const { alignLeft } = useIsRTL();
  const { locale } = useRouter();
  const { reports, isLoading, isLoadingMore, error, hasMore, loadMore } =
    useMyReports({
      language: locale,
      limit: 50,
    });

  if (error) return <ErrorMessage message={error.message} />;

  const orderTableColumns = [
    {
      title: t('text-id'),
      dataIndex: 'id',
      key: 'id',
      align: 'center' as AlignType,
      className: '!text-sm',
      width: 80,
    },
    {
      title: t('text-message'),
      dataIndex: 'message',
      key: 'message',
      align: alignLeft as AlignType,
      className: '!text-sm min-w-fit',
      // width: 300,
    },
    {
      title: t('text-date'),
      dataIndex: 'created_at',
      key: 'created_at',
      align: 'center' as AlignType,
      className: '!text-sm',
      width: 160,
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
  ];

  // loader
  if (!reports.length && isLoading) {
    return (
      <div className="flex w-full flex-col">
        <div className="mb-8 flex items-center justify-center sm:mb-10">
          <h1 className="text-center text-lg font-semibold text-heading sm:text-xl">
            {t('profile-sidebar-my-reports')}
          </h1>
        </div>

        <TableLoader uniqueKey={`table-loader`} />
      </div>
    );
  }

  if (!reports.length && !isLoading) {
    return (
      <div className="flex w-full flex-col">
        <div className="mb-8 flex items-center justify-between sm:mb-10">
          <h1 className="ml-auto text-center text-lg font-semibold text-heading sm:text-xl">
            {t('profile-sidebar-my-reports')}
          </h1>
        </div>
        <NotFound
          text="text-no-download"
          className="mx-auto w-full md:w-7/12"
        />
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col">
      <h3 className="mb-8 text-center text-2xl font-semibold text-heading">
        {t('profile-sidebar-my-reports')}
      </h3>
      <Table
        //@ts-ignore
        columns={orderTableColumns}
        data={reports}
        rowKey={(record: any) => record.created_at}
        className="w-full border border-gray-200"
        rowClassName="!cursor-auto"
        scroll={{ x: 350, y: 500 }}
      />
    </div>
  );
};

export default MyReports;
