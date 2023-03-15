import ConfirmationCard from '@/components/common/confirmation-card';
import {
  useModalAction,
  useModalState,
} from '@/components/ui/modal/modal.context';
import { useDeleteReviewMutation } from '@/graphql/reviews.graphql';

const ReviewDeleteView = () => {
  const [deleteReviewById, { loading }] = useDeleteReviewMutation({
    //@ts-ignore
    update(cache, { data: { deleteReview } }) {
      cache.modify({
        fields: {
          reviews(existingRefs, { readField }) {
            return existingRefs.data.filter(
              (ref: any) => deleteReview.id !== readField('id', ref)
            );
          },
        },
      });
    },
  });

  const { data } = useModalState();
  const { closeModal } = useModalAction();

  function handleDelete() {
    deleteReviewById({ variables: { id: data } });
    closeModal();
  }

  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnLoading={loading}
    />
  );
};

export default ReviewDeleteView;
