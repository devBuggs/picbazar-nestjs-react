import ShopLayout from '@/components/layouts/shop';
import LinkButton from '@/components/ui/link-button';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { MapPin } from '@/components/icons/map-pin';
import { PhoneIcon } from '@/components/icons/phone';
import Loader from '@/components/ui/loader/loader';
import dayjs from 'dayjs';
import { CheckMarkFill } from '@/components/icons/checkmark-circle-fill';
import { CloseFillIcon } from '@/components/icons/close-fill';
import { EditIcon } from '@/components/icons/edit';
import { formatAddress } from '@/utils/format-address';
import {
  adminAndOwnerOnly,
  adminOwnerAndStaffOnly,
  getAuthCredentials,
  hasAccess,
} from '@/utils/auth-utils';
import ErrorMessage from '@/components/ui/error-message';
import usePrice from '@/utils/use-price';
import { useTranslation } from 'next-i18next';
import isEmpty from 'lodash/isEmpty';
import { useShopQuery } from '@/data/shop';
import { GetStaticPaths } from 'next';
import { CubeIcon } from '@/components/icons/shops/cube';
import { OrdersIcon } from '@/components/icons/sidebar';
import { PriceWalletIcon } from '@/components/icons/shops/price-wallet';
import { PercentageIcon } from '@/components/icons/shops/percentage';
import { DollarIcon } from '@/components/icons/shops/dollar';
import ReadMore from '@/components/ui/truncate';

export default function ShopPage() {
  const { t } = useTranslation();
  const { permissions } = getAuthCredentials();
  const {
    query: { shop },
    locale,
  } = useRouter();
  const {
    data,
    isLoading: loading,
    error,
  } = useShopQuery({
    slug: shop!.toString(),
  });
  const { price: totalEarnings } = usePrice(
    data && {
      amount: data?.balance?.total_earnings!,
    }
  );
  const { price: currentBalance } = usePrice(
    data && {
      amount: data?.balance?.current_balance!,
    }
  );
  if (loading) return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;
  const {
    name,
    is_active,
    logo,
    cover_image,
    description,
    products_count,
    orders_count,
    balance,
    address,
    created_at,
    settings,
    slug,
  } = data ?? {};

  return (
    <div className="grid grid-cols-12 gap-6">
      {!is_active && (
        <div className="col-span-12 rounded-lg bg-red-500 px-5 py-4 text-sm text-light">
          {t('common:text-permission-message')}
        </div>
      )}
      {/* about Shop */}
      <div className="order-2 col-span-12 sm:col-span-6 xl:order-1 xl:col-span-4 3xl:col-span-3">
        <div className="flex flex-col items-center rounded bg-white py-8 px-6">
          <div className="relative mb-5 h-36 w-36 rounded-full">
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full border border-gray-100">
              <Image
                src={logo?.thumbnail ?? '/avatar-placeholder.svg'}
                layout="fill"
                objectFit="contain"
                alt={name}
              />
            </div>

            {is_active ? (
              <div className="end-2 absolute bottom-4 h-5 w-5 overflow-hidden rounded-full bg-light">
                <CheckMarkFill width={20} className="me-2 text-accent" />
              </div>
            ) : (
              <div className="end-2 absolute bottom-4 h-5 w-5 overflow-hidden rounded-full bg-light">
                <CloseFillIcon width={20} className="me-2 text-red-500" />
              </div>
            )}
          </div>

          <h1 className="mb-2 text-xl font-semibold text-heading">{name}</h1>
          <p className="text-center text-sm text-body">
            <ReadMore character={70}>{description!}</ReadMore>
          </p>

          <div className="mt-5 flex w-full justify-start">
            <span className="me-2 mt-0.5 text-muted-light">
              <MapPin width={16} />
            </span>

            <address className="text-sm not-italic text-body flex flex-col">
              {!isEmpty(formatAddress(address!))
                ? formatAddress(address!)
                : t('common:text-no-address')}
            </address>
          </div>

          <div className="mt-3 flex w-full justify-start">
            <span className="me-2 mt-0.5 text-muted-light">
              <PhoneIcon width={16} />
            </span>
            <a href={`tel:${settings?.contact}`} className="text-sm text-body">
              {settings?.contact
                ? settings?.contact
                : t('common:text-no-contact')}
            </a>
          </div>

          <div className="mt-7 grid w-full grid-cols-1">
            <a
              href={`${process.env.NEXT_PUBLIC_SHOP_URL}/${locale}/shops/${slug}`}
              target="_blank"
              className="inline-flex h-12 flex-shrink-0 items-center justify-center rounded !bg-gray-100 px-5 py-0 !font-normal leading-none !text-heading outline-none transition duration-300 ease-in-out hover:!bg-accent hover:!text-light focus:shadow focus:outline-none focus:ring-1 focus:ring-accent-700"
              rel="noreferrer"
            >
              {t('common:text-visit-shop')}
            </a>
          </div>
        </div>
      </div>

      {/* Cover Photo */}
      <div className="relative order-1 col-span-12 h-full min-h-[400px] overflow-hidden rounded bg-light xl:order-2 xl:col-span-8 3xl:col-span-9">
        <Image
          src={cover_image?.original ?? '/product-placeholder-borderless.svg'}
          layout="fill"
          objectFit="contain"
          alt={name}
        />

        {hasAccess(adminAndOwnerOnly, permissions) && (
          <LinkButton
            size="small"
            className="absolute top-3 bg-blue-500 shadow-sm hover:bg-blue-600 ltr:right-3 rtl:left-3"
            href={`/${shop}/edit`}
          >
            <EditIcon className="me-2 w-4" /> {t('common:text-edit-shop')}
          </LinkButton>
        )}
      </div>

      {/* Mini Dashboard */}
      <div className="order-4 col-span-12 xl:order-3 xl:col-span-9">
        <div className="grid h-full grid-cols-1 gap-5 rounded bg-light p-4 md:grid-cols-3">
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-heading">
              {t('common:text-products')}
            </h2>

            <div className="border border-gray-100">
              <div className="flex items-center border-b border-gray-100 py-3 px-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FC9EC6] p-3 text-light">
                  <CubeIcon width={18} />
                </div>

                <div className="ms-3">
                  <p className="mb-0.5 text-lg font-semibold text-sub-heading">
                    {products_count}
                  </p>
                  <p className="mt-0 text-sm text-muted">
                    {t('common:text-total-products')}
                  </p>
                </div>
              </div>

              <div className="flex items-center py-3 px-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#6EBBFD] p-3 text-light">
                  <OrdersIcon width={16} />
                </div>

                <div className="ms-3">
                  <p className="mb-0.5 text-lg font-semibold text-sub-heading">
                    {orders_count}
                  </p>
                  <p className="mt-0 text-sm text-muted">
                    {t('common:text-total-orders')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-heading">
              {t('common:text-revenue')}
            </h2>

            <div className="border border-gray-100">
              <div className="flex items-center border-b border-gray-100 py-3 px-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#C7AF99] p-3 text-light">
                  <PriceWalletIcon width={16} />
                </div>

                <div className="ms-3">
                  <p className="mb-0.5 text-lg font-semibold text-sub-heading">
                    {totalEarnings}
                  </p>
                  <p className="mt-0 text-sm text-muted">
                    {t('common:text-gross-sales')}
                  </p>
                </div>
              </div>

              <div className="flex items-center py-3 px-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FFA7AE] p-3 text-light">
                  <DollarIcon width={12} />
                </div>

                <div className="ms-3">
                  <p className="mb-0.5 text-lg font-semibold text-sub-heading">
                    {currentBalance}
                  </p>
                  <p className="mt-0 text-sm text-muted">
                    {t('common:text-current-balance')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-heading">
              {t('common:text-others')}
            </h2>

            <div className="border border-gray-100">
              <div className="flex items-center border-b border-gray-100 py-3 px-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#D59066] p-3 text-light">
                  <PercentageIcon width={16} />
                </div>

                <div className="ms-3">
                  <p className="mb-0.5 text-lg font-semibold text-sub-heading">
                    {`${balance?.admin_commission_rate ?? 0} %` ?? 'Not Set'}
                  </p>
                  <p className="mt-0 text-sm text-muted">
                    {t('common:text-commission-rate')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Misc. Information */}
      <div className="order-3 col-span-12 rounded bg-light sm:col-span-6 xl:order-4 xl:col-span-3">
        <div className="flex flex-col border-b border-gray-200 p-6 2xl:p-7">
          <span className="mb-2 text-sm text-muted">
            {t('common:text-registered-since')}
          </span>
          <span className="text-sm font-semibold text-sub-heading">
            {dayjs(created_at).format('MMMM D, YYYY')}
          </span>
        </div>

        <div className="flex flex-col p-6 2xl:p-7">
          <span className="mb-4 text-lg font-semibold text-sub-heading">
            {t('common:text-payment-info')}
          </span>

          <div className="flex flex-col space-y-3">
            <p className="text-sm text-sub-heading">
              <span className="block w-full text-muted">
                {t('common:text-name')}:
              </span>{' '}
              <span className="font-semibold">
                {balance?.payment_info?.name}
              </span>
            </p>
            <p className="text-sm text-sub-heading">
              <span className="block w-full text-muted">
                {t('common:text-email')}:
              </span>{' '}
              <span className="font-semibold">
                {balance?.payment_info?.email}
              </span>
            </p>
            <p className="text-sm text-sub-heading">
              <span className="block w-full text-muted">
                {t('common:text-bank')}:
              </span>{' '}
              <span className="font-semibold">
                {balance?.payment_info?.bank}
              </span>
            </p>
            <p className="text-sm text-sub-heading">
              <span className="block w-full text-muted">
                {t('common:text-account-no')}:
              </span>{' '}
              <span className="font-semibold">
                {balance?.payment_info?.account}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
ShopPage.Layout = ShopLayout;
ShopPage.authenticate = {
  permissions: adminOwnerAndStaffOnly,
};

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common', 'table'])),
  },
});
export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' };
};
