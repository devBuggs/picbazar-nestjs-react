import { useTranslation } from 'next-i18next';
import RatingsBadge from '@/components/ui/rating-badge';
import RatingProgressBar from '@/components/ui/rating-progress-bar';
import type { RatingCount } from '@/types';

type AverageRatingsProps = {
  totalReviews?: number;
  ratings?: number;
  ratingCount?: RatingCount[];
  title: string;
};

const AverageRatings: React.FC<AverageRatingsProps> = ({
  title,
  totalReviews,
  ratings,
  ratingCount,
}) => {
  const { t } = useTranslation('common');

  //TODO: need to check
  if (!ratingCount) return null;

  return (
    <div className="p-5 md:py-12 lg:px-16">
      <h2 className="mb-7 text-lg font-semibold tracking-tight text-heading">
        {t('text-ratings-reviews')} {title}
      </h2>

      <div className="flex w-full flex-col divide-y divide-gray-200 divide-opacity-70 sm:flex-row sm:items-center sm:space-x-8 sm:divide-y-0 sm:divide-x rtl:sm:space-x-reverse rtl:sm:divide-x-reverse">
        <div className="w-full pb-4 sm:w-auto sm:pb-0">
          <RatingsBadge rating={ratings} className="mb-4" variant="large" />
          <p className="text-base text-gray-400">
            <span>
              {totalReviews} {t('text-ratings')}
            </span>
          </p>
        </div>
        <div className="w-full space-y-3 py-0.5 pt-4 sm:w-auto sm:pt-0 ltr:sm:pl-8 rtl:sm:pr-8">
          <RatingProgressBar
            ratingProgressItem={ratingCount.find(
              (rating) => Number(rating.rating) === 5
            )}
            ratingId={5}
            totalReviews={totalReviews!}
          />
          <RatingProgressBar
            ratingProgressItem={ratingCount.find(
              (rating) => Number(rating.rating) === 4
            )}
            ratingId={4}
            totalReviews={totalReviews!}
            colorClassName="bg-teal-500"
          />
          <RatingProgressBar
            ratingProgressItem={ratingCount.find(
              (rating) => Number(rating.rating) === 3
            )}
            ratingId={3}
            totalReviews={totalReviews!}
            colorClassName="bg-teal-400"
          />
          <RatingProgressBar
            ratingProgressItem={ratingCount.find(
              (rating) => Number(rating.rating) === 2
            )}
            ratingId={2}
            totalReviews={totalReviews!}
            colorClassName="bg-amber-500"
          />
          <RatingProgressBar
            ratingProgressItem={ratingCount.find(
              (rating) => Number(rating.rating) === 1
            )}
            ratingId={1}
            totalReviews={totalReviews!}
            colorClassName="bg-rose-500"
          />
        </div>
      </div>
    </div>
  );
};

export default AverageRatings;
