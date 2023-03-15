import ConfirmationCard from '@/components/common/confirmation-card';
import {
  useModalAction,
  useModalState,
} from '@/components/ui/modal/modal.context';
import { useDeclineReviewMutation } from '@/graphql/reviews.graphql';
import { useRouter } from 'next/router';

const DeclineAbuseReportView = () => {
  const [declineReports, { loading }] = useDeclineReviewMutation();
  const router = useRouter();
  const { data } = useModalState();
  const { closeModal } = useModalAction();
  function handleDelete() {
    declineReports({ variables: { input: data } });
    closeModal();
    router.push(`/reviews`);
  }
  return (
    <ConfirmationCard
      title="text-decline"
      description="text-decline-report-modal-description"
      onCancel={closeModal}
      deleteBtnText="text-decline"
      onDelete={handleDelete}
      deleteBtnLoading={loading}
    />
  );
};

export default DeclineAbuseReportView;
