import { Image } from '@/components/ui/image';
import { getIcon } from '@/lib/get-icon';
import * as socialIcons from '@/components/icons/social';
import { avatarPlaceholder, productPlaceholder } from '@/lib/placeholders';
import Link from '@/components/ui/link';

type ManufacturerProps = {
  manufacturer: any;
};

const Details: React.FC<ManufacturerProps> = ({ manufacturer }) => {
  const { name, slug, website, image, cover_image, socials } =
    manufacturer ?? {};

  return (
    <div className="mb-12 flex w-full flex-col border border-gray-200 md:flex-row xl:mb-20">
      <div className="flex w-full flex-col items-center overflow-hidden p-5 md:w-1/3 lg:p-8 2xl:p-10">
        <div className="flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-gray-300 2xl:h-40 2xl:w-40">
          <Image
            src={image?.original ?? avatarPlaceholder}
            alt={name}
            width={160}
            height={160}
          />
        </div>

        {name && (
          <h3
            className="mt-5 w-full truncate text-center text-xl font-bold text-heading 2xl:text-2xl"
            title={name}
          >
            {name}
          </h3>
        )}
        {website && (
          <Link
            href={website}
            className="mt-2 text-sm text-body transition-colors hover:text-accent"
          >
            {website}
          </Link>
        )}

        {socials && (
          <div className="mt-5 flex items-center space-x-5 rtl:space-x-reverse">
            {socials?.map((item: any, index: number) => (
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
                  className: 'w-4 h-4',
                })}
              </a>
            ))}
          </div>
        )}
      </div>

      <div className="relative hidden w-full items-center justify-center overflow-hidden bg-gray-50 md:flex md:w-2/3">
        <Image
          src={cover_image?.original ?? productPlaceholder}
          alt="cover image"
          width={1100}
          height={370}
        />
      </div>
    </div>
  );
};

export default Details;
