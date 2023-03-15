import cn from 'classnames';
import { avatarPlaceholder } from '@/lib/placeholders';
import { useTranslation } from 'next-i18next';
import { Image } from '@/components/ui/image';
import Link from '@/components/ui/link';
import { Routes } from '@/config/routes';
import isEmpty from 'lodash/isEmpty';
import { getIcon } from '@/lib/get-icon';
import * as socialIcons from '@/components/icons/social';

interface ManufacturerProps {
  item: any;
  className?: string;
}

const ManufacturerCard: React.FC<ManufacturerProps> = ({ item, className }) => {
  const { t } = useTranslation();

  return (
    <Link
      href={Routes.manufacturer(item?.slug)}
      className={cn(
        'relative flex cursor-pointer items-center rounded border border-gray-200 bg-white p-5 shadow-md',
        className
      )}
      title={item?.name}
    >
      <span
        className={cn(
          'relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-300'
        )}
      >
        <Image
          src={item?.image?.original! ?? avatarPlaceholder}
          alt={item?.name!}
          layout="fill"
          objectFit="cover"
        />
      </span>
      <div className="flex flex-col overflow-hidden ltr:ml-4 rtl:mr-4">
        <span className="mb-2 truncate text-lg font-semibold text-heading transition-colors hover:text-orange-500">
          {item?.name}
        </span>
        {!isEmpty(item?.socials) ? (
          <div className="mt-1.5 flex items-center space-x-3 ltr:ml-1 rtl:mr-1 rtl:space-x-reverse">
            {item?.socials?.map((item: any, index: number) => (
              <a
                key={index}
                href={item.url}
                target="_blank"
                className={`cursor-pointer text-body transition-colors duration-300 hover:text-accent focus:outline-none`}
                rel="noreferrer"
              >
                {getIcon({
                  iconList: socialIcons,
                  iconName: item.icon,
                  className: 'w-[16px] h-[14px]',
                })}
              </a>
            ))}
          </div>
        ) : (
          <div className="mt-1.5 flex items-center space-x-3 rtl:space-x-reverse">
            <a
              href="/"
              target="_blank"
              className={`cursor-pointer text-body transition-colors duration-300 hover:text-accent focus:outline-none`}
              rel="noreferrer"
            >
              {getIcon({
                iconList: socialIcons,
                iconName: 'FacebookIcon',
                className: 'w-[16px] h-[14px]',
              })}
            </a>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ManufacturerCard;
