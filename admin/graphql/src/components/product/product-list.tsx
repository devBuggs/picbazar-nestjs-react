import Pagination from '@/components/ui/pagination';
import Image from 'next/image';
import { Table, AlignType } from '@/components/ui/table';
import { siteSettings } from '@/settings/site.settings';
import usePrice from '@/utils/use-price';
import Badge from '@/components/ui/badge/badge';
import { useTranslation } from 'next-i18next';
import { useIsRTL } from '@/utils/locals';
import {
  Product,
  ProductPaginator,
  ProductType,
  Shop,
  SortOrder,
} from '__generated__/__types__';
import { useMemo, useState } from 'react';
import debounce from 'lodash/debounce';
import TitleWithSort from '@/components/ui/title-with-sort';
import { useRouter } from 'next/router';
import { Routes } from '@/config/routes';
import { QueryProductsOrderByColumn } from '@/types/custom-types';
import LanguageSwitcher from '@/components/ui/lang-action/action';

export type IProps = {
  products: ProductPaginator | null | undefined;
  onPagination: (current: number) => void;
  refetch: Function;
};

const ProductList = ({ products, onPagination, refetch }: IProps) => {
  const { data, paginatorInfo } = products!;
  const router = useRouter();
  const { t } = useTranslation();
  const { alignLeft, alignRight } = useIsRTL();

  const [order, setOrder] = useState<SortOrder>(SortOrder.Desc);
  const [column, setColumn] = useState<string>();

  const debouncedHeaderClick = useMemo(
    () =>
      debounce((value) => {
        setColumn(value);
        setOrder(order === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc);
        refetch({
          orderBy: value,
          sortedBy: order === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc,
        });
      }, 500),
    [order]
  );

  const onHeaderClick = (value: string | undefined) => ({
    onClick: () => {
      debouncedHeaderClick(value);
    },
  });

  let columns = [
    {
      title: t('table:table-item-image'),
      dataIndex: 'image',
      key: 'image',
      align: alignLeft as AlignType,
      width: 74,
      render: (image: any, { name }: { name: string }) => (
        <Image
          src={image?.thumbnail ?? siteSettings.product.placeholder}
          alt={name}
          layout="fixed"
          width={42}
          height={42}
          className="rounded overflow-hidden"
        />
      ),
    },
    {
      title: (
        <TitleWithSort
          title={t('table:table-item-title')}
          ascending={
            order === SortOrder.Asc &&
            column === QueryProductsOrderByColumn.NAME
          }
          isActive={column === QueryProductsOrderByColumn.NAME}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'name',
      key: 'name',
      align: alignLeft as AlignType,
      width: 200,
      ellipsis: true,
      onHeaderCell: () => onHeaderClick(QueryProductsOrderByColumn.NAME),
    },
    {
      title: t('table:table-item-group'),
      dataIndex: 'type',
      key: 'type',
      width: 120,
      align: 'center' as AlignType,
      render: (type: any) => (
        <span className="whitespace-nowrap truncate">{type?.name}</span>
      ),
    },
    {
      title: t('table:table-item-shop'),
      dataIndex: 'shop',
      key: 'shop',
      width: 120,
      align: 'center' as AlignType,
      ellipsis: true,
      render: (shop: Shop) => (
        <span className="whitespace-nowrap truncate">{shop?.name}</span>
      ),
    },
    {
      title: (
        <TitleWithSort
          title={t('table:table-item-unit')}
          ascending={
            order === SortOrder.Asc &&
            column === QueryProductsOrderByColumn.PRICE
          }
          isActive={column === QueryProductsOrderByColumn.PRICE}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'price',
      key: 'price',
      align: alignRight as AlignType,
      width: 180,
      onHeaderCell: () => onHeaderClick(QueryProductsOrderByColumn.PRICE),
      render: function Render(value: number, record: Product) {
        const { price: max_price } = usePrice({
          amount: record?.max_price as number,
        });
        const { price: min_price } = usePrice({
          amount: record?.min_price as number,
        });

        const { price } = usePrice({
          amount: value,
        });

        const renderPrice =
          record?.product_type === ProductType.Variable
            ? `${min_price} - ${max_price}`
            : price;

        return (
          <span className="whitespace-nowrap" title={renderPrice}>
            {renderPrice}
          </span>
        );
      },
    },
    {
      title: (
        <TitleWithSort
          title={t('table:table-item-quantity')}
          ascending={
            order === SortOrder.Asc &&
            column === QueryProductsOrderByColumn.QUANTITY
          }
          isActive={column === QueryProductsOrderByColumn.QUANTITY}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'center' as AlignType,
      width: 150,
      onHeaderCell: () => onHeaderClick(QueryProductsOrderByColumn.QUANTITY),
      render: (quantity: number) => {
        if (quantity < 2) {
          return (
            <Badge
              text={t('common:text-out-of-stock')}
              color="bg-red-500 text-white"
            />
          );
        }
        return <span>{quantity}</span>;
      },
    },
    {
      title: (
        <TitleWithSort
          title={t('table:table-item-status')}
          ascending={
            order === SortOrder.Asc &&
            column === QueryProductsOrderByColumn.STATUS
          }
          isActive={column === QueryProductsOrderByColumn.STATUS}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'status',
      key: 'status',
      align: 'center' as AlignType,
      width: 200,
      onHeaderCell: () => onHeaderClick(QueryProductsOrderByColumn.STATUS),
      render: (status: string, record: any) => (
        <div className="flex items-center justify-center space-s-3">
          <Badge
            text={status}
            color={status === 'DRAFT' ? 'bg-yellow-400' : 'bg-accent'}
          />
          {record?.quantity > 0 && record?.quantity < 10 && (
            <Badge
              text={t('common:text-low-quantity')}
              color="bg-red-600"
              animate={true}
            />
          )}
        </div>
      ),
    },
    {
      title: t('table:table-item-actions'),
      dataIndex: 'slug',
      key: 'actions',
      align: 'right' as AlignType,
      width: 280,
      render: (slug: string, record: Product) => (
        <LanguageSwitcher
          slug={slug}
          record={record}
          deleteModalView="DELETE_PRODUCT"
          routes={Routes?.product}
        />
      ),
    },
  ];

  if (router?.query?.shop) {
    columns = columns?.filter((col) => col?.key !== 'shop');
  }

  return (
    <>
      <div className="rounded overflow-hidden shadow mb-6">
        <Table
          columns={columns}
          emptyText={t('table:empty-table-data')}
          data={data}
          rowKey="id"
          scroll={{ x: 900 }}
        />
      </div>

      {!!paginatorInfo.total && (
        <div className="flex justify-end items-center">
          <Pagination
            total={paginatorInfo.total}
            current={paginatorInfo.currentPage}
            pageSize={paginatorInfo.perPage}
            onChange={onPagination}
            showLessItems
          />
        </div>
      )}
    </>
  );
};

export default ProductList;
