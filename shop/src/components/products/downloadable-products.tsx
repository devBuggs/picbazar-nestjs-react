import ErrorMessage from '@/components/ui/error-message';
import {
  useGenerateDownloadableUrl,
  useDownloadableProducts,
} from '@/framework/order';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import dayjs from 'dayjs';
import Link from '@/components/ui/link';
import { Routes } from '@/config/routes';
import Button from '@/components/ui/button';
import { productPlaceholder } from '@/lib/placeholders';
import { isEmpty } from 'lodash';
import NotFound from '@/components/ui/not-found';
import WishlistLoader from '@/components/ui/loaders/wishlist-loader';
import rangeMap from '@/lib/range-map';
import { isPaymentPending } from '@/lib/is-payment-pending';
import PayNowButton from '@/components/payment/pay-now-button';
import { SpinnerLoader } from '@/components/ui/loaders/spinner/spinner';

const DownloadableProducts: React.FC = () => {
  const { t } = useTranslation('common');
  const {
    downloads,
    error,
    loadMore,
    isLoading,
    isFetching,
    isLoadingMore,
    hasMore,
  } = useDownloadableProducts({
    limit: 10,
  });

  const isLoadingStatus = !isLoadingMore && !isLoading && isFetching;

  const { generateDownloadableUrl } = useGenerateDownloadableUrl();

  if (error) return <ErrorMessage message={error.message} />;

  if (isLoading && !downloads.length)
    return (
      <>
        {rangeMap(4, (i) => (
          <WishlistLoader key={i} uniqueKey={`favorite-${i}`} />
        ))}
      </>
    );

  if (!isLoading && !downloads.length)
    return (
      <NotFound text="text-no-download" className="mx-auto w-full md:w-7/12" />
    );

  const isVariableProduct = (product: any) =>
    !isEmpty(product.file?.fileable.product);
  return (
    <>
      {isLoadingStatus ? (
        <div className="absolute top-0 left-0 z-10 flex h-full w-full bg-black/10">
          <SpinnerLoader className="m-auto !h-8 !w-8" />
        </div>
      ) : (
        ''
      )}
      {downloads?.map((item: any) => (
        <div
          key={item.purchase_key}
          className="flex w-full space-x-4 border-b border-gray-200 py-5 first:pt-0 last:border-0 last:pb-0 rtl:space-x-reverse sm:space-x-5"
        >
          <div className="relative flex h-16 w-16 shrink-0 items-center justify-center sm:h-20 sm:w-20">
            <Image
              src={
                isVariableProduct(item)
                  ? item?.file?.fileable?.product?.image?.original!
                  : item?.file?.fileable?.image?.original! ?? productPlaceholder
              }
              alt="text"
              layout="fill"
            />
          </div>

          <div className="flex w-full flex-col items-start sm:flex-row sm:justify-between sm:space-x-4 rtl:sm:space-x-reverse">
            <div className="flex w-full flex-col space-y-1 sm:items-start">
              <Link
                href={`${Routes.products}/${
                  isVariableProduct(item)
                    ? item?.file?.fileable?.product?.slug
                    : item?.file?.fileable?.slug
                }`}
                className="text-base font-semibold text-heading transition-colors hover:text-accent"
              >
                {!isVariableProduct(item) && item?.file?.fileable?.name}
                {isVariableProduct(item) && (
                  <>
                    {item?.file?.fileable?.product?.name}
                    <span className="inline-block text-sm ltr:clear-left ltr:ml-1 rtl:clear-right rtl:mr-1">
                      ({item?.file?.fileable?.title})
                    </span>
                  </>
                )}
              </Link>

              <p className="space-y-1 sm:space-x-1 sm:space-y-0 rtl:sm:space-x-reverse">
                <span className="block text-sm font-semibold text-body-dark sm:inline-block sm:w-auto">
                  {t('text-key')}: {item?.purchase_key}
                </span>
                <span className="hidden text-sm text-body sm:inline-block">
                  |
                </span>
                <span className="block text-sm text-body sm:inline-block">
                  {t('text-purchased-on')}{' '}
                  {dayjs(item?.created_at).format('DD.MM.YYYY')}
                </span>
              </p>
            </div>
            {isPaymentPending(
              item?.order?.payment_gateway,
              item?.order?.order_status,
              item?.order?.payment_status
            ) ? (
              <span className="order-2 mt-5 w-full max-w-full shrink-0 basis-full sm:order-1 lg:mt-0 lg:w-auto lg:max-w-none lg:basis-auto lg:ltr:ml-auto lg:rtl:mr-auto">
                <PayNowButton trackingNumber={item?.tracking_number} />
              </span>
            ) : (
              <button
                className="mt-2 text-sm font-semibold text-accent transition-colors hover:text-accent-hover sm:mt-0"
                onClick={() => generateDownloadableUrl(item?.digital_file_id)}
              >
                {t('text-download')}
              </button>
            )}
          </div>
        </div>
      ))}

      {hasMore && (
        <div className="mt-8 flex w-full justify-center">
          <Button loading={isLoading} onClick={loadMore}>
            {t('text-load-more')}
          </Button>
        </div>
      )}
    </>
  );
};

export default DownloadableProducts;
