import { Image } from '@/components/ui/image';
import { useTranslation } from 'next-i18next';
import Truncate from '@/components/ui/truncate';
import { avatarPlaceholder } from '@/lib/placeholders';
import dayjs from 'dayjs';

type Props = {
  author: any;
};
const AuthorDetails: React.FC<Props> = ({ author }) => {
  const { t } = useTranslation('common');
  const {
    name,
    image, //could only had image we need to think it also
    quote,
    bio,
    born,
    death,
    languages,
  } = author ?? {};

  return (
    <article className="flex flex-col space-y-8 pb-8 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-10 lg:space-x-14 lg:pb-20">
      <div className="md:w-1/2">
        <div className="product-gallery h-full rounded bg-gray-100 p-6 md:p-10 xl:p-14">
          <div className="flex h-full w-full items-center justify-center">
            <Image
              src={image?.original ?? avatarPlaceholder}
              alt={name}
              width={450}
              height={450}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start md:w-1/2">
        <div className="w-full">
          {name && (
            <h1 className="mb-5 text-2xl font-bold uppercase text-heading lg:text-4xl">
              {name}
            </h1>
          )}

          {quote && (
            <blockquote className="text-sm italic text-body">
              {quote}
            </blockquote>
          )}

          {bio && (
            <p className="mt-8 text-sm text-body">
              <Truncate
                character={260}
                btnClassName="!mt-4 !text-heading transition-colors hover:!text-accent"
              >
                {bio}
              </Truncate>
            </p>
          )}

          <ul className="mt-8 space-y-4">
            {born && (
              <li className="flex items-center text-sm text-body">
                <span className="order-1 text-sm font-bold text-heading ltr:pr-2 rtl:pl-2 lg:text-base">
                  {t('text-born')}:
                </span>
                <span className="order-2">
                  {dayjs(born).format('MMMM D, YYYY')}
                </span>
              </li>
            )}

            {death && (
              <li className="flex items-center text-sm text-body">
                <span className="order-1 text-sm font-bold text-heading ltr:pr-2 rtl:pl-2 lg:text-base">
                  {t('text-died')}:
                </span>
                <span className="order-2">
                  {dayjs(death).format('MMMM D, YYYY')}
                </span>
              </li>
            )}

            {languages && (
              <li className="flex items-center text-sm text-body">
                <span className="order-1 text-sm font-bold text-heading ltr:pr-2 rtl:pl-2 lg:text-base">
                  {t('text-languages')}:
                </span>
                <span className="order-2">{languages}</span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </article>
  );
};

export default AuthorDetails;
