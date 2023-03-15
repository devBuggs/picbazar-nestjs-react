import cn from 'classnames';
import { Image } from '@/components/ui/image';
import { productPlaceholder } from '@/lib/placeholders';
import SearchWithSuggestion from '@/components/ui/search/search-with-suggestion';
import type { Banner } from '@/types';

interface BannerProps {
  banners: Banner[] | undefined;
  layout?: string;
}

const BannerWithoutSlider: React.FC<BannerProps> = ({ banners, layout }) => {
  return (
    <div
      className={cn('relative hidden lg:block', {
        '!block': layout === 'minimal',
      })}
    >
      <div
        className={cn('relative h-screen w-full', {
          'max-h-140': layout === 'standard',
          'max-h-[320px] md:max-h-[680px]': layout === 'minimal',
        })}
      >
        <Image
          className="h-full min-h-140 w-full"
          src={banners![0]?.image?.original ?? productPlaceholder}
          alt={banners![0]?.title ?? ''}
          layout="fill"
          objectFit="cover"
        />
        <div
          className={cn(
            'absolute inset-0 flex w-full flex-col items-center justify-center p-5 text-center md:px-20 lg:space-y-10',
            {
              'space-y-5 md:!space-y-8': layout === 'minimal',
            }
          )}
        >
          <h1
            className={cn(
              'text-2xl font-bold tracking-tight text-heading md:text-3xl lg:text-4xl xl:text-5xl',
              {
                '!text-accent': layout === 'minimal',
              }
            )}
          >
            {banners![0]?.title}
          </h1>
          <p className="text-sm text-body md:text-base xl:text-lg">
            {banners![0]?.description}
          </p>
          <div className="w-full max-w-3xl">
            <SearchWithSuggestion
              label="search"
              className="hidden lg:block"
              variant="with-shadow"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerWithoutSlider;
