import { useTranslation } from 'next-i18next';
import ReviewCard from '@/components/reviews/review-card';
import Pagination from '@/components/ui/pagination';
import { useEffect, useState } from 'react';
import { useReviews } from '@/framework/review';
import Sorting from './sorting';
import StarFilter from './star-filter';
import { useRouter } from 'next/router';
import cn from 'classnames';
import isEmpty from 'lodash/isEmpty';
import Spinner from '@/components/ui/loaders/spinner/spinner';

type ProductReviewsProps = {
  className?: any;
  productId: string;
  productType?: string;
};

const ProductReviews: React.FC<ProductReviewsProps> = ({
  productId,
  productType,
}) => {
  const { query } = useRouter();
  const { text, ...restQuery } = query;
  const { t } = useTranslation('common');
  const [page, setPage] = useState(1);
  const { reviews, isLoading, paginatorInfo } = useReviews({
    product_id: productId,
    limit: 5,
    page,
    ...(!isEmpty(restQuery) && { ...restQuery }),
  });
  useEffect(() => {
    setPage(1);
  }, [restQuery]);
  function onPagination(current: number) {
    setPage(current);
  }
  if (isLoading && isEmpty(reviews)) {
    return <Spinner />;
  }
  const boxedLayout = ['books'].includes(productType!);

  return (
    <div>
      <div
        className={cn('border-t border-b border-border-200 border-opacity-70', {
          'px-5 ltr:lg:pl-16 ltr:lg:pr-10 rtl:lg:pr-16 rtl:lg:pl-10':
            !boxedLayout,
          'px-5 xl:px-0': boxedLayout,
        })}
      >
        <div
          className={cn(
            'flex flex-col justify-between sm:flex-row sm:items-center',
            {
              'mx-auto max-w-screen-xl': boxedLayout,
            }
          )}
        >
          <h2 className="mt-3 text-lg font-semibold tracking-tight text-heading sm:mt-0">
            {t('text-product-reviews')} ({paginatorInfo?.total ?? 0})
          </h2>
          <div className="flex flex-col items-center border-border-200 border-opacity-70 py-3 sm:space-y-1 ltr:sm:border-l rtl:sm:border-r lg:flex-row lg:space-y-0 lg:!border-0 lg:py-0">
            <div className="w-full shrink-0 border-border-200 border-opacity-70 ltr:sm:pl-8 ltr:sm:pr-5 rtl:sm:pl-5 rtl:sm:pr-8 lg:w-auto lg:py-5 ltr:lg:border-l rtl:lg:border-r">
              <Sorting />
            </div>
            <div className="w-full shrink-0 border-border-200 border-opacity-70 ltr:sm:pl-8 ltr:sm:pr-5 rtl:sm:pl-5 rtl:sm:pr-8 lg:w-auto lg:py-5 ltr:lg:border-l rtl:lg:border-r">
              <StarFilter />
            </div>
          </div>
        </div>
      </div>
      {!isEmpty(reviews) ? (
        <div
          className={cn('border-b border-border-200 border-opacity-70', {
            'px-5 lg:px-16': !boxedLayout,
            'px-5 xl:px-0': boxedLayout,
          })}
        >
          <div
            className={cn({
              'mx-auto max-w-screen-xl': boxedLayout,
            })}
          >
            {reviews?.map((review: any) => (
              <ReviewCard key={`review-no-${review?.id}`} review={review} />
            ))}

            {/* Pagination */}

            {paginatorInfo && (
              <div className="flex items-center justify-between border-t border-border-200 border-opacity-70 py-4">
                <div className="text-xs text-gray-400">
                  {t('text-page')} {paginatorInfo.currentPage} {t('text-of')}{' '}
                  {Math.ceil(paginatorInfo.total / paginatorInfo.perPage)}
                </div>

                <div className="mb-2 flex items-center">
                  <Pagination
                    total={paginatorInfo.total}
                    current={paginatorInfo.currentPage}
                    pageSize={paginatorInfo.perPage}
                    onChange={onPagination}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center border-b border-border-200 border-opacity-70 px-5 py-16">
          <h3 className="text-lg font-semibold text-gray-400">
            {t('text-no-reviews-found')}
          </h3>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
