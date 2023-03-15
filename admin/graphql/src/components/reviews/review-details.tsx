import Card from '@/components/common/card';
import Image from 'next/image';
import { Table } from '@/components/ui/table';
import Button from '@/components/ui/button';
import { siteSettings } from '@/settings/site.settings';
import usePrice from '@/utils/use-price';
import { useTranslation } from 'next-i18next';
import { useIsRTL } from '@/utils/locals';
import { useModalAction } from '@/components/ui/modal/modal.context';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { ProductType, Review } from '__generated__/__types__';
import Link from '@/components/ui/link';
import { StarIcon } from '@/components/icons/star-icon';
import { CheckedIcon } from '@/components/icons/checked';
import { LikeIcon } from '@/components/icons/like-icon';
import { DislikeIcon } from '@/components/icons/dislike-icon';
import isEmpty from 'lodash/isEmpty';

type IProps = {
  review: Review | undefined | null;
};

const ReviewDetailsView = ({ review }: IProps) => {
  const {
    product,
    id,
    abusive_reports,
    comment,
    negative_feedbacks_count,
    positive_feedbacks_count,
    photos,
    rating,
    user,
  } = review ?? {};

  const {
    slug,
    name,
    image,
    product_type,
    price,
    max_price,
    min_price,
    sale_price,
    ratings,
  } = product ?? {};

  const { t } = useTranslation();
  const { alignLeft } = useIsRTL();
  const { openModal } = useModalAction();

  const { price: currentPrice, basePrice } = usePrice({
    amount: sale_price ? sale_price : price!,
    baseAmount: price ?? 0,
  });
  const { price: minPrice } = usePrice({
    amount: min_price ?? 0,
  });
  const { price: maxPrice } = usePrice({
    amount: max_price ?? 0,
  });

  function handleImageClick() {
    openModal('REVIEW_IMAGE_POPOVER', {
      images: photos,
    });
  }

  function handleAcceptReport() {
    openModal('ACCEPT_ABUSE_REPORT', id);
  }

  function handleDeclineReport() {
    openModal('DECLINE_ABUSE_REPORT', {
      model_id: id,
      model_type: abusive_reports?.[0]?.model_type,
    });
  }

  const columns = [
    {
      title: t('table:table-item-message'),
      key: 'message',
      align: alignLeft,
      width: 650,
      render: (record: any) => <span>{record?.message}</span>,
    },
    {
      title: t('table:table-item-customer-details'),
      key: 'user',
      align: alignLeft,
      width: 200,
      render: (record: any) => (
        <div className="flex flex-col space-y-1">
          <span className="text-heading font-semibold">
            {record?.user?.name}
          </span>
          <span className="text-xs font-semibold text-heading">
            {record?.user?.email}
          </span>
        </div>
      ),
    },
    {
      title: t('table:table-item-created-at'),
      dataIndex: 'created_at',
      key: 'created_at',
      align: 'center',
      width: 120,
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

  return (
    <Card className="md:px-10 xl:px-20">
      <h3 className="text-3xl font-semibold text-heading text-center mb-8">
        {t('common:text-abuse-report')}
      </h3>

      {/* Product details */}
      <div className="flex items-start w-full space-x-4 md:space-x-5 rtl:space-x-reverse mb-10">
        <div className="border border-gray-200 shrink-0 relative w-20 h-20">
          <Image
            src={image?.thumbnail ?? siteSettings.product.placeholder}
            alt={name}
            layout="responsive"
            width={75}
            height={75}
            className="overflow-hidden rounded"
          />
        </div>

        <div className="flex flex-col space-y-1.5 pe-4 md:pe-5">
          <Link
            href={process.env.NEXT_PUBLIC_SHOP_URL + '/products/' + slug}
            className="text-lg font-semibold text-heading transition-colors hover:text-accent focus:text-accent-700 hover:no-underline focus:no-underline"
          >
            {name}
          </Link>

          {product_type === ProductType.Variable ? (
            <div className="flex items-center">
              <span className="text-sm md:text-base text-heading font-semibold">
                {minPrice}
              </span>
              <span> - </span>
              <span className="text-sm md:text-base text-heading font-semibold">
                {maxPrice}
              </span>
            </div>
          ) : (
            <div className="flex items-center">
              <span className="text-sm md:text-base text-heading font-semibold">
                {currentPrice}
              </span>
              {basePrice && (
                <del className="text-xs md:text-sm text-muted ms-2">
                  {basePrice}
                </del>
              )}
            </div>
          )}
        </div>

        <div className="inline-flex items-center rounded-full text-accent shrink-0 text-base px-3 py-0.5 border border-accent !ml-auto">
          {ratings}
          <StarIcon className="w-3 h-3 ms-1" />
        </div>
      </div>

      {/* Rating details */}
      <div className="mb-8 block">
        <div className="flex items-center justify-between mb-5">
          <div className="inline-flex items-center rounded-full text-accent shrink-0 text-base px-3 py-0.5 border border-accent">
            {rating}
            <StarIcon className="w-3 h-3 ms-1" />
          </div>

          {/* Accept/decline buttons */}
          <div className="flex items-center space-x-4 md:space-x-5 rtl:space-x-reverse">
            <Button
              size="small"
              variant="outline"
              className="text-accent !border-accent"
              onClick={handleAcceptReport}
            >
              {t('common:text-accept')}
            </Button>
            <Button
              size="small"
              variant="outline"
              className="text-red-500 !border-red-500 hover:bg-red-500 hover:border-red-500"
              onClick={handleDeclineReport}
            >
              {t('common:text-decline')}
            </Button>
          </div>
        </div>

        <div className="mb-3 flex items-center text-xs text-gray-500">
          {t('common:text-by')}{' '}
          <span className="capitalize ltr:ml-1 rtl:mr-1 font-semibold text-heading">
            {user?.name}
          </span>
          {user?.is_active && (
            <CheckedIcon className="h-[13px] w-[13px] text-gray-700 ltr:ml-1 rtl:mr-1" />
          )}
        </div>
        <p className="text-sm leading-6 text-heading">{comment}</p>
        {photos && !isEmpty(photos) && (
          <div className="flex items-start pt-3 space-s-2">
            {photos?.map((photo: any, idx: any) => (
              <div className="mb-1" key={idx}>
                <Image
                  src={photo?.original ?? '/product-placeholder-borderless.svg'}
                  width={32}
                  height={32}
                  className="inline-flex bg-gray-200 rounded-md"
                  alt={`${user?.name}-${idx}`}
                />
              </div>
            ))}

            <button
              className="my-1.5 text-sm font-semibold underline transition-colors text-heading hover:text-accent"
              onClick={handleImageClick}
            >
              {t('common:text-view-images')}
            </button>
          </div>
        )}
        <div className="flex items-center mt-4 space-x-4 rtl:space-x-reverse">
          <span className="flex items-center text-xs tracking-wider text-gray-400 transition">
            <LikeIcon className="w-4 h-4 me-1.5" />
            {positive_feedbacks_count}
          </span>
          <span className="flex items-center text-xs tracking-wider text-gray-400 transition">
            <DislikeIcon className="w-4 h-4 me-1.5" />
            {negative_feedbacks_count}
          </span>
        </div>
      </div>

      {/* Abuse report table */}
      <Table
        //@ts-ignore
        columns={columns}
        emptyText={t('table:empty-table-data')}
        data={abusive_reports as any}
        rowKey="id"
        scroll={{ x: 700 }}
        // scroll={{ x: 300 }}
      />
    </Card>
  );
};

export default ReviewDetailsView;
