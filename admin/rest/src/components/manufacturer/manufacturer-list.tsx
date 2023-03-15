import { useState } from 'react';
import Pagination from '@/components/ui/pagination';
import Image from 'next/image';
import { Table, AlignType } from '@/components/ui/table';
import { siteSettings } from '@/settings/site.settings';
import { useTranslation } from 'next-i18next';
import TitleWithSort from '@/components/ui/title-with-sort';
import { Switch } from '@headlessui/react';
import { useRouter } from 'next/router';
import {
  Manufacturer,
  MappedPaginatorInfo,
  Attachment,
  SortOrder,
} from '@/types';
import { Routes } from '@/config/routes';
import { useIsRTL } from '@/utils/locals';
import { useUpdateManufacturerMutation } from '@/data/manufacturer';
import LanguageSwitcher from '@/components/ui/lang-action/action';

type IProps = {
  manufacturers: Manufacturer[] | null | undefined;
  paginatorInfo: MappedPaginatorInfo | null;
  onPagination: (current: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
};

const ManufacturerList = ({
  manufacturers,
  paginatorInfo,
  onPagination,
  onSort,
  onOrder,
}: IProps) => {
  const { t } = useTranslation();
  const router = useRouter();

  const { alignRight } = useIsRTL();

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

  let columns = [
    {
      title: t('table:table-item-id'),
      dataIndex: 'id',
      key: 'id',
      align: 'center' as AlignType,
      width: 64,
    },
    {
      title: t('table:table-item-image'),
      dataIndex: 'image',
      key: 'image',
      width: 74,
      render: (image: Attachment) => (
        <Image
          src={image?.thumbnail ?? siteSettings.product.placeholder}
          alt="coupon banner"
          layout="fixed"
          width={42}
          height={42}
          className="overflow-hidden rounded"
        />
      ),
    },
    {
      title: (
        <TitleWithSort
          title={t('table:table-item-title')}
          ascending={
            sortingObj.sort === SortOrder.Asc && sortingObj.column === 'name'
          }
          isActive={sortingObj.column === 'name'}
        />
      ),
      dataIndex: 'name',
      key: 'name',
      align: 'center' as AlignType,
      onHeaderCell: () => onHeaderClick('name'),
    },
    {
      title: t('table:table-item-products'),
      dataIndex: 'products_count',
      key: 'products_count',
      align: 'center' as AlignType,
    },
    {
      title: t('table:table-item-approval-action'),
      dataIndex: 'is_approved',
      key: 'approve',
      align: 'center' as AlignType,
      render: function Render(is_approved: boolean, record: any) {
        const { locale } = useRouter();
        const { mutate: updateManufacturer, isLoading: updating } =
          useUpdateManufacturerMutation();

        function handleOnClick() {
          updateManufacturer({
            id: record?.id,
            name: record?.name,
            is_approved: !is_approved,
            type_id: record?.type.id,
            language: locale,
          });
        }

        return (
          <>
            <Switch
              checked={is_approved}
              onChange={handleOnClick}
              className={`${
                is_approved ? 'bg-accent' : 'bg-gray-300'
              } relative inline-flex h-6 w-11 items-center rounded-full focus:outline-none`}
              dir="ltr"
            >
              <span className="sr-only">Enable</span>
              <span
                className={`${
                  is_approved ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-light`}
              />
            </Switch>
          </>
        );
      },
    },
    {
      title: t('table:table-item-actions'),
      dataIndex: 'slug',
      key: 'actions',
      align: 'right' as AlignType,
      render: (slug: string, record: Manufacturer) => (
        <LanguageSwitcher
          slug={slug}
          record={record}
          deleteModalView="DELETE_MANUFACTURER"
          routes={Routes?.manufacturer}
        />
      ),
    },
  ];

  if (router?.query?.shop) {
    columns = columns?.filter(
      (col) => col?.key !== 'approve' && col?.key !== 'actions'
    );
  }

  return (
    <>
      <div className="mb-6 overflow-hidden rounded shadow">
        <Table
          columns={columns}
          emptyText={t('table:empty-table-data')}
          data={manufacturers!}
          rowKey="id"
          scroll={{ x: 900 }}
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

export default ManufacturerList;
