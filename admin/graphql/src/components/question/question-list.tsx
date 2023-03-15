import Pagination from '@/components/ui/pagination';
import { Table } from '@/components/ui/table';
import ActionButtons from '@/components/common/action-buttons';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { useIsRTL } from '@/utils/locals';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { siteSettings } from '@/settings/site.settings';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import debounce from 'lodash/debounce';
import {
  Product,
  QuestionPaginator,
  SortOrder,
  User,
} from '__generated__/__types__';
import TitleWithSort from '@/components/ui/title-with-sort';
import QuestionCard from './question-card';
import { LikeIcon } from '@/components/icons/like-icon';
import { DislikeIcon } from '@/components/icons/dislike-icon';

export type IProps = {
  questions: QuestionPaginator | undefined | null;
  onPagination: (key: number) => void;
  onOrder?: Dispatch<SetStateAction<string>>;
  onSort?: Dispatch<SetStateAction<SortOrder>>;
  refetch: Function;
};
const QuestionList = ({ questions, onPagination, refetch }: IProps) => {
  const { t } = useTranslation();
  const { data, paginatorInfo } = questions!;
  const { alignLeft, alignRight } = useIsRTL();

  const [order, setOrder] = useState<SortOrder>(SortOrder.Desc);
  const [column, setColumn] = useState<string>();

  const debouncedHeaderClick = useMemo(
    () =>
      debounce((value) => {
        setColumn(value);
        setOrder(order === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc);
        refetch({
          orderBy: [
            {
              column: value,
              order: order === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc,
            },
          ],
        });
      }, 500),
    [order]
  );

  const onHeaderClick = (value: string | undefined) => ({
    onClick: () => {
      debouncedHeaderClick(value);
    },
  });

  // const [sortingObj, setSortingObj] = useState<{
  //   sort: SortOrder;
  //   column: string | null;
  // }>({
  //   sort: SortOrder.Desc,
  //   column: null,
  // });

  // const onHeaderClick = (column: string | null) => ({
  //   onClick: () => {
  //     onSort((currentSortDirection: SortOrder) =>
  //       currentSortDirection === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc
  //     );
  //     onOrder(column!);

  //     setSortingObj({
  //       sort:
  //         sortingObj.sort === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc,
  //       column: column,
  //     });
  //   },
  // });

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
      width: 350,
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
            <LikeIcon className="w-4 h-4 me-1.5" />
            {record?.positive_feedbacks_count}
          </span>
          <span className="flex items-center text-xs tracking-wider text-gray-400 transition">
            <DislikeIcon className="w-4 h-4 me-1.5" />
            {record?.negative_feedbacks_count}
          </span>
        </div>
      ),
    },
    {
      title: (
        <TitleWithSort
          title={t('table:table-item-date')}
          ascending={order === SortOrder.Asc && column === 'CREATED_AT'}
          isActive={column === 'CREATED_AT'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'created_at',
      key: 'created_at',
      align: alignLeft,
      onHeaderCell: () => onHeaderClick('CREATED_AT'),
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
      align: alignRight,
      width: 90,
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
          data={data}
          rowKey="id"
          scroll={{ x: 1000 }}
        />
      </div>

      {!!paginatorInfo.total && (
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
