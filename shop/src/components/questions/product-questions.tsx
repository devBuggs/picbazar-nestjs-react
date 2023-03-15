import { useTranslation } from 'next-i18next';
import QuestionCard from '@/components/questions/question-card';
import Pagination from '@/components/ui/pagination';
import { useEffect, useState } from 'react';
import { useQuestions } from '@/framework/product';
import Search from '@/components/ui/search/search';
import { useModalAction } from '@/components/ui/modal/modal.context';
import { useRouter } from 'next/router';
import { useUser } from '@/framework/user';
import cn from 'classnames';
import isEmpty from 'lodash/isEmpty';
import Spinner from '@/components/ui/loaders/spinner/spinner';

type ProductQuestionsProps = {
  className?: any;
  productId: string;
  shopId: string;
  productType?: string;
};

const ProductQuestions: React.FC<ProductQuestionsProps> = ({
  productId,
  shopId,
  productType,
}) => {
  const { t } = useTranslation('common');
  const [page, setPage] = useState(1);
  const { openModal } = useModalAction();
  const { query } = useRouter();
  const { isAuthorized } = useUser();
  const { questions, paginatorInfo, isLoading } = useQuestions({
    product_id: productId,
    limit: 5,
    page,
    ...(!isEmpty(query?.text) && { question: query.text?.toString() }),
  });
  useEffect(() => {
    setPage(1);
  }, [query.text]);
  function onPagination(current: number) {
    setPage(current);
  }

  const openQuestionModal = () => {
    if (!isAuthorized) {
      openModal('LOGIN_VIEW');
      return;
    }
    openModal('QUESTION_FORM', { product_id: productId, shop_id: shopId });
  };

  if (isLoading && isEmpty(questions)) {
    return <Spinner />;
  }
  const boxedLayout = ['books'].includes(productType!);

  return (
    <div>
      <div
        className={cn(
          '-mt-px border-t border-b border-border-200 border-opacity-70',
          {
            'px-5 lg:px-16': !boxedLayout,
            'px-5 xl:px-0': boxedLayout,
          }
        )}
      >
        <div
          className={cn(
            'flex flex-col justify-between sm:flex-row sm:items-center',
            {
              'mx-auto max-w-screen-xl': boxedLayout,
            }
          )}
        >
          <div className="flex w-full flex-col items-start space-y-1 py-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:py-0 ltr:lg:pr-5 rtl:lg:pl-5">
            <h2 className="mb-1 text-lg font-semibold tracking-tight text-heading">
              {t('text-question-answers')} ({paginatorInfo?.total ?? 0})
            </h2>
            <button
              className="rounded-full bg-accent px-5 py-3 text-xs font-bold text-white transition-colors hover:border-accent hover:bg-accent-hover"
              onClick={openQuestionModal}
            >
              {t('text-ask-question')}
            </button>
          </div>
          <div className="-ml-3 shrink-0 border-t border-border-200 border-opacity-70 py-3 sm:ml-0 sm:min-w-[50%] sm:border-t-0 sm:py-8 ltr:sm:border-l ltr:sm:pl-5 rtl:sm:border-r rtl:sm:pr-5 md:min-w-[380px] lg:py-5">
            <Search
              label={t('text-search-label')}
              placeholder={t('text-question-search-placeholder')}
              variant="flat"
            />
          </div>
        </div>
      </div>
      {questions?.length !== 0 ? (
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
            {questions?.map((question:any) => (
              <QuestionCard
                key={`question-no-${question.id}`}
                question={question}
              />
            ))}
            {/* Pagination */}
            {paginatorInfo && (
              <div className="flex items-center justify-between border-t border-border-200 border-opacity-70 py-4">
                <div className="text-xs text-body text-opacity-70">
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
            {t('text-no-question-found')}
          </h3>
        </div>
      )}
    </div>
  );
};

export default ProductQuestions;
