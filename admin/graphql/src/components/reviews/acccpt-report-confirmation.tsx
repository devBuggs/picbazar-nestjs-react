import ConfirmationCard from '@/components/common/confirmation-card';
import {
  useModalAction,
  useModalState,
} from '@/components/ui/modal/modal.context';
import { useDeleteReviewMutation } from '@/graphql/reviews.graphql';
import { useRouter } from 'next/router';

const AcceptAbuseReportView = () => {
  const [deleteReview, { loading }] = useDeleteReviewMutation();
  const router = useRouter();
  const { data } = useModalState();
  const { closeModal } = useModalAction();
  function handleDelete() {
    deleteReview({ variables: { id: data } });
    closeModal();
    router.push(`/reviews`);
  }
  return (
    <ConfirmationCard
      title="text-accept"
      description="text-accept-report-modal-description"
      onCancel={closeModal}
      deleteBtnText="text-accept"
      onDelete={handleDelete}
      deleteBtnLoading={loading}
    />
  );
};

export default AcceptAbuseReportView;
