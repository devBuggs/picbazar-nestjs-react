import ErrorMessage from '@/components/ui/error-message';
import { useTranslation } from 'next-i18next';
import Button from '@/components/ui/button';
import NotFound from '@/components/ui/not-found';
import type { Question } from '@/types';
import rangeMap from '@/lib/range-map';
import { useMyQuestions } from '@/framework/question';
import dayjs from 'dayjs';
import { LikeIcon } from '@/components/icons/like-icon';
import { DislikeIcon } from '@/components/icons/dislike-icon';
import QuestionLoader from '@/components/ui/loaders/question-loader';
import Link from '@/components/ui/link';
import { Image } from '@/components/ui/image';
import { Routes } from '@/config/routes';
import { productPlaceholder } from '@/lib/placeholders';
import usePrice from '@/lib/use-price';

function QuestionItem({ question }: { question: Question }) {
  const {
    question: myQuestion,
    answer,
    created_at,
    positive_feedbacks_count,
    negative_feedbacks_count,
    product,
  } = question;
  const { t } = useTranslation('common');

  const { price, basePrice } = usePrice({
    amount: product?.sale_price ? product?.sale_price : product?.price,
    baseAmount: product?.price,
  });
  const { price: minPrice } = usePrice({
    amount: product?.min_price,
  });
  const { price: maxPrice } = usePrice({
    amount: product?.max_price,
  });

  return (
    <div className="border-t border-border-200 border-opacity-70 py-7 first:border-t-0">
      <div className="mb-5 flex items-center space-x-4">
        <div className="relative h-10 w-10 overflow-hidden rounded border border-gray-200">
          <Image
            src={product.image?.original ?? productPlaceholder}
            layout="fill"
            alt={product?.name}
          />
        </div>
        <div className="flex flex-col">
          <Link
            className="mb-0.5 inline-block text-sm font-semibold text-heading transition-colors hover:text-accent"
            href={Routes.product(product?.slug)}
          >
            {product?.name}
          </Link>

          {product?.product_type.toLowerCase() === 'variable' ? (
            <div className="flex items-center justify-start space-x-1.5 rtl:space-x-reverse">
              <span className="text-sm font-semibold text-body">
                {minPrice}
              </span>
              <span> - </span>
              <span className="text-sm font-semibold text-body">
                {maxPrice}
              </span>
            </div>
          ) : (
            <span className="flex min-w-150 items-center">
              <ins className="text-sm font-semibold text-body no-underline">
                {price}
              </ins>
              {basePrice && (
                <del className="text-sm font-normal text-muted ltr:ml-3 rtl:mr-3">
                  {basePrice}
                </del>
              )}
            </span>
          )}
        </div>
      </div>

      <div className="rounded-md bg-gray-50 py-3 px-4">
        <p className="mb-2.5 text-base font-semibold text-heading">
          <span
            className="inline-block uppercase ltr:mr-1 rtl:ml-1"
            title={t('text-question')}
          >
            Q:
          </span>
          {myQuestion}
        </p>
        {answer && (
          <p className="text-base">
            <span
              className="inline-block font-semibold uppercase text-heading ltr:mr-1 rtl:ml-1"
              title={t('text-answer')}
            >
              A:
            </span>
            <span className="text-gray-600">{answer}</span>
          </p>
        )}

        <div className="flex items-center justify-between">
          <div className="mt-5 text-xs text-gray-400">
            {t('text-date')}: {dayjs(created_at).format('D MMMM, YYYY')}
          </div>

          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <span className="flex items-center text-xs tracking-wider text-gray-400 transition">
              <LikeIcon className="h-4 w-4 ltr:mr-1.5 rtl:ml-1.5" />
              {positive_feedbacks_count}
            </span>
            <span className="flex items-center text-xs tracking-wider text-gray-400 transition">
              <DislikeIcon className="h-4 w-4 ltr:mr-1.5 rtl:ml-1.5" />
              {negative_feedbacks_count}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const MyQuestions: React.FC = () => {
  const { t } = useTranslation('common');
  const { questions, isLoading, isLoadingMore, error, hasMore, loadMore } =
    useMyQuestions();

  if (error) return <ErrorMessage message={error.message} />;

  // loader
  if (!questions.length && isLoading) {
    return (
      <div className="flex w-full flex-col">
        <div className="mb-8 flex items-center justify-center sm:mb-10">
          <h1 className="text-center text-lg font-semibold text-heading sm:text-xl">
            {t('profile-sidebar-my-wishlist')}
          </h1>
        </div>
        {rangeMap(15, (i) => (
          <QuestionLoader key={i} uniqueKey={`favorite-${i}`} />
        ))}
      </div>
    );
  }

  if (!questions.length && !isLoading) {
    return (
      <div className="flex w-full flex-col">
        <div className="mb-8 flex items-center justify-between sm:mb-10">
          <h1 className="ml-auto text-center text-lg font-semibold text-heading sm:text-xl">
            {t('profile-sidebar-my-wishlist')}
          </h1>
        </div>
        <NotFound
          text="text-no-download"
          className="mx-auto w-full md:w-7/12"
        />
      </div>
    );
  }

  return (
    <>
      <div className="flex w-full flex-col">
        <div className="mb-8 flex items-center justify-center sm:mb-10">
          <h1 className="text-center text-lg font-semibold text-heading sm:text-xl">
            {t('profile-sidebar-my-questions')}
          </h1>
        </div>
        <div>
          {questions?.map((item:any) => (
            <QuestionItem key={item.id} question={item} />
          ))}
        </div>
      </div>

      {hasMore && (
        <div className="mt-8 flex w-full justify-center">
          <Button
            loading={isLoadingMore}
            disabled={isLoadingMore}
            onClick={loadMore}
          >
            {t('text-load-more')}
          </Button>
        </div>
      )}
    </>
  );
};

export default MyQuestions;
