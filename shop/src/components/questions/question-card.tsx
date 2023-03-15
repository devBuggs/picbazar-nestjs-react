import dayjs from 'dayjs';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { useModalAction } from '@/components/ui/modal/modal.context';
import { useUser } from '@/framework/user';
import { LikeIcon } from '@/components/icons/like-icon';
import { DislikeIcon } from '@/components/icons/dislike-icon';
import { useCreateFeedback } from '@/framework/product';
import type { Question } from '@/types';

type QuestionCardProps = {
  className?: any;
  question: Question;
};

export default function QuestionCard({ question }: QuestionCardProps) {
  const { t } = useTranslation('common');
  const { openModal } = useModalAction();
  const { isAuthorized } = useUser();
  const { createFeedback } = useCreateFeedback();

  const {
    id,
    answer,
    created_at,
    my_feedback,
    negative_feedbacks_count,
    positive_feedbacks_count,
    question: userQuestion,
  } = question;

  function feedback(value: { positive: boolean } | { negative: boolean }) {
    if (!isAuthorized) {
      openModal('LOGIN_VIEW');
      return;
    }
    createFeedback({
      model_id: id,
      model_type: 'Question',
      ...value,
    });
  }

  return (
    <div className="border-t border-border-200 border-opacity-70 py-7 first:border-t-0">
      <p className="mb-2.5 text-base font-semibold text-heading">
        <span className="inline-block uppercase ltr:mr-1 rtl:ml-1">Q:</span>
        {userQuestion}
      </p>
      {answer && (
        <p className="text-base">
          <span className="inline-block font-semibold uppercase text-heading ltr:mr-1 rtl:ml-1">
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
          <button
            className="flex items-center text-xs tracking-wider text-gray-400 transition"
            disabled={my_feedback?.positive}
            onClick={() => feedback({ positive: true })}
          >
            <LikeIcon
              className={cn('h-4 w-4 ltr:mr-1.5 rtl:ml-1.5', {
                'text-accent': my_feedback?.positive,
              })}
            />
            {positive_feedbacks_count}
          </button>
          <button
            className="flex items-center text-xs tracking-wider text-gray-400 transition"
            onClick={() => feedback({ negative: true })}
            disabled={my_feedback?.negative}
          >
            <DislikeIcon
              className={cn('h-4 w-4 ltr:mr-1.5 rtl:ml-1.5', {
                'text-accent': my_feedback?.negative,
              })}
            />
            {negative_feedbacks_count}
          </button>
        </div>
      </div>
    </div>
  );
}
