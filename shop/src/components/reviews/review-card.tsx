import { useTranslation } from 'next-i18next';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import cn from 'classnames';
import Rating from '@/components/ui/rating-badge';
import dayjs from 'dayjs';
import { Image } from '@/components/ui/image';
import { CheckedIcon } from '@/components/icons/checked';
import { LikeIcon } from '@/components/icons/like-icon';
import { MenuIcon } from '@/components/icons/menu-icon';
import { DislikeIcon } from '@/components/icons/dislike-icon';
import { productPlaceholder } from '@/lib/placeholders';
import { useCreateFeedback } from '@/framework/product';
import type { Review } from '@/types';
import { useModalAction } from '@/components/ui/modal/modal.context';
import { useUser } from '@/framework/user';
type ReviewCardProps = {
  review: Review;
};

export default function ReviewCard({ review }: ReviewCardProps) {
  const { t } = useTranslation('common');
  const { openModal } = useModalAction();
  const { createFeedback } = useCreateFeedback();
  const { isAuthorized } = useUser();

  const {
    id,
    comment,
    rating,
    photos,
    created_at,
    user,
    negative_feedbacks_count,
    positive_feedbacks_count,
    my_feedback,
  } = review;
  function feedback(value: { positive: boolean } | { negative: boolean }) {
    if (!isAuthorized) {
      openModal('LOGIN_VIEW');
      return;
    }
    createFeedback({
      model_id: id,
      model_type: 'Review',
      ...value,
    });
  }
  function openAbuseReportModal() {
    if (!isAuthorized) {
      openModal('LOGIN_VIEW');
      return;
    }
    openModal('ABUSE_REPORT', {
      model_id: id,
      model_type: 'Review',
    });
  }

  const handleImageClick = (idx: number) => {
    openModal('REVIEW_IMAGE_POPOVER', {
      images: photos,
      initSlide: idx,
    });
  };

  return (
    <div className="border-t border-border-200 border-opacity-70 py-7 first:border-t-0">
      <Rating rating={rating} className="mb-2.5" />
      <div className="mb-4 flex items-center text-xs text-gray-500">
        {t('text-by')}{' '}
        <span className="capitalize ltr:ml-1 rtl:mr-1">{user?.name}</span>
        <CheckedIcon className="h-[13px] w-[13px] text-gray-700 ltr:ml-1 rtl:mr-1" />
      </div>
      <p className="text-base leading-7 text-heading">{comment}</p>

      <div className="space-s-2 flex items-start pt-3">
        {photos?.map((photo, idx) => (
          <div
            className="m-1.5 cursor-pointer"
            key={photo.id}
            onClick={() => handleImageClick(idx)}
          >
            <Image
              src={photo.thumbnail ?? productPlaceholder}
              alt={user.name ?? ''}
              width={80}
              height={80}
              objectFit="contain"
              className="inline-flex rounded-md bg-gray-200"
            />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="mt-3.5 text-xs text-gray-400">
          {t('text-date')}: {dayjs(created_at).format('MMMM D, YYYY')}
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

          <Menu
            as="div"
            className="relative inline-block ltr:text-left rtl:text-right"
          >
            <Menu.Button className="group p-2">
              <MenuIcon className="text-gray-400 transition-colors group-hover:text-accent" />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                as="ul"
                className={cn(
                  'absolute mt-2 w-48 overflow-hidden rounded border border-border-200 bg-light py-2 shadow-700 focus:outline-none ltr:right-0 ltr:origin-top-right rtl:left-0 rtl:origin-top-left'
                )}
              >
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={openAbuseReportModal}
                      className={cn(
                        'flex w-full items-center space-x-4 px-5 py-2.5 text-sm font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none rtl:space-x-reverse',
                        active ? 'text-accent' : 'text-body'
                      )}
                    >
                      {t('text-report-abuse')}
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
}
