import { useRouter } from 'next/router';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import Scrollbar from '@/components/ui/scrollbar';
import Link from '@/components/ui/link';
import { Image } from '@/components/ui/image';
import { productPlaceholder } from '@/lib/placeholders';
import { Routes } from '@/config/routes';
import { Transition } from '@headlessui/react';
import Spinner from '@/components/ui/loaders/spinner/spinner';

type Props = {
  className?: string;
  suggestions: any;
  visible: boolean;
  notFound: boolean;
  showLoaders: boolean;
  seeMore: boolean;
  seeMoreLink: (e: any) => void;
};

const AutoSuggestion: React.FC<Props> = ({
  className,
  suggestions,
  visible,
  notFound,
  showLoaders,
  seeMore,
  seeMoreLink,
}) => {
  const { t } = useTranslation('common');
  const router = useRouter();

  const handleClick = (path: string) => {
    router.push(path);
  };

  return (
    <Transition
      show={visible}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className={cn(
          'absolute top-11 left-0 mt-2 w-full lg:top-16 lg:mt-1',
          className
        )}
      >
        <div className="h-full w-full rounded-lg bg-white py-2 shadow-downfall-lg">
          <Scrollbar className="h-full w-full">
            {notFound && (
              <h3 className="flex h-full w-full items-center justify-center py-10 font-semibold text-gray-400">
                {t('text-no-products')}
              </h3>
            )}

            {showLoaders && (
              <div className="flex h-full w-full items-center justify-center py-14">
                <Spinner simple={true} className="h-9 w-9" />
              </div>
            )}

            {!notFound && !showLoaders && (
              <div className="max-h-52">
                {suggestions?.map((item: any) => (
                  <div
                    onClick={() => handleClick(Routes.product(item?.slug))}
                    key={item?.slug}
                    className="flex w-full cursor-pointer items-center border-b border-border-100 px-5 py-2 transition-colors last:border-b-0 hover:bg-gray-100"
                  >
                    <div className="relative h-8 w-8 overflow-hidden rounded">
                      <Image
                        className="h-full w-full"
                        src={item?.image?.original ?? productPlaceholder}
                        alt={item?.name ?? ''}
                        layout="responsive"
                        width={100}
                        height={100}
                      />
                    </div>

                    <span className="text-sm font-semibold text-heading ltr:ml-3 rtl:mr-3">
                      {item?.name}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </Scrollbar>
          {seeMore && (
            <div className="w-full py-3 text-center">
              <button
                onClick={seeMoreLink}
                className="text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
              >
                {t('text-see-more')}
              </button>
            </div>
          )}
        </div>
      </div>
    </Transition>
  );
};

export default AutoSuggestion;
