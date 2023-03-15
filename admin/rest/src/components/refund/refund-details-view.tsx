import Card from '@/components/common/card';
import Image from 'next/image';
import { Table } from '@/components/ui/table';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Button from '@/components/ui/button';
import { siteSettings } from '@/settings/site.settings';
import usePrice from '@/utils/use-price';
import { formatAddress } from '@/utils/format-address';
import ValidationError from '@/components/ui/form-validation-error';
import { useTranslation } from 'next-i18next';
import SelectInput from '@/components/ui/select-input';
import { useIsRTL } from '@/utils/locals';
import { useUpdateRefundMutation } from '@/data/refund';
import { useModalAction } from '@/components/ui/modal/modal.context';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

const RefundStatus = [
  {
    value: 'approved',
    name: 'Approved',
  },
  {
    value: 'pending',
    name: 'Pending',
  },
  {
    value: 'rejected',
    name: 'Rejected',
  },
  {
    value: 'processing',
    name: 'Processing',
  },
];

type FormValues = {
  status: any;
};
export default function RefundDetailsView({
  refund,
  canChangeStatus = true,
}: any) {
  const { t } = useTranslation();
  const { query } = useRouter();
  const { alignLeft, alignRight } = useIsRTL();
  const { openModal } = useModalAction();
  const { mutate: updateRefund, isLoading: updating } =
    useUpdateRefundMutation();

  async function handleUpdateRefundStatus({ status }: any) {
    const input = {
      status: status?.value,
    };

    const id = query.refundId as string;

    updateRefund(
      {
        id,
        ...input,
      },
      {
        onError: (error: any) => {
          setError('status', {
            type: 'manual',
            message: error?.response?.data?.message,
          });
        },
      }
    );
  }

  const handleImageClick = (idx: number) => {
    openModal('REFUND_IMAGE_POPOVER', {
      images: refund?.images,
      initSlide: idx,
    });
  };

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      status: RefundStatus.find(
        (status) => refund?.status?.toUpperCase() === status.value.toUpperCase()
      ),
    },
  });
  const { price: subtotal } = usePrice(
    refund && {
      amount: refund?.amount!,
    }
  );
  const { price: total } = usePrice(
    refund && {
      amount: refund?.order?.paid_total!,
    }
  );
  const { price: discount } = usePrice(
    refund && {
      amount: refund?.order?.discount!,
    }
  );
  const { price: delivery_fee } = usePrice(
    refund && {
      amount: refund?.order?.delivery_fee!,
    }
  );
  const { price: sales_tax } = usePrice(
    refund && {
      amount: refund?.order?.sales_tax!,
    }
  );

  const columns = [
    {
      dataIndex: 'image',
      key: 'image',
      width: 70,
      render: (image: any) => (
        <Image
          src={image?.thumbnail ?? siteSettings.product.placeholder}
          alt="alt text"
          layout="fixed"
          width={50}
          height={50}
        />
      ),
    },
    {
      title: t('table:table-item-products'),
      dataIndex: 'name',
      key: 'name',
      align: alignLeft,
      render: (name: string, item: any) => (
        <div>
          <span>{name}</span>
          <span className="mx-2">x</span>
          <span className="font-semibold text-heading">
            {item.pivot.order_quantity}
          </span>
        </div>
      ),
    },
    {
      title: t('table:table-item-total'),
      dataIndex: 'price',
      key: 'price',
      align: alignRight,
      render: function Render(_: any, item: any) {
        const { price } = usePrice({
          amount: item.pivot.subtotal,
        });
        return <span>{price}</span>;
      },
    },
  ];

  return (
    <Card>
      <div className="flex flex-col items-center lg:flex-row">
        <h3 className="lg:text-start mb-8 w-full whitespace-nowrap text-center text-2xl font-semibold text-heading lg:mb-0 lg:w-1/3">
          {t('common:text-refund-id')} - {refund?.id} (
          <span className="inline-block lowercase first-letter:uppercase">
            {refund?.status}
          </span>
          )
        </h3>

        {refund?.status && canChangeStatus && (
          <form
            onSubmit={handleSubmit(handleUpdateRefundStatus)}
            className="ms-auto flex w-full flex-col sm:flex-row sm:justify-end lg:w-2/3 xl:w-1/2"
          >
            <div className="me-5 z-20 w-full lg:max-w-[280px]">
              <SelectInput
                name="status"
                control={control}
                getOptionLabel={(option: any) => option.name}
                getOptionValue={(option: any) => option.value}
                options={RefundStatus}
                placeholder={t('common:text-refund-status')}
                rules={{
                  required: t('common:text-status-required'),
                }}
              />
              <ValidationError
                message={
                  errors?.status?.message &&
                  t(`common:${errors?.status?.message}`)
                }
              />
            </div>
            <Button
              loading={updating}
              className="mt-2 w-full sm:mt-0 sm:w-auto"
            >
              <span>{t('form:button-label-change-status')}</span>
            </Button>
          </form>
        )}
      </div>

      <div className="my-10 flex flex-col md:flex-row md:justify-between">
        <div className="order-1 flex flex-shrink-0 flex-col sm:items-end md:order-2">
          <p className="mb-5 flex flex-col text-sm text-sub-heading sm:mb-3 sm:flex-row sm:items-center">
            <span className="mb-2 min-w-[180px] font-semibold sm:mb-0 md:min-w-[110px]">
              {t('common:text-refund-created')}
            </span>
            <span className="mx-2 hidden sm:block">: </span>
            <span className="capitalize">
              {dayjs
                .utc(refund?.order?.created_at)
                .tz(dayjs.tz.guess())
                .format('DD MMMM YYYY')}
            </span>
          </p>
          <p className="mb-5 flex flex-col text-sm text-sub-heading sm:mb-3 sm:flex-row sm:items-center">
            <span className="mb-2 min-w-[180px] font-semibold sm:mb-0 md:min-w-[110px]">
              {t('common:text-order-created')}
            </span>
            <span className="mx-2 hidden sm:block">: </span>
            <span className="capitalize">
              {dayjs
                .utc(refund?.order?.created_at)
                .tz(dayjs.tz.guess())
                .format('DD MMMM YYYY')}
            </span>
          </p>
        </div>

        <div className="order-2 flex flex-col md:order-1">
          <p className="mb-5 flex flex-col text-sm text-sub-heading sm:mb-3 sm:flex-row sm:items-center">
            <span className="mb-2 min-w-[180px] font-semibold sm:mb-0">
              {t('table:table-item-tracking-number')}
            </span>
            <span className="mx-2 hidden sm:block">: </span>
            <span>{refund?.order?.tracking_number}</span>
          </p>
          <p className="mb-5 flex flex-col text-sm text-sub-heading sm:mb-3 sm:flex-row sm:items-center">
            <span className="mb-2 min-w-[180px] font-semibold sm:mb-0">
              {t('common:text-order-status')}
            </span>
            <span className="mx-2 hidden sm:block">: </span>
            <span>{refund?.order?.status?.name}</span>
          </p>
          <p className="mb-5 flex flex-col text-sm text-sub-heading sm:mb-3 sm:flex-row sm:items-center">
            <span className="mb-2 min-w-[180px] font-semibold sm:mb-0">
              {t('common:text-customer-email')}
            </span>
            <span className="mx-2 hidden sm:block">: </span>
            <span>{refund?.customer?.email}</span>
          </p>
          <p className="mb-5 flex flex-col text-sm text-sub-heading sm:mb-3 sm:flex-row sm:items-center">
            <span className="mb-2 min-w-[180px] font-semibold sm:mb-0">
              {t('form:input-label-contact')}
            </span>
            <span className="mx-2 hidden sm:block">: </span>
            <span>{refund?.order?.customer_contact}</span>
          </p>
        </div>
      </div>

      {/* Reason with description */}
      <div className="mb-10 flex flex-col">
        <p className="mb-7 flex flex-col text-sub-heading">
          <span className="mb-2 font-semibold">{t('common:text-reason')}</span>
          <span className="text-sm">{refund?.title}</span>
        </p>
        <p className="mb-7 flex flex-col text-sub-heading">
          <span className="mb-2 font-semibold">
            {t('form:input-description')}
          </span>
          <span className="text-sm">{refund?.description}</span>
        </p>

        <div className="flex flex-col">
          <span className="mb-4 font-semibold text-sub-heading">
            {t('common:text-images')}
          </span>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4 lg:grid-cols-6 3xl:grid-cols-8">
            {refund?.images?.map((img: any, idx: number) => (
              <div
                key={img?.id}
                className="cursor-pointer rounded-lg bg-gray-100"
                onClick={() => handleImageClick(idx)}
              >
                <Image
                  src={img?.original ?? '/'}
                  alt={refund?.title!}
                  layout="responsive"
                  width={400}
                  height={400}
                  objectFit="contain"
                  className="overflow-hidden rounded"
                />
              </div>
            ))}
            {!refund?.images?.length && (
              <span className="text-sm text-gray-400">
                {t('common:text-no-image-found')}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mb-10">
        <span className="mb-4 flex w-56 overflow-hidden font-semibold text-sub-heading">
          {t('common:text-order-details')}
        </span>
        {refund?.order ? (
          <Table
            //@ts-ignore
            columns={columns}
            emptyText={t('table:empty-table-data')}
            //@ts-ignore
            data={refund?.order?.products!}
            rowKey="id"
            scroll={{ x: 300, y: 320 }}
          />
        ) : (
          <span>{t('common:no-order-found')}</span>
        )}

        <div className="ms-auto flex w-full flex-col space-y-2 border-t-4 border-double border-border-200 py-4 sm:w-1/2 sm:px-4 md:w-1/3">
          <div className="flex items-center justify-between text-sm text-body">
            <span>{t('common:order-sub-total')}</span>
            <span>{subtotal}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-body">
            <span>{t('common:order-tax')}</span>
            <span>{sales_tax}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-body">
            <span>{t('common:order-delivery-fee')}</span>
            <span>{delivery_fee}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-body">
            <span>{t('common:order-discount')}</span>
            <span>{discount}</span>
          </div>
          <div className="flex items-center justify-between font-semibold text-body">
            <span>{t('common:order-total')}</span>
            <span>{total}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
        <div className="sm:pe-8 mb-10 w-full sm:mb-0 sm:w-1/2">
          <h3 className="mb-3 border-b border-border-200 pb-2 font-semibold text-heading">
            {t('common:billing-address')}
          </h3>

          <div className="flex flex-col items-start space-y-1 text-sm text-body">
            <span>{refund?.order?.customer?.name}</span>
            {refund?.order?.billing_address && (
              <span>{formatAddress(refund.order.billing_address)}</span>
            )}
            {refund?.order?.customer_contact && (
              <span>{refund?.order?.customer_contact}</span>
            )}
          </div>
        </div>

        <div className="sm:ps-8 w-full sm:w-1/2">
          <h3 className="text-start sm:text-end mb-3 border-b border-border-200 pb-2 font-semibold text-heading">
            {t('common:shipping-address')}
          </h3>

          <div className="text-start sm:text-end flex flex-col items-start space-y-1 text-sm text-body sm:items-end">
            <span>{refund?.order?.customer?.name}</span>
            {refund?.order?.shipping_address && (
              <span>{formatAddress(refund.order.shipping_address)}</span>
            )}
            {refund?.order?.customer_contact && (
              <span>{refund?.order?.customer_contact}</span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
