import Image from 'next/image';
import { LikeIcon } from '@/components/icons/like-icon';
import { DislikeIcon } from '@/components/icons/dislike-icon';
import { useModalAction } from '@/components/ui/modal/modal.context';
import { useTranslation } from 'next-i18next';
import { CheckedIcon } from '@/components/icons/checked';
import isEmpty from 'lodash/isEmpty';

type ReviewCardProps = {
  className?: any;
  review: any;
};

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const { openModal } = useModalAction();
  const { t } = useTranslation();

  const {
    comment,
    photos,
    positive_feedbacks_count,
    negative_feedbacks_count,
    user,
  } = review;

  function handleImageClick() {
    openModal('REVIEW_IMAGE_POPOVER', {
      images: photos,
    });
  }

  return (
    <div className="block">
      <div className="mb-3 flex items-center text-xs text-gray-500">
        {t('common:text-by')}{' '}
        <span className="capitalize ltr:ml-1 rtl:mr-1 font-semibold text-heading">
          {user?.name}
        </span>
        {user?.is_active && (
          <CheckedIcon className="h-[13px] w-[13px] text-gray-700 ltr:ml-1 rtl:mr-1" />
        )}
      </div>
      <p className="text-sm leading-6 text-heading">{comment}</p>
      {photos && !isEmpty(photos) && (
        <div className="flex items-start mt-3 space-s-2 rtl:space-s-reverse">
          {photos?.map((photo: any, idx: any) => (
            <div className="mb-1 bg-gray-200 rounded-md" key={idx}>
              <Image
                src={photo?.original ?? '/product-placeholder-borderless.svg'}
                width={32}
                height={32}
                className="inline-flex"
                objectFit="contain"
                alt={`${user.name}-${idx}`}
              />
            </div>
          ))}

          <button
            className="my-1.5 font-semibold underline transition-colors text-heading hover:text-accent"
            onClick={handleImageClick}
          >
            {t('common:text-view-images')}
          </button>
        </div>
      )}
      <div className="flex items-center mt-3 space-x-4">
        <span className="flex items-center text-xs tracking-wider text-gray-400 transition">
          <LikeIcon className="w-4 h-4 me-1.5" />
          {positive_feedbacks_count}
        </span>
        <span className="flex items-center text-xs tracking-wider text-gray-400 transition">
          <DislikeIcon className="w-4 h-4 me-1.5" />
          {negative_feedbacks_count}
        </span>
      </div>
    </div>
  );
};

export default ReviewCard;
