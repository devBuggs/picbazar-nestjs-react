import { Image } from '@/components/ui/image';
import { MapPin } from '@/components/icons/map-pin';
import { useTranslation } from 'next-i18next';
import { formatAddress } from '@/lib/format-address';
import { Routes } from '@/config/routes';
import Link from '@/components/ui/link';
import isEmpty from 'lodash/isEmpty';
import { productPlaceholder } from '@/lib/placeholders';

type ShopCardProps = {
  shop: any;
};

const ShopCard: React.FC<ShopCardProps> = ({ shop }) => {
  const { t } = useTranslation();

  const isNew = false;

  return (
    <Link href={Routes.shop(shop.slug)}>
      <div className="relative flex cursor-pointer items-center rounded border border-gray-200 p-5">
        {isNew && (
          <span className="absolute top-2 rounded bg-blue-500 px-2 py-1 text-xs text-light ltr:right-2 rtl:left-2">
            {t('common:text-new')}
          </span>
        )}
        <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-300">
          <Image
            alt={t('common:text-logo')}
            src={shop?.logo?.thumbnail ?? productPlaceholder}
            layout="fill"
            objectFit="cover"
          />
        </div>

        <div className="flex flex-col ltr:ml-4 rtl:mr-4">
          <span className="mb-2 text-lg font-semibold text-heading">
            {shop?.name}
          </span>
          <span className="flex text-xs text-body">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-muted ltr:mr-1 rtl:ml-1" />
            {!isEmpty(formatAddress(shop?.address))
              ? formatAddress(shop?.address)
              : t('common:text-no-address')}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ShopCard;
