import Pagination from '@/components/ui/pagination';
import { Table } from '@/components/ui/table';
import ActionButtons from '@/components/common/action-buttons';
import dayjs from 'dayjs';
import { Product, User, SortOrder, Question, MappedPaginatorInfo } from '@/types';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { useIsRTL } from '@/utils/locals';
import { useState } from 'react';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { siteSettings } from '@/settings/site.settings';
import { useRouter } from 'next/router';
import TitleWithSort from '@/components/ui/title-with-sort';
import QuestionCard from './question-card';
import { LikeIcon } from '@/components/icons/like-icon';
import { DislikeIcon } from '@/components/icons/dislike-icon';

export type IProps = {
  questions: Question[] | undefined;
  paginatorInfo: MappedPaginatorInfo | null;
  onPagination: (key: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
};
const QuestionList = ({ questions, paginatorInfo, onPagination, onSort, onOrder }: IProps) => {
  const { t } = useTranslation();
  const { alignLeft } = useIsRTL();

  const [sortingObj, setSortingObj] = useState<{
    sort: SortOrder;
    column: string | null;
  }>({
    sort: SortOrder.Desc,
    column: null,
  });

  const onHeaderClick = (column: string | null) => ({
    onClick: () => {
      onSort((currentSortDirection: SortOrder) =>
        currentSortDirection === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc
      );
      onOrder(column!);

      setSortingObj({
        sort:
          sortingObj.sort === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc,
        column: column,
      });
    },
  });

  const columns = [
    {
      title: t('table:table-item-image'),
      dataIndex: 'product',
      key: 'product-image',
      align: alignLeft,
      width: 100,
      render: (product: Product) => (
        <Image
          src={product?.image?.thumbnail ?? siteSettings.product.placeholder}
          alt={product?.name}
          layout="fixed"
          width={60}
          height={60}
          className="overflow-hidden rounded"
        />
      ),
    },
    {
      title: t('table:table-item-question-answer'),
      className: 'cursor-pointer',
      // dataIndex: "question",
      key: 'question',
      align: alignLeft,
      width: 450,
      render: (record: any, id: string) => (
        <QuestionCard record={record} id={id} />
      ),
    },
    {
      title: t('table:table-item-customer-name'),
      dataIndex: 'user',
      key: 'user',
      align: alignLeft,
      width: 150,
      render: (user: User) => <span>{user?.name}</span>,
    },
    {
      title: t('table:table-item-product-name'),
      dataIndex: 'product',
      key: 'product-image',
      align: alignLeft,
      width: 300,
      render: (product: Product) => (
        <a
          href={process.env.NEXT_PUBLIC_SHOP_URL + '/products/' + product?.slug}
          className="transition-colors hover:text-accent"
          target="_blank"
          rel="noreferrer"
        >
          {product?.name}
        </a>
      ),
    },
    {
      title: t('table:table-item-feedbacks'),
      // dataIndex: "product",
      key: 'feedbacks',
      align: alignLeft,
      width: 200,
      render: (record: any) => (
        <div className="flex items-center space-x-4">
          <span className="flex items-center text-xs tracking-wider text-gray-400 transition">
            <LikeIcon className="h-4 w-4 me-1.5" />
            {record?.positive_feedbacks_count}
          </span>
          <span className="flex items-center text-xs tracking-wider text-gray-400 transition">
            <DislikeIcon className="h-4 w-4 me-1.5" />
            {record?.negative_feedbacks_count}
          </span>
        </div>
      ),
    },
    {
      // title: t("table:table-item-date"),
      title: (
        <TitleWithSort
          title={t('table:table-item-date')}
          ascending={
            sortingObj.sort === SortOrder.Asc &&
            sortingObj.column === 'created_at'
          }
          isActive={sortingObj.column === 'created_at'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'created_at',
      key: 'created_at',
      align: alignLeft,
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
      title: t('table:table-item-actions'),
      dataIndex: 'id',
      key: 'actions',
      align: 'right',
      width: 150,
      render: function Render(_: any, id: string) {
        const {
          query: { shop },
        } = useRouter();
        return (
          <ActionButtons
            id={id}
            editModalView="REPLY_QUESTION"
            deleteModalView={!shop ? 'DELETE_QUESTION' : false}
          />
        );
      },
    },
  ];

  return (
    <>
      <div className="mb-6 overflow-hidden rounded shadow">
        <Table
          //@ts-ignore
          columns={columns}
          emptyText={t('table:empty-table-data')}
          data={questions}
          rowKey="id"
          scroll={{ x: 1000 }}
        />
      </div>

      {!!paginatorInfo?.total && (
        <div className="flex items-center justify-end">
          <Pagination
            total={paginatorInfo.total}
            current={paginatorInfo.currentPage}
            pageSize={paginatorInfo.perPage}
            onChange={onPagination}
          />
        </div>
      )}
    </>
  );
};

export default QuestionList;
